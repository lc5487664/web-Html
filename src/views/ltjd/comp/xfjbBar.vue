<template>
    <div ref="xfjbBarCharts" style="width:500px;height:130px">

    </div>
</template>

<script>
import data from '../../../../public/staticData/gbltjd.json'
import * as echarts from "echarts";
    export default {
        name: 'xfjbBarCharts',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.xfjbBarCharts)
                this.init()
            });
        },
        methods: {
            init() {
                let xData = data.xfjbjd.map(item => item.year)
                let yData = data.xfjbjd.map(item => item.value)
                this.option = {
                    grid: {
                        top: '20px',
                        bottom: '20px'
                    },
                    tooltip: {
                        show: false,
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                        formatter: "{b0}: {c0}"
                    },       //背景色
                    xAxis: {
                        show: false,                //是否显示x轴
                        type: 'value'
                    },
                    yAxis: {
                        type: 'category',
                        inverse:true,               //让y轴数据逆向
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#00f6ff'       //y轴字体颜色
                            },
                            formatter: function(value, index) {
                                return [
                                    '{title|' + value + '} '
                                ].join('\n');
                            },
                            //定义富文本标签
                            rich: {
                                title: {
                                    color: '#00f6ff'
                                }
                            }
                        },
                        splitLine: {show: false},   //横向的线
                        axisTick: {show: false},    //y轴的端点
                        axisLine: {show: false},    //y轴的线
                        data: xData
                    },
                    series: [
                        {
                            name: '数据内框',
                            type: 'bar',
                            itemStyle: {
                                normal: {
                                    barBorderRadius: 0,
                                    color: '#00b5eb',
                                    shadowColor: "#00b5eb",
                                    shadowBlur: 2
                                }
                            },
                            barWidth: 10,
                            label:{
                                show:true,
                                position: 'outside',
                                color: '#fff',
                                formatter: '{c}件'
                            },
                            data: yData
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