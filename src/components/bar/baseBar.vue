<template>
    <div>
        <div ref="chartEl" :style="{ width: params.canvasStyle.width, height: params.canvasStyle.height }"></div>
    </div>
</template>
  
<script>
// 引入基本模板
import * as echarts from 'echarts';
export default {
    name: 'BasicBar',
    props: {
        showData: {
            type: Boolean,
            default: true
        },
        params: {
            type: Object,
            default() {
                return {
                    id: 'bar',
                    canvasStyle: {
                        width: '1000px',
                        height: '600px'
                    },
                    options: {
                        gradientColor: ['#2695f9', '#3feeff'],
                        isVertical: true, // = true 垂直排列 =false（默认） 水平排列
                        xName: 'department'
                    },
                    data: [
                        {
                            department: '汉族',
                            value: 6719
                        },
                        {
                            department: '少数民族',
                            value: 3345
                        }
                    ]
                };
            }

            /*
               *值为布尔值的默认不写都为false
               *带***为必填
    
               options:{
                  isRainbow:true,//是否使用彩色   false为渐变色
                  colorList:['#f85b5f','#ea9039', '#f8d05c', '#5997f3','#006ec3'],//彩色，不足可循环
                  gradientColor: [             //渐变色***
                    ['#3feeff', '#2695f9'],
                    ['#e8b988', '#ea7588'],
                    ['#b0ff8d', '#1cce79'],
                    ['#5efce8', '#736efe']
                  ],
                  xName: 'name',             // 类目轴key值***
                  isVertical: true,          // 是否垂直
                  axisValueShow: true,       // value轴 label 和 splitLine是否显示
                  nonshowZero: true,             // 不显示0值
                  nonCut: true,               //强制不换行
                  categoryBr: true,          // 类目轴label是否折行
                  categoryCut: true,         // 类目轴label最后三个字是否折行
                  brNum:2                    // 类目轴label每隔多少字符折行 默认2
                  legendShow: true,          // legend是否显示
                  labelHide: true,           // bar label是否隐藏  默认false
                  barWidth: 10,              // bar label是否隐藏 默认15
                  top:'5%',                  // grid 上下左右值 默认5%
                  right: '5%',
                  left: '5%',
                  right: '5%',
                  showTitle: false,
                  titlePos: {
                    x : '8%',
                    y : '8%'
                  },
                  legendW:10,                //legend宽  默认25
                  legendH:10,                //legend高  默认14
                  legendFontSize:14,         //legend字体大小 默认16
                  legendPos:{
                    right: '5%',
                    top: '5%'
                  },
                  map: {                     // 数据映射 ***
                    'num': '班子人数',
                    'age': '平均年龄'
                  },
                  isLeftScale: true          // 左侧value轴是否取最小值
                  isRightScale: true         // 右侧value轴是否取最小值
    
                 // 以下为 line 才需要的参数
                 axis1Name: '（人）',        // 左侧value轴name名称 默认''
                 axis2Name: '（岁）',        // 右侧value轴name名称 默认''
                 line: ['age','num'],       // line 包含的key值 ***
                 isAverage: true,           // line 是否需要平均markline
                 lineWidth: 2,              // line宽度 默认1
                 tooltipPercent: true       // tooltip 是否带百分比 (需要数据支持,格式为:值|百分数, 1234|23.32)
                }
    
              */
        }
    },
    data() {
        return {
            myChart: null,
            show: false
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        filterErrData() {
            if (this.params.data && this.params.data.length > 0 && this.params.data.filter(Boolean).length > 0) {
                return true
            } else {
                return false
            }
        },
        init() {
            if (!this.filterErrData()) {
                return
            }
            if (this.params.data.length === 0) {
                if (this.myChart) {
                    this.myChart.dispose();
                }
                this.myChart = null;
                this.show = true;
                return;
            }

            this.show = false;

            if (this.myChart) {
                this.myChart.dispose();
                this.myChart = null;
            }

            let $this = this;

            // let propData = [...this.params.data]
            let propData = JSON.parse(JSON.stringify(this.params.data));//深拷贝数据
            let categoryData = []; //刻度值

            let length = propData.length;
            let options = this.params.options;
            //渐变方向
            let linearGradient = options.isVertical ? [0, 1, 1, 0] : [0, 0, 0, 1];
            // 获取keys数组(series数组)
            let dataKeys = Object.keys(options.map);
            // 是否全为line
            let isAllLines = options.line
                ? options.line.length === dataKeys.length
                : false;
            // 获取key对应的中文数组(legend数组)
            let legendData = Object.values(options.map);

            // console.log(legendData);
            // let fix = legendData.map((item, index) => {
            //   if (index == 0) {
            //     return {
            //       name: item,
            //       textStyle: {
            //         color: '#ff53c6'
            //       }
            //     };
            //   } else return item;
            // });

            // console.log(fix);
            let serirsArr = [];
            let average = 0;
            let percentObj = {}; //line百分比
            if (options.tooltipPercent) {
                // 为每个类目设置空数组
                propData.forEach(item => {
                    percentObj[item[options.xName]] = [];
                });
            }

            let firstData = propData[0];

            // 总人数
            let total = 0;
            if (firstData) {
                total = firstData.total ? firstData.total : 0;
            }

            /**
             * 判断是否要设置y轴（值轴）最大值max,
             * 当只有一组数据时，女少非之和为0，则设置y轴最大值为1，
             * 当不只一组数据时，所有总人数为0，则设置y轴最大值为1
             */
            // let setMax = propData.every(item => {
            //   return length == 1
            //     ? item.female + item.minority + item.nonparty == 0
            //     : item.total + item.female + item.minority + item.nonparty == 0;
            // });

            let rich = {
                text: {
                    fontSize: 14,
                    color: '#fff',
                    lineHeight: 20
                },
                percent: {
                    fontSize: 14,
                    color: '#ff0'
                },
                total: {
                    fontSize: 24,
                    color: '#fff'
                }
            };

            // 为每个类目填充相应的百分比
            if (options.tooltipPercent) {
                propData.forEach((item, index) => {
                    //  记录当前类目值
                    let name = item[options.xName];
                    for (let key in item) {
                        //跳过key为name 和 genre
                        if (key !== 'name' && key !== 'genre') {
                            percentObj[name].push(item[key].split('|')[1]);
                        }
                    }
                });
            }
            // console.log(1);
            //循环series数组
            dataKeys.forEach((item, index) => {
                //每个series数据
                let data = [];
                let map = options.map;
                //填充数据
                propData.forEach(innerItem => {
                    if (options.tooltipPercent) {
                        data.push(innerItem[item].split('|')[0]);
                    } else if (options.nonShowZero) {
                        // 当不显示0时，可让为0的值，赋予0.01
                        innerItem[item] == 0 ? data.push(0.01) : data.push(innerItem[item]);
                    } else {
                        data.push(innerItem[item]);
                    }
                });

                // 判断value 是否为负数，
                if (options.lossColor) {
                    data = data.map(item => {
                        let _item = ''
                        if (item < 0) {
                            _item = {
                                value: item,
                                itemStyle: {
                                    color: options.lossColor
                                }
                            }
                        } else {
                            _item = item
                        }
                        return _item
                    })
                }

                //每个系列的平均数
                if (options.isAverage) {
                    average = data.reduce((x, y) => +x + +y) / length;
                }

                let series = {};
                //判断图表类型
                if (options.line && options.line.includes(item)) {
                    series = {
                        name: map[item],
                        type: 'line',
                        cursor: options.cursor ? options.cursor : 'pointer',
                        yAxisIndex: isAllLines ? 0 : 1, //全为line 取左侧y轴
                        label: {
                            show: options.lineLaberShow || false,
                            formatter(params) {
                                if (typeof options.lineLaberFormatter == 'function' && options.lineLaberShow) {
                                    return options.lineLaberFormatter(params, propData)
                                } else {
                                    return params.value
                                }
                            },
                            color: options.showLabelColor ? options.gradientColor[index][0] : '#fff'
                        },
                        areaStyle: options.areaStyle && {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, options.areaStyle[item])
                        },
                        smooth: options.isSmooth || false,
                        symbolSize: 10,
                        symbol: 'circle',
                        hoverAnimation: false,
                        itemStyle: {
                            normal: {
                                shadowColor: options.gradientColor[index][1],
                                shadowBlur: 15,
                                color: new echarts.graphic.LinearGradient(...linearGradient, [
                                    {
                                        offset: 0,
                                        color: options.gradientColor
                                            ? options.gradientColor[index][0]
                                            : '#3f15d6'
                                    },
                                    {
                                        offset: 1,
                                        color: options.gradientColor
                                            ? options.gradientColor[index][1]
                                            : '#d243cd'
                                    }
                                ])
                            },
                            emphasis: {
                                borderColor: 'rgba(232,158,236,.2)',
                                borderWidth: 10
                            }
                        },
                        lineStyle: {
                            width: options.lineWidth ? options.lineWidth : 1
                        },
                        markLine: {
                            symbolSize: 10,
                            label: {
                                normal: {
                                    show: true,
                                    color: '#fff',
                                    fontSize: 20
                                }
                            },
                            data: [
                                [
                                    {
                                        symbol: 'line',
                                        symbolSize: '0',
                                        x: options.isAverage ? '6.7%' : '',
                                        yAxis: average
                                    },
                                    {
                                        symbol: 'line',
                                        symbolSize: '0',
                                        x: '95%',
                                        yAxis: average
                                    }
                                ]
                            ],
                            lineStyle: {
                                normal: {
                                    width: 2,
                                    type: 'solid',
                                    color: '#FF507B'
                                }
                            }
                        },
                        data: data
                    };
                } else {
                    series = {
                        name: map[item],
                        type: 'bar',
                        cursor: options.cursor ? options.cursor : 'pointer',
                        barMinHeight: options.minHeight || 0,
                        yAxisIndex: 0,
                        barWidth: options.barWidth ? options.barWidth : 15,
                        barGap: this.params.options.barGap ? this.params.options.barGap : '80%',
                        barCategoryGap: '30',
                        label: {
                            position: options.isVertical ? 'right' : options.labelBarPos || 'top',
                            fontSize: options.labelFontSize || 14,
                            show: options.labelHide ? false : true,
                            color: options.showLabelColor ? options.gradientColor[index][0] : '#fff'
                            // position:'inside',
                            // rotate:40,
                            // offset:[10,0]
                        },
                        itemStyle: {
                            normal: options.isRainbow ? {
                                color: function (params) {
                                    //注意，最好多定义几个彩虹色
                                    let colorList = options.colorList || [];
                                    return colorList[params.dataIndex % colorList.length]
                                }
                            } : {
                                //渐变色
                                barBorderRadius: options.barBorderRadius ? options.barBorderRadius : 5,
                                borderWidth: options.borderWidth || 0,
                                borderColor: options.showBorderColor ? options.gradientColor[index][0] : '',
                                shadowColor: options.shadowColor ? options.shadowColor : (options.isVertical
                                    ? options.gradientColor[index][0]
                                    : options.gradientColor[index][1]),
                                shadowBlur: options.shadowBlur || 15,
                                color: new echarts.graphic.LinearGradient(...linearGradient, [
                                    {
                                        offset: 0,
                                        color: options.gradientColor
                                            ? options.gradientColor[index][0]
                                            : '#3f15d6'
                                    },
                                    {
                                        offset: 1,
                                        color: options.gradientColor
                                            ? options.gradientColor[index][1]
                                            : '#d243cd'
                                    }
                                ])
                            }
                        },
                        data: data
                    };
                }
                serirsArr.push(series);

                if (options.needShowBg && dataKeys.length == 1) {
                    let maxArr = this.sortMaxData(data)
                    let series = {
                        name: '背景',
                        type: 'bar',
                        barGap: '-100%',
                        label: {
                            normal: {
                                show: true,
                                formatter(params) {
                                    return data[params.dataIndex] + (options.toolUnit || '')
                                }
                            }
                        },
                        barWidth: options.barWidth ? options.barWidth : 15,
                        itemStyle: {
                            normal: {
                                color: 'transparent',
                                barBorderRadius: 20,
                                borderColor: '#5d7c91',
                                backgroundColor: 'transparent'
                            }
                        },
                        data: maxArr
                    }
                    serirsArr.push(series);
                }
            });

            // console.log(2);
            //值轴
            let axisValue = [
                {
                    show: options.axisValueShow,
                    type: 'value',
                    min: options.yMin ? options.yMin : null,
                    max: options.yMax ? options.yMax : null,
                    name: options.axis1Name ? options.axis1Name : '',
                    nameTextStyle: options.axis1NameStyle ? options.axis1NameStyle : {
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 15
                    },
                    // max: setMax,
                    minInterval: 1,
                    scale: options.isLeftScale ? true : false,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: options.axisFont || 15
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: options.axisValueShow,
                        lineStyle: {
                            color: options.splitLine ? options.splitLine : "rgba(255,255,255,0.2)"
                        }
                    },
                    [options.axisSplitNumber ? "splitNumber" : '']: options.axisSplitNumber
                },
                {
                    show: options.axisValueShow,
                    type: 'value',
                    inverse: options.inverseAxis2 || false,
                    min: options.yAxisMin ? options.yAxisMin : null,
                    max: options.yAxisMax ? options.yAxisMax : null,
                    name: options.axis2Name ? options.axis2Name : '',
                    nameLocation: options.nameLocation ? "start" : "end",
                    minInterval: 1,
                    splitNumber: options.splitNumber || 5,
                    nameTextStyle: {
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 15
                    },
                    scale: options.isRightScale ? true : false,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        color: 'rgba(255,255,255,0.6)',
                        fontSize: 15,
                        showMinLabel: options.showMinLabel || false,
                        showMaxLabel: options.showMaxLabel || false,
                    },
                    axisLine: {
                        show: false
                    },
                    splitLine: {
                        show: false,
                        // show:options.axisValueShow,
                        lineStyle: {
                            color: "rgba(255,255,255,0.3)"
                        }
                    }
                }
            ];


            //类目轴数据
            for (let item of propData) {
                categoryData.push(item[options.xName]);
            }

            //类目轴
            let axisCategory = [
                {
                    type: 'category', //类目轴
                    data: categoryData,

                    inverse: options.isVertical ? true : false,
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        interval: 0,//坐标轴文字始终显示
                        color: '#fff',
                        fontSize: options.axisFont || 15,
                        // verticalAlign: 'top',
                        // verticalAlign: options.line ? 'top' : 'middle',
                        rotate: options.ellipText && 30,
                        formatter: params => {
                            let res = '';
                            let name = '';
                            //label换行
                            if (options.ellipText) {
                                params = params.slice(0, options.ellipText) + '...'
                            }
                            if (options.nonCut) {
                                res = params;

                            }
                            //length 大于几，根据实际情况来定
                            else if (options.categoryBr || length > 9) {
                                name = '';
                                let brNum = options.brNum ? options.brNum : 2;

                                switch (params) {
                                    // 特殊换行
                                    case '市政府系统单位':
                                        if (brNum != 1) {
                                            res = '市政府\n系统\n单位';
                                            break;
                                        }
                                    case '外经贸单位':
                                        if (brNum != 1) {
                                            res = '外经贸\n单位';
                                            break;
                                        }
                                    default:
                                        // 默认传参换行
                                        for (let i = 0; i < params.length; i++) {
                                            name += params[i];
                                            if (i % brNum == brNum - 1) name += '\n';
                                        }
                                        res = name;
                                }
                            } else if (options.categoryCut) {
                                name = '';
                                for (let i = 0, length = params.length; i < length; i++) {
                                    name += params[i];
                                    if (i == params.length - 4) name += '\n';
                                }
                                res = params;
                            } else {
                                res = params;
                            }
                            return res;
                        }
                    },
                    axisLine: {
                        show: options.showAxisLine || false,
                        lineStyle: {
                            color: '#ccc'
                        }
                    },
                    splitLine: {
                        show: false,
                        lineStyle: {
                            color: '#686868'
                        }
                    }
                }
            ];
            this.myChart = echarts.init(this.$refs.chartEl);
            this.option = {
                title: {
                    show: options.showTitle ? true : false,
                    text: `总人数：${total}`,
                    x: options.titlePos
                        ? options.titlePos.x
                            ? options.titlePos.x
                            : '8%'
                        : '8%',
                    y: options.titlePos
                        ? options.titlePos.y
                            ? options.titlePos.y
                            : '10%'
                        : '10%',
                    textStyle: {
                        fontWeight: 'bold',
                        fontSize: 18,
                        color: '#fff'
                    }
                },
                tooltip: {
                    show: options.tooltipShow === false ? options.tooltipShow : true,
                    padding: 15,
                    backgroundColor: 'rgba(255,255,255, 1)',
                    trigger: 'axis',
                    extraCssText: 'line-height:25px',
                    formatter: params => {
                        params.forEach(el => {
                            let catLeng = 15;
                            let maxI = parseInt(el.name.length / catLeng);
                            let maxIndex = maxI * catLeng;
                            let mStr = ''
                            let j = 0;
                            if (maxI > 0) {
                                for (let i = 0; i < el.name.length; i++) {
                                    if (i % catLeng === 0) {
                                        mStr += el.name.slice(j, i) + '</br>';
                                        j = i;
                                    }
                                }
                                mStr += el.name.slice(maxIndex, el.name.length)
                            } else {
                                mStr += el.name;
                            }
                            el.name = mStr
                        });

                        let result = params[0].name + '<br/>', fixValue = 0;
                        let unit = options.toolUnit || '';

                        params.forEach((item, index) => {
                            fixValue = item.value == 0.01 ? 0 : item.value;

                            // 自定义tooltip格式
                            if (options.toolItemUnit) {
                                result += `${params[0].name}：${$this.dataTm(fixValue)}${options.toolItemUnit}`;
                            } else {
                                if (item.seriesName != '背景')
                                    // 老的不变
                                    if (options.showPercent && dataTotal > 0) {
                                        let percent = `${(fixValue / dataTotal * 100).toFixed(2)}%`
                                        result += `&emsp;${item.seriesName}占比 : ${percent}`;
                                    } else {
                                        if (index == 0 && options.axis1Unit) {
                                            result += `&emsp;${item.seriesName} : ${$this.dataTm(fixValue)}${options.axis1Unit}`;
                                        } else {
                                            result += `&emsp;${item.seriesName} : ${$this.dataTm(fixValue)}${unit}`;
                                        }
                                    }
                                if (!options.tooltipPercent) {
                                    result += `<br/>`;
                                } else {
                                    let itemPercent =
                                        percentObj[item.axisValue][item.seriesIndex] != 100
                                            ? percentObj[item.axisValue][item.seriesIndex] + '%'
                                            : '';
                                    result += `<span style="color: #ff67f6;padding-left: 10px">${itemPercent}</span><br/>`;
                                }
                            }
                        });


                        return result;
                    },
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: isAllLines ? 'line' : 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(255,255,255,0.6)'
                        }
                    }
                },
                legend: {
                    show: options.legendShow,
                    data: legendData,
                    top: options.legendPos
                        ? options.legendPos.top
                            ? options.legendPos.top
                            : '5%'
                        : '5%',
                    right: options.legendPos
                        ? options.legendPos.right
                            ? options.legendPos.right
                            : '5%'
                        : '5%',
                    itemWidth: options.legendW ? options.legendW : 25,
                    itemHeight: options.legendH ? options.legendH : 14,
                    // formatter(params){
                    //   // console.log(params);
                    //   if(params == '班子人数')
                    //     return `{text|${params}}`
                    //   return params
                    // },
                    textStyle: {
                        fontSize: options.legendFontSize ? options.legendFontSize : 16,
                        color: options.legendColor ? options.legendColor : options.gradientColor,
                    },
                    rich: rich
                },
                grid: {
                    left: options.left ? options.left : '5%',
                    right: options.right ? options.right : '5%',
                    top: options.top ? options.top : '5%',
                    bottom: options.bottom ? options.bottom : '5%',
                    containLabel: true
                },
                label: {
                    show: true,
                    position: options.isVertical ? 'right' : 'top',
                    distance: 10,
                    color: '#fff',
                    fontSize: 14,
                    formatter(params) {
                        // console.log(params);
                        if (params.value == 0.01) {
                            params.value = 0;
                        }

                        let per = (total === 0 ? 0 : ((params.value / total) * 100).toFixed(1));
                        return options.showTitle
                            ? `{text|人数：${params.value}}\n占比：{percent|${per}%}`
                            : params.value;
                    },
                    rich: rich,
                    zlevel: 10
                },
                xAxis: options.isVertical ? axisValue : axisCategory,
                yAxis: options.isVertical ? axisCategory : axisValue,
                dataZoom: options.showZoom && [
                    {
                        show: true,
                        height: 10,
                        "xAxisIndex": [
                            0
                        ],
                        handleSize: '100%',
                        bottom: 10,
                        start: 0,
                        end: 50,
                        textStyle: {
                            color: '#ffffff'
                        }
                    },
                    {
                        show: true,
                        type: 'inside',
                        height: 10,
                        start: 1,
                        end: 35
                    }
                ],
                series: serirsArr,
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                    // 越往后的数据延迟越大
                    return idx * 100;
                }
            };

            this.myChart.setOption(this.option);

            this.myChart.on('click', params => {
                console.log('params1==>', params)
                this.$emit('changeDb', params.name, params.seriesName);
            })

            // 跳转到三级页面
            this.myChart.getZr().on('click', params => {
                console.log('params==>', params)
                const pointInPixel = [params.offsetX, params.offsetY];
                if (this.myChart.containPixel('grid', pointInPixel)) {
                    let xIndex = this.myChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[0];
                    let yIndex = this.myChart.convertFromPixel({ seriesIndex: 0 }, [params.offsetX, params.offsetY])[1];
                    let index;
                    if (options.isVertical) {
                        index = yIndex;
                    } else {
                        index = xIndex;
                    }
                    // if (propData[index]) {
                    let name = '';
                    if (options.xName === "genre") {
                        name = legendData[params.target.seriesIndex];
                    } else {
                        name = propData[index].name;
                    }
                    this.$emit('change', name);
                    // }
                    /*事件处理代码书写位置*/
                }
            });

            // this.myChart.on('click', params => {
            //   // console.log(params);dataIndex
            //   //应该传dataIndex
            //   let name = '';
            //   if (options.xName === "genre") {
            //     name = legendData[params.seriesIndex];
            //   } else {
            //     name = params.name
            //   }
            //
            //   this.$emit('change', name);
            // });
        },

        // 设置柱状图的背景色，填充数据的最大值
        sortMaxData(data) {
            if (data && data.length > 0) {
                let val = Object.values(data);
                let max = val.sort((a, b) => {
                    return b - a
                })[0]
                let newData = Object.assign([], data)
                return newData.fill(max)
            }
        },

        // 数据脱敏
        dataTm(val) {
            let isShowData = this.showData;
            let strVal = `${val}`;
            if (!isShowData && val > 0 && strVal.length >= 1) {
                let str = '';
                if (strVal.length <= 2) {
                    return str.padEnd(strVal.length, '*');
                }
                if (strVal.length > 2) {
                    let midLen = strVal.substring(1, strVal.length - 1).length;
                    let firstNum = strVal.substring(0, 1);
                    let lastNum = strVal.substring(strVal.length - 1, strVal.length);
                    return `${firstNum}${str.padEnd(midLen, '*')}${lastNum}`
                }
            } else {
                return val
            }
        }
    },
    computed: {
        uuid() {
            let ranNum = Math.ceil(Math.random() * 25);
            return String.fromCharCode(65 + ranNum) + Date.now()//生成随机首字母+时间戳的随机id
        }
    },
    watch: {
        params: {
            handler(newVal, oldVal) {
                this.init();
            },
            deep: true
        }
    }
};
</script>
  
<style lang="scss" scoped>
  
</style>