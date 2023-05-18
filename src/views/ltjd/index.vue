<template>
    <div class="ltjd-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item>干部立体监督</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>
        <div class="content">
            <div class="content-left">
                <div class="content-box">
                    <div class="content-box-title">
                        信访举报监督
                    </div>
                    <div>
                        <xfjb-bar></xfjb-bar>
                        <div class="wt">
                            <div class="wt-item">
                                <ul>
                                    <li>选人用人问题</li>
                                    <li>不担当不作为问题</li>
                                    <li>违反政治纪律问题</li>
                                    <li>违反廉洁纪律问题</li>
                                </ul>
                                <ul>
                                    <li>{{ totalData.jlwt[0] }}</li>
                                    <li>{{ totalData.jlwt[1] }}</li>
                                    <li>{{ totalData.jlwt[2] }}</li>
                                    <li>{{ totalData.jlwt[3] }}</li>
                                </ul>
                            </div>
                            <div class="wt-item">
                                <ul>
                                    <li>违反工作纪律问题</li>
                                    <li>违反群众纪律问题</li>
                                    <li>违反生活纪律问题</li>
                                    <li style="line-height:20px">违反其他组织纪律<br/>程序问题</li>
                                </ul>
                                <ul>
                                    <li>{{ totalData.jlwt[4] }}</li>
                                    <li>{{ totalData.jlwt[5] }}</li>
                                    <li>{{ totalData.jlwt[6] }}</li>
                                    <li>{{ totalData.jlwt[7] }}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box" style="margin-top:10px;margin-bottom:10px">
                    <div class="content-box-title">
                        选人用人监督
                    </div>
                    <div style="display:flex">
                        <div class="jcqk">
                            <div class="min-title">检查情况</div>
                            <jcqk-pie></jcqk-pie>
                        </div>
                        <div class="sblq">
                            <div class="min-title">四把利器</div>
                            <div style="display:flex;flex-direction: row;flex-wrap: wrap;">
                                <div class="sblq-item mb-10">
                                    <div class="sblq-item-num">{{totalData.sblq[1]}}人次</div>
                                    <img src="@/assets/img/sblq-item-bg1.png" alt="">
                                    <div>约谈</div>
                                </div>
                                <div class="sblq-item  mb-10">
                                    <div class="sblq-item-num">{{totalData.sblq[1]}}人次</div>
                                    <img src="@/assets/img/sblq-item-bg2.png" alt="">
                                    <div>督办</div>
                                </div>
                                <div class="sblq-item">
                                    <div class="sblq-item-num">{{totalData.sblq[2]}}人次</div>
                                    <img src="@/assets/img/sblq-item-bg3.png" alt="">
                                    <div>问责</div>
                                </div>
                                <div class="sblq-item">
                                    <div class="sblq-item-num">{{totalData.sblq[3]}}人次</div>
                                    <img src="@/assets/img/sblq-item-bg4.png" alt="">
                                    <div>通报</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box">
                    <div class="content-box-title">
                        经责审计监督
                    </div>
                    <div style="display:flex">
                        <div>
                            <div class="min-title">年度经济责任审计</div>
                            <ndjjzrsj-bar></ndjjzrsj-bar>
                        </div>
                        <div>
                            <div class="min-title">审计成果会在研判</div>
                            <div class="sjcg">
                                <div class="sjcg-item">
                                    <div class="sjcg-item-num">{{ totalData.sjcg[0] }}</div>
                                    <div>重点对象</div>
                                </div>
                                <div class="sjcg-item">
                                    <div class="sjcg-item-num">{{totalData.sjcg[1]}}</div>
                                    <div>一般对象</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-center">
                <div class="content-box md">
                    <div  class="md-item" v-for="item in totalData.md" :key="item.name">
                        <div class="md-item-num">{{ item.value }}</div>
                        <div class="md-item-text">{{ item.name }}</div>
                    </div>
                </div>
                <div class="content-box" style="margin-top:12px">
                    <div class="content-box-title">
                        选人用人一报告两评议
                    </div>
                    <div class="min-title">市委</div>
                    <sw-bar></sw-bar>
                    <div class="min-title">市县国企高校</div>
                    <div>
                        <div class="tab" style="justify-content: flex-end">
                            <div class="tab-label gqgx-tab-item" :class="index === selectkey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['县市区', '市直', '高校', '市属企业']" :key="item" @click="selectChange(item,index)">{{ item }}</div>
                        </div>
                        <gqgx-line :params="gqgxData"></gqgx-line>
                    </div>
                </div>
            </div>
            <div class="content-right">
                <div class="content-box" >
                    <div class="content-box-title">
                       纪委联审监督
                    </div>
                    <div>
                        <div class="min-title">廉政意见反馈情况</div>
                        <fkqk-bar></fkqk-bar>
                    </div>
                    <div style="display:flex;flex-direction:column">
                        <div class="min-title">受处理处分情况</div>
                        <div class="tab" style="justify-content: flex-end;height:auto">
                            <div class="tab-label cfqk-tab-item"  :class="index === selectCfKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['党纪处分', '政务处分', '提醒函数诫勉']" :key="item" @click="selectCfqkChange(item,index)">{{ item }}</div>
                        </div>
                        <cfqk-bar :params="cfqkData"></cfqk-bar>
                    </div>
                </div>
                <div class="content-box" >
                    <div class="content-box-title">
                        个人事项监督
                    </div>
                    <div class="sxjd">
                        <div class="sxjd-top">
                            <div class="sxjd-top-item">
                                <div>房产情况</div>
                                <img src="@/assets/img/sxjd-item1.png" />
                            </div>
                            <div class="sxjd-top-item">
                                <div>婚内情况</div>
                                <img src="@/assets/img/sxjd-item2.png" />
                            </div>
                            <div class="sxjd-top-item">
                                <div>领导干部<br/>兼职情况</div>
                                <img src="@/assets/img/sxjd-item3.png" />
                            </div>
                            <div class="sxjd-top-item">
                                <div>家属经商<br/>办企业情况</div>
                                <img src="@/assets/img/sxjd-item4.png" />
                            </div>
                        </div>
                        <div class="sxjd-bottom">
                            <div class="sxjd-bottom-item">
                                <div>家属国(境)外<br/>移居及生活情况</div>
                                <img src="@/assets/img/sxjd-item5.png" />
                            </div>
                            <div class="sxjd-bottom-item">
                                <div>投资股票基金<br/>保险情况</div>
                                <img src="@/assets/img/sxjd-item6.png" />
                            </div>
                            <div class="sxjd-bottom-item">
                                <div>其他事项<br/>日常报告</div>
                                <img src="@/assets/img/sxjd-item7.png" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import xfjbBar from './comp/xfjbBar.vue'
import JcqkPie from './comp/jcqkPie.vue'
import ndjjzrsjBar from './comp/ndjjzrsjBar.vue'
import swBar from './comp/swBar.vue'
import ltjdJson from '../../../public/staticData/gbltjd.json'
import gqgxLine from './comp/gqgxLine.vue'
import fkqkBar from './comp/fkqkBar.vue'
import cfqkBar from './comp/cfqkBar.vue'
    export default {
        name: 'ltjd-container-view',
        components: {
            headerBg,
            xfjbBar,
            JcqkPie,
            ndjjzrsjBar,
            swBar,
            gqgxLine,
            fkqkBar,
            cfqkBar
        },
        data() {
            return {
                key: 1,
                totalData:[],
                selectkey: 0,
                selectCfKey: 0,
                gqgxData: [],
                cfqkData: []
            }
        },
        created () {
            this.totalData = ltjdJson;
            this.gqgxData = ltjdJson.gqgx['县市区']
            this.cfqkData = ltjdJson.cfqk['党纪处分']
        },
        methods: {
            init() {
                
            },
            selectChange(item, index) {
                this.gqgxData = this.totalData.gqgx[item]
                this.selectkey = index

            },
            selectCfqkChange (item, index) {
                this.cfqkData = this.totalData.cfqk[item]
                this.selectCfKey = index
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
        width: 600px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content-center {
       width: 690px;
    }
    .content-right {
        width: 600px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }
}
.wt {
    .wt-item {
        ul {
            display: flex;
            justify-content: space-between;
            li {
                text-align: center;
                width: 140px;
                height: 40px;
                line-height: 40px;
            }
        }
        ul:nth-child(1) {
            li {
                background-color: #10263e;
                font-size: 14px;
            }
        }
        ul:nth-child(2) {
            li {
                font-size: 18px;
                color: #e06737;
                border-right: 1px solid #00f6ff;
                font-weight: bolder;
            }
        }
    }
}
.md {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    .md-item:nth-child(1) {
        background: url('@/assets/img/red-bg.png') no-repeat;
    }
    .md-item:nth-child(2) {
        background: url('@/assets/img/orange-bg.png') no-repeat;
    }
    .md-item:nth-child(3) {
        background: url('@/assets/img/yellow-bg.png') no-repeat;
    }
    .md-item {
        width: 210px;
        height: 230px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-around;
        background-size: 100%;
        .md-item-num {
            font-size: 50px;
            font-weight: bolder;
            margin-top: 30px;
        }
        .md-item-text {
            font-size: 28px;
            letter-spacing: 2px;
            margin-bottom: 20px;
        }
    }
    
}
.tab {
    height: 100%;
    display: flex;
    .tab-label {
        height: 33px;
        line-height: 33px;
        text-align: center;
        margin: 10px;
        cursor: pointer;   
    }
    
    
    .is-selectd {
        background: url('@/assets/img/ltpy/tab-active.png') no-repeat;
        color: #00f6ff;
    }
    .no-selctd {
        background: url('@/assets/img/ltpy/tab.png') no-repeat;
        color: #027a94;
    }
    .gqgx-tab-item {
        width: 100px;
        background-size: 100px 33px
    }
    .cfqk-tab-item {
        width: 130px;
        background-size: 130px 33px
    }
}
.sxjd {
    display: flex;
    flex-direction: column;
    .sxjd-top {
        display: flex;
        justify-content: space-between;
        padding-top: 10px;
        .sxjd-top-item {
            width: 135px;
            height: 110px;
            background-color: #10263e;
            text-align: center;
            padding-top: 20px;
            background-image: url('@/assets/img/sxjd-top-bg.png');
            background-repeat: no-repeat;
            background-size: 135px 130px;
            cursor: pointer;
            div {
                margin-bottom: 20px;
                height: 20px;
            }
        }
    }
    .sxjd-bottom {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .sxjd-bottom-item {
            width: 185px;
            height: 115px;
            background-color: #10263e;
            text-align: center;
            padding-top: 20px;
            background-image: url('@/assets/img/sxjd-bottom-bg.png');
            background-repeat: no-repeat;
            background-size: 185px 135px;
            cursor: pointer;
            div {
                margin-bottom: 20px;
                height: 20px;
            }
        }
    }
}
.sblq-item {
    width: 135px;
    height: 90px;
    text-align: center;
    img{
        height: 55px;
    }
    .sblq-item-num {
        background-image:-webkit-linear-gradient(bottom,#00f6ff,#fff);
        -webkit-background-clip:text; 
        -webkit-text-fill-color:transparent; 
        font-weight: bolder;
    }
}
.sjcg {
    display: flex;
    .sjcg-item {
        width: 140px;
        height: 125px;
        text-align: center;
        padding-top: 20px;
        background: url('@/assets/img/sjcg-item.png') no-repeat;
        background-position: center bottom;
        .sjcg-item-num {
            font-size: 20px;
            color: #00f6ff;
            font-weight: bolder;
            margin-bottom: 25px;
        }
    }
}
</style>