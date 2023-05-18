<template>
    <div class="bzhx-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/lthx' }">干部立体画像</el-breadcrumb-item>
                    <el-breadcrumb-item>班子画像</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>
        <div class="content">
            <div class="content-left">
                <div class="content-box">
                    <div class="content-box-title">
                        政治维度
                    </div>
                    <div class="zzwd" style="height:265px">
                        <div class="tab">
                            <div class="tab-label" :class="index === selectzzwdKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['领导批示落实', '清单整改', '巡视选人用人问题', '意识形态责任制落实']" :key="item" @click="selectChange(item, index, 'zzwd')">{{ item }}</div>
                        </div>
                        <table class="zzwd-table">
                        <tr>
                            <td>批示领导</td>
                            <td>批示内容</td>
                            <td>完成情况</td>
                        </tr>
                        <tr v-for="item in zzwdData" :key="item.name">
                            <td>{{ item.name }}</td>
                            <td>{{ item.content }}</td>
                            <td>{{ item.result}}</td>
                        </tr>
                    </table>
                    </div>
                </div>
                <div class="content-box">
                    <div class="content-box-title">
                        人民结构
                    </div>
                    <div class="rmjg">
                        <div class="tab">
                            <div class="tab-label" :class="index === selectrmjgKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['年龄', '学历', '来源', '职数统计']" :key="item" @click="selectChange(item,index,'rmjg')">{{ item }}</div>
                        </div>
                        <div>
                            <rmjg-pie :params="rmjgData"></rmjg-pie>
                        </div>
                    </div>
                </div>
                <div class="content-box">
                    <div class="content-box-title">
                        运行情况
                    </div>
                    <div class="yxqk">
                        <div class="tab">
                            <div class="tab-label" :class="index === selectyxqkKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['政治建设', '思路布局', '工作实践']" :key="item" @click="selectyxqkKey = index">{{ item }}</div>
                        </div>
                        <div>
                            <el-empty :image="require('@/assets/img/empty.png')" description="该干部暂无此项数据" :image-size="100"></el-empty>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-center content-box">
                <div class="person-card">
                    <div class="person-card-top">
                        <img :src="totalData.cardInfo.top.photoUrl" alt="" class="card-img">
                        <div class="card-xm">
                            <el-checkbox >{{ totalData.cardInfo.top.name }}</el-checkbox>
                        </div>
                        <div class="card-zw">
                            {{ totalData.cardInfo.top.zw }}
                        </div>
                    </div>
                    <div class="person-card-center">
                        <div v-for="item in totalData.cardInfo.center" :key="item.name" style="text-align: center;">
                            <img :src="item.photoUrl" alt="" class="card-img">
                            <div class="card-xm">
                                <el-checkbox >{{ item.name }}</el-checkbox>
                            </div>
                            <div class="card-zw ellipsis">
                                {{ item.zw }}
                            </div>
                        </div>
                    </div>
                    <div class="person-card-bottom">
                        <!-- <photo-slider :length="4" :itemWidth="160" :params="bCardInfo" :showBox="true"></photo-slider> -->
                        <el-carousel trigger="click" height="210px" style="width: 100%" arrow="always" :autoplay="false" indicator-position="none">
                            <el-carousel-item v-for="(int, index) in formatterPersonInfo(bCardInfo)" :key="index">
                                <div  style="width: 100%;display: flex;justify-content: space-around;">
                                    <div v-for="item in int" :key="item.a00" style="text-align: center;">
                                        <img :src="item.photoUrl" alt="" class="card-img">
                                         <div class="card-xm">
                                            <el-checkbox >{{ item.name }}</el-checkbox>
                                        </div>
                                        <div class="card-zw ellipsis">
                                           {{ item.zw }}
                                        </div>
                                    </div>
                                    
                                </div>
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                </div>
                <div class="ysbz">
                    <div class="ysbz-top">
                        <div class="ysbz-title">优势不足</div>
                        <div class="ysbz-ckxq">查看详情</div>
                    </div>
                    <div class="ysbz-content">
                        <div v-html="totalData.ysbz"></div>
                    </div>
                </div>
                <div class="bg1-icon"></div>
                <div class="bg2-icon"></div>
            </div>
            <div class="content-right">
                <div class="content-box">
                    <div class="content-box-title">
                        实绩维度
                    </div>
                    <div class="sjwd">
                        <div class="tab">
                            <div class="tab-label" :class="index === selectsjwdKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['绩效指标', '选人用人总体评价', '年度更点工作', '重要奖惩']" :key="item" @click="selectChange(item,index, 'sjwd')">{{ item }}</div>
                        </div>
                        <div class="sjwd-content">
                            <div v-for="item in sjwdData" :key="item.name" class="sjwd-item">
                                <div class="sjwd-item-title">{{ item.name }}</div>
                                <div class="sjwd-item-content">得分<span>{{ item.value }}</span>&nbsp&nbsp&nbsp列<span>{{ item.lie }}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box">
                    <div class="content-box-title">
                        监督维度
                    </div>
                    <div class="jdwd">
                        <div class="tab">
                            <div class="tab-label" :class="index === selectjdwdKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['年度考核', '专项考核', '平时考核', '省综合考核指标排名']" :key="item" @click="selectChange(item,index,'jdwd')">{{ item }}</div>
                        </div>
                        <jdwd-bar :params="jdwdData"></jdwd-bar>
                    </div>
                </div>
                <div class="content-box">
                    <div class="content-box-title">
                        廉政维度
                    </div>
                    <div class="lzwd">
                        <div class="tab">
                            <div class="tab-label" :class="index === selectlzwdKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in ['党风廉政意见', '处理处分情况', '述廉评议回复', '廉政评语']" :key="item" @click="selectChange(item,index,'lzwd')">{{ item }}</div>
                        </div>
                        <table class="lzwd-table">
                            <tr>
                                <td v-for="item in lzwdData.title" :key="item">{{ item }}</td>
                            </tr>
                            <tr v-for="item in lzwdData.list" :key="item.name">
                                <td>{{ item.xm }}</td>
                                <td>{{ item.time }}</td>
                                <td>{{ item.yj }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import photoSlider from '@/components/photoSlider/index.vue'
import { http_get } from '@/api';
// import bzhxData from '../../../public/staticData/bzhx.json'
import rmjgPie from './comp/rmjgPie.vue'
import jdwdBar from './comp/jdwdBar.vue'
    export default {
        name: 'bzhx-container-view',
        components: {
            headerBg,
            rmjgPie,
            jdwdBar,
            photoSlider
        },
        data() {
            return {
                totalData: [],
                selectzzwdKey: 0,
                zzwdData: [],
                selectrmjgKey:0,
                rmjgData: [],
                selectyxqkKey: 0,
                selectsjwdKey: 0,
                sjwdData: [],
                selectjdwdKey: 0,
                jdwdData: [],
                selectlzwdKey: 0,
                lzwdData: [],
                bCardInfo: []
            }
        },
        created () {
            http_get('bzhx').then(res => {
                this.totalData = res.data
                this.zzwdData = this.totalData.zzwd['领导批示落实'];
                this.sjwdData =this.totalData.sjwd['绩效指标']
                this.lzwdData = this.totalData.lzwd['党风廉政意见']
                this.rmjgData = this.totalData.rmjg['年龄']
                this.jdwdData = this.totalData.jdwd['年度考核']
                this.bCardInfo = this.totalData.cardInfo.bottom
            })
            
        },
        methods: {
            selectChange(item, index,type) {
                this['select'+ type + 'Key'] = index
                this[type+ 'Data'] = this.totalData[type][item]
            },
            formatterPersonInfo(list) {
                let len = list.length
                let newList = []
            if (len) {
                var chunk = 4
                for (var i = 0, j = len; i < j; i += chunk) {
                newList.push(list.slice(i, i + chunk))
                }
            }
            return newList
        }
    }
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
    overflow: hidden;
    .content-left {
        margin-right: 10px;
        width: 600px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .content-center {
       width: 630px;
       padding-left: 25px;
       padding-right: 25px;
       position: relative;
       .bg1-icon {
        background: url('@/assets/img/bg1-icon.png') no-repeat;
        width: 50px;
        height: 43px;
        position: absolute;
        right: 40px;
        top: 50px;
       }
       .bg2-icon {
        background: url('@/assets/img/bg2-icon.png') no-repeat;
        width: 50px;
        height: 43px;
        position: absolute;
        right: 40px;
        top: 110px;
       }
    }
    .content-right {
        width: 600px;
        margin-left: 10px;
        display: flex;
        flex-direction: column;
    }
}

.zzwd-table {
    margin-top: 10px;
    tr {
        td {
           padding: 12px 10px;
           letter-spacing: 2px;
        }
        td:nth-child(1) {
            width: 200px;
        }
        td:nth-child(2) {
            width: 400px;
        }
        td:nth-child(3) {
            width: 150px;
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
.tab {
        display: flex;
        .tab-label {
            height: 33px;
            line-height: 33px;
            text-align: center;
            margin: 10px 5px;
            cursor: pointer;
            width: 120px;
        }
        .is-selectd {
        background: url('@/assets/img/ltpy/tab-active.png') no-repeat;
        color: #00f6ff;
        background-size: 120px 33px
       
    }
        .no-selctd {
            background: url('@/assets/img/ltpy/tab.png') no-repeat;
            color: #027a94;
            background-size: 120px 33px
        }
    }
.zzwd {
    .tab {
    display: flex;
    .tab-label {
        height: 33px;
        line-height: 33px;
        text-align: center;
        margin: 10px 5px;
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
    .tab-label:nth-child(1) {
        width: 135px;
    }
    .is-selectd:nth-child(1) {
        background-size: 135px 33px
    }
    .no-selctd:nth-child(1) {
        background-size: 135px 33px
    }
    .tab-label:nth-child(2) {
        width: 90px;
    }
    .is-selectd:nth-child(2) {
        background-size: 90px 33px
    }
    .no-selctd:nth-child(2) {
        background-size: 90px 33px
    }
    .tab-label:nth-child(3) {
        width: 140px;
    }
    .is-selectd:nth-child(3) {
        background-size: 140px 33px
    }
    .no-selctd:nth-child(3) {
        background-size: 140px 33px
    }
    .tab-label:nth-child(4) {
        width: 170px;
    }
    .is-selectd:nth-child(4) {
        background-size: 170px 33px
    }
    .no-selctd:nth-child(4) {
        background-size: 170px 33px
    }
}
}
.sjwd {
    .tab {
        .tab-label:nth-child(2) {
        width: 180px;
    }
        .is-selectd:nth-child(2) {
            background-size: 180px 33px
        }
        .no-selctd:nth-child(2) {
            background-size: 180px 33px
        }
    }
    .sjwd-content {
        height: 200px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        align-content: space-around;
        .sjwd-item {
            border: 1px solid #00f6ff;
            border-radius: 3px;
            height: 60px;
            width: 250px;
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            .sjwd-item-content {
                font-size: 18px;
                span {
                    color:#ffac02;
                }
            }
        }
    }
}
.jdwd {
    .tab {
        .tab-label:nth-child(4) {
        width: 180px;
    }
        .is-selectd:nth-child(4) {
            background-size: 180px 33px
        }
        .no-selctd:nth-child(4) {
            background-size: 180px 33px
        }
    }
}
.lzwd-table {
    margin-top: 10px;
    tr {
        td {
           padding: 12px 10px;
           letter-spacing: 2px;
        }
        td:nth-child(1) {
            width: 200px;
        }
        td:nth-child(2) {
            width: 150px;
        }
        td:nth-child(3) {
            width: 400px;
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
.card-xm {
    margin-top: 20px;
    .el-checkbox {
        ::v-deep .el-checkbox__input {
            line-height: 2;
            .el-checkbox__inner {
                height: 18px;
                width: 18px;
                border: 2px solid #00f6ff;
                background-color: #033951;
            }
            // .el-checkbox__inner::after {
            //     border: 2px solid #fff;
            // }
        }
        ::v-deep .is-checked {
            .el-checkbox__inner {
                background-color: #409EFF;
            }
           
        }
        ::v-deep .el-checkbox__label {
            font-size: 20px;
            font-weight: bolder;
            color: #fff;
        }
    }
}
.card-zw {
    font-size: 20px;
    // font-weight: bolder;
}
.person-card-top {
    text-align: center;
    margin-top: 60px;
}
.person-card-center {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
}
.person-card-bottom {
    // display: flex;
    // justify-content: space-around;
    margin-top: 20px;
}
::v-deep .el-carousel__arrow--right {
    right: 0;
}
:v-deep .el-carousel__arrow--left {
    left: 0;
}
::v-deep .el-carousel__arrow:hover {
background-color: #00f6ff;
}
.ysbz {
    margin-top: 30px;
    .ysbz-top {
        color: #00f6ff;
        display: flex;
        justify-content: space-between;
        .ysbz-title {
            font-size: 20px;
            font-weight: bolder;
        }
        .ysbz-title::before {
            content: '';
            display: inline-block;
            background: url('@/assets/img/arrow.png') no-repeat;
            width: 18px;
            height: 17px;
            position: relative;
            top: 2px;
            margin-right: 10px;
        }
    }
    .ysbz-content {
        padding: 20px 10px;
        text-indent: 20px;
    }
}
.ellipsis {
    width: 120px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
}
</style>
