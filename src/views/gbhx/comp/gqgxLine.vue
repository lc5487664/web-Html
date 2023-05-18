<template>
    <div ref="gqgxLineCharts" style="width:100%;height:100%">

    </div>
</template>

<script>
import * as echarts from "echarts";
    export default {
        name: 'gqgxLineCharts',
        props: {
            params: {
            type: Array,
            default(){
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
            params: function(){
                this.init()
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.gqgxLineCharts)
                this.init()
            });
        },
        methods: {
            init() {
                let xData, yData
                if (this.params.length) {
                    xData = this.params.map(item => item.name)
                    yData = this.params.map(item => item.value)
                }
                console.log(xData, 6666)
                this.option = {
                    tooltip: {
                        trigger: 'axis',
                        valueFormatter: (value) =>  value + '%',
                        axisPointer: {
                            lineStyle: {
                                color: '#fff'
                            }
                        }
                    },
                    xAxis: {
                        data:xData,
                        axisLine: {
                            show: true
                        },
                        axisLabel: {
                            color: '#fff',
                            fontSize: 14
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
                            color: '#fff',
                            formatter: '{value}%',
                            fontSize: 14
                        }
                    },
                    grid: {
                        top: '50px',
                        bottom: '25px',
                        right: "10px"
                    },
                    series: [{
                        name: '',
                        type: 'line',
                        symbol: "rect",
                        label: {
                            show: true,
                            color: '#fff',
                            fontSize: 14,
                            align: 'center',
                            formatter(params) {
                                console.log(params)
                                return params.value + '% \n' + params.data.pm
                            }
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
                        data: this.params
            }]
                }
                this.myChart.setOption(this.option)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>