/*
 * @Author: Hikari
 * @Date: 2021-03-25 10:30:13
 * @LastEditTime: 2021-03-25 10:30:51
 * @LastEditors: Please set LastEditors
 * @Description: 通用正则表达式
 * @FilePath: /core/nuxt-framework/lib/external/reg.js
 */
import Vue from 'vue';

/***
 * 常用正则表达
 */
var Reg = {
    /**
     * 匹配是否是手机号
     * @param {手机号} phone
     */
    isPhone(phone){
        let rule = /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/
        return new RegExp(rule).test( phone );
    },

    /**
     * 匹配是否是邮箱
     * @param {邮箱}} mail
     */
    isMail(mail){
        let rule = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return new RegExp(rule).test(mail);
    },

    /**
     * 匹配是否是身份证（支持1、2代 15位和18位）
     * @param {身份证} number
     */
    isIDCardNumber( number ){
        let rule = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0[1-9]|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
        return new RegExp(rule).test( number );
    },

    /**
     * 匹配是否为二代身份证
     * @param {身份证} number
     */
    isSecondIdNumber(number){
        let rule = /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/
        return new RegExp(rule).test(number);
    },

    /**
     * 是否全是数字
     * @param {文本} str
     */
    isNumber( str ){
        let rule = /^\d{1,}$/
        return new RegExp(rule).test(str);
    },

    /**
     * 检测是否由数字和字母构成
     * @param {文本} s
     */
    isNumberOrLetter(s){
        let rule = /^[A-Za-z0-9]+$/
        return new RegExp(rule).test(s);
    },

    /**
     * 检测由数字和字母组成 并同时数字和字母
     * @param {文本} s
     */
    isNumberAndLetter(s){
        let rule =  /^(?=.*[a-zA-Z])(?=.*\d).+$/;
        return new RegExp(rule).test(s);
    },

    /**
     * 检测是否是日期
     * @param {日期} date
     */
    isDate( date ){
        let rule = /^\d{4}(-)(1[0-2]|0?\d)\1([0-2]\d|\d|30|31)$/
        return new RegExp (rule).test(date);
    },

    /**
     * 检测是否是时间格式  12小时制
     * @param {时间} time
     */
    isTime12( time ){
        let rule = /^(?:1[0-2]|0?[1-9]):[0-5]\d:[0-5]\d$/
        return new RegExp(rule).test(time);
    },

    /**
     * 检测是否为时间格式  24小时制
     * @param {时间} time
     */
    isTime24(time){
        let rule = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/
        return new RegExp(rule).test(time);
    },

    /**
     * 检测是否是8位数字组成
     * @param {时间} time
     */
    isNumberLen(time){
        let rule = /^\d{8}$/
        return new RegExp(rule).test(time);
    }
};

Vue.prototype.$reg = Reg;
