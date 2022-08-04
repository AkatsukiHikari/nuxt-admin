/*
 * @Author: Hikari
 * @Date: 2020-04-01 10:44:20
 * @LastEditTime: 2021-04-01 11:11:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /nuxt-framework/lib/utils/cookie.js
 */
import Cookie from 'js-cookie'

export default {
    setCookie(key , value){
        Cookie.set(key , value);
    },

    removeCookie(key){
        Cookie.remove( key );
    },

    getCookie(key){
        return Cookie.get( key ) || '';
    },


    getcookiesInServer:function (req) {
        let service_cookie = {};
        req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {

            let parts = val.split('=');
            service_cookie[parts[0].trim()] = (parts[1] || '').trim();
        });

        return service_cookie;
    },

}
