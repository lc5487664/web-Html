<template>
    <div ref="jcqkPieCharts" style="width:300px; height:200px">

    </div>
</template>

<script>
import * as echarts from "echarts";
import data from '../../../../public/staticData/gbltjd.json'
    export default {
        name: 'jcqkPieCharts',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.jcqkPieCharts)
                this.init()
            });
        },
        methods: {
            init() {
                this.option = {
                    color: ['#6f53fd','#14b4ff','#2df6e6','#e8e735','#ffaf06','#fd7038'],
                    series: [
                        {
                            name:'总体情况',
                            type:'pie',
                            center: ['45%', '45%'],
                            radius: ['30%', '55%'],
                            clockwise: false, //饼图的扇区是否是顺时针排布
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: true,
                                    color:'inherit',
                                    formatter:'{b} {c}'
                                }
                            },
                            labelLine: {
                                show: true,
                                lineStyle: {
                                   
                                }
                                },
                            data:data.jcqk
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