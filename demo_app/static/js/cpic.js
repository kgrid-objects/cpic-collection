var eventBus = new Vue()
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

Vue.directive(
  'click-outside', {
    bind: function (el, binding, vNode) {
      if (typeof binding.value !== 'function') {
        const compName = vNode.context.name
        var warn = "[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be"
        if (compName) { warn += "Found in component '${compName}'" }
        console.warn(warn)
      }
      // Define Handler and cache it on the element
      const bubble = binding.modifiers.bubble
      const handler = function (e) {
        if (bubble || (!el.contains(e.target) && el !== e.target)) {
          binding.value(e)
        }
      }
      el.__vueClickOutside__ = handler
      // add Event Listeners
      document.addEventListener('click', handler)
    },
    unbind: function (el, binding) {
      // Remove Event Listeners
      document.removeEventListener('click', el.__vueClickOutside__)
      el.__vueClickOutside__ = null
    }
  }
)
// boot up the demo
var demo = new Vue({
  el: '#app',
  data: function () {
  	return {
    initdata: {},
    patientModel: {'patient': {'name': '', 'id': 'kgrid-01', 'gender': '', 'age': '',
      'rsc': [{'type': 'Condition', text: 'Condition', count: 0, new: false},
								{'type': 'Observation', text: 'Observation', count: 0, new: false},
								{'type': 'RiskAssessment', text: 'RiskAssessment', count: 0, new: false}]}
    },
    activatorurl: {'local': 'http://localhost:8080', 'default': 'https://activator.kgrid.org', 'custom': ''},
    selectedactivator: 'local',
    activatorselection: 'local',
    options: [
        { text: 'Default', url: 'https://activator.kgrid.org', value: 'default' },
				{ text: 'Local', url: 'http://localhost:8080', value: 'local' },
        { text: 'Custom', url: '', value: 'custom'}
    ],
    recommList: [],
    modalShow: false,
    settingShow: false,
    isInit: false,
    hasError: {'gene': false, 'rec': false, 'cpic': false, 'kgrid': false},
    error404: {'gene': false, 'rec': false},
    autofillSelection: '',
    eventlog: [],
    phenoready: false,
    selecteddrugname: null,
    selectedsample: null,
    selectedgenotype: null,
    druglist: [],
    drugkolist: [],
    smart: null,
    delay: 1500,
    geneticpairs: [],
    genotypes: [],
    samples: [],
    flipped: {rec: false, pheno: false},
    genotypetemplate: {'enzyme': 'CYP2C19', 'genenamecode': '2621', 'loinccode': '79714-2', 'pair': {diplotype: '', allele1: '', allele2: ''}, 'metab': ''},
    rsctemplate: {},
    rsclist: [],
    answerlist: {},
    rscbundle: {},
    bundleentrytemplate: {},
    rawcpic: {},
    demofilter: true,
    demofiltercheck: true,

    configuration: {},
    genophenokolist: {},
    recommendationkolist: {},
    genopheno_endpoint: '/phenotype',
    recommendation_endpoint: '/dosingrecommendation',
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
      self.configuration = config.data
      self.samples = initdata.data.samples
      self.geneticpairs = initdata.data.geneticpairs
      self.listrequest = initdata.data.initrequest
      self.genophenolookupko = config.data.genophenolookupko
      self.druglookupko = config.data.druglookupko
      self.patientsamples = initdata.data.patientsamples
      self.phenotypePanel = JSON.parse(JSON.stringify(initdata.data.initrequest.diplotype))
      self.diplotypePanel = JSON.parse(JSON.stringify(initdata.data.initrequest.diplotype))
      self.genopheno_endpoint = config.data.genopheno_endpoint
      self.recommendation_endpoint = config.data.recommendation_endpoint
      initdata.data.geneticpairs.forEach(function (e) {
        var obj = JSON.parse(JSON.stringify(self.genotypetemplate))
        obj.enzyme = e.enzyme
        obj.genenamecode = e.genenamecode
        obj.loinccode = e.loinccode
        self.genotypes.push(obj)
      })
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
    baseurlhealthlink: function () {
      return this.baseUrl + '/health'
    },
    baseurlkollink: function () {
      return this.baseUrl + '/shelf'
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
    alleleInput: function () {
      var obj = {'allele1': '*1', 'allele2': '*1xN'}
      return obj
    },
    debouncegetdata: function () {
      return _.debounce(this.getdata, this.delay)
    },
    activeenzyme: function () {
      var self = this
      var arr = this.geneticpairs.filter(function (e) {
        var activeversion = e.activever
        var arr = e.versions.filter(function (el) { return el.ver == activeversion })
        if (arr.length > 0) {
          return arr[0].kolink != ''
        } else {
          return false
        }
      })
      return arr.map(function (e) { return e.enzyme })
    },
    filtereddruglist: function () {
      var self = this
      var arr = this.druglist.filter(function (e) {
        var b = false
        if (self.demofilter) {
          self.activeenzyme.forEach(function (el) {
            b = b | (e.enzyme.indexOf(el) != -1)
          })
        } else {
          b = true
        }
        return b
      })
      return arr
    },
    selectedenzymelist: function () {
      var self = this
      var d = this.druglist.filter(function (e) {
        return e.value == self.selecteddrugname
      })
      if (d.length > 0) {
        return d[0].enzyme
      } else {
        return []
      }
    },
    sortedcpicdruglist: function () {
      return this.rawcpic.druglist.sort(function (a, b) {
        if (a.value.toUpperCase() < b.value.toUpperCase()) {
    			return -1
  			}
        if (a.value.toUpperCase() > b.value.toUpperCase()) {
    			return 1
  			}
      })
    },
    rawcpiclist: function () {
      var arr = []
      var self = this
      if (this.rawcpic.druglist != undefined) {
        console.log(this.rawcpic.druglist)
        this.rawcpic.druglist.forEach(function (e) {
          e.enzyme.forEach(function (el, index) {
            var obj = {}
            obj.enzyme = el
            obj.drugname = e.value
            obj.reflink = e.reflink[index]
            obj.ko = e.kos[index]
            if (self.demofiltercheck) {
              if (self.geneticpairs.map(function (e) { return e.enzyme }).indexOf(obj.enzyme) != -1) {
                arr.push(obj)
              }
            } else {
              arr.push(obj)
            }
          })
        })
      }
      return arr
    }
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
      } else {

      }
    },
    geneticpairs: {
      handler: function (after, before) {
        var ready = true
        var self = this
        this.resetapp()
        this.geneticpairs.forEach(function (e) {
          var s = e.pair.allele1.replace('*', '')
          ready = ready && (s != '')
          s = e.pair.allele2.replace('*', '')
          ready = ready && (s != '')
        })
        if (ready) {
          this.debouncegetdata()
          if ((self.druglist.length == 0) && (this.rawcpic.druglist)) {
            this.sortedcpicdruglist.forEach(function (e) {
              var obj = e
              window.setTimeout(function () {
                self.druglist.push(e)
              }, 150)
            })
          }
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
    waitforinput: function () {
      this.delay = 1500
      this.resetapp()
      this.genotypes.forEach(function (e) {
        e.pair.diplotype = ''
        e.pair.allele1 = ''
        e.pair.allele2 = ''
        e.metab = ''
      })
    },
    modalhide: function () {
      this.modalShow = false
    },
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
        this.geneticpairs.forEach(function (e) {
          e.pair.allele1 = ''
          e.pair.allele2 = ''
        })
        this.druglist.splice(0, this.druglist.length)
        this.resetapp()
        this.appendLog('app', 'Application Event - Switched the activator to: ' + this.baseUrl)
      } else {
        this.demofilter = this.demofiltercheck
        this.appendLog('app', 'Application Event - Drug list has been filtered based on available gene information.')
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
      this.selecteddrugname = null
      this.genotypes.forEach(function (e) {
        e.metab = ''
        e.pair.diplotype = ''
        e.pair.allele1 = ''
        e.pair.allele2 = ''
      })
      this.recommList.splice(0, this.recommList.length)
      this.isInit = false
      this.hasError.rec = false
      this.hasError.gene = false
      this.error404.rec = false
      this.error404.gene = false
    },
    autofill: function (i) {
      var obj = JSON.parse(JSON.stringify(this.samples[i]))
      this.resetapp()
      this.geneticpairs.forEach(function (e) {
        e.pair.allele1 = obj[e.enzyme].allele1
        e.pair.allele2 = obj[e.enzyme].allele2
      })
      this.genotypes.forEach(function (e) {
        e.metab = ''
      })
      this.diplotypePanel = JSON.parse(JSON.stringify(this.patientsamples[i].diplotype))
    },
    scrollToEnd: function () {
      var container = this.$el.querySelector('#statuslog')
      container.scrollTop = container.scrollHeight
    },
    getdata: function () {
      var self = this
      self.hasError.gene = false
      self.error404.gene = false
      self.isInit = false
      self.genophenopromises = []
      Object.keys(self.phenotypePanel).forEach(key => {
        self.phenotypePanel[key] = ''
      })
      var i = parseInt(this.autofillSelection)
      for (var gene in self.patientsamples[i].diplotype) {
        if (self.patientsamples[i].diplotype[gene] != '' && self.genophenokolist[gene] != '') {
          self.appendLog('app', self.logtext.request + self.genophenokolist[gene])
          self.genophenopromises.push(self.postJsonReq(self.genophenokolist[gene] + self.genopheno_endpoint, self.patientsamples[i].diplotype))
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
      self.hasError.gene = false
      self.error404.gene = false
      self.isInit = false
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
