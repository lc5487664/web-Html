<template>
    <div ref="pictorialBar" style="height:250px;width: 600px;">

    </div>
</template>

<script>
import * as echarts from "echarts";
// import data from '../../../../public/staticData/bzhx.json'
    export default {
       name: 'pictorialBar',
       props: {
            params: {
                    type: Array,
                    default (){
                        return []
                    }
                },
       },
       data() {
        return {
            myChart: '',
            option: {}
        }
       },
       watch: {
        params:function (val) {
            this.init()
        }
       },
       mounted () {
        this.$nextTick(() => {
            this.myChart = echarts.init(this.$refs.pictorialBar)
            this.init()
        });
       },
       methods: {
        init() {
            let xData = this.params.map(item=>item.year)
            let yData = this.params.map(item=>item.value)
            this.option = {
                // title: {
                //     text: '3D柱状图',
                //     x: 'center'
                // },
                // backgroundColor: '#fff',
                tooltip: {
                    trigger: 'item',
                },
                grid: {
                    top: '25%',
                    left: '5%',
                    bottom: '5%',
                    right: '5%',
                    containLabel: true,
                },
                legend: {
                    data: ["民主测评优秀率", "班子量化得分"],
                    top: "2%",
                    right: '10%',
                    textStyle: {
                        color: "#fff",
                        fontSize: 14
                    }
                },
                xAxis: {
                    data: xData,
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff',
                            fontSize:16
                        },
                        margin: 10, //刻度标签与轴线之间的距离。
                    },

                },
                yAxis: [
                    {   
                        // type: 'value',
                        name: '(分)',
                        nameTextStyle: {
                            color: '#fff',
                            fontSize:16,
                            padding: [0,40,0,0]
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#fff',
                                opacity: 0.2,
                                width: 1,
                            },
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#fff',
                                fontSize:16
                            },
                        }
                    },
                    {   
                        type: "value",
                        name: '(%)',
                        nameTextStyle: {
                            color: "#fff",
                            fontSize: 16,
                            padding: [0,0,0,40]
                        },
                        position: "right",
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                                fontSize: 16
                            }
                        }
                    },
                ],
                series: [
                {
                    name: "民主测评优秀率",
                    type: "line",
                    yAxisIndex: 1, //使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
                    smooth: true, //平滑曲线显示
                    showAllSymbol: true, //显示所有图形。
                    symbol: "circle", //标记的图形为实心圆
                    symbolSize: 10, //标记的大小
                    itemStyle: {
                        //折线拐点标志的样式
                        color: "#F08E4C",
                        borderColor: "#F08E4C",
                        width: 1,
                    },
                    lineStyle: {
                        color: "#F08E4C",
                        width: 1,
                        shadowColor: "#F08E4C",
                        shadowBlur: 1
                    },
                    data: yData
                },
                {
                    name: '班子量化得分',
                    type: 'pictorialBar',
                    symbolSize: [30, 15],
                    symbolOffset: [0, -5],
                    z: 12,
                    symbolPosition: 'end',
                    itemStyle: {
                        normal: {
                            color: '#00a7d7'
                        }
                    },
                    data: yData,

                }, {
                    name: '班子量化得分',
                    type: 'pictorialBar',
                    symbolSize: [30, -10],
                    symbolOffset: [0, 0],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#00ebf9'
                        }
                    },
                    data: yData
                }, {
                    name: '班子量化得分',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            fontSize: 16,
                            color: '#fff',
                            offset: [0, -5],
                        },
                    },
                    itemStyle: {
                        normal: {
                        color: function(){
                                return new echarts.graphic.LinearGradient(0,0,0,1,[{offset: 0,color:'#00c3e5'},{offset: 1,color:'#00ebf9'}])
                        }
                    }
                    },
                    barWidth: 30,
                    data: yData
                }
            ]
            };
        this.myChart.setOption(this.option)
        }
       },
    }
</script>

<style lang="scss" scoped>

</style>