<template>
    <div ref="zyhgbPie" style="width: 500px;height: 250px;"></div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Highmaps from 'highcharts/modules/map';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
Highmaps(Highcharts);
export default {
    name: "zyhgbPie",
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
            this.init()
        });
    },
    methods: {
        init() {

            let _data = []

            this.data.forEach((item, index) => {
                _data.push([item.name, Number(item.value)])
            });

            this.option = {
                chart: {
                    type: 'pie',
                    backgroundColor: '',
                    options3d: {
                        enabled: true,
                        alpha: 40
                    }
                },
                tooltip: {
                    padding: 15,
                    style: {
                        color: "#333",
                        fontSize: 14
                    }
                },
                legend: {
                    align: 'right',
                    verticalAlign: 'middle',
                    width: 180,
                    height: 250,
                    itemStyle: {
                        color: '#fff',
                        fontSize: '14px',
                        lineHeight: '30px'
                    },
                    itemMarginTop: 20,
                    layout: 'vertical',
                    labelFormatter: function () {
                        return '<span >' + this.name + '</span>' + '<span style="color:rgba(0,0,0,0);opacity:0">' + '-------' + '</span>' + this.options.y + '人<span style="color:rgba(0,0,0,0);opacity:0">' + '-----' + '</span>' + parseInt(this.percentage) + '%';
                    }
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        innerSize: 70,
                        depth: 60
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '专业化干部',
                    data: _data,
                    showInLegend: true,
                    dataLabels: {
                        enabled: false,
                        formatter: function () {
                            console.log(this, 9999)
                            return '<span style="color: this.color">' + this.key + '<br/>' + this.y + '<span style="color:red;opacity:0">' + '-----' + '</span>' + parseInt(this.percentage) + '%</span>'
                        },
                        style: {
                            "fontSize": "14px"
                        }
                    }
                }]
            }
            let dom = this.$refs.zyhgbPie
            this.myChart = Highcharts.chart(dom, this.option)
        }
    },
}
</script>

<style lang="scss" scoped></style>