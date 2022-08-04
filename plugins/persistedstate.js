/*
 * @Author: Hikari
 * @Date: 2021-03-24 08:56:01
 * @LastEditTime: 2021-03-25 13:24:58
 * @LastEditors: Please set LastEditors
 * @Description: 数据持久化
 * @FilePath: /core/nuxt-framework/plugins/persistedstate.js
 */

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    createPersistedState({
        storage: sessionStorage
    })(store)
}
