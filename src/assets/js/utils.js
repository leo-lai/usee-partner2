Promise.prototype.done = Promise.prototype.done || function (onFulfilled, onRejected) {
  this.then(onFulfilled, onRejected)
    .catch(function (reason) {
      // 抛出一个全局错误
      setTimeout(() => { throw reason }, 0)
    })
}
Promise.prototype.finally = Promise.prototype.finally || function (callback) {
  let P = this.constructor
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
Array.prototype.find = Array.prototype.find || function(func) {
  let returnArray = false
  for (let i=0; i<this.length; i++) {
    if (typeof(func) == 'function') {
      if (func(this[i])) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i)
      }
    } else {
      if (this[i]===func) {
        if (!returnArray) { returnArray = [] }
        returnArray.push(i)
      }
    }
  }
  return returnArray
}
Number.prototype.toMoney = function(places, symbol = '', thousand = ',', decimal = '.') {
  places = !isNaN(places = Math.abs(places)) ? places : 2
  var number = this,
    negative = number < 0 ? '-' : '',
    i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + '',
    j = (j = i.length) > 3 ? j % 3 : 0
  return symbol + negative + (j ? i.substr(0, j) + thousand : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : '')
}
/*
  对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
  可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
  eg:
  (newDate()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
  (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
  (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
  (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
  (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
*/
Date.prototype.format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
      "S": this.getMilliseconds() //毫秒 
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o){
    if (new RegExp('(' + k + ')').test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 检测设备
const ua = navigator.userAgent
const isAndroid = /(Android);?[\s\/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIpod = /(iPod)(.*OS\s([\d_]+))?/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isWechat = /micromessenger/i.test(ua)
const isWeb = !(isAndroid || isIpad || isIpod || isIphone)
const isIos = isIphone || isIpad || isIpod

function _hasClass(elem, cls) {
  if(!elem || !cls) return false
  if (cls.replace(/\s/g, '').length == 0) return false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ')
}

function _addClass(elem, cls) {
  if (elem && !_hasClass(elem, cls)) {
    elem.className = elem.className == '' ? cls : elem.className + ' ' + cls
  }
  return this
}

function _removeClass(elem, cls) {
  if (_hasClass(elem, cls)) {
    var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' '
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ')
    }
    elem.className = newClass.replace(/^\s+|\s+$/g, '')
  }
  return this
}

/*========本地存储===========*/
const STORE_PREFIX = '_usee_partner_'
export let storage = {
  getPrefix: () => STORE_PREFIX,
  cookies: {
    get(sKey) {
      if (!sKey) return null
      sKey = STORE_PREFIX + sKey
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    },
    set(sKey, sValue, vEnd = 1800, sPath = '/', sDomain = '', bSecure = false) {
      if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey))  return false

      sKey = STORE_PREFIX + sKey
      let sExpires = ''
      if (vEnd) {
        switch (vEnd.constructor) {
          case Number: // 单位秒
            sExpires = vEnd === Infinity ? '; expires=Fri, 31 Dec 9999 23:59:59 GMT' : '; max-age=' + vEnd
            break
          case String:
            sExpires = '; expires=' + vEnd
            break
          case Date:
            sExpires = '; expires=' + vEnd.toUTCString()
            break
        }
      }
      document.cookie = encodeURIComponent(sKey) + '=' + encodeURIComponent(sValue) + sExpires + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '') + (bSecure ? '; secure' : '')
      return true
    },
    remove(sKey, sPath = '/', sDomain = '') {
      if (!this.has(sKey)) return false 

      sKey = STORE_PREFIX + sKey
      document.cookie = encodeURIComponent(sKey) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' + (sDomain ? '; domain=' + sDomain : '') + (sPath ? '; path=' + sPath : '')
      return true
    },
    has(sKey) {
      if (!sKey) return false
      return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie)
    },
    keys() {
      let aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
      for (let nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) { aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]) }
      return aKeys
    }
  },
  session: {
    set(key, value = '') {
      if(!key) return false
      window.sessionStorage.setItem(STORE_PREFIX + key, JSON.stringify(value))
    },
    get(key) {
      if(!key) return ''
      return JSON.parse(window.sessionStorage.getItem(STORE_PREFIX + key))
    },
    remove(key) {
      if(!key) return false
      return window.sessionStorage.removeItem(STORE_PREFIX + key)
    }
  },
  local: {
    set(key, value = '', ms = 1000*3600*24*365) {
      if(!key) return false
      key = STORE_PREFIX + key
      let newValue = {
        value: value,
        expires: ms,
        time: new Date().getTime()
      }
      window.localStorage.setItem(key, JSON.stringify(newValue))
    },
    get(key) {
      if(!key) return ''
      key = STORE_PREFIX + key
      
      let value = JSON.parse(window.localStorage.getItem(key))
      if (value && (new Date().getTime() - value.time < value.expires)) {
        value = value.value
      }else{
        value = ''
      }
      return value
    },
    remove(key) {
      if(!key) return false
      return window.localStorage.removeItem(STORE_PREFIX + key)
    }
  }
}
/*========utils小工具===========*/
// 参考jq源码
let toptipTimeid = null
const class2type = (function(){
  let ret = {}
  'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach((name) => {
    ret[ '[object ' + name + ']' ] = name.toLowerCase();
  })
  return ret
})()
export let utils = {
  device: { 
    isAndroid,
    isIpad,
    isIpod,
    isIphone,
    isIos,
    isWechat,
    isWeb
  },
  regexp: {
    mobile: /^\s*1\d{10}\s*$/
  },
  addClass: _addClass,
  removeClass: _removeClass,
  noop(){},
  extend(target, ...objs) {
    if(!utils.isPlainObject(target)) return null
    objs.forEach((obj) => {
      if(utils.isPlainObject(obj)){
        Object.keys(obj).forEach((key)=>{
          if(obj[key] !== null && obj[key] !== undefined){
            target[key] = obj[key]
          }
        })
      }
    })
    return target
  },
  type(value) {
    //如果是null或者undefined，直接转成String返回
    if( value == null )  return String( value )
    //RegExp，Array等都属于Object
    //为了精准判断类型，借由Object.prototype.toString跟class2type表
    //这里为什么要用core_toString而不用obj.toString的原因在刚刚试验中说明了
    return typeof value === 'object' || typeof value === 'function' ?
      class2type[ class2type.toString.call(value) ] || 'object' : typeof value
  },
  isPlainObject(obj){
    // Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || utils.type(obj) !== "object" || obj.nodeType || utils.isWindow( obj ) ) {
      return false;
    }
    try {
      // Not own constructor property must be Object
      if ( obj.constructor &&
        !class2type.hasOwnProperty.call(obj, "constructor") &&
        !class2type.hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
        return false;
      }
    } catch ( e ) {
      // IE8,9 Will throw exceptions on certain host objects #9897
      return false;
    }
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    let key = undefined
    for ( key in obj ) {}
    return key === undefined || class2type.hasOwnProperty.call( obj, key );
  },
  isEmptyObject(obj) {
    for ( let key in obj ) {
      return false
    }
    return true
  },
  isFunction(obj){
    return utils.type(obj) === 'function'
  },
  isArray: Array.isArray || function(obj) {
    return utils.type(obj) === 'array'
  },
  isWindow(obj) {
    return obj != null && obj == obj.window
  },
  isString(value) {
    return typeof value === 'string'
  },
  isNumber(value) {
    return !isNaN( parseFloat(value) ) && isFinite( value )
  },
	setTitle(title) {
		document.title = title || 'Usee商城'
    // 判断是否为ios设备的微信浏览器，加载iframe来刷新title
    if (isWechat && isIphone) {
      let iframe = document.createElement('iframe')
    
      iframe.setAttribute('style','position:absolute;visibility:hidden;height:0;width:0;');
      iframe.addEventListener('load', function load() {
        iframe.removeEventListener('load', load)
        document.body.removeChild(iframe)
      })

      setTimeout(()=>{
        iframe.setAttribute('src', '//m.baidu.com/favicon.ico')
        document.body.appendChild(iframe)
      }, 650)
    }
	},
  url: {
    getArgs(url) {
      if(typeof url !== 'string') url = window.location.href
      url = decodeURIComponent(url)
      let pos = url.indexOf('?'),
        pos2 = url.lastIndexOf('#'),
        qs = pos > -1 ? url.substring(pos+1, pos2 <= pos ? url.length : pos2) : '',
        items = qs.split('&')
      let args = {},
        arg = null, 
        name = null,
        value = null
      for(let i=0, splitPos = 0, item=null; i<items.length; i++){
        item = items[i]
        splitPos = item.indexOf('=')
        name  = item.substring(0, splitPos)
        value  = item.substring(splitPos+1)
        args[name] = value
      }

      if(pos2 !== -1) {
        args['_hash'] = url.substring(pos2+1, url.length)  
      }
      
      return args
    },
    setArgs(url, name, value) {
      if(typeof url !== 'string') return ''
      if(name === undefined) return url

      let urlArgs = utils.url.getArgs(url),
          params = []

      if(utils.isPlainObject(name)){
        Object.assign(urlArgs, name)
      }else if(utils.isString(name)){
        urlArgs[name] = value
      }

      let hash = ''
      for(let key of Object.keys(urlArgs)){
        let val = urlArgs[key]
        if(val != undefined){
          if(key === '_hash'){
            hash = val
          }else{
            params.push(encodeURIComponent(key) +'=' + encodeURIComponent(val)) 
          }
        }
      }

      params.length > 0 && (url = url.split('?')[0] + '?' + params.join('&'))
      hash && (url += '#'+ hash)
      
      return url
    },
    reload(){
      window.location.replace(this.setArgs(window.location.href, 't', Date.now()))
    },
    replace(url) {
      window.location.replace(url)
    },
    assign(url) {
      window.location.assign(url)
    },
    join(...paths) {
      let passPath = []
      paths.filter((item) => utils.isString(item))
        .map((item) => {
          item = item.replace(/^\/+|\/+$/g, '')
          if(item){
            passPath.push(item)
          }
        })
      return passPath.join('/')
    }
  },
  history: {
    push(url = '', title = '') { 
      window.history.pushState({}, title,  url)
    },
    replace() {}
  },
  image: {
    thumb(src = '', width, height) {
      width = width || 320

      if(!src){ 
        return `https://placeholdit.imgix.net/~text?txtsize=20&bg=ffffff&txtclr=999&txt=image&w=${width}&h=${width}` 
      }

      if(src.indexOf('clouddn.com') === -1){
        return src
      }

      // return src += '?imageMogr2/gravity/Center/crop/'+width+'x'+height;
      src += `?imageMogr2/format/jpg/interlace/1/quality/60/gravity/Center/thumbnail/${width}x`
      if(height){
        src += `/crop/x${height}`
      }
      return src
    },
    wxHead(src, size = 132) {
      if(!src) {
        let avatar = require('assets/images/avatar.jpg')
        return avatar
      }
      if(src.indexOf('wx.qlogo.cn') === -1){
        return src
      }
      // 有0、46、64、96、132数值可选，0代表640*640正方形头像
      return src.replace(/\/0$/, '/' + size)
    }
  },
  toptip(text, ms = 3000) {
    if(!text) return
    let toptip = document.querySelector('#l-toptip')
    if(!toptip){
      toptip = document.createElement('div')
      toptip.id = 'l-toptip'
      toptip.className = 'l-toptip'
      document.body.appendChild(toptip)
    }
    
    clearTimeout(toptipTimeid)
    toptip.innerHTML = text
    toptip.classList.add('_show')
    toptipTimeid = setTimeout(function(){
      toptip.classList.remove('_show')
    }, ms)
  },
  showWaiting(text = '') {
    let waiting = document.querySelector('#l-waiting')
    if(!waiting){
      waiting = document.createElement('div')
      waiting.id = 'l-waiting'
      waiting.className = 'l-waiting'
      waiting.innerHTML = '<div class="_inner"><i class="mui-spinner"></i><p class="_txt"></p></div>'
      document.body.appendChild(waiting)
    }
    document.querySelector('#l-waiting ._txt').innerHTML = text
    waiting.classList.remove('_hide')
  },
  hideWaiting() {
    let waiting = document.querySelector('#l-waiting')
    waiting && waiting.classList.add('_hide')
  },
  convertImgToBase64(url, callback, outputFormat){
    var canvas = document.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      img = new Image
    img.crossOrigin = ''
    img.onload = function(){
      canvas.height = img.height
      canvas.width = img.width
      ctx.drawImage(img,0,0)
      var dataURL = canvas.toDataURL(outputFormat || 'image/png')
      callback.call(this, dataURL)
      canvas = null;
    }
    img.src = url
  }
}




