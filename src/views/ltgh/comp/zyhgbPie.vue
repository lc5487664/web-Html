<template>
    <div ref="zyhgbPie"  style="width: 800px;height: 250px;">

    </div>
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
    data() {
            return {
                myChart: '',
                option: {}
            }
    },
    mounted () {
        this.$nextTick(() => {
            this.init()
        });
    },
    methods: {
    init() {
        this.option = {
            chart: {
                type: 'pie',
                backgroundColor:'',
                // spacingLeft: -210,
                options3d: {
                    enabled: true,
                    // beta: 15,
                    alpha: 40
                },
                showAxes:true
            },
            legend: {
                align: 'right',
			    verticalAlign: 'middle',
                width: 220,
                height:250,
                itemStyle: {
                    color: '#fff',
                    fontSize: '16px',
                    lineHeight:'30px'
                },
                itemMarginTop: 20,
                layout: 'vertical',
                labelFormatter: function () {
				return '<span >'+this.name +'</span>' + '<span style="color:rgba(0,0,0,0);opacity:0">'+'-------'+'</span>'+this.options.y + '<span style="color:rgba(0,0,0,0);opacity:0">'+'-----'+'</span>'+parseInt(this.percentage) + '%';
			}
			},
            title: {
                text: null
            },
            subtitle: {
                text: null
            },
            plotOptions: {
                pie: {
                    innerSize: 120,
                    depth: 45,
                }
            },
            credits: {
                enabled: false
            },
            xAxis:{
                title: {
                    text: null
                }
            },
	series: [{
		name: '专业化干部',
		data: [
			['医疗卫生', 5],
			['信访维稳', 8],
			['招才引智', 7],
			['金融工作', 2],
			['产业发展', 8]
		],
        showInLegend: true,
        dataLabels: {
            formatter: function () {
                return '<span style="color: this.color">' +this.key+ '<br/>' + this.y + '<span style="color:rgba(0,0,0,0);opacity:0">'+'-----'+'</span>'+parseInt(this.percentage) + '%</span>'
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

<style lang="scss" scoped>

</style>