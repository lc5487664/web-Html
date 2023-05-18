<template>
    <div ref="barCharts" :style="itemStyle"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'barCharts',
    props: {
        itemStyle: {
            type: Object,
            default() {
                return {
                    width: '300px',
                    height: '200px'
                }
            }
        },
        params: {
            type: Object,
            default() {
                return {}
            }
        },
    },
    data() {
        return {
            key: 1,
            myChart: '',
            option: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            console.log(this.$refs)
            this.myChart = echarts.init(this.$refs.barCharts)
            this.init()
        });
    },
    methods: {
        init() {
            let params = this.params
            let xData = params.data.map(item => item.name)
            let yData = params.data.map(item => item.value)
            this.option = {
                xAxis: {
                    data: xData,
                    axisLine: {
                        show: false,
                    },
                    axisLabel: {
                        fontSize: 12,
                        interval: 0,
                        margin: 10,
                        color: 'white',
                    },
                },
                yAxis: [{
                    name: '2',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#077bc5',
                            width: 2
                        }
                    },
                    axisLabel: {
                        fontSize: 14,
                        margin: 10,
                        color: 'white',
                    },
                    // nameGap: 20,
                    minInterval: 20,
                    max: function (value) {
                        return value.max + 20
                    }
                }, {
                    name: '1',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: '#077bc5',
                            width: 2
                        }
                    },
                }],
                grid: {
                    top: '10%',
                    left: '5px',
                    bottom: '10%',
                    right: '10',
                    containLabel: true,
                },
                series: [
                    {
                        type: 'bar',
                        data: yData,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize: 16,
                                color: '#fff',
                                offset: [0, -10],
                            },
                        },
                        barWidth: 25,
                        showBackground: true,
                        itemStyle: {
                            normal: {
                                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, 
                                // [{offset: 0, color: '#00dcff'}, {offset: 1, color: 'red'}]),
                                color: '#00dcff'
                            }
                        },
                    },

                ]
            }
            this.myChart.setOption(this.option)
        }
    },
}
</script>

<style lang="scss" scoped></style>