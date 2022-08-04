<!--
 * @Author: Hikari
 * @Date: 2020-04-01 13:30:19
 * @LastEditTime: 2021-04-01 13:55:53
 * @LastEditors: Please set LastEditors
 * @Description: 图片查看
 * @FilePath: /nuxt-framework/lib/components/Viewer/index.vue
-->
<template>
    <div>
        <viewer :images="photo"> 
          <img
                v-for="(src,index) in photo"
                :src="src"
                :key="index"
                :onerror="errorImg"
              >
        </viewer>
    </div>
</template>
<script>
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
export default {
    components:{
        Viewer
    },
    props:{
        photo:[],
    },
    data() {
        return {
            
        }
    },

    methods: {
        errorImg(){
            this.$emit("error")
        }
    },
}
</script>
<style lang="scss" scoped>

</style>