<template>
    <div ref="basicPieCharts" :style="params.boxStyle"></div>
</template>

<script>
    import * as echarts from "echarts";
    export default {
        name: 'basicPieCharts',
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
            this.myChart = echarts.init(this.$refs.basicPieCharts)
            this.init()
        });
    },
    methods: {
        init() {
            console.log(this.params,888)
            const params = this.params
            this.option = {
                color: params.color||["#1fe39c", "#39bdee", "#edab2d", "#3eece6", "#edab2d"],
                tooltip: {
                    show: params.showTooltip,
                    trigger: 'item',
                    showContent: true,
                    position:  params.tooltipPos ? params.tooltipPos : [55, 80],
                    formatter: '{b}<br />{c}人<br />{d}%',
                    backgroundColor: 'none',
                    borderWidth: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },
            legend: {
                show:params.showLegend,
                orient: 'vertical',
                right: '5px',
                top: 'middle',
                icon: 'circle',
                itemGap: 20,
                formatter: function(name) {
                    // console.log(name, data)
                    if (params.legendType === 'ly' ) {
                         return "{name|" + name + "}"
                    }
                   return "{name|" + name + "}" + "{value|" + params.data.filter(item=> item.name === name)[0].value + "人}";
                },
                textStyle: {
                    rich: {
                        name: {
                            fontSize: 16,
                            color: '#fff',
                            width: 60
                        },
                        value: {
                            width: 50,
                            fontSize: 16,
                            color: '#fff',
                            align: 'right'
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                center: this.params.center,
                radius: this.params.radius||['50px', '80px'],
                label: {
                    show: this.params.showLabel,
                    // formatter: this.params.labelFormatter ||'{d}%',
                    fontSize: 16,
                    color: '#fff',
                    ...this.params.labelConfig,
                    // rich:{

                    // }
                },
                data: this.params.data
            }]
        }
        this.myChart.setOption(this.option)
        }
    },
    }
</script>

<style lang="scss" scoped>

</style>