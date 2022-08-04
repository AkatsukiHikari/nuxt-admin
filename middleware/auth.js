/**
 * @description:
 * 路由鉴权中间件，实现其他路由守卫功能请新建一个中间件
 * @param {*}
 * @return {*}
 */
 import Cookie from '@/lib/utils/cookie'
 import {check} from '@/lib/utils/external/permissions'
 const DESKTOP_URI = process.env.CLOUD_DESKTOP_URI
 const SSO_SERVICE = process.env.CLOUD_SSO_SERVICE

 export default async( {store, redirect, env, route} ) =>{
     if( process.server ){
         return
     }

     let PASSID = Cookie.getCookie('PSSID')
     if( !PASSID ){
        window.location = `${SSO_SERVICE}?redirect=${DESKTOP_URI}`;
     }
 }
