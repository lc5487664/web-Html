<template>
    <div ref="rmjgPieCharts" style="width: 500px;height: 250px;">

    </div>
</template>

<script>
import * as echarts from "echarts";
    export default {
        name: 'rmjgPieCharts',
        props:{
            params: {
                type: Array,
                default (){
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
            params:function(value) {
                this.init()
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.rmjgPieCharts)
                this.init()
            });
        },
        methods: {
            init() {
                let data = this.params
                this.option = {
                    grid: {
                        bottom: 150,
                        left: 0,
                        right: '10%'
                    },
                    legend: {
                        show: false
                    },
                    series: [
                        // 主要展示层的
                            {
                                radius: ['33%', '61%'],
                                center: ['50%', '50%'],
                                type: 'pie',
                                color:['#04e8ff','#ff8a00','#00b4ff','#afa3f5', '#00d488', '#3feed4', '#3bafff', '#f1bb4c','#aff', "rgba(250,250,250,0.5)"],
                                labelLine: {
                                    normal: {
                                        show: true,
                                        length: 35,
                                        length2: 100,
                                        // lineStyle: {
                                        //     color: '#d3d3d3'
                                        // },
                                        align: 'right'
                                    },
                                    color: "#000",
                                    emphasis: {
                                        show: true
                                    }
                                },
                                label: {
                                    padding: [0, -90],
                                    height: 35,
                                    color: '#fff',
                                    formatter: '{c}人,占{d}%\n {b}',
                                    fontSize: 16,
                                    lineHeight: 30,
                                },
                                data: data
                                },
                                // 边框的设置
                                {
                                    radius: ['25%', '36%'],
                                    center: ['50%', '50%'],
                                    type: 'pie',
                                    label: {
                                        normal: {
                                            show: false
                                        },
                                        emphasis: {
                                            show: false
                                        }
                                    },
                                    labelLine: {
                                        normal: {
                                            show: false
                                        },
                                        emphasis: {
                                            show: false
                                        }
                                    },
                                    animation: false,
                                    tooltip: {
                                        show: false
                                    },
                                    itemStyle: {
                                        normal: {
                                            color:'rgba(250,250,250,0.5)'
                                        }
                                    },
                                    data: [{
                                        value: 1,
                                    }],
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