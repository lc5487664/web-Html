<template>
    <div ref="zwfbPie" style="width: 380px;height:250px;">

    </div>
</template>

<script>
import * as echarts from "echarts";
    export default {
        name: 'zwfbPie',
        data() {
            return {
                myChart: '',
                option: {}
            }
        },
        mounted () {
            this.$nextTick(() => {
                this.myChart = echarts.init(this.$refs.zwfbPie)
                this.init()
            });
        },
        methods: {
            init() {
                var data = [
                    { name: '厅局级正职1', value: 12 },
                    { name: '厅局级副职2', value: 12 },
                    { name: '厅局级正职3', value: 24 },
                    { name: '厅局级副职4', value: 12 },
                    { name: '厅局级正职5', value: 35 },
                    { name: '厅局级副职6', value: 4 },
                ];
                function array2obj(array, key) {
                    var resObj = {};
                    for (var i = 0; i < array.length; i++) {
                        resObj[array[i][key]] = array[i];
                    }
                    return resObj;
                }
                // 计算数据
                var nameValues = data.map((item) => item.name);
                var valValues = data.map((item) => item.value);
                var sumValue = valValues.reduce(function (total, currentVal) {
                    return total + currentVal;
                });
                var objData = array2obj(data, 'name');
                // 声明所需变量
                var series = [];
                var calcRateObjs = [];

                for (let i = 0; i < data.length; i++) {
                    series.push({
                        name: '',
                        type: 'pie',
                        clockWise: false, //顺时加载
                        hoverAnimation: false, //鼠标移入变大
                        radius: [78 - i * 15 + '%', 68 - i * 15 + '%'],
                        center: ['25%', '50%'],
                        label: {
                            show: false,
                        },
                        startAngle: 180,
                        labelLine: {
                        show: true,
                        length: 30,
                        length2: 30
                        },
                        data: [
                            {
                                value: data[i].value*2,
                                name: data[i].name,
                            },
                            {
                                value: sumValue - data[i].value,
                                name: '',
                                itemStyle: {
                                    color: 'rgba(0,0,0,0)',
                                    borderWidth: 0,
                                },
                                tooltip: {
                                    show: false,
                                },
                                hoverAnimation: false,
                            },
                        ],
                    });
                    calcRateObjs.push({ name: data[i].name, value: ((data[i].value / sumValue) * 100).toFixed(2) + '%' });
                }
                this.option = {
                    backgroundColor: '',
                    title: { 
                        show: false,
                        text: "",
                    },
                    legend: {
                        show: true,
                        icon: 'circle',
                        orient: 'vertical',
                        top: '0',
                        right: '10',
                        data: nameValues,
                        width: '120',
                        // padding: [0, 220],
                        itemGap: 20,
                        formatter: function (name) {
                            // var calcRate = calcRateObjs.find(function (item) {
                            //     if (name === item.name) {
                            //         return item;
                            //     }
                            // });
                            // return '{title|' + name + '}: {value|' + objData[name].value + '}人' ;
                            return name + '{title|---}'+objData[name].value + '人'
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: 14,
                            rich: {
                                title: {
                                    fontSize: 14,
                                    lineHeight: 14,
                                    opacity:0,
                                    color: '#fff',
                                },
                                value: {
                                    fontSize: 18,
                                    lineHeight: 14,
                                    color: '#fff',
                                },
                            },
                        },
                    },
                    tooltip: {
                        show: true,
                        trigger: 'item',
                        formatter: '{a}<br>{b}:{c}({d}%)',
                    },
                    color: ['rgb(9,187,247)', 'rgb(184,254,165)', 'rgb(253,218,23)', 'rgb(252,152,12)','#00e8ff','#059eef','#ffd200','#ff9800','#6f53fd'],
                    xAxis: [
                        {
                            show: false,
                        },
                    ],
                    series: series,
                    };
                    this.myChart.setOption(this.option)
                }
        },
    }
</script>

<style lang="scss" scoped>

</style>