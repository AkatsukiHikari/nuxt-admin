import Vue from 'vue'
import qs from 'qs'

export default ({ $axios , store , redirect, error}) =>{
    $axios.onRequest(config => {
        config.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' });
        return config;
    });

    /**
     * @description:
     * 网络请求错误时
     * @param {*}
     * @return {*}
     */
    $axios.onError((err) => {
        if(process.client){
            let resp = error.response
            // let data = resp.data

            // Vue.$notify.error({
            //   title: data.code || resp.status,
            //   message: data.msg || data.payload
            // })

            if (resp && resp.status == 401) {
                // 没有权限，执行一次logout，然后重新登录
                store.commit('logout')
            }
        }else{
            console.log('error', error)
        }

        return Promise.reject(error)
    })



    /**
     * @description:
     * request interceptor
     * @param {*}
     * @return {*}
     */
    $axios.interceptors.request.use(config => {
        const token = store.state.user.token;
        if (token) {
            config.headers['token'] = token
        }
        return config
    })

    /**
     * @description:
     * 返回数据拦截器校验
     * @param {*}
     * @return {*}
     */
    $axios.interceptors.response.use(res=>{
        let data = res.data;
        let code = data.code;
        // debugger
        if(  code == 403 ){
            // token过期 未登录
            window.location = `${process.env.CLOUD_SSO_SERVICE}?redirect=${window.location.href}`

            return Promise.reject()
        }
        else if( code == 401  ){
            //没有权限
            return error({
                statusCode: 401,
                message: '抱歉，您没有权限访问此页面'
            })
        }
        else{
            return res.data
        }
    })

}
