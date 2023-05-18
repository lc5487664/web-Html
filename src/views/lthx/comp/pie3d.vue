<template>
    <div ref="zyhgbPie" style="width: 350px;height: 150px;"></div>
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

            console.log(_data)
            this.option = {
                chart: {
                    type: 'pie',
                    backgroundColor: '',
                    options3d: {
                        enabled: true,
                        alpha: 70
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
                    enabled: false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: ''
                },
                plotOptions: {
                    pie: {
                        innerSize: 0,
                        depth: 20,
                        minSize: 100
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: '人数',
                    data: _data,
                    showInLegend: true,
                    dataLabels: {
                        enabled: true,
                        distance: 10,
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