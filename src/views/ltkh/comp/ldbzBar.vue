<template>
    <div ref="ldbzBarCharts" style="width:650px;height:400px">

    </div>
</template>

<script>
import * as echarts from "echarts";
import data from '../../../../public/staticData/gbltkh.json'
    export default {
        name: 'ldbz-bar',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.ldbzBarCharts)
                this.init()
            });
        },
        methods: {
            init() {
                const colors= ['#00e8ff', '#ff9800','#696d7b']
                    const xData = data.ldbzcjd.map(item=> item.name)
                    const data1 = data.ldbzcjd.map(item=> item.value1)
                    const data2 = data.ldbzcjd.map(item=> item.value2)
                    const data3 = data.ldbzcjd.map(item=> item.value3)
                this.option = {
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
                        data: ['优秀', '良好', '一般']
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
                    data: xData
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
                series: [
                    {
                        name: '优秀',
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: colors[0] + '50',
                            borderWidth: 1,
                            borderColor: colors[0]
                        },
                        data: data1
                    },
                    {
                        name: '良好',
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: colors[1] + '50',
                            borderWidth: 1,
                            borderColor: colors[1]
                        },
                        data: data2
                    },
                    {
                        name: '一般',
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: false
                        },
                        itemStyle: {
                            color: colors[2] + '50',
                            borderWidth: 1,
                            borderColor: colors[2]
                        },
                        data: data3
                    }
                ]
            }

    
                this.myChart.setOption(this.option)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>