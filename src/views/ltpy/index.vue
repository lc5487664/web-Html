<template>
    <div class="ltpy-container-view container-view" >
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item>干部立体培养</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>
        <div class="content">
            <div class="content-left content-box">
                <div class="content-box-title">
                        脱产培训概念
                </div>
                <div class="content-ltpy-waper">
                    <div class="min-title">2018年至今脱产培训情况</div>
                    <div class="db-bg">
                        <div class="item-bg item-bg1">
                            <p>3332223</p>
                            <p>培训总学时</p>
                        </div>
                        <div class="item-bg item-bg2">
                            <p>3332223</p>
                            <p>培训总人次</p>
                        </div>
                        <div class="item-bg item-bg3">
                            <p>323</p>
                            <p>人均学时数</p>
                        </div>
                    </div>
                    <div class="db-bg">
                        <div class="item-bg item-bg4">
                            <p>3332223</p>
                            <p>干部调训率</p>
                        </div>
                        <div class="item-bg item-bg5">
                            <p>3332223</p>
                            <p>干部参训率</p>
                        </div>
                        <div class="item-bg item-bg6">
                            <p>198</p>
                            <p>开设班级数</p>
                        </div>
                    </div>
                    
                </div>
                <div class="content-ltpy-waper">
                    <div class="min-title">主体班次教学安排"两个70%"</div>
                    <div style="height:160px;width:100%;display: flex;flex-direction: column;justify-content: space-around;">
                        <div style="display: flex;align-items: center;" v-for="item in data.jxap" :key="item.name">
                            <el-progress type="circle" :percentage="75" color="#3dbad5" width="60" define-back-color="#253359" text-color="#fff"></el-progress>
                            <div style="color:#fff; width: 100%;margin-left: 10px;">
                                <p style="width:370px">{{ item.name }}</p>
                                <div style="margin-top: 5px;display: flex;align-items: center;">
                                    <div style="width: 380px;height: 15px;float: left;border:1px solid #cccccc;margin-right: 10px;padding-top: 2px;padding-bottom: 2px;">
                                        <div class="bar-bg1" :style="{width: item.value +'%'}">
                                            <div v-for="key in getNum(item.value)" :key="key"></div>
                                        </div>
                                    </div>
                                    <span>目标:{{item.value}}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-ltpy-waper">
                    <div class="min-title">培训任务完成率</div>
                    <div style="height:290px;color: #fff;display: flex;justify-content: space-between;padding-left: 10px;padding-right: 10px;">
                        <div style="width: 260px;">
                            <div style="height:30px;line-height: 30px;">市直单位培训任务完成率(排名后+)</div>
                            <el-scrollbar>
                                <div style="max-height: 250px;">
                                    <ul style="font-size:14px">
                                        <li v-for="item in data.pxrwwcl.szdw" :key="item.name" class="pxrw-item">
                                            <el-tooltip :content="item.name" placement="top" effect="light">
                                                <div class="pxrw-item-ellipsis">{{ item.name }}</div>
                                            </el-tooltip>
                                            <div>{{ item.value || '未调研'  }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div style="width: 260px;">
                            <div style="height:30px;line-height: 30px;">县(市,区)培训任务完成率(排名后+)</div>
                            <el-scrollbar>
                                <div style="max-height: 250px;">
                                    <ul style="font-size:14px">
                                        <li v-for="item in data.pxrwwcl.xsq" :key="item.name" class="pxrw-item">
                                            <div class="pxrw-item-ellipsis" :title="item.name">{{ item.name }}</div>
                                            <div>{{ item.value || '未调研'  }}</div>
                                        </li>
                                    </ul>
                                </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-center content-box">
                <div class="pxry">
                    <div class="pxry-title">
                        <div class="pxry-title-item">急需培训人员</div>
                        <div class="pxry-title-item">需要培训人员</div>
                        <div class="pxry-title-item">培训达标人员</div>
                    </div>
                    <div class="pxry-content">
                        <div class="pxry-content-item pxry-content-item-left">40.8%</div>
                        <div class="pxry-content-item pxry-content-item-center">27.7%</div>
                        <div class="pxry-content-item pxry-content-item-right">31.2%</div>
                    </div>
                    <div class="pxry-content">
                        <div class="pxry-content-item pxry-content-item-left">416</div>
                        <div class="pxry-content-item pxry-content-item-center">277</div>
                        <div class="pxry-content-item pxry-content-item-right">312</div>
                    </div>
                </div>
                <div class="fgl">
                    <div class="fgl-content">
                        <div class="fgl-content-item fgl-content-item-left">100%</div>
                        <div class="fgl-content-item fgl-content-item-center">100%</div>
                        <div class="fgl-content-item fgl-content-item-right">98%</div>
                    </div>
                    <div class="fgl-title">
                        <div class="fgl-title-item">
                            <div>中央中央会议</div>
                            <div>精神轮训覆盖率</div>
                        </div>
                        <div class="fgl-title-item">
                            <div>省级重要会议</div>
                            <div>精神轮训覆盖率</div>
                        </div>
                        <div class="fgl-title-item">
                            <div>市级重要会议</div>
                            <div>精神轮训覆盖率</div>
                        </div>
                    </div>
                </div>
                <div class="pxrw-wcqk">
                    <div class="pxrw-wcqk-title">重点培训任务完成情况</div>
                    <div class="pxrw-wcqk-content">
                        <div class="wcqk-content-top">
                            <div class="top-bg">
                                <div class="top-bg-num">
                                    <span>285</span> &nbsp&nbsp&nbsp 人次</div>
                                <div class="top-bg-text">发展要安全</div>
                            </div>
                            <div class="top-bg">
                                <div class="top-bg-num">
                                    <span>285</span> &nbsp&nbsp&nbsp 人次</div>
                                <div class="top-bg-text">发展要安全</div>
                            </div>
                        </div>
                        <div class="wcqk-content-bottom">
                            <div class="bottom-bg">
                                <div class="bottom-bg-text">经济要稳住</div>
                                <div class="bottom-bg-num">
                                    <span>285</span> &nbsp&nbsp&nbsp 人次
                                </div>
                            </div>
                            <div class="bottom-bg">
                                <div class="bottom-bg-text">经济要稳住</div>
                                <div class="bottom-bg-num">
                                    <span>285</span> &nbsp&nbsp&nbsp 人次
                                </div>
                            </div>
                            <div class="bottom-bg">
                                <div class="bottom-bg-text">经济要稳住</div>
                                <div class="bottom-bg-num">
                                    <span>285</span> &nbsp&nbsp&nbsp 人次
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-right content-box">
                <div class="content-box-title">
                    网络培训概念
                </div>
                <div>
                    <div>
                        <div class="min-title">2018年至今网络培训总学时</div>
                        <div class="jsq">
                            <ul>
                                <li>3</li>
                                <li>4</li>
                                <li>0</li>
                                <li>7</li>
                                <li>9</li>
                                <li>3</li>
                            </ul>
                        </div>
                    </div>
                    <div class="dbs">
                        <div>
                            <div class="min-title">培训总人次</div>
                            <div class="dbs-jsq">
                                <ul>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div class="min-title">达标总人次</div>
                            <div class="dbs-jsq">
                                <ul>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                </ul>
                            </div>
                        </div>
                        <div>
                            <div class="min-title">达标率</div>
                            <div class="dbs-jsq">
                                <ul>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                    <li>3</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div style="margin-top:10px">
                    <div class="min-title">
                        网络培训达标率
                    </div>
                    <div>
                        <dbl-line></dbl-line>
                    </div>
                </div>
                <div>
                    <div class="min-title">
                       好课程、好教材、好案例
                    </div>
                    <div class="tab">
                        <div class="tab-label" :class="index === selectKey ? 'is-selectd': 'no-selctd'" v-for="(item, index) in tabData" :key="item" @click="selectTab(item, index)">{{ item.name }}</div>
                        <div class="tab-content">
                            <ul>
                                <li v-for="(item, index) in pxData" :key="item.name">
                                    <!-- <el-tooltip :content="item.name" placement="top" effect="light">
                                        <div class="ellipsis">{{ index + 1 }}&nbsp&nbsp&nbsp{{ item.name }}</div>
                                    </el-tooltip> -->
                                    <div class="ellipsis">{{ index + 1 }}&nbsp&nbsp&nbsp{{ item.name }}</div>
                                    <div>{{ item.unitName }}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import ltpyJson from '../../../public/staticData/gbltpy.json'
import dblLine from './comp/dblLine.vue'
export default {
    name: 'ltpy-container-view',
    components: {
        headerBg,
        dblLine
    },
    data() {
        return {
            data: ltpyJson,
            tabData: [
                {
                    name: '好课程',
                    nameCode: 'hkc'
                },
                {
                    name: '好教材',
                    nameCode: 'hjc'
                },
                {
                    name: '好案例',
                    nameCode: 'hal'
                },
            ],
            selectKey: 0,
            pxData: []
        }
    },
    created () {
        this.pxData = ltpyJson['hkc-hjc-hal'].hkc;
    },
    methods: {
        selectTab(item, index) {
            this.selectKey = index
            this.pxData = ltpyJson['hkc-hjc-hal'][item.nameCode]
        },
        getNum(item) {
            let num = Math.floor(item/10)
            return num
        },
        splitStr (num, type) {
            let str = num.toString()
            let arr = str.split('')
            if (arr.length < type) {
                arr.push('')
            }
            return arr
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
    .content-left {
        // flex: 1;
        margin-right: 10px;
        width: 560px;
    }
    .content-center {
       width: 690px;
    }
    .content-right {
        // flex: 1;
        width: 560px;
        margin-left: 10px;
    }
}
.content-ltpy-waper {
    display: flex;
    flex-direction: column
}
.db-bg {
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    height: 140px;
    width: 100%;
    background: url('@/assets/img/ltpy/diban.png') no-repeat;
    background-size: 100%;
    background-position: bottom center;
}

.item-bg1 {
    background: url('@/assets/img/ltpy/item-bg1.png') no-repeat;
}
.item-bg2 {
    background: url('@/assets/img/ltpy/item-bg2.png') no-repeat;
}
.item-bg3 {
    background: url('@/assets/img/ltpy/item-bg3.png') no-repeat;
}
.item-bg4 {
    background: url('@/assets/img/ltpy/item-bg4.png') no-repeat;
}
.item-bg5 {
    background: url('@/assets/img/ltpy/item-bg5.png') no-repeat;
}
.item-bg6 {
    background: url('@/assets/img/ltpy/item-bg6.png') no-repeat;
}
.item-bg {
    // width: 100px;
    // background-size: 100%;
    text-align: center;
    background-position: center 25px;
    p:nth-child(2){
        color:#fff;
        margin-top: 10px;
    }
    p:nth-child(1){
        color:#00dffb
    }
}
.pxrw-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 9px 10px;
    background-color: #041e3d;
}
.pxrw-item-ellipsis {
    width: 190px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.pxry {
    padding: 20px;
    .pxry-title{
    display: flex;
    justify-content: space-around;
        .pxry-title-item {
        background: url('@/assets/img/ltpy/pxry-title-item.png') no-repeat;
        color: #01daeb;
        font-size: 18px;
        height: 80px;
        width: 160px;
        text-align: center;
        line-height: 70px;
        }
    }
    .pxry-content {
        display: flex;
        justify-content: space-around;
        padding-left: 20px;
        padding-right: 20px;
        margin-top: 20px;
        .pxry-content-item {
            height: 72px;
            width: 181px;
            line-height: 72px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
        }
        .pxry-content-item-left {
            background: url('@/assets/img/ltpy/pxry-content-item-left.png') no-repeat;
            color: #ff3836;
        }
        .pxry-content-item-center {
            background: url('@/assets/img/ltpy/pxry-content-item-center.png') no-repeat;
            color: #dcc031;
        }
        .pxry-content-item-right {
            background: url('@/assets/img/ltpy/pxry-content-item-right.png') no-repeat;
            color: #00f6ff;
        }
    }

}
.fgl {
    padding: 20px;
    color: #01daeb;
    padding-top: 10px;
    .fgl-content {
        font-size: 24px;
        font-weight: bold;
        display: flex;
        justify-content: space-around;
        padding-left: 20px;
        padding-right: 20px;
        .fgl-content-item {
            height: 72px;
            width: 181px;
            line-height: 72px;
            text-align: center;
        }
        .fgl-content-item-left {
            background: url('@/assets/img/ltpy/fgl-content-item-left.png') no-repeat;
            color: #ff3836;
        }
        .fgl-content-item-center {
            background: url('@/assets/img/ltpy/fgl-content-item-center.png') no-repeat;
            color: #dcc031;
            width: 191px;
        }
        .fgl-content-item-right {
            background: url('@/assets/img/ltpy/fgl-content-item-right.png') no-repeat;
            color: #00f6ff;
        }
    }
    .fgl-title {
        font-size: 18px;
        display: flex;
        padding: 20px;
        justify-content: space-around;
        .fgl-title-item {
            background: url('@/assets/img/ltpy/fgl-title-item.png') no-repeat;
            width: 158px;
            height: 100px;
            padding-top: 5px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            div:nth-child(2) {
                margin-top: 5px;
            }
        }
    }
}
.pxrw-wcqk {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .pxrw-wcqk-title {
        color: #00f6ff;
        background: url('@/assets/img/ltpy/pxrw-wcqk-title.png') no-repeat;
        height: 55px;
        width: 326px;
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
        line-height: 55px;
    }
    .pxrw-wcqk-content {
        width: 100%;
        .wcqk-content-top {
            display: flex;
            justify-content: space-around;
            margin-top: 40px;
            .top-bg {
                background: url('@/assets/img/ltpy/top-bg.png') no-repeat;
                width:166px;
                height: 108px;
                color:#fff;
                position: relative;
                .top-bg-num {
                    position: absolute;
                    left: 30px;
                    top: 25px;
                    span {
                        color: #00f6ff;
                        font-weight: bolder;
                        font-size: 20px;
                    }
                }
                .top-bg-text {
                    position: absolute;
                    left: 50px;
                    top: 75px;
                }
            }
        }
        .wcqk-content-bottom {
            display: flex;
            padding: 20px;
            justify-content: space-around;
            margin-top: 30px;
            .bottom-bg {
                background: url('@/assets/img/ltpy/bottom-bg.png') no-repeat;
                height: 92px;
                width: 176px;
                color:#fff;
                position: relative;
                .bottom-bg-num {
                    position: absolute;
                    left: 45px;
                    top: 55px;
                    span {
                        color: #00f6ff;
                        font-weight: bolder;
                        font-size: 20px;
                    }
                }
                .bottom-bg-text {
                    position: absolute;
                    left: 45px;
                    top: 30px;
                }
            }
        }
    }
}
.jsq {
    color: #00f6ff;
    display: flex;
    justify-content: center;
    ul {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        width: 300px;
        height: 40px;
        border: 1px solid #00dffb;
        padding: 10px;
        font-weight: bolder;
        font-size: 24px;
        li {
            width: 40px;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background-color: #0c3656;
        }
    }
}
.dbs {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
}
.dbs-jsq {
    color: #00f6ff;
    margin-right: 45px;
    ul{
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        width: 130px;
        height: 20px;
        border: 1px solid #00dffb;
        padding: 5px;
        font-weight: bolder;
        li {
            width: 20px;
            height: 20px;
            line-height: 20px;
            text-align: center;
            background-color: #0c3656;
        }
    }
}
.tab {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .tab-label {
        height: 33px;
        width: 120px;
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
    .tab-content {
        color: #fff;
        width: 100%;
        padding: 10px;
        ul {
            li {
                display: flex;
                justify-content: space-between;
                padding: 5px 10px;
                height: 30px;
                line-height: 30px;
                cursor: pointer;
                .ellipsis {
                    width: 350px;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
            li:nth-child(2n+1){
                background-color: #03213a;
            }
        }
    }
}
.bar-bg1 {
    height: 100%;
   background:linear-gradient(to right, #04102a ,#00f6ff);
   display: flex;
//    justify-content: space-around;
   width: 75%;
   div {
    border-left: 5px solid black ;
    height: 100%;
    width: 37px;
   }
}
</style>