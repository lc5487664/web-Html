<template>
    <div ref="ztqkBar" style="width: 350px;height: 250px;">

    </div>
</template>

<script>
import * as echarts from "echarts";
import data from '../../../../public/staticData/gbltgh.json'
    export default {
        name: 'ztqkBar',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.ztqkBar)
                this.init()
            });
        },
        methods: {
            init() {
                let xData = data.nsf.ztqk.map(item=>item.name)
                let yData = data.nsf.ztqk.map(item=>item.value)
                this.option = {
                    xAxis: {
                        data: xData,
                        axisLabel: {
                            fontSize: 14,
                            margin: 10,
                            color: 'white',
                        }
                    },
                    yAxis:{
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#ffffff',
                                opacity: 0.2,
                                width: 1,
                            },
                            
                        },
                        nameGap: 20,
                        minInterval: 10,
                        max: function(value) {
                            return value.max + 10
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
                        top: '5%',
                        left: '10px',
                        bottom: '20px',
                        right: '10px',
                        containLabel: true,
                    },
                    series:[
                        {
                            data:yData,
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
                                    x:0,
                                    y:0,
                                    x2:0,
                                    y2:1,
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
                            data: [1,1,1],
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
                            data:[30,30,30],
                            type: 'bar',
                            barWidth: 30,
                            barMaxWidth: 'auto',
                            barGap: '-100%',
                            label: {
                                // normal: {
                                //     show: true,
                                //     position: 'top',
                                //     fontSize: 16,
                                //     color: '#fff',
                                //     offset: [0, -10],
                                // },
                            },
                            zlevel: -1
                        },
                        {
                            data: [1,1,1],
                            type: 'pictorialBar',
                            barMaxWidth: '20',
                            symbol: 'diamond',
                            symbolOffset: [0, '50%'],
                            symbolSize: [30, 15],
                            zlevel: -2
                        },
                        {
                            data: [30,30,30],
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

<style lang="scss" scoped>

</style>