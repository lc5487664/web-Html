<template>
    <div class="ltgh-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item>干部立体规划</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>
        <div class="content">
            <div class="content-left">
                <div class="content-box" style="min-height: 340px;">
                    <div class="content-box-title">
                        领导干部及干部队伍分析
                    </div>
                    <div class="content-box-waper">
                        <div>
                            <div class="min-title">班子配置现状</div>
                            <bar3d :params="bzxzParams"></bar3d>
                        </div>
                        <div>
                            <div class="min-title">班子配置提醒</div>
                            <div style="height:250px;width:350px;display: flex;flex-direction: column;justify-content: space-around;">
                                <div style="display: flex;align-items: center;" v-for="item in totalData.dwfx.bzpztx" :key="item.name">
                                    <el-progress type="circle" :percentage="item.value" color="#3dbad5" width="60" define-back-color="#253359" text-color="#fff"></el-progress>
                                    <div style="color:#fff; width: 280px;margin-left: 10px;">
                                        <p >{{ item.name }}</p>
                                        <div style="margin-top: 5px;display: flex;align-items: center;">
                                            <div style="width: 190px;height: 12px;float: left;border:1px solid #122543;margin-right: 10px;">
                                                <div class="bar-bg1" :style="{ 'width': item.value*1.8 + 'px'}"></div>
                                            </div>
                                            <span>目标:{{ item.value }}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div class="min-title">班子分析</div>
                            <basic-pie :params="bzfxParams"></basic-pie>
                        </div>
                    </div>
                </div>
                <div class="content-box" style="height: 100%;margin-top: 10px;">
                    <div class="content-box-title">
                        年轻干部
                    </div>
                    <div class="content-box-waper">
                        <div class="w50">
                            <div class="min-title">人数配备情况</div>
                            <pictorial-bar></pictorial-bar>
                        </div>
                        <div class="w50">
                            <div class="min-title">来源</div>
                            <basic-pie :params="lyParams"></basic-pie>
                        </div>
                        <div class="w50">
                            <div class="min-title">红绿检测预警</div>
                            <div style="display: flex;">
                                <div class="yj-red">70%</div>
                                <div class="yj-green">70%</div>
                                <div class="yj-blue">70%</div>
                            </div>
                        </div>
                        <div class="w50">
                            <div class="min-title">干部类别</div>
                            <nianlun-pie></nianlun-pie>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-right">
                <div class="content-box" style="min-height: 340px;" >
                    <div class="content-box-title">
                        女少非
                    </div>
                    <div class="content-box-waper">
                        <div>
                            <div class="min-title">总体情况</div>
                           <ztqkbar></ztqkbar>
                        </div>
                        <div>
                            <div class="min-title">职务分布</div>
                            <zwfbPie></zwfbPie>
                        </div>
                    </div>
                </div>
                <div class="content-box" style="height: 340px;margin-top: 10px;">
                    <div class="content-box-title">
                        专业化干部
                    </div>
                    <div class="content-box-waper">
                        <zyhgbPie></zyhgbPie>
                    </div>
                </div>
                <div class="content-box" style="height: 340px;margin-top: 10px;">
                    <div class="content-box-title">
                        选调生
                    </div>
                    <div class="content-box-waper">
                        <div>
                            <div class="min-title">单位</div>
                            <basic-bar :params="dwParams"></basic-bar>
                        </div>
                        <div>
                            <div class="min-title">学历</div>
                            <basic-pie :params="xlParams"></basic-pie>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import bar3d from '@/components/bar/3d_Bar.vue'
import basicPie from '@/components/pie/basicPie.vue'
import basicBar from '@/components/bar/index.vue'
import pictorialBar from '@/components/bar/pictorialBar.vue'
import nianlunPie from '@/components/pie/nianlunPie.vue'
import ztqkbar from './comp/ztqkbar.vue'
import zwfbPie from './comp/zwfbPie.vue'
import zyhgbPie from './comp/zyhgbPie.vue'
import ltkhJson from '../../../public/staticData/gbltgh.json'
export default {
    name:'ltgh-viewer',
    components: {
        headerBg,
        bar3d,
        basicPie,
        pictorialBar,
        nianlunPie,
        basicBar,
        ztqkbar,
        zyhgbPie,
        zwfbPie
    },
    data() {
        return {
            totalData: [],
            dwParams: {
                data: []
            },
            xlParams: {
                data: [],
                boxStyle: {
                    width: '400px',
                    height: '250px',
                },
                color: ['#00e8ff','#059eef','#ffd200','#ff9800','#6f53fd'],
                center: ['50%', '35%'],
                radius: [0, '80px'],
                showLabel: true,
                labelConfig: {
                    formatter: '{b}{c}人',
                    color: '#077bc5'
                },
            },
            bzxzParams: {
                data: []
            },
            bzfxParams: {
                data: [],
                boxStyle: {
                    width: '350px',
                    height: '250px',
                },
                showLegend: true,
                showTooltip: true,
                color: ['#00e8ff','#059eef','#ffd200','#ff9800','#6f53fd'],
                center: ['90px', '50%'],
            },
            lyParams: {
                data:[],
                boxStyle: {
                    width: '550px',
                    height: '250px',
                },
                showLegend: true,
                color: ['#00e8ff','#059eef','#ffd200','#ff9800','#6f53fd','#fd7038','#0566e8'],
                showLabel: true,
                labelConfig: {
                    formatter: '{d}%'
                },
                center: ['180px', '50%'],
                legendType: 'ly'
            }
        }
    },
    created () {
        this.init();
    },
    methods: {
        init() {
            this.totalData = ltkhJson
            this.bzxzParams.data = ltkhJson.dwfx.bzxz
            this.bzfxParams.data = ltkhJson.dwfx.bzfx
            this.lyParams.data = ltkhJson.nqgb.ly
            this.dwParams.data = ltkhJson.xds.dw
            this.xlParams.data = ltkhJson.xds.xl
        }
    },
}
</script>

<style lang="scss" scoped>
.ltgh-container-view {
    
    
    .content {
        padding: 10px;
        display: flex;
        height: 100%;
        overflow: hidden;
        flex-direction: row;
        .content-left {
            width: 60%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
        .content-right {
            margin-left: 10px;
            width: 40%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    }
}

        .yj-red {
            color: red;
            width: 33.3%;
            height: 200px;
            line-height: 200px;
            text-align: center;
            font-size: 20px;
            font-weight: 100;
            background: url('@/assets/img/red.png') no-repeat 50%;
        }
        .yj-green {
            color: #3ae692;
            width: 33.3%;
            height: 200px;
            line-height: 200px;
            text-align: center;
            font-size: 20px;
            font-weight: 100;
            background: url('@/assets/img/green.png') no-repeat 50%;
        }
        .yj-blue {
            color: #19f2f4;
            width: 33.3%;
            height: 200px;
            line-height: 200px;
            text-align: center;
            font-size: 20px;
            font-weight: 100;
            background: url('@/assets/img/blue.png') no-repeat 50%;
        }
        .bar-bg1 {
            background: url('@/assets/img/bar-bg1.png') no-repeat;
            height: 12px;
        }
       
</style>