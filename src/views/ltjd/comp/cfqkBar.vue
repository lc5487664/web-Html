<template>
    <div ref="cfqkBarCharts" style="width:600px;height:300px">

    </div>
</template>

<script>
import * as echarts from "echarts";
    export default {
        name: 'cfqkBarCharts',
        props: {
            params: {
                type: Object,
                default(){
                    return {}
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
                this.myChart = echarts.init(this.$refs.cfqkBarCharts)
                this.init()
            });
        },
        methods: {
            init() {
                let data = this.params
                let xData = data.list.map(item => item.name)
                let data1 = data.list.map(item => item.value[0])
                let data2 = data.list.map(item => item.value[1])
                let data3 = data.list.map(item => item.value[2])
                const colors= ['#00e8ff', '#ff9800','#696d7b']
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
                        valueFormatter: (value) =>  value + '人',
                        extraCssText: 'line-height:25px;color: #333;border: 1px solid #cccccc;font-weight: normal'
                    },
                    legend: {
                        show: true,
                        orient: "horizontal",
                        width: '100%',
                        icon: "rect",
                        itemWidth: 12,
                        itemHeight: 12,
                        itemGap:40,
                        right: 40,
                        textStyle: {
                            fontSize: 14,
                            color: "#fff"
                        },
                        data: data.years
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
                        // formatter: '{value}%',
                    }
                },
                series: [
                    {
                        name: data.years[0],
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: true,
                            position: 'top',
                            color:'#fff',
                        },
                        itemStyle: {
                            color: colors[0] + '50',
                            borderWidth: 1,
                            borderColor: colors[0]
                        },
                        data: data1
                    },
                    {
                        name: data.years[1],
                        type: 'bar',
                        barWidth: "15",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        barGap: '60%',
                        z: 1,
                        label: {
                            show: true,
                            position: 'top',
                            color:'#fff',
                        },
                        itemStyle: {
                            color: colors[1] + '50',
                            borderWidth: 1,
                            borderColor: colors[1]
                        },
                        data: data2
                    },
                    {
                        name: data.years[2],
                        type: 'bar',
                        barWidth: "20",
                        xAxisIndex: 0,
                        yaxisIndex: 0,
                        z: 1,
                        label: {
                            show: true,
                            position: 'top',
                            color:'#fff',
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