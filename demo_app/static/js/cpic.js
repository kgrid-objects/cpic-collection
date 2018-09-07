// define the item component
Vue.component('recomtile', {
  template: '#recomtile-template',
  props: [
  	'recmodel',
    'reckey',
    'recindex'
  ],
  computed: {
    recommendation: function () {
      var k = 'Dosing recommendations'
      return this.recmodel[k]
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#app',
  data: function () {
  	return {
    initdata: {},
    activatorurl: {'local': 'http://localhost:8080', 'default': 'https://activator.kgrid.org', 'custom': ''},
    selectedactivator: 'local',
    activatorselection: 'local',
    options: [
        { text: 'Default', url: 'https://activator.kgrid.org', value: 'default' },
				{ text: 'Local', url: 'http://localhost:8080', value: 'local' },
        { text: 'Custom', url: '', value: 'custom'}
    ],
    settingShow: false,
    autofillSelection: '',
    eventlog: [],
    phenoready: false,
    delay: 1500,
    genophenokolist: {},
    recommendationkolist: {},
    genopheno_endpoint: '',
    recommendation_endpoint: '',
    listrequest: {},
    genophenolookupko: {},
    druglookupko: {},
    logtext: {'request': 'K-GRID Service Request - Sending request to Knowledge Object ark:', 'response': ''},
    patientsamples: [],
    genophenopromises: [],
    drugpromises: [],
    phenotypePanel: {},
    diplotypePanel: {},
    currentstatus: '',
    recommendationlist: {}
	  }
  },
  created: function () {
    var self = this
    var dict = ['TBD', 'Likely Poor', 'Poor', 'Likely Intermediate', 'Intermediate', 'Normal', 'Rapid', 'Ultrarapid']
    axios.all([
      axios.get('./static/json/initdata.json'),
      axios.get('./static/json/config.json')
    ]).then(axios.spread(function (initdata, config) {
			  self.appendLog('app', 'Application Event - Loading Configuration...')
		    self.appendLog('app', 'Application Event - Loading Initial Data...')
      self.initdata = initdata.data
      self.listrequest = initdata.data.initrequest
      self.genophenolookupko = config.data.genophenolookupko
      self.druglookupko = config.data.druglookupko
      self.patientsamples = initdata.data.patientsamples
      self.phenotypePanel = JSON.parse(JSON.stringify(initdata.data.initrequest.diplotype))
      self.diplotypePanel = JSON.parse(JSON.stringify(initdata.data.initrequest.diplotype))
      self.genopheno_endpoint = config.data.genopheno_endpoint
      self.recommendation_endpoint = config.data.recommendation_endpoint
      axios.all([
        self.getdruglist,
        self.getg2pkolist
		 	  ]).then(axios.spread(function (druglist, genophenolist) {
     self.appendLog('app', self.logtext.request + self.genophenolookupko.id)
     self.appendLog('app', 'K-GRID Service Response - Geno to Pheno KO list returned from Knowledge Object ark:' + self.genophenolookupko.id)
				  	self.appendLog('app', self.logtext.request + self.druglookupko.id)
     self.appendLog('app', 'K-GRID Service Response - Gene drug table returned from Knowledge Object ark:' + self.druglookupko.id)
     self.recommendationkolist = druglist.data.result
     self.genophenokolist = genophenolist.data.result
   })).catch(function (error) {
     console.log(error)
   })
    })).catch(function (error) {
      console.log(error)
    })
  },
  computed: {
    baseUrl: function () {
      return this.activatorurl[this.selectedactivator]
    },
    getdruglist: function () {
      return 	axios(
        {	'url': this.baseUrl + this.druglookupko.id + this.druglookupko.endpoint,
          'method': 'POST',
          'headers': {
            'content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          },
          'data': this.listrequest.prescriptions
										 })
    },
    getg2pkolist: function () {
      return 	axios(
 												{	'url': this.baseUrl + this.genophenolookupko.id + this.genophenolookupko.endpoint,
 												'method': 'POST',
 												'headers': {
 													'content-type': 'application/json',
 													'Access-Control-Allow-Origin': '*'
 												},
 												'data': this.listrequest.diplotype
 										 })
    },
    debouncegetdata: function () {
      return _.debounce(this.getdata, this.delay)
    },
  },
  watch: {
    autofillSelection: function () {
      var self = this
      this.phenoready = false
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
        for(var key in this.diplotypePanel){
          ready = ready || (this.diplotypePanel[key] != '')
        }
        if (ready) {
          this.debouncegetdata()
        }
      },
      deep: true
    },
    phenoready: function () {
      console.log('phenoready changed to ' + this.phenoready)
      if (this.phenoready) {
        this.getrecommendation()
      }
    }
  },
  methods: {
    showsetting: function () {
      this.settingShow = true
      this.activatorselection = this.selectedactivator
    },
    savesetting: function () {
      var temp = this.selectedactivator
      this.selectedactivator = this.activatorselection
      this.settingShow = false
      if (this.activatorselection != temp) {
        this.autofillSelection = ''
        this.resetapp()
        this.appendLog('app', 'Application Event - Switched the activator to: ' + this.baseUrl)
      }
    },
    appendLog: function (key, s) {
      var ts = moment().format('ddd, MMM Do YYYY, h:mm:ss A Z')
      var entry = {}
      entry.key = key
      entry.timestamp = ts
      entry.text = s
      this.eventlog.push(entry)
      this.scrollToEnd()
      this.currentstatus = s
    },
    resetapp: function () {
      this.phenoready = false
      this.recommendationlist ={}
      Object.keys(this.phenotypePanel).forEach(key => {
        this.phenotypePanel[key] = ''
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
    getdata: function () {
      var self = this
      self.genophenopromises = []
      Object.keys(self.phenotypePanel).forEach(key => {
        self.phenotypePanel[key] = ''
      })
      var i = parseInt(this.autofillSelection)
      for (var gene in self.patientsamples[i].diplotype) {
        if (self.patientsamples[i].diplotype[gene] != '' && self.genophenokolist[gene] != '') {
          self.appendLog('app', self.logtext.request + self.genophenokolist[gene])
          self.genophenopromises.push(self.postJsonReq(self.genophenokolist[gene] + self.genopheno_endpoint, self.diplotypePanel))
        }
      }
      axios.all(self.genophenopromises).then(function (results) {
        results.forEach(function (r) {
          console.log('pheno:')
          console.log(r)
          var phenotype = r.data.result
          Object.keys(phenotype).forEach(key => {
            self.phenotypePanel[key] = phenotype[key]
            self.appendLog('app', 'K-GRID Service Response - Phenotype result for ' + key + ' returned from ark:/' + r.data.info.ko)
          })
        })
      }).then(function () {
        var ready = false
        Object.keys(self.phenotypePanel).forEach(key => {
          ready = ready || (self.phenotypePanel[key] != '')
        })
        self.phenoready = ready
      }).catch(error => {
        console.log(error)
      })
    },
    getrecommendation: function () {
      var self = this
      self.drugpromises = []
      self.recommendationlist = {}
      var i = parseInt(this.autofillSelection)
      for (var drug in self.recommendationkolist) {
        if (self.recommendationkolist[drug] != '') {
          self.appendLog('app', self.logtext.request + self.recommendationkolist[drug])
          self.drugpromises.push(self.postJsonReq(self.recommendationkolist[drug] + self.recommendation_endpoint, self.phenotypePanel))
        }
      }
      axios.all(self.drugpromises).then(function (results) {
        results.forEach(function (r) {
          console.log('Drug:')
          console.log(r)
          var rec = r.data.result
          if (typeof (rec) === 'object') {
            Object.keys(rec).forEach(key => {
              self.recommendationlist[key] = rec[key]
              self.appendLog('app', 'K-GRID Service Response - Recommendation result for ' + key + ' returned from ark:/' + r.data.info.ko)
            })
          } else {
            self.appendLog('app', 'K-GRID Service Response - ' + rec + ' for ark:/' + r.data.info.ko)
          }
        })
      }).catch(error => {
        console.log(error)
      })
    },
    postJsonReq: function (path, data) {
      return axios({
        method: 'post',
        url: this.baseUrl + path,
        headers: {'Content-Type': 'application/json'},
        data: data
      })
    }
  }
})
