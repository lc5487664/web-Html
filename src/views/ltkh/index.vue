<template>
    <div class="ltkh-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item>干部立体考核</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>

        <div class="content">
            <div class="content-left">
                <div class="content-box">
                    <div class="content-box-title">
                        省高质量发展综合绩效考核
                    </div>
                    <div class="jxkh">
                        <div class="jxkh-ztqk-title">整体情况</div>
                        <div class="jxkh-content">
                            省考核81项二级指标中（党的建设指标16项，经济社会发展指标65项），填报统计数据的74项，有69项指标分值可以预估，总体预估分值897.21分；未填报统计数据7项，填报统计数据的74项中:
                        </div>
                        <div class="normal jxkh-content-item">29项指标排名青岛之前</div>
                        <div class="normal jxkh-content-item">29项指标排名青岛之后</div>
                        <div class="warning jxkh-content-item">34项指标居全省前三位</div>
                        <div class="error jxkh-content-item">7项指标居全省后五位</div>
                        <div class="ygpm">
                            <div class="ygpm-item">
                                <div class="item-title">考核组内预估排名</div>
                                <div class="item-num">2</div>
                            </div>
                            <div class="ygpm-item">
                                <div class="item-title">考核组内预估排名</div>
                                <div class="item-num">2</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box" style="margin-top:10px;height:435px">
                    <div class="content-box-title">
                        三书记考核
                    </div>
                    <div class="tab">
                        <div class="tab-label" :class="index === selectSsjKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['区县委书记', '镇(街道)党(工)委书记', '村(社区)党组织书记']" :key="item" @click="selectSsjKey = index">{{ item }}</div>
                    </div>
                </div>
            </div>
            <div class="content-box content-center">
                <div class="ldbz">
                    <div class="ldbz-title">领导班子考核成绩单</div>
                    <ldbz-bar></ldbz-bar>
                    <div class="ldbz-title" style="margin-bottom:10px">领导干部考核成绩单</div>
                </div>
                <div class="">
                    <div class="min-title">连续近两年获得优秀等次人员</div>
                    <table class="ldgb-table">
                        <tr>
                            <td>单位</td>
                            <td>姓名</td>
                            <td>职务</td>
                        </tr>
                        <tr v-for="item in ldgbData" :key="item.xm">
                            <td>{{ item.dw }}</td>
                            <td>{{ item.xm }}</td>
                            <td>{{ item.zw }}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="content-right">
                <div class="content-box" style="height:490px">
                    <div class="content-box-title">
                        公务员考核
                    </div>
                    <div class="tab">
                        <div class="tab-label" :class="index === selectgwykhKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['日常考核', '年度考核']" :key="item" @click="selectgwykhKey = index">{{ item }}</div>
                    </div>
                </div>
                <div class="content-box" style="margin-top:10px;height:440px">
                    <div class="content-box-title">
                        全市重点工作信息系统链接
                    </div>
                    <table class="xtlj-table">
                        <tr>
                            <td>区县</td>
                            <td>GDP</td>
                            <td>规上工业<br/>增加值</td>
                            <td>固定资产<br/>投资</td>
                            <td>社会消费品<br/>零售总额</td>
                            <td>进出口<br/>总额</td>
                            <td>居民<br/>收入</td>
                        </tr>
                        <tr v-for="item in xtljData" :key="item.qx">
                            <td>{{ item.qx }}</td>
                            <td>{{ item.gdp }}</td>
                            <td>{{ item.gyzjz }}</td>
                            <td>{{ item.gdzc }}</td>
                            <td>{{ item.lsze }}</td>
                            <td>{{ item.jckze }}</td>
                            <td>{{ item.jmsr }}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import ldbzBar from './comp/ldbzBar.vue'
import ltkhJson from '../../../public/staticData/gbltkh.json'
    export default {
        name: 'ltkh-container-view',
        components: {
            headerBg,
            ldbzBar
        },
        data() {
            return {
                key: 1,
                selectSsjKey: 0,
                selectgwykhKey: 0,
                ldgbData: [],
                xtljData: []
            }
        },
        created () {
            this.init();
        },
        methods: {
            init() {
                this.ldgbData = ltkhJson.ldgbcjd
                this.xtljData = ltkhJson.xtlj
            }
        },
    }
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-size: 16px;
    .content-left {
        margin-right: 10px;
        width: 570px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content-center {
       width: 690px;
       padding-left: 25px;
       padding-right: 25px;
    }
    .content-right {
        width: 570px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }
}
.jxkh {
    padding: 10px;
    .jxkh-ztqk-title {
        height: 40px;
        line-height: 40px;
        width: 530px;
        text-align: center;
        background: url('@/assets/img/ztqk-bg.png') no-repeat;
        background-size: 530px 40px;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .jxkh-content {
        text-indent: 32px;
        line-height: 20px;
    }
    .jxkh-content-item {
       margin-top: 20px; 
       padding: 10px 20px;
    }
    .normal {
        background-color: #03536a;
    }
    .warning {
        background-color: #50391f;
    }
    .error {
        background-color: #500b1d;
    }
    .ygpm {
        display: flex;
        margin-top: 20px;
        .ygpm-item {
            margin-left: 10px;
            width: 250px;
            text-align: center;
            .item-title {
                background-color: #0d4e65;
                height: 25px;
                line-height: 25px;
            }
            .item-num {
                color: #00f6ff;
                font-size: 30px;
                font-weight: bolder;
                background-color: #10263e;
                height: 60px;
                line-height: 60px;
            }
        }
    }
}
.tab {
    height: 100%;
    display: flex;
    .tab-label {
        height: 33px;
        width: 160px;
        line-height: 33px;
        text-align: center;
        margin: 10px;
        cursor: pointer;
       
    }
    .is-selectd {
        background: url('@/assets/img/ltpy/tab-active.png') no-repeat;
        color: #00f6ff;
        background-size: 160px 33px
    }
    .no-selctd {
        background: url('@/assets/img/ltpy/tab.png') no-repeat;
        color: #027a94;
        background-size: 160px 33px
    }
}
.ldbz {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
}
.ldbz-title {
        width: 450px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: url('@/assets/img/ltpy/pxrw-wcqk-title.png') no-repeat;
        background-size: 450px 50px;
        color: #00f6ff;
        font-size: 24px;
        font-weight: bolder;
        margin-bottom: 30px;
    }
.ldgb-table {
    tr {
        td {
           padding: 10px;
           letter-spacing: 2px;
        }
        td:nth-child(1) {
            width: 250px;
        }
        td:nth-child(2) {
            width: 150px;
        }
        td:nth-child(3) {
            width: 350px;
        }
    }
    tr:nth-child(1) {
        td {
            font-weight: bolder;
        }
    }
    tr:nth-child(2n+1) {
        td {
            background-color: #042644;
        }
    }
}
.xtlj-table {
    tr {
        td {
            text-align: center;
            padding-top: 5px;
            padding-bottom: 7px;
        }
        td:nth-child(1) {
            letter-spacing: 2px;
        }
    }
    tr:nth-child(1) {
        td {
            font-weight: bolder;
            padding: 10px 3px;
            line-height: 20px;
            letter-spacing: 2px;
            vertical-align: middle;
        }
    }
    tr:nth-child(2n+1) {
        td {
            background-color: #042644;
        }
    }
}
</style>