<!--
 * @Author: Hikari
 * @Date: 2020-03-31 19:09:46
 * @LastEditTime: 2021-04-22 22:14:23
 * @LastEditors: Please set LastEditors
 * @Description: 分割面板 用于多面板对比
 * @FilePath: /nuxt-framework/lib/components/Splitpane/index.vue
-->
<template>
    <div class="split-pane">
        <split-pane 
            :split="split" 
            @resize="resize"
        >
            <template slot="paneL">
                <slot name="partL" />
            </template>

            <template slot="paneR">
                <slot name="partR" />
            </template>
        </split-pane>
    </div>
</template>
<script>
import splitPane from 'vue-splitpane'
export default {
    components:{
        splitPane,
    },
    props:{
    },
    data() {
        return {
            split: 'horizontal' //'vertical'
        }
    },
    methods: {
        resize() {
            this.$emit("resize");
        }
    },
}
</script>

<style lang="scss" scoped>
.split-pane{
    width:100%;
    height: 100%;
}
</style>