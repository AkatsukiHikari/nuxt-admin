/*
 * @Author: Hikari
 * @Date: 2020-03-26 11:05:07
 * @LastEditTime: 2021-12-15 21:52:25
 * @LastEditors: Please set LastEditors
 * @Description: RESTFUL_API
 * @FilePath: /core/nuxt-framework/plugins/api.js
 */
import Vue from 'vue'

export default function ({ $axios , store }){
    const api = {
        /**
         * @description:
         * 请求数据
         * @param {*} url
         * @return {*}
         */
        get( url , data) {
            return $axios.get( url , {
                params: data
            })
        },

        /**
         * @description:
         * 创建数据
         * @param {*} url
         * @param {*} params
         * @return {*}
         */
        post( url , params ){
            return $axios.post( url , params)
        },

        /**
         * @description:
         * 更新数据
         * @param {*} url
         * @param {*} params
         * @return {*}
         */
        update( url , params ){
            return $axios.put( url , params )
        },

        /**
         * @description:
         * 删除请求
         * @param {*} url
         * @return {*}
         */
        delete( url ,params = {}){
            return $axios.delete( url ,{data:params})
        }
    }

    Vue.prototype.$api =  api
}
