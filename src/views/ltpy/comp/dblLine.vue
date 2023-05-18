<template>
    <div ref="dblLineCharts" style="width:500px;height:250px">

    </div>
</template>

<script>
import * as echarts from "echarts";
import data from '../../../../public/staticData/gbltpy.json'
    export default {
        name: 'dbl-line',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.dblLineCharts)
                this.init()
            });
        },
        methods: {
            init() {
                console.log(data,888888)
                let xData = data.dbl.map(item=>item.name)
                let yData = data.dbl.map(item=>item.value)
                this.option = {
                    tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                    xAxis: {
                            data: xData,
                            axisLine: {
                            show: true
                        },
                        axisLabel: {
                            color: '#fff'
                        }
                    },
                    yAxis: {
                        axisLine: {
                            show: true
                        },
                        splitLine: {
                            show:false
                        },
                        axisLabel: {
                            color: '#fff'
                        }
                    },
                    grid: {
                        top: '20px',
                        bottom: '40px',
                        right:'20px'
                    },
                    series: [{
                        name: '达标率',
                        type: 'line',
                        symbol: "rect",
                        label: {
                            show: true,
                            color: '#fff'
                        },
                        lineStyle: {
                            opacity: 0
                        },
                        areaStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(0, 210, 233, 1)' // 折线底下区域渐变色
                                }, {
                                    offset: 0.8,
                                    color: 'rgba(0,210, 233, 0.1)' // 折线底下区域渐变色
                                }], false)
                            }
                        },
                        data:yData
            }]
                }
                this.myChart.setOption(this.option)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>