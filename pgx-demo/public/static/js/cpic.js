// define the item component
Vue.component('recomtile', {
  template: '#recomtile-template',
  props: [
    'recmodel',
    'reckey',
    'recindex',
    'library_url'
  ],
  data: function () {
    return {
      reclabel: { genes: "Based on", classification: "Classification of recommendations", content: "Dosing recommendations", implication: "Implications for phenotypic measures" }
    }
  },
  computed: {
    recrender: function () {
      var obj = {}
      var phenovalue = ''
      for (var key in this.recmodel.result.genes) {
        if (phenovalue != '') {
          phenovalue = phenovalue + " "
        }
        if (this.recmodel.result.genes[key].phenotype) {
          if (this.recmodel.result.genes[key].phenotype != '') {
            phenovalue = phenovalue + key + " " + this.recmodel.result.genes[key].phenotype
          }
        } else {
          if (this.recmodel.result.genes[key].diplotype != '') {
            phenovalue = phenovalue + key + " " + this.recmodel.result.genes[key].diplotype
          }
        }
      }
      obj.genes = phenovalue
      obj.classification = this.recmodel.result.recommendation.classification
      obj.implication = this.recmodel.result.recommendation.implication
      obj.content = this.recmodel.result.recommendation.content
      return obj
    },
    objlink: function () {
      return ""
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#app',
  data: function () {
    return {
      initdata: {},
      autofillSelection: '',
      eventlog: [],
      delay: 1500,
      logtext: { 'request': 'K-GRID Service Request - Sending request to Knowledge Object ark:', 'response': '' },
      patientsamples: [],
      phenotypePanel: {},
      diplotypePanel: {},
      recommendationlistks2: [],
      recommendationlistks3: []
    }
  },
  created: function () {
    var self = this
    axios.all([
      axios.get('./static/json/initdata.json'),
      axios.get('./static/json/config.json')
    ]).then(axios.spread(function (initresp, config) {
      self.appendLog('app', 'Application Event - Loading Configuration...')
      self.appendLog('app', 'Application Event - Loading Initial Data...')
      self.initdata = initresp.data
      self.patientsamples = initresp.data.patientsamples
      self.phenotypePanel = JSON.parse(JSON.stringify(initresp.data.initrequest.diplotype))
      self.diplotypePanel = JSON.parse(JSON.stringify(initresp.data.initrequest.diplotype))
      
    })).catch(function (error) {
      console.log(error)
    })
  },
  computed: {    
    debouncegetdata: function () {
      return _.debounce(this.getdata, this.delay)
    }
  },
  watch: {    
    autofillSelection: function () {
      var self = this
      if (this.autofillSelection != '') {
        this.delay = 200
        var i = parseInt(this.autofillSelection)
        window.setTimeout(function () {
          self.autofill(i)
        }, 50)
        this.appendLog('app', 'Application Event - Autofill Sample #' + i + ' is selected.')
      }
    },
    diplotypePanel: {
      handler: function (after, before) {
        var ready = false
        var self = this
        this.resetapp()
        for (var key in this.diplotypePanel) {
          ready = ready || (this.diplotypePanel[key] != '')
        }
        if (ready) {
          this.debouncegetdata()
        }
      },
      deep: true
    }
  },
  methods: {    
    appendLog: function (key, s) {
      var ts = moment().format('ddd, MMM Do YYYY, h:mm:ss A Z')
      var entry = {}
      entry.key = key
      entry.timestamp = ts
      entry.text = s
      this.eventlog.push(entry)
      this.scrollToEnd()
    },
    resetapp: function () {
      var self = this
      this.recommendationlistks2 = []
      this.recommendationlistks3 = []
      Object.keys(this.phenotypePanel).forEach(function (key) {
        self.phenotypePanel[key] = {}
      })
    },
    autofill: function (i) {
      this.resetapp()
      this.diplotypePanel = JSON.parse(JSON.stringify(this.patientsamples[i].diplotype))
    },
    scrollToEnd: function () {
      var container = this.$el.querySelector('#statuslog')
      container.scrollTop = container.scrollHeight
    },
    getdata: async function () {
      var self = this
      Object.keys(self.phenotypePanel).forEach(function (key) {
        self.phenotypePanel[key] = {}
      })
      try {
        const response = await fetch('/api/recommend', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            "diplotype": self.diplotypePanel
          }
          )
        });
        const result = await response.json();

        self.recommendationlistks2 = result.finalKS2
          .filter(item => typeof item === 'object' && item !== null)
          .map(item => ({ result: item }));
        self.recommendationlistks3 = result.finalKS3
          .filter(item => typeof item === 'object' && item !== null)
          .map(item => ({ result: item }));

        Object.keys(result.intermediate).forEach(function (key) {
          self.phenotypePanel[key] = result.intermediate[key]
        })
      } catch (err) {
        console.error('Fetch error:', err);
      }
    }
  }
})
