<template>
    <div ref="pictorialBar" style="height:200px;width: 500px;">

    </div>
</template>

<script>
import * as echarts from "echarts";
    export default {
       name: 'pictorialBar',
       data() {
        return {
            myChart: '',
            option: {}
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
                    top: '5%',
                    left: '5%',
                    bottom: '5%',
                    right: '5%',
                    containLabel: true,
                },
                xAxis: {
                    data: ["市直机关", "县(市,区)", "国企", "高校"],
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#fff'
                        },
                        margin: 10, //刻度标签与轴线之间的距离。
                    },

                },
                yAxis: {
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
                            color: '#fff'
                        },
                    },
                    minInterval: 10,
                    max: function(value) {
                        return value.max + 10
                    }
                },
                series: [{
                    // name: '上底面',
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
                    data: [16, 22,22, 30],

                }, {
                    // name: '下底面',
                    type: 'pictorialBar',
                    symbolSize: [30, -10],
                    symbolOffset: [0, 0],
                    z: 12,
                    itemStyle: {
                        normal: {
                            color: '#00ebf9'
                        }
                    },
                    data: [16, 22,22, 30]
                }, {
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
                    data: [16, 22,22, 30]
                }]
            };
        this.myChart.setOption(this.option)
        }
       },
    }
</script>

<style lang="scss" scoped>

</style>