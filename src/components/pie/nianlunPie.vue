<template>
    <div ref="nianlunPie" style="width: 550px;height: 220px;"></div>
</template>

<script>
import * as echarts from "echarts";
    export default {
        name: 'nianlunPie',
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
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.nianlunPie)
                this.init()
            });
        },
        methods: {
            init() {
                // const params =this.parmas
                let color = ['#FF8700', '#ffc300', '#00e473', '#009DFF', '#0034ff'];
                let data = [
                    {name: '中层副职',value: 55},
                    {name: '中层正职',value: 25},
                    {name: '市管副职',value: 35},
                    {name: '市管正职',value: 45},
                ]
                let sum = 0;
                let pieSeries = [],
                    lineYAxis = [];

                // 数据处理
                data.forEach((v) => {
                    sum = sum + v.value;
                });

                // 图表option整理
                data.forEach((v, i) => {
                    pieSeries.push({
                        name: 'color',
                        type: 'pie',
                        clockWise: true,
                        hoverAnimation: false,
                        radius: [70 - i * 10 + '%', 71.5 - i * 10 + '%'],
                        center: ['40%', '40%'],
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            borderRadius: 20,
                        },
                        data: [
                            {
                                value: v.value,
                                name: v.name,
                                itemStyle: {
                                    normal: {
                                        borderWidth: 5,
                                        borderColor:color[i]
                                    }
                                }
                            },
                            {
                                value: sum - v.value,
                                name: '',
                                itemStyle: {
                                    color: 'rgba(0,0,0,0)',
                                },
                            },
                        ],
                    });
                    pieSeries.push({
                        name: '',
                        type: 'pie',
                        silent: true,
                        z: 1,
                        clockWise: true, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [70 - i * 10 + '%', 71.5 - i * 10 + '%'],
                        center: ['40%', '40%'],
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            borderCap: 'round',
                            borderJoin: 'round',
                        },
                        data: [
                            {
                                value: sum,
                                itemStyle: {
                                    color: 'rgba(128,239,246,0.6)',
                                },
                            }
                        ],
                    });
                    v.percent = ((v.value / sum) * 100).toFixed(1) + '%';
                    lineYAxis.push({
                        value: i,
                        textStyle: {
                            rich: {
                                circle: {
                                    color: color[i],
                                    padding: [0, 5],
                                },
                            },
                        },
                    });
                });
                this.option = {
                    color: color,
                    grid: {
                        top: '100px',
                        bottom: '5%',
                        left: '5%',
                        containLabel: false,
                    },
                    legend: {
                        orient: 'vertical',
                        right: '40px',
                        top: '20px',
                        icon: 'circle',
                        itemGap: 20,
                        textStyle: {
                            fontSize:  16,
                            color:  '#fff',
                        },
                        data: data.map(item => item.name)
                    },
                    series: pieSeries
                }
                this.myChart.setOption(this.option)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>