<template>
    <div class="home-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/lthx' }">干部立体画像</el-breadcrumb-item>
                    <el-breadcrumb-item>岗位画像</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>

        <div class="content">
            <div class="left">
                <div class="part content-box">
                    <div class="content-box-title">
                        岗位画像
                    </div>

                    <div class="zw-box" style="margin-top: 10px;font-size: 22px;">
                        <div style="width: 480px;">{{ info && info.zw }}</div>

                        <div class="btn" @click="goHx()">干部画像</div>
                    </div>

                    <div class="info" style="margin-top: 15px;">
                        <img :src="info.photo" alt="" width="160" height="200">
                        <div class="des">
                            {{ info.des }}
                        </div>
                    </div>

                    <div class="tit">岗位历任情况</div>
                    
                    <div class="table-box">
                        <div class="line"></div>
                        <table>
                            <tr>
                                <th style="width: 140px;">任职时间</th>
                                <th style="width: 80px;">姓名</th>
                                <th style="width: 110px;">任前职务</th>
                                <th style="width: 110px;">任后去向</th>
                                <th style="width: 110px;">当前职务</th>
                            </tr>
                        </table>

                        <el-scrollbar style="height: 470px; width: 600px;left: -40px;">
                            <table style="width: 540px;margin-left: 40px;">
                                <colgroup>
                                    <col width="140px" />
                                    <col width="80px" />
                                    <col width="110px" />
                                    <col width="110px" />
                                    <col width="110px" />
                                </colgroup>
                                <tbody>
                                    <tr v-for="(item, index) in info.gwlrqk" :key="index">
                                        <td>
                                            <div class="point-left">
                                                {{ item.rzsj }}
                                            </div>
                                        </td>
                                        <td style="cursor: pointer;color: aqua;" @click="$router.push({path:'/gbhx',query: {id:item.a00}})">{{ item.xm }}</td>
                                        <td>{{ item.rqzw }}</td>
                                        <td>{{ item.rhqx }}</td>
                                        <td>{{ item.dqzw }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </el-scrollbar>
                    </div>
                </div>
            </div>

            <div class="right">
                <div class="content-box part-1">
                   <div class="l">
                        <div class="r-l-part-1">
                            <div class="tit">简要评价</div>
                            <el-scrollbar style="height: 165px;">
                                <div class="nr" v-html="info && info.jypj"></div>
                            </el-scrollbar>
                        </div>
                        <div class="r-l-part-2">
                            <div class="tit">熟悉领域</div>
                            <el-scrollbar style="height: 60px;">
                                <div class="sec_3">
                                    <span class="item" v-for="(item, index) in info.sxly" :key="index">{{item}}</span>
                                </div>
                            </el-scrollbar>
                        </div>
                        <div class="r-l-part-3">
                            <div class="tit">近三年考核情况</div>
                            <el-scrollbar style="height: 70px;">
                                <div class="nr" v-html="info && info.j3nkhqk"></div>
                            </el-scrollbar>
                        </div>
                   </div>

                   <div class="r">
                    <div class="r-r-part-1">
                            <div class="tit">历任经历</div>
                            <el-scrollbar style="height: 165px;">
                               <div class="nr" v-html="info && info.lrjl"></div>
                            </el-scrollbar>
                        </div>
                        <div class="r-r-part-2">
                            <div class="tit">考察材料</div>
                            <el-scrollbar style="height: 200px;">
                                <div class="file-box">
                                    <div class="item" v-for="(item, index) in info.kccl" :key="index">
                                        <img src="../../assets/img/file.png" alt="" srcset="">
                                        <span>{{ item.name }}</span>
                                    </div>
                                </div>
                                
                            </el-scrollbar>
                        </div>
                   </div>
                </div>
                <div class="content-box part-2">
                    <div class="top">
                        <div style="display: flex;justify-content: space-between;align-items: center;">
                            <div class="tit">现任班子</div>
                            <div style="background-color: #0c3655;padding: 10px 20px;cursor: pointer;" @click="$router.push({path:'/bzhx', query:{id:info.bzlx}})">班子画像</div>
                        </div>
                        <div style="height: 200px;">
                            <photoSlider :length="7" :itemWidth="160" :params="xrbz"></photoSlider>
                        </div>
                        
                    </div>

                    <div class="bom">
                        <div class="b-1">
                            <div class="tit">年龄结构</div>
                            <div class="box" style="height: 170px;width: 380px;">
                                <basic-pie :params="nlfb" v-if="loadFlag"></basic-pie>
                            </div>
                            
                        </div>
                        <div class="b-2">
                            <div class="tit">学历结构</div>

                            <div ref="xljg" style="width: 360px;height: 150px;"></div>
                        </div>
                        <div class="b-3">
                            <div class="tit">专业结构</div>
                            <fkqk-bar :data="info.zyjg" v-if="loadFlag"></fkqk-bar>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import photoSlider from '../../components/photoSlider'
import { http_get } from '@/api';
import fkqkBar from './comp/fkqkBar.vue';
import basicPie from '@/components/pie/basicPie.vue'
import * as echart from 'echarts'

export default {
    components: {
        headerBg,
        photoSlider,
        fkqkBar,
        basicPie
    },
    data () {
        return {
            info: {},
            xrbz: {
                data: []
            },
            xljgChart: null,
            loadFlag: false,

            nlfb: {
                boxStyle: {
                    height: "100%",
                    width: "100%"
                },
                showLegend: true,
                showTooltip: true,
                color: ['#00e8ff','#059eef','#ffd200','#ff9800','#6f53fd'],
                center: ['90px', '50%'],
                tooltipPos: [58, 45],
                data: []
            },
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        goHx () {
            this.$router.push({
                path: "/gbhx",
                query: {
                    id: this.info.a00
                }
            })
        },
        init () {
            const id = this.$route.query.id || ''
            // console.log(a00, 9999)
            let url = 'gwhx' + id
            http_get(url).then(res => {
                const _data = res.data.data
                if (res && res.data) {
                    this.info = _data
                    this.xrbz.data = this.info.xrbz

                    this.xljgChart = echart.init(this.$refs.xljg)
                    let option = this.renderBar(this.info.xljg)
                    this.xljgChart.setOption(option)

                    this.nlfb.data = this.info.nljg
                    this.loadFlag = true
                }
            })
        },

        renderBar (data, map = { "qrz": "全日制", "zz": "在职" }) {
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
    }
}
</script>

<style lang="scss" scoped>
.content {
    margin-top: 15px;
    height: calc(100% - 130px);
    width: 100%;
    display: flex;
    flex-direction: row;
    color: #fff;
    .left {
        display: flex;
        height: 100%;
        width: 615px;
        margin-left: 10px;

        .part {
            width: 100%;
        }

        .info {
            display: flex;
            flex-direction: row;
            height: 250px;
            img {
                flex-shrink: 0;
            }
            .des {
                margin-left: 15px;
                line-height: 22px;
            }
        }
    }

    .sec_3 {
        font-size: 16px;
        line-height: 40px;
        text-align: left;

        .item {
            display: inline-block;
            margin: 5px 10px 5px 0px;
            padding: 0px 30px;
            background-color: #027b94;
            color: #ffffff;
            border-bottom-right-radius: 30px;
            border-top-left-radius: 30px;
            border-top-right-radius: 3px;
            border-bottom-left-radius: 3px;
        }
    }

    .tit {
        color: #00e8ff;
        font-size: 20px;
        display: flex;
        flex-direction: row;
        margin: 10px 0px 10px 5px;
        &::before {
            content: "";
            height: 18px;
            width: 18px;
            background: url('../../assets/img/arrow.png') no-repeat;
            display: flex;
            margin-right: 10px;
        }
    }

    .nr {
        line-height: 22px;
    }

    .right {
        display: flex;
        flex-direction: column;
        width: 1250px;
        margin-left: 15px;
        margin-right: 10px;
        .part-1 {
            width: 100%;
            height: 470px;

            display: flex;
            flex-direction: row;

            .l {
                width: 50%;

                .r-l-part-1 {
                    height: 200px;
                }

                .r-l-part-2 {
                    height: 100px;
                }

                .r-l-part-3 {
                    height: 100px;
                }
            }
            .r {
                width: 50%;

                .r-r-part-1 {
                    height: 200px;
                }
                .r-r-part-2 {
                    height: 200px;

                    .file-box {
                        display: flex;
                        flex-wrap: wrap;
                        .item {
                            cursor: pointer;
                            margin: 20px 30px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;

                            >span {
                                margin-top: 15px;
                            }
                        }
                    }
                }
            }
        }

        .part-2 {
            width: 100%;
            height: 470px;
            margin-top: 15px;
            display: flex;
            flex-direction: column;
            .top {
                height: 240px;
            }

            .bom {
                display: flex;
                flex-direction: row;

                .b-1 {
                    width: 33%;
                }
                .b-2 {
                    width: 33%;
                }
                .b-3 {
                    width: 33%;
                }
            }
        }
    }

    .table-box {
        width: 540px;
        height: 560px;
        margin-left: 45px;
        margin-top: 15px;
        position: relative;

        .line {
            position: absolute;
            height: calc(100% - 25px);
            border-left: 2px dashed #027c95;
            left: -23px;
        }
        table {
            width: 100%;
            tr {
                th,td {
                    border: 1px solid #182e4a;
                    padding: 20px 0px;
                    text-align: center;
                    line-height: 22px;
                    vertical-align: middle;
                    .point-left {
                        position: relative;
                        &::before {
                            content: "";
                            height: 10px;
                            width: 10px;
                            left: -40px;
                            position: absolute;
                            display: flex;
                            background: url('../../assets/img/table-point.png') no-repeat;
                        }
                    }
                }
            }
        }
    }

    .zw-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        .btn {
            font-size: 14px;
            background: #0c3655;
            padding: 10px 20px;
            display: flex;
            cursor: pointer;
        }
    }
}
</style>