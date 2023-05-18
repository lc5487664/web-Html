<template>
    <div ref="ztqkBar" style="width: 350px;height: 150px;">

    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: 'ztqkBar',
    props: {
        data: {
            type: Array,
            defalut () {
                return []
            }
        }
    },
    data() {
        return {
            myChart: '',
            option: {}
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.myChart = echarts.init(this.$refs.ztqkBar)
            this.init()
        });
    },
    methods: {
        init() {
            if (!this.data) {
                return
            }
            let xData = this.data.map(item => item.name)
            let max = 0
            let yData = this.data.map(item => {
                if (item.value > max) {
                    max = item.value
                }
                return Number(item.value)
            })
            let maxData = []
            this.data.forEach(item => {
                maxData.push(Number(max))
            })
            console.log('maxData',maxData)
            this.option = {
                xAxis: {
                    data: xData,
                    axisLabel: {
                        fontSize: 14,
                        margin: 10,
                        color: 'white',
                    }
                },
                yAxis: {
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#ffffff',
                            opacity: 0.2,
                            width: 1,
                        }
                    },
                    minInterval: 1,
                    axisLabel: {
                        color: "#fff",
                        fontSize: 14,
                    }
                },
                color: [
                    "#63caff",
                    "#49beff",
                    "#03387a",
                    "#03387a",
                    "#03387a",
                    "#6c93ee",
                    "#a9abff",
                    "#f7a23f",
                    "#27bae7",
                    "#ff6d9d",
                    "#cb79ff",
                    "#f95b5a",
                    "#ccaf27",
                    "#38b99c",
                    "#93d0ff",
                    "#bd74e0",
                    "#fd77da",
                    "#dea700"],
                grid: {
                    top: '35',
                    left: '10px',
                    bottom: '10px',
                    right: '10px',
                    containLabel: true,
                },
                series: [
                    {
                        data: yData,
                        type: 'bar',
                        barWidth: 30,
                        barMaxWidth: 'auto',
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                fontSize: 16,
                                color: '#fff',
                                offset: [0, -10],
                            },
                        },
                        itemStyle: {
                            color: {
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                type: 'linear',
                                global: false,
                                colorStops: [
                                    {
                                        offset: 0,
                                        color: '#0b9eff'
                                    },
                                    {
                                        offset: 1,
                                        color: '#63caff'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        data: [1, 1, 1],
                        type: 'pictorialBar',
                        barMaxWidth: '20',
                        symbol: 'diamond',
                        symbolOffset: [0, '50%'],
                        symbolSize: [30, 15]
                    },
                    {
                        data: yData,
                        type: 'pictorialBar',
                        barMaxWidth: '20',
                        symbolPosition: 'end',
                        symbol: 'diamond',
                        symbolOffset: [0, '-50%'],
                        symbolSize: [30, 12],
                        zlevel: 2
                    },
                    {
                        data: maxData,
                        type: 'bar',
                        barWidth: 30,
                        barMaxWidth: 'auto',
                        barGap: '-100%',
                        label: {
                        },
                        zlevel: -1
                    },
                    {
                        data: [1, 1, 1],
                        type: 'pictorialBar',
                        barMaxWidth: '20',
                        symbol: 'diamond',
                        symbolOffset: [0, '50%'],
                        symbolSize: [30, 15],
                        zlevel: -2
                    },
                    {
                        data: maxData,
                        type: 'pictorialBar',
                        barMaxWidth: '20',
                        symbolPosition: 'end',
                        symbol: 'diamond',
                        symbolOffset: [0, '-50%'],
                        symbolSize: [30, 12],
                        zlevel: 1
                    },
                ]
            }
            this.myChart.setOption(this.option)
        }
    },
}
</script>

<style lang="scss" scoped></style>