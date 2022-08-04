<!--
 * @Author: Hikari
 * @Date: 2020-04-02 08:54:27
 * @LastEditTime: 2022-08-04 20:57:31
 * @LastEditors: AkatsukiHikari 66936871+AkatsukiHikari@users.noreply.github.com
 * @Description: Table组件
 * @FilePath: /nuxt-framework/lib/components/Table/index.vue
-->
<template>
    <div class="table-container">
        <!-- <el-scrollbar wrap-class="scrollbar-wrapper" :style="tableStyle" > -->
        <a-spin :spinning="loading" :tip="loadTip">
            <el-table
                :header-cell-style="{background:'#FAFAFA'}"
                :max-height="maxHeight"
                ref="mainTable"
                :data="data"
                border
                stripe
                :fit="true"
                show-overflow-tooltip
                highlight-current-row
                style="width:100%;"
                size="medium"
                @sort-change='sortChange'
                @select="handleSelectionChange"
                @selection-change="handleSelectionChange"
            >
            <el-table-column
                v-if="showSelection && columns.length"
                type="selection"
                align="center"
                :selectable="(row)=>{return selectable? selectable(row) : true}"
                width="55">
            </el-table-column>

            <el-table-column
                v-if="showIndex && columns.length"
                label="序号"
                width="60"
                type="index"
                align="center">
            </el-table-column>

            <el-table-column
                v-for="(column , index) in columns"
                :key="index"
                :label="column.label||''"
                :prop="column.key||''"
                show-overflow-tooltip
                :sortable="sortable"
                :width="column.width || null"
                resizable
                :align="column.align || 'center'"
                :fixed="column.fixed || false"
            >
                <template slot-scope="{row}">
                    <div v-if="column.component">
                        <slot name="component">
                        </slot>
                    </div>
                    <div v-else-if="column.vhtml">
                        <div v-if="((row[`${column.key}`]) instanceof Array)">
                            <span v-for="(item , index) in row[`${column.key}`] " :key="index">
                                {{ item.gn_name ? item.gn_name : '' }}
                            </span>
                        </div>
                        <div :class="{'cell-content': autoCellHeight}"
                        v-else v-html="row[`${column.key}`]"></div>
                    </div>

                    <div v-else-if="column.type=='time'">
                        <span>{{$Time.formatDate(row[`${column.key}`])}}</span>
                    </div>


                    <div v-else-if="column.replace">
                        <div v-if="column.tag">
                            <el-tag :type="column.tag[ row[`${column.key}`] ]">
                                {{ column.replace[ row[`${column.key}`] ]  }}
                            </el-tag>
                        </div>
                        <span v-else>{{ column.replace[ row[`${column.key}`] ] }}</span>
                    </div>

                    <div v-else-if="column.btns">
                        <el-button
                            size="mini"
                            v-for="(btn, bid) in column.btns"
                            v-show="btn.visible?btn.visible(row)?true:false:true"
                            :key="bid"
                            :disabled="btn.enable?btn.enable(row)?false:true:false"
                            :type="btn.type"
                            :icon="`el-icon-${btn.icon}`"
                            @click="btn.method && btn.method(row,index)"
                            >
                                {{btn.name}}
                            </el-button>
                    </div>
                    <div v-else>
                        <div v-if="((row[`${column.key}`]) instanceof Array)">
                            <span v-for="(item , index) in row[`${column.key}`] " :key="index">
                                {{ item.gn_name ? item.gn_name : '' }}
                            </span>
                        </div>
                        <div v-else>{{row[`${column.key}`]}}</div>
                    </div>
                </template>

            </el-table-column>
            </el-table>
        </a-spin>

        <!-- </el-scrollbar> -->

        <div class="pagination">
            <pagination
                ref="tPagination"
                :limit="pageSize"
                :page='page'
                :total="total"
                @pagination="paginationHandle" />
        </div>
    </div>
</template>

<script>
import Pagination from '@/lib/components/global/Pagination'
export default {
    components:{
        Pagination,
    },
    props:{
        data:{
            type:Array,
            default:[],
        },
        // page:{
        //     type:Number,
        //     default:1,
        // },
        selectable:{
            type: Function,
            default: null,
        },
        sortable: true,
        showSelection:false,
        showIndex: false,
        columns:{
            type: Array,
            default: [],
        },
        total:0,
        autoCellHeight:{
            type: Boolean,
            default: false,
        },
        limit: {
            default: 10,
        },
        pageSize: {
            default: 10,
        },

        tableStyle:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },

    watch:{
        data(){
            this.$nextTick(()=>{
                this.doLayout();
                this.$refs.mainTable.bodyWrapper.scrollTop = 0;
            })
        }
    },

    data() {
        return {
            loading: false,
            loadTip: '加载中',
            page: 1,
        }
    },

    computed:{
        tableHeight: function () {
            return  this.tableStyle.height ? this.tableStyle.height : null;
        },
        maxHeight: function(){
            let vh = this.tableStyle.maxHeight || this.tableStyle.height || '70vh';
            let h = this.viewportToPixels( vh )
            return h
        }
    },

    methods: {
        viewportToPixels(value) {
            var parts = value.match(/([0-9\\.]+)(vh|vw)/)
            var q = Number(parts[1])
            var side = window[['innerHeight', 'innerWidth'][['vh', 'vw'].indexOf(parts[2])]]
            return side * (q/100)
        },
        /**
         * @description:
         * 模拟请求数据
         * @param {*}
         * @return {*}
         */
        fetch_start(res='加载中'){
            this.loadTip = res;
            this.loading = true;
        },

        doLayout(){
            this.$refs.mainTable.doLayout();
        },

        clearSort(){
            this.$refs.mainTable.clearSort();
        },

        //清空多选表格选中
        clearSelection(){
            this.$refs.mainTable.clearSelection();
        },

        /**
         * @description:
         * 请求完成
         * @param {*}
         * @return {*}
         */
        fetch_complete(){
            this.loading = false;
        },

        /**
         * @description:
         * 获取当前每页限制数
         * @param {*}
         * @return {*}
         */
        get_limit(){
            return this.$refs.tPagination.cum;
        },

        /**
         * @description:
         * 获取当前页
         * @param {*}
         * @return {*}
         */
        get_page(){
            return this.$refs.tPagination.page;
        },

        /**
         * @description:
         * 重置
         * @param {*}
         * @return {*}
         */
        reset(){
            this.$refs.tPagination.reset();
        },

        /**
         * @description:
         * 请求新数据
         * @param {*} pageInfo
         * @return {*}
         */
        paginationHandle( pageInfo ){
            this.$emit("pagination" , pageInfo )
        },

        setPage( page ){
          this.page = page;
          // console.error("table:setPage=>" , page , this.$refs.tPagination);
          this.$refs.tPagination.setPage(page);
        },

        handleSelectionChange(selects ,row ){
            this.$emit("selectChange" , selects,row )
        },

        sortChange(colums){
            this.$emit('sortkey',colums);
        },

        toggleRowSelection( rows ) {
            if (rows) {
                this.$nextTick(()=>{
                    rows.forEach(id => {
                        this.$refs.mainTable.toggleRowSelection(this.data.find(item=>{
                            return item.id == id;
                        }) , true);
                    });
                })
            }
        },

    },
}
</script>

<style lang="scss" scoped>
.table-container{
    width:100%;
    overflow: auto;
    .pagination{
        display: flex;
        justify-content: flex-end;
    }
}

</style>

<style lang="less" scoped>
/deep/.el-loading-spinner{
    top: 50%;
    margin-top: -21px;
    left: 50%;
    width: 100%;
    text-align: center;
    position: absolute;
}

// /deep/.cell{
// //    display: table-cell;
//    height: 142 !important;
// }

.cell-content{
    width:inherit;
    display:block;
    white-space: normal;
    // display: inline-block;
    word-wrap: break-word;
    // word-break: break-all;
}
</style>
