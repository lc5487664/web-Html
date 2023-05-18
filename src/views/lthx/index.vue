<template>
    <div class="home-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item>干部立体画像</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>

        <div class="content" @click="closeList">
            <div class="content-box left-part">
                <div class="content-box-title">
                    干部画像

                    <div class="input-content">
                        <input type="text" class="ipt-box" v-model="gbName" placeholder="请输入干部名称或者拼音首字母">
                        <div class="btn" @click="secrchList('gb')">搜索</div>

                        <div
                            class="result-list"
                            id="result-list-3"
                            v-if="queryGbList.length > 0 && showGbList"
                        >
                            <ul style="height: 210px">
                                <li
                                    :title="item.value"
                                    @click="goPath(item, 'gb')"
                                    v-for="(item, index) in queryGbList"
                                    :key="index"
                                >
                                {{ item.value }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="tit-box">
                    <div class="label" @click="$router.push({path: '/gbhx'})">市管干部<br/>概况</div>
                    <div class="list">
                        <div class="item" v-for="(item, index) in sggbqk" :key="index">
                            <span class="name">{{ item.name }}</span>
                            <span class="value">{{ item.value }}</span>
                        </div>
                    </div>
                </div>

                <div class="part">
                    <div class="min-title">职务层次分布</div>
                    <div class="part-content">
                        <basic-bar :params="zwcc" :itemStyle="{width: '100%', height: '230px'}" v-if="loadFlag"></basic-bar>
                    </div>
                </div>
                <div class="part">
                    <div class="min-title">学历分布</div>
                    <div class="part-content">
                        <div ref="xl" style="width: 100%; height: 230px"></div>
                    </div>
                </div>
                <div class="section">
                    <div class="part w50">
                        <div class="min-title">年龄分布</div>
                        <div class="part-content" style="height: 200px;">
                            <basic-pie :params="nlfb" v-if="loadFlag"></basic-pie>
                        </div>
                    </div>
                    <div class="part w50">
                        <div class="min-title">专业分布</div>
                        <div class="part-content">
                            <BasicBar
                                v-if="loadFlag"
                                :params="zyfb"
                            ></BasicBar>
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="right-part">
                <div class="content-box top">
                    <div class="content-box-title">
                        班子画像
                        <div class="input-content">
                            <input type="text" class="ipt-box" v-model="bzName" placeholder="请输入班子名称或者拼音首字母">
                            <div class="btn" @click="secrchList('bz')">搜索</div>

                            <div
                                class="result-list"
                                id="result-list-1"
                                v-if="queryBzList.length > 0 && showBzList"
                            >
                                <ul style="height: 200px;">
                                    <li
                                    :title="item.value"
                                    @click="goPath(item, 'bz')"
                                    v-for="(item, index) in queryBzList"
                                    :key="index"
                                    >
                                    {{ item.value }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="tit-box">
                        <div class="label" @click="$router.push({path: '/bzhx'})">市管班子<br/>概况</div>
                        <div class="list long">
                            <div class="item" v-for="(item, index) in sgbzqk" :key="index">
                                <span class="name">{{ item.name }}</span>
                                <span class="value">{{ item.value }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="list-box">
                        <div class="label-list">
                            <div class="item" @click="curIndex = index" :class="[index == curIndex ? 'act' : '']" v-for="(item, index) in bzhx" :key="index">
                                {{ item.name }}
                            </div>
                        </div>
                        <div class="list-data" v-if="bzhx[curIndex] && loadFlag">
                            <div class="item" v-for="(item, index) in bzhx[curIndex].list" :key="index">
                                <div class="name">{{ item.name }}</div>
                                <div class="box" v-html="item.htm"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-box bottom">
                    <div class="content-box-title"  style="cursor: pointer;">
                        <div @click="$router.push({path:'/gwhxTab'})">岗位画像</div>
                        <div class="input-content">
                            <input type="text" class="ipt-box" v-model="gwName" placeholder="请输入岗位名称或者拼音首字母">
                            <div class="btn" @click="secrchList('gw')">搜索</div>

                            <div
                                class="result-list"
                                id="result-list-2"
                                v-if="queryGwList.length > 0 && showGwList"
                            >
                                <ul style="height: 200px;">
                                    <li
                                        :title="item.value"
                                        @click="goPath(item, 'gw')"
                                        v-for="(item, index) in queryGwList"
                                        :key="index"
                                    >
                                    {{ item.value }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="part">
                            <div class="min-title">市管领导岗位空缺情况（共{{sgldgwkqqk_total}}个）</div>
                            <div class="part-contenr">
                                <div class="box-1">
                                    <bar3d :params="kq1" :itemStyle="{width: '360px', height: '180px'}" v-if="loadFlag" ></bar3d>
                                </div>
                                <div class="box-2">
                                    <div ref="kq2" style="width: 360px;height: 180px;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="part" style="margin-left: 10px;">
                            <div class="min-title">同岗位长时间未交流干部（共{{wjlgb_total}}个）</div>
                            <div class="part-contenr">
                                <div ref="wjlgb" style="width: 360px;height: 180px;"></div>
                            </div>
                        </div>
                    </div>
                    <div class="section">
                        <div class="part">
                            <div class="min-title">正局主要领导岗位</div>
                            <div class="part-contenr">
                                <div class="box-1">
                                    <pie3d :data="ldgwData" v-if="loadFlag"></pie3d>
                                </div>
                                <div class="box-2">
                                    <div ref="ldgw" style="width: 360px;height: 150px;"></div>
                                </div>
                            </div>
                        </div>
                        <div class="part">
                            <div class="min-title">近两年到龄退休市管干部</div>
                            <div class="part-contenr">
                                <txgbBar :data="txgb" v-if="loadFlag"></txgbBar>
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
import { http_get } from '@/api';
import basicBar from '@/components/bar/index.vue'
import bar3d from '@/components/bar/3d_Bar.vue'
import pie3d from './comp/pie3d.vue'
import txgbBar from './comp/txgbBar.vue';
import basicPie from '@/components/pie/basicPie.vue'
import BasicBar from '@/components/bar/baseBar.vue';
import * as echart from 'echarts'

export default {
    name: "gblthx",
    components: {
        headerBg,
        basicBar,
        bar3d,
        pie3d,
        txgbBar,
        basicPie,
        BasicBar
    },
    data () {
        return {
            loadFlag: false,
            zwcc: {
                data: []
            },
            kq1: {
                data: []
            },
            kq2: {
                data: []
            },
            kqChart: null,
            wjlChart: null,
            ldgwChart: null,
            ldgwData: [],
            txgb: [],
            nlfb: {
                boxStyle: {
                    height: "100%",
                    width: "100%"
                },
                showLegend: true,
                showTooltip: true,
                color: ['#00e8ff','#059eef','#ffd200','#ff9800','#6f53fd'],
                center: ['90px', '50%'],
                tooltipPos: [58, 58],
                data: []
            },
            zyfb: {
                canvasStyle: {
                    width: '100%',
                    height: '200px'
                },
                options: {
                    gradientColor: [      
                        ['#5ba8fa','#5ba8fa']
                    ],
                    isVertical: true,
                    needShowBg: true,
                    xName: 'name',
                    axisValueShow: true,
                    nonCut: true,
                    tooltipShow: false,
                    axisValueShow: false,
                    top: '5%',
                    bottom: '0',
                    right: '13%',
                    barWidth: 13,
                    axis1Name: '', 
                    barBorderRadius: 10,
                    borderWidth: 1,
                    showBorderColor: 'true',
                    labelHide: true,
                    shadowBlur: 5,
                    toolUnit: '人',
                    map: {
                        'value': '数量'
                    }
                },
                data: [],
            },
            sggbqk: [],
            sgbzqk: [],

            bzhx: [],
            curIndex: 0,
            bzName: '',
            gwName: '',
            gbName: '',
            queryBzList: [],
            queryGwList: [],
            queryGbList: [],
            showBzList: false,
            showGwList: false,
            showGbList: false,

            wjlgb_total: 0,
            sgldgwkqqk_total: 0
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        goPath (item, type) {
            this.$router.push({
                path: `/${type}hx`,
                query: {
                    id: item.code
                }
            })
        },
        closeList(event) {
            let sp1 = document.getElementById("result-list-1");
            let sp2 = document.getElementById("result-list-2");
            let sp3 = document.getElementById("result-list-3");
            if (sp1) {
                if (!sp1.contains(event.target)) {
                this.showBzList = false;
                }
            }
            if (sp2) {
                if (!sp2.contains(event.target)) {
                this.showGwList = false;
                }
            }
            if (sp3) {
                if (!sp3.contains(event.target)) {
                this.showGbList = false;
                }
            }
        },
        secrchList(type) {
            let value = "";
            if (type == "bz") {
                value = this.bzName;
            }
            if (type == "gw") {
                value = this.gwName;
            }
            if (type == "gb") {
                value = this.gbName;
            }
            http_get(
                `query_hx_list_${type}`,
                {
                    value: value,
                }
            ).then((res) => {
                if (type == "bz") {
                    this.queryBzList = res.data.data;
                    this.showBzList = true;
                }
                if (type == "gw") {
                    this.queryGwList = res.data.data;
                    this.showGwList = true;
                }
                if (type == "gb") {
                    this.queryGbList = res.data.data;
                    this.showGbList = true;
                }
            });
        },
        init () {
            http_get('lthx').then(res => {
                let _data = res.data.data
                console.log(_data)
                this.zwcc.data = _data.zwcc
                this.sggbqk = _data.sggbqk
                this.sgbzqk = _data.sgbzqk
                this.bzhx = _data.bzhx

                this.kq1.data = _data.sgldgwkqqk.list_1
                this.nlfb.data = _data.nlfb
                this.zyfb.data = _data.zyfb

                this.xlChart = echart.init(this.$refs.xl)
                let xlOption = this.renderBar(_data.xlfb)
                this.xlChart.setOption(xlOption)

                // 未交流干部
                this.wjlChart = echart.init(this.$refs.wjlgb)
                let wjlOption = this.renderBar(_data.wjlgb.list)
                this.wjlChart.setOption(wjlOption)
                this.wjlgb_total = _data.wjlgb && _data.wjlgb.total
                this.sgldgwkqqk_total = _data.sgldgwkqqk && _data.sgldgwkqqk.total

                // 领导岗位
                this.ldgwChart = echart.init(this.$refs.ldgw)
                let ldgwOption = this.renderBar(_data.zjzyldgw.list_2, {
                    "yp": "应配",
                    "sp": "实配"
                })
                this.ldgwChart.setOption(ldgwOption)

                this.ldgwData = _data.zjzyldgw.list_1
                this.txgb = _data.j2ndltxgb
                
                this.kqChart = echart.init(this.$refs.kq2)
                let kqOption = this.renderKqqk(_data.sgldgwkqqk.list_2)
                this.kqChart.setOption(kqOption)
                this.loadFlag = true
            })
        },

        //
        renderBar (data, map = { "qrz": "全日制学历", "zgxl": "最高学历" }) {
            const colors = ['#00e8ff', '#ff9800']
            let legendData =Object.values(map)
            let axisData = data.map(item => item.name)
            let seriesArr = []
            Object.keys(map).forEach((item, index) => {
                let _data = [];
                data.forEach(innerItem => {
                    _data.push(innerItem[item])
                })

                seriesArr.push({
                    name: map[item],
                    type: 'bar',
                    barWidth: "20",
                    xAxisIndex: 0,
                    yaxisIndex: 0,
                    z: 1,
                    label: {
                        show: true,
                        position: "top",
                        color: "#fff"
                    },
                    itemStyle: {
                        color: colors[index] + '50',
                        borderWidth: 1,
                        borderColor: colors[index]
                    },
                    data: _data
                })  
            })

            let option = {
                color: colors,
                grid: {
                    top: 45,
                    left: "40",
                    right: "5",
                    bottom: "15%"
                },
                tooltip: {
                    show: true,
                    padding: 15,
                    backgroundColor: '#fff',
                    trigger: 'axis',
                    extraCssText: 'line-height:25px;color: #333;border: 1px solid #cccccc;font-weight: normal'
                },
                legend: {
                    show: true,
                    orient: "horizontal",
                    width: '100%',
                    icon: "rect",
                    top: "0%",
                    itemWidth: 12,
                    itemHeight: 12,
                    right: "5%",
                    textStyle: {
                        fontSize: 14,
                        color: "#fff"
                    },
                    data: legendData
                },
                xAxis: {
                    show: true,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        color: "#fff",
                        fontSize: 14
                    },
                    type: 'category',
                    data: axisData
                },
                yAxis: {
                    show: true,
                    axisTick: {
                        show: false
                    },
                    minInterval: 1,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#68a8cc40"
                        }
                    },
                    axisLabel: {
                        show: true, 
                        color: "#fff",
                        fontSize: 14
                    }
                },
                series: seriesArr
            }

            return option
        },

        renderKqqk (data) {
            const colors = ['#00e8ff', '#ff9800']
            let axisData = data.map(item => item.name)

            let option = {
                color: colors,
                grid: {
                    left: "10%",
                    right: "5%",
                    bottom: "45",
                    top: "10"
                },
                tooltip: {
                    show: false
                },
                legend: {
                    show: false
                },
                xAxis: {
                    show: true,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval: 0,
                        color: "#fff",
                        fontSize: 14,
                        margin: 20
                    },
                    type: 'category',
                    data: axisData
                },
                yAxis: {
                    show: true,
                    type: "value",
                    minInterval: 1,
                    axisTick: {
                        show: false
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#68a8cc40"
                        }
                    },
                    axisLabel: {
                        show: true, 
                        color: "#fff",
                        fontSize: 14
                    }
                },
                series: [
                    {
                        // 上
                        name: 'top',
                        type: 'pictorialBar',
                        symbolSize: [30, 15],
                        symbolOffset: [0, -10],
                        z: 12,
                        symbolPosition: 'end',
                        itemStyle: {
                            normal: {
                                color: '#00fef5'
                            }
                        },
                        label: {
                            show: true,
                            color: "#fff",
                            position: "top",
                            fontSize: 14
                        },
                        data: data,
                    },{
                        // 下
                        name: '数量',
                        type: 'pictorialBar',
                        symbolSize: [30, 15],
                        symbolOffset: [0, 10],
                        z: 12,
                        itemStyle: {
                            normal: {
                                color: '#00fef5'
                            }
                        },
                        data: data
                    },{
                        // 中
                        name: "数量",
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: 'rgba(1, 173, 241, 0.8)'
                            }
                        },
                        barWidth: 30,
                        data: data
                    }
                ]
            }

            return option
        }
    }
}
</script>

<style lang="scss" scoped>

.content {
    display: flex;
    flex-direction: row;
    height: calc(100% - 115px);
    width: 100%;
    margin-top: 15px;
    justify-content: space-around;
}
.left-part {
    width: 740px;
    height: calc(100% - 20px);
}

.right-part {
    width: 1135px;
    margin-left: 15px;

    .top {
        height: 460px;
    }
    .bottom {
        margin-top: 10px;
        height: 455px;
    }


    .list-box {
        margin-top: 15px;
        height: 100%;
        display: flex;
        color: #fff;
        flex-direction: row;
        
        .list-data {
            flex-wrap: wrap;
            width: 100%;
            flex-direction: row;
            margin: 10px;
            border: 1px solid #182c4a;
            background: rgba($color: #041130, $alpha: 0.2);
            padding: 15px;

            .item {
                width: 170px;
                margin-right: 10px;
                height: 130px;
                display: inline-block;

                .name {
                    color: #00e8ff;
                }

                .box {
                    margin-top: 10px;
                    overflow: auto;
                    height: 100px;
                    line-height: 22px;
                }
            }
        }
        .label-list {
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            margin-left: 20px;
            text-align: center;
            .item {
                display: flex;
                background: url('../../assets/img/tab-item.png') no-repeat;
                width: 125px;
                height: 33px;
                line-height: 33px;
                justify-content: center;
                color: rgba($color: #00e8ff, $alpha: 0.4);
                transition: all 0.3s;
                cursor: pointer;

                &.act {
                    background: url('../../assets/img/tab-item-act.png') no-repeat;
                    color: rgba($color: #00e8ff, $alpha: 1);
                }
            }
        }
    }
}
.tit-box {
    color: #fff;
    margin-top: 15px;
    display: flex;
    flex-direction: row;
    .label {
        display: flex;
        background: url('../../assets/img/tit-box-1.png') no-repeat;
        width: 126px;
        height: 90px;
        justify-content: center;
        align-items: center;
        font-size: 22px;
        line-height: 24px;
        text-align: center;
        flex-shrink: 0;
        margin-left: 5px;
        cursor: pointer;
    }

    .list {
        background: url('../../assets/img/tit-box-2.png') no-repeat;
        width: 100%;
        margin-left: 15px;
        height: 90px;
        display: flex;
        flex-direction: row;

        &.long {
            background: url('../../assets/img/tit-box-3.png') no-repeat;
        }

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .item {
            display: flex;
            flex-direction: column;
            text-align: center;
            .name {
                color: rgba($color: #fff, $alpha: 0.4);
                font-size: 20px;
            }
            .value {
                margin-top: 10px;
                font-size: 22px;
                color: rgba($color: #00e8ff, $alpha: 0.4);
            }
        }
    }
}
.section {
    display: flex;
    flex-direction: row;
    color: #fff;
    height: 100%;
}
.part-contenr {
    display: flex;
    flex-direction: row;
}

.input-content {
    position: absolute;
    right: 0px;
    width: 310px;
    background: #04102a;
    height: 30px;
    display: flex;
    align-items: center;
    top: 0px;
    justify-content: flex-end;
    padding-right: 10px;

    .ipt-box {
        background: transparent;
        border: 1px solid #0293aa;
        height: 30px;
        padding: 0px 20px;
        border-radius: 20px;
        color: #fff;
        outline: none;
        width: 250px;
    }
    .btn {
        display: flex;
        background: #0293aa;
        border-radius: 20px;
        color: #fff;
        height: 30px;
        flex-shrink: 0;
        width: 70px;
        text-align: center;
        line-height: 35px;
        font-size: 14px;
        font-weight: normal;
        margin-left: 10px;
        justify-content: center;
        cursor: pointer;
    }
}

.result-list {
    position: absolute;
    height: 200px;
    width: 260px;
    background: #fff;
    z-index: 999;
    right: 58px;
    top: 43px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.1);
    ul {
        overflow: auto;
    }
    ul li {
        font-size: 16px;
        line-height: 20px;
        transition: all 0.5s;
        padding: 8px 15px;
        width: calc(100% - 30px);
        white-space: nowrap;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        color: #333;
        &:hover {
        background: #e5e5e5;
        }
    }
    }
</style>