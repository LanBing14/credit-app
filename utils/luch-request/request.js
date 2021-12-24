/**
 * Request 1.0.5
 * @Class Request
 * @description luch-request 1.0.4 http请求插件
 * @Author lu-ch
 * @Date 2019-12-12
 * @Email webwork.s@qq.com
 * http://ext.dcloud.net.cn/plugin?id=392
 */
export default class Request {
    config = {
      baseUrl: '',
      header: {
        'content-type': 'application/json;charset=UTF-8;',
        'Cookie': "auth-token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YjUyNjdmZS04ZGFjLTQ0YzktODExZi00MDdjYjMxYzgxODgiLCJ1c2VySWQiOiI4YjUyNjdmZS04ZGFjLTQ0YzktODExZi00MDdjYjMxYzgxODgiLCJ1c2VyTmFtZSI6IlRvdXJpc3QiLCJjb21wYW55SWQiOiIiLCJjdXN0b21lclJvbGVJZCI6IiIsInVzZXJUeXBlIjoidG91cmlzdCIsImlhdCI6MTYzODQzMTUzOH0.qn94bhf5pZIn01yv6zxhG6ulJS_6_u7y4cObKqXB8wA; auth-tourist=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YjUyNjdmZS04ZGFjLTQ0YzktODExZi00MDdjYjMxYzgxODgiLCJ1c2VySWQiOiI4YjUyNjdmZS04ZGFjLTQ0YzktODExZi00MDdjYjMxYzgxODgiLCJ1c2VyTmFtZSI6IlRvdXJpc3QiLCJjb21wYW55SWQiOiIiLCJjdXN0b21lclJvbGVJZCI6IiIsInVzZXJUeXBlIjoidG91cmlzdCIsImlhdCI6MTYzODQzMTUzOH0.qn94bhf5pZIn01yv6zxhG6ulJS_6_u7y4cObKqXB8wA; TS017c0417=01b7e1397066cffc52414aeab9f832c629e5a325fda9aeeebab2a0352e02e9a70eec9161dd992c587b00553850de58fc08b9ac677c; TS01e36f79=01b7e13970fb9e0f31d48c43ccfe0b34fba323a83ccf192675cefdc0008036ed54e0d54a3ceca992fdb5c14ccabf648e8c9fa7410e"
      },
      method: 'GET',
      dataType: 'json',
      // #ifndef MP-ALIPAY || APP-PLUS
      responseType: 'text',
      // #endif
      custom: {},
      // #ifdef MP-ALIPAY
      timeout: 30000,
      withCredentials: false,
      // #endif
      // #ifdef APP-PLUS
      sslVerify: true
      // #endif
    }

    static posUrl (url) { /* 判断url是否为绝对路径 */
      return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
    }

    static addQueryString (params) {
      let paramsData = ''
      Object.keys(params).forEach(function (key) {
        paramsData += key + '=' + encodeURIComponent(params[key]) + '&'
      })
      return paramsData.substring(0, paramsData.length - 1)
    }

    /**
     * @property {Function} request 请求拦截器
     * @property {Function} response 响应拦截器
     * @type {{request: Request.interceptor.request, response: Request.interceptor.response}}
     */
    interceptor = {
      /**
         * @param {Request~requestCallback} cb - 请求之前拦截,接收一个函数（config, cancel）=> {return config}。第一个参数为全局config,第二个参数为函数，调用则取消本次请求。
         */
      request: (cb) => {
        if (cb) {
          this.requestBeforeFun = cb
        }
      },
      /**
         * @param {Request~responseCallback} cb 响应拦截器，对响应数据做点什么
         * @param {Request~responseErrCallback} ecb 响应拦截器，对响应错误做点什么
         */
      response: (cb, ecb) => {
        if (cb && ecb) {
          this.requestComFun = cb
          this.requestComFail = ecb
        }
      }
    }

    requestBeforeFun (config) {
      return config
    }

    requestComFun (response) {
      return response
    }

    requestComFail (response) {
      return response
    }

    /**
     * 自定义验证器，如果返回true 则进入响应拦截器的响应成功函数(resolve)，否则进入响应拦截器的响应错误函数(reject)
     * @param { Number } statusCode - 请求响应体statusCode（只读）
     * @return { Boolean } 如果为true,则 resolve, 否则 reject
     */
    validateStatus (statusCode) {
      return statusCode === 200
    }

    /**
     * @Function
     * @param {Request~setConfigCallback} f - 设置全局默认配置
     */
    setConfig (f) {
      this.config = f(this.config)
    }

    /**
     * @Function
     * @param {Object} options - 请求配置项
     * @prop {String} options.url - 请求路径
     * @prop {Object} options.data - 请求参数
     * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
     * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
     * @prop {Object} [options.header = config.header] - 请求header
     * @prop {Object} [options.method = config.method] - 请求方法
     * @returns {Promise<unknown>}
     */
    async request (options = {}) {
      options.baseUrl = this.config.baseUrl
      options.dataType = options.dataType || this.config.dataType
      // #ifndef MP-ALIPAY || APP-PLUS
      options.responseType = options.responseType || this.config.responseType
      // #endif
      // #ifdef MP-ALIPAY
      options.timeout = options.timeout || this.config.timeout
      // #endif
      options.url = options.url || ''
      options.data = options.data || {}
      options.params = options.params || {}
      options.header = options.header || this.config.header
      options.method = options.method || this.config.method
      options.custom = { ...this.config.custom, ...(options.custom || {}) }
      // #ifdef APP-PLUS
      options.sslVerify = options.sslVerify === undefined ? this.config.sslVerify : options.sslVerify
      // #endif
      return new Promise((resolve, reject) => {
        let next = true
        let handleRe = {}
        options.complete = (response) => {
          response.config = handleRe;
          console.info(response);
          if (this.validateStatus(response.statusCode)) {
            // 成功
            resolve(response);
          } else {
            reject(response)
          }
        }
        const cancel = (t = 'handle cancel', config = options) => {
          const err = {
            errMsg: t,
            config: config
          }
          reject(err)
          next = false
        }

        handleRe = { ...this.requestBeforeFun(options, cancel) }
        const _config = { ...handleRe }
        if (!next) return
        delete _config.custom
        let mergeUrl = Request.posUrl(_config.url) ? _config.url : (_config.baseUrl + _config.url)
        if (JSON.stringify(_config.params) !== '{}') {
          const paramsH = Request.addQueryString(_config.params)
          mergeUrl += mergeUrl.indexOf('?') === -1 ? `?${paramsH}` : `&${paramsH}`
        }
        _config.url = mergeUrl
        uni.request(_config)
      })
    }

    get (url, options = {}) {
      return this.request({
        url,
        method: 'GET',
        ...options
      })
    }

    post (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'POST',
        ...options
      })
    }

    // #ifndef MP-ALIPAY
    put (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'PUT',
        ...options
      })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
    delete (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'DELETE',
        ...options
      })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN
    connect (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'CONNECT',
        ...options
      })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
    head (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'HEAD',
        ...options
      })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN || MP-BAIDU
    options (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'OPTIONS',
        ...options
      })
    }

    // #endif

    // #ifdef APP-PLUS || H5 || MP-WEIXIN
    trace (url, data, options = {}) {
      return this.request({
        url,
        data,
        method: 'TRACE',
        ...options
      })
    }

    // #endif

    upload (url, {
      // #ifdef APP-PLUS
      files,
      // #endif
      // #ifdef MP-ALIPAY
      fileType,
      // #endif
      filePath,
      name,
      header,
      formData,
      custom
    }) {
      return new Promise((resolve, reject) => {
        let next = true
        let handleRe = {}
        const globalHeader = { ...this.config.header }
        delete globalHeader['content-type']
        const pubConfig = {
          baseUrl: this.config.baseUrl,
          url,
          // #ifdef APP-PLUS
          files,
          // #endif
          // #ifdef MP-ALIPAY
          fileType,
          // #endif
          filePath,
          method: 'UPLOAD',
          name,
          header: header || globalHeader,
          formData,
          custom: { ...this.config.custom, ...(custom || {}) },
          complete: (response) => {
            response.config = handleRe
            if (response.statusCode === 200) { // 成功
              response = this.requestComFun(response)
              resolve(response)
            } else {
              response = this.requestComFail(response)
              reject(response)
            }
          }
        }
        const cancel = (t = 'handle cancel', config = pubConfig) => {
          const err = {
            errMsg: t,
            config: config
          }
          reject(err)
          next = false
        }

        handleRe = { ...this.requestBeforeFun(pubConfig, cancel) }
        const _config = { ...handleRe }
        if (!next) return
        delete _config.custom
        _config.url = Request.posUrl(_config.url) ? _config.url : (_config.baseUrl + _config.url)
        uni.uploadFile(_config)
      })
    }
}
