/*
 * @Author: Hikari
 * @Date: 2021-03-25 10:41:16
 * @LastEditTime: 2021-03-25 10:41:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /core/nuxt-framework/plugins/math.js
 */
import Vue from 'vue';

/**
 * 数学类库
 */
var iMath = {
    /**
     * 获取 0-1的随机数 [0,1)
     */
    getRandom01(){
        return Math.random();
    },

    /**
     * 返回 min-max随机数 [min , max)
     * @param {} min
     * @param {*} max
     */
    getRandomBetween(min, max){
        return Math.random() * (max - min) + min;
    },

    /**
     * 返回 0-max的随机数 [0 , max)
     * @param {*} max
     */
    getRandom0max( max ){
        return Math.random() * max;
    },

    /**
     * 返回0-max的 随机整数 [0,max)
     * @param {*} max
     */
    getRandomInt0max( max ){
        return Math.floor(Math.random() * (max));
    },

    /**
     * 返回一个随机整数
     */
    getRandomInt(){
        return Math.floor( -Math.random() * -0x80000000);
    },

    /**
     * 返回 min-max的随机整数
     * @param {*} min
     * @param {*} max
     */
    getRandomIntBetween(min , max ){
        return Math.floor(Math.random()* (max-min) + min);
    }
};

Vue.prototype.$math = iMath;
