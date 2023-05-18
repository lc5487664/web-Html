<template>
    <div class="home-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item >泉城好干部</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>
        <div class="content">
            <!-- left -->
            <div class="left_part">
                <div class="part">
                    <div class="title">干部队伍整体情况分析</div>
                    <div class="part_content" style="height: 290px;">
                        <div class="tip">
                            <span>在库干部总数：</span>
                            <number class="number-word" :incNumber="zk_total" :incNumberColor="incNumberColor"></number>
                        </div>
                        <div class="box-1">
                            <div class="item" v-for="(item, index) in zkgb_1" :key="index">
                                <img src="../../assets/img/home-bg4.png" alt="">
                                <div class="item-r">
                                    <span>{{ item.value }}<i class="unit">人</i></span>
                                    <span>{{ item.name }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="box-2">
                            <div class="item" v-for="(item, index) in zkgb_2">
                                <div class="label">{{ item.name }}</div>
                                <div class="bg">
                                    <div class="val" :style="{width:calcPrecent(item)}"></div>
                                </div>
                                <div class="nums">{{ item.value }}人</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="part">
                    <div class="title">市管干部整体情况分析</div>
                    <div class="part_content" style="height: 250px;">
                        <div class="section_1">
                            <div class="label">{{ sggbztqk_1.name }}</div>
                            <div class="list">
                                <div class="item" v-for="(item, index) in sggbztqk_1.list" :key="index">
                                    <span class="name">{{ item.name }}</span>
                                    <span class="value">{{ item.value }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="section_2">
                            <div class="label">{{ sggbztqk_2.name }}</div>
                            <div class="list">
                                <div class="item" v-for="(item, index) in sggbztqk_2.list" :key="index">
                                    <span class="name">{{ item.name }}</span>
                                    <span class="value">{{ item.value }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="part">
                    <div class="title">中层干部整体情况分析</div>
                    <div class="part_content" style="height: 300px;">
                        <div ref="zcgbRef" style="height: 100%;width: 100%;"></div>
                    </div>
                </div>
            </div>

            <!-- center -->
            <div class="center_part">
                <div class="part" style="margin-top: 50px;">
                    <div class="p_1">
                        <span class="menu-item" @click="goPath('ltgh')">干部<br>立体规划</span>
                        <span class="menu-item" @click="goPath('ltpy')">干部<br>立体培养</span>
                    </div>
                    <div class="p_2">
                        <span class="menu-item"  @click="goPath('lthx')">干部<br>立体画像</span>
                    </div>
                    <div class="p_3">
                        <span class="menu-item"  @click="goPath('ltkh')">干部<br>立体考核</span>
                        <span class="menu-item"  @click="goPath('ltjd')">干部<br>立体监督</span>
                    </div>
                </div>
                <div class="part" style="margin-top: 60px;">
                    <div class="title">编制情况</div>
                    <div class="part_content">
                        <div class="js-tip">
                            <span>总体情况</span>
                            <div>
                                <div class="item">
                                    <span class="name">核定基数</span>
                                    <span class="value">{{ bzqk_ztqk.hdjs || 0 }}</span>
                                </div>
                                <div class="item">
                                    <span class="name">实有人数</span>
                                    <span class="value">{{ bzqk_ztqk.syrs || 0 }}</span>
                                </div>
                                <div class="item" >
                                    <span class="name">空缺人数</span>
                                    <span class="value">{{ bzqk_ztqk.kqrs || 0 }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="table-box">
                            <table>
                                <tr>
                                    <th>单位</th>
                                    <th>核定基数</th>
                                    <th>实有人数</th>
                                    <th>空缺人数</th>
                                </tr>

                                <tr v-for="(item, index) in list_1" :key="index">
                                    <td>{{ item.unitName }}</td>
                                    <td>{{ item.hdjs }}</td>
                                    <td>{{ item.syrs }}</td>
                                    <td>{{ item.kqrs }}</td>
                                </tr>
                            </table>
                            <table>
                                <tr>
                                    <th>单位</th>
                                    <th>核定基数</th>
                                    <th>实有人数</th>
                                    <th>空缺人数</th>
                                </tr>

                                <tr v-for="(item, index) in list_2" :key="index">
                                    <td>{{ item.unitName }}</td>
                                    <td>{{ item.hdjs }}</td>
                                    <td>{{ item.syrs }}</td>
                                    <td>{{ item.kqrs }}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- right -->
            <div class="right_part">
                <div class="part">
                    <div class="title">公务员</div>
                    <div class="part_content" style="height: 290px;">
                        <div class="tip">
                            <span>公务员在库人数：</span>
                            <number class="number-word" :incNumber="gwy_total" :incNumberColor="incNumberColor"></number>
                        </div>
                        <zyhgbPie :data="gwyData" v-if="loadFlag"></zyhgbPie>
                    </div>
                </div>
                <div class="part">
                    <div class="title">事业人员</div>
                    <div class="part_content" style="height: 300px;">
                        <div class="tip">
                            <span>事业单位在库干部人数：</span>
                            <number class="number-word" :incNumber="sydw_total" :incNumberColor="incNumberColor"></number>
                        </div>
                        <div ref="syryRef" style="height: 250px;width: 100%;"></div>
                    </div>
                </div>
                <div class="part">
                    <div class="title">企业人员</div>
                    <div class="part_content" style="height: 230px;">
                        <div class="tip">
                            <span>企业人员干部在库人数：</span>
                            <number class="number-word" :incNumber="qyry_total" :incNumberColor="incNumberColor"></number>
                        </div>

                        <div class="qyry-list">
                            <div class="item" v-for="(item, index) in qyry_list" :key="index">
                                <img src="../../assets/img/home-bg2.png" alt="">
                                <div style="display: flex;flex-direction: column;">
                                    <span class="name">{{ item.name }}</span>
                                    <span style="margin-top: 5px;font-size: 18px;color: #00ffff;">{{ item.value }} <i class="unit">人</i></span>
                                </div>
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
import number from './comp/number.vue'
import zyhgbPie from './comp/zyhgbPie.vue'
import { http_get } from '@/api';
import * as echart from 'echarts'

export default {
    name: "home-container-view",
    components: {
        headerBg,
        number,
        zyhgbPie
    },
    data () {
        return {
            loadFlag: false,
            incNumberColor: "#00ffff",
            text: '',
            zk_total: 0,
            zkgb_1: [],
            zkgb_2: [],

            sggbztqk_1: {
                name: "",
                list: []
            },
            sggbztqk_2: {
                name: "",
                list: []
            },
            bzqk_ztqk: {},
            qyry_list: [],
            gwy_total: 0,
            sydw_total: 0,
            qyry_total: 0,
            gwyData: [],

            zcgbChart: null,
            syryChart: null,
            list_1: [],
            list_2: []
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        goPath (url) {
            this.$router.push({
                path: url
            })
        },
        init () {
            http_get('home_page').then(res => {
                console.log(res)
                const _data = res.data.data
                this.zk_total = _data.zkgb && _data.zkgb.total
                this.zkgb_1 = _data.zkgb && _data.zkgb.list_1
                this.zkgb_2 = _data.zkgb && _data.zkgb.list_2

                this.sggbztqk_1 = _data.sggbztqk_1
                this.sggbztqk_2 = _data.sggbztqk_2

                this.bzqk_ztqk = _data.bzqk_ztqk
                this.qyry_list = _data.qyry.list
                this.gwy_total = _data.gwy && _data.gwy.total
                this.sydw_total = _data.syry && _data.syry.total
                this.qyry_total = _data.qyry && _data.qyry.total
                this.gwyData = _data.gwy && _data.gwy.list

                this.syryChart = echart.init(this.$refs.syryRef)
                let syOption = this.renderSyry(_data.syry.list)
                this.syryChart.setOption(syOption)

                this.list_1 = _data.bzqk_list.slice(0, 5)
                this.list_2 = _data.bzqk_list.slice(5, 10)
                
                this.zcgbChart = echart.init(this.$refs.zcgbRef)
                let option = this.renderZcgb(_data.zcgbztqkfx)
                this.zcgbChart.setOption(option)
                this.loadFlag = true
            })
        },
        calcPrecent (item) {
            if (item.value) {
                return `${(Number(item.value) / Number(item.total) * 100).toFixed(2)}%`
            } else {
                return '0%'
            }
        },
        renderZcgb (data) {
            let map = {
                "zczz": "中层正职",
                "zcfz": "中层副职"
            }
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
                        show: false
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
                    left: "5%",
                    right: "5%",
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
                    top: "3%",
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

        // 事业人员
        renderSyry (data) {
            const colors = ['#00e8ff', '#ff9800']
            let axisData = data.map(item => item.name)

            let option = {
                color: colors,
                grid: {
                    left: "10%",
                    right: "5%",
                    bottom: "15%"
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
    margin-top: 15px;
    height: calc(100% - 15px);
    width: 100%;
    display: flex;
    flex-direction: row;
    .left_part {
        width: 495px;
        height: 100%;
    }
    .center_part {
        width: 830px;
        height: 100%;
        margin: 0px 20px;
    }
    .right_part {
        width: 495px;
        height: 100%;
    }
    .part {
        .title {
            width: 100%;
            font-weight: bold;
            font-size: 18px;
            color: #fff;
            display: flex;
            flex-direction: row;
            align-items: center;
            height: 45px;
            background: url('../../assets/img/bt-right.png') no-repeat;
            background-size: auto;
            background-position: center right;
            &::before {
                content: "";
                height: 43px;
                width: 43px;
                display: flex;
                background: url('../../assets/img/bt-left.png') no-repeat;
            }

        }

        .part_content {
            border-top: 1px solid #666b7a;
        }

        .p_1,
        .p_3 {
            display: flex;
            flex-direction: row;
            justify-content: space-around;
        }
        .p_2 {
            display: flex;
            justify-content: center;
        }
        .menu-item {
            background: url('../../assets/img/home-bg1.png') no-repeat;
            height: 164px;
            width: 210px;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 30px;
            text-align: center;
            font-weight: bold;
            line-height: 34px;
            text-shadow: 0 0 10px #00a7c0,0 0 20px #00a7c0,0 0 30px #00a7c0,0 0 40px #00a7c0;
            margin-top: 10px;
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
                font-size: 32px;
                line-height: 35px;
            }
        }
    }

    .tip {
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 15px;

        .number-word {
            letter-spacing: 5px;
        }
    }

    .box-1 {
        display: flex;
        flex-direction: row;
        width: 100%;
        margin-top: 20px;

        .item {
            display: flex;
            color: #fff;
            flex-direction: row;
            align-items: center;
            margin: 0px 10px;

            .item-r {
                display: flex;
                flex-direction: column;
                margin-left: 10px;

                span {
                    line-height: 20px;
                }
            }
        }
    }

    .box-2 {
        .item {
            color: #fff;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            margin: 20px 0px;
            .label {
                width: 100px;
            }
            .bg {
                margin-left: 10px;
                position: relative;
                background: #2ea6ff;
                height: 12px;
                width: 305px;
                .val {
                    position: absolute;
                    background: #08f5f6;
                    height: 12px;
                }
            }
            .nums {
                margin-left: 10px;
            }
        }
    }
    .section_2,
    .section_1 {
        display: flex;
        flex-direction: row;
        color: #fff;
        align-items: center;
        margin: 8px 0px;

        .label {
            writing-mode: tb;
            color: #00fdff;
            font-size: 16px;
            flex-shrink: 0;
            line-height: 20px;
            letter-spacing: 5px;
        }
        .list {
            display: flex;
            flex-wrap: wrap;
            margin-left: 10px;

            .item {
                display: flex;
                flex-direction: column;
                height: 40px;
                width: 100px;
                margin: 8px;
                text-align: center;

                .value {
                    color: #00fdff;
                    margin-top: 8px;
                }
            }
        }
    }

    .section_2 {
        .list {
            .item {
                width: 60px;
            }
        }
    }

    .js-tip {
        display: flex;
        color: #fff;
        flex-direction: row;
        align-items: center;

        >div {
            display: flex;
            flex-direction: row;
            
            .item {
                margin: 0px 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                width: 140px;
                height: 80px;
                background: url('../../assets/img/home-bg3.png') no-repeat;
                background-position: center bottom;

                .value {
                    color: #00fdff;
                    font-size: 20px;
                    margin-top: 5px;
                    font-weight: bold;
                }
            }
        }
    }

    .qyry-list {
        display: flex;
        color: #fff;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .item {
            margin-top: 40px;
            display: flex;
            flex-direction: row;
            align-items: center;

            .name {
                background: url('../../assets/img/hone-item-bg.png') no-repeat;
                background-size: 100%;
                width: 89px;
                height: 20px;
                display: flex;
                background-position: center bottom;
            }
        }
    }

    .table-box {
        color: #fff;
        display: flex;
        flex-direction: row;
        margin-top: 15px;
        justify-content: space-between;
        table {
            width: 49%;
            
            tr {
                text-align: center;
                th {
                    border: 1px solid rgba($color: #152a4e, $alpha: 1);
                    padding: 8px 10px;
                    color: #00e8ff;
                    font-size: 16px;
                }
                td {
                    padding: 8px 10px;
                    text-align: center;
                    border: 1px solid rgba($color: #152a4e, $alpha: 1);
                }
            }
        }
    }

    .unit {
        font-size: 14px;
    }
}
</style>