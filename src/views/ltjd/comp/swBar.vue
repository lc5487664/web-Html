<template>
    <div ref="swBarCharts" style="width:650px;height:300px">

    </div>
</template>

<script>
import * as echarts from "echarts";
import data from '../../../../public/staticData/gbltjd.json'
    export default {
        name: 'sw-bar',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.swBarCharts)
                this.init()
            });
        },
        methods: {
            init() {
                const colors= ['#00e8ff', '#ff9800','#696d7b']
                    const xData = data.sw.map(item=> item.name)
                    const data1 = data.sw.map(item=> item.value1)
                    const data2 = data.sw.map(item=> item.value2)
                    const data3 = data.sw.map(item=> item.value3)
                this.option = {
                   color: colors,
                    grid: {
                        left: "10%",
                        right: "5%",
                        bottom: "15%"
                    },
                    tooltip: {
                        show: true,
                        padding: 15,
                        backgroundColor: '#fff',
                        trigger: 'axis',
                        valueFormatter: (value) =>  value + '%',
                        extraCssText: 'line-height:25px;color: #333;border: 1px solid #cccccc;font-weight: normal'
                    },
                    legend: {
                        show: true,
                        orient: "horizontal",
                        width: '100%',
                        icon: "rect",
                        itemWidth: 12,
                        itemHeight: 12,
                        textStyle: {
                            fontSize: 14,
                            color: "#fff"
                        },
                        data: ['市丢选人用人好评率', '新提拔市管干部认同率', '市丢从严管理监督好评率']
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
                    type: 'value',
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
                        fontSize: 14,
                        formatter: '{value}%',
                    }
                },
                series: [
                    {
                        name: '市丢选人用人好评率',
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: true,
                            position: 'outside',
                            color:'#fff',
                            formatter: '{c}%'
                        },
                        itemStyle: {
                            color: colors[0] + '50',
                            borderWidth: 1,
                            borderColor: colors[0]
                        },
                        data: data1
                    },
                    {
                        name: '新提拔市管干部认同率',
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        barGap: '120%',
                        z: 1,
                        label: {
                            show: true,
                            position: 'outside',
                            color:'#fff',
                            formatter: '{c}%'
                        },
                        itemStyle: {
                            color: colors[1] + '50',
                            borderWidth: 1,
                            borderColor: colors[1]
                        },
                        data: data2
                    },
                    {
                        name: '市丢从严管理监督好评率',
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: true,
                            position: 'outside',
                            color:'#fff',
                            formatter: '{c}%'
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