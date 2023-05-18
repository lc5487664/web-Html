<template>
    <div class="home-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/lthx' }">干部立体画像</el-breadcrumb-item>
                    <el-breadcrumb-item>干部画像</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>

        <div class="content">
            <div class="left-part">
                <div class="content-box part l-1">
                    <div class="content-box-title">政治维度</div>
                    <div class="tab-list">
                        <div class="item" @click="zzwdIndex = index" :class="[index == zzwdIndex ? 'act' : '']" v-for="(item, index) in zzwdTab" :key="index">
                            {{ item }}
                        </div>
                    </div>
                    <!-- 领导批示落实 -->
                    <div class="table_box" v-if="zzwdIndex == 0">
                        <div class="colums">
                            <span class="s0" style="flex: 1">批示领导</span>
                            <span class="s2" style="flex: 2">批示类容</span>
                            <span class="s2" style="flex: 2">完成情况</span>
                        </div>
                        <el-scrollbar style="height: 180px" v-if="ldpsls && ldpsls.length">
                            <ul class="scroll" style="flex: 2">
                                <li v-for="(item, index) in ldpsls" :key="index">
                                    <span class="s0" style="flex:1">{{item.psld}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.psnr">{{item.wjxw}}</span>
                                    <span class="s2 center" style="flex:2" :title="item.wcqk">{{item.zzcs}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 180px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                    <!-- 清单整改 -->
                    <div class="table_box" v-if="zzwdIndex == 1">
                        <div class="colums">
                            <span class="s0" style="flex: 1">清单类别</span>
                            <span class="s2" style="flex: 2">整改问题</span>
                            <span class="s2" style="flex: 1">状态</span>
                        </div>
                        <el-scrollbar style="height: 180px" v-if="qdzg && qdzg.length">
                            <ul class="scroll" style="flex:2" >
                                <li v-for="(item, index) in qdzg" :key="index">
                                    <span class="s0" style="flex:1">{{item.lb}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.zgwt">{{item.zgwt}}</span>
                                    <span class="s2 center" style="flex:1" :title="item.zt">{{item.zt}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        <div class="no-data" style="height: 180px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                    <!-- 基层党建述职评议 -->
                    <div class="table_box" v-if="zzwdIndex == 2">
                        <div class="colums">
                            <span class="s0" style="flex: 1">年份</span>
                            <span class="s2" style="flex: 2">得分</span>
                            <span class="s2" style="flex: 2">排名</span>
                        </div>
                        <el-scrollbar style="height: 180px" v-if="jcdjszpy && jcdjszpy.length">
                            <ul class="scroll" style="flex:2" >
                                <li v-for="(item, index) in jcdjszpy" :key="index">
                                    <span class="s0" style="flex:1">{{item.year}}</span>
                                    <span class="s2 center" style="flex:2;">{{item.df}}</span>
                                    <span class="s2 center" style="flex:2">{{item.pm}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 180px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                    <!-- 政治素质考察 -->
                    <div class="table_box" v-if="zzwdIndex == 3">
                        <div class="colums">
                            <span class="s0" style="flex: 1">时间</span>
                            <span class="s2" style="flex: 2">内容</span>
                            <span class="s2" style="flex: 2">结果</span>
                        </div>
                        <el-scrollbar style="height: 180px" v-if="zzszkc && zzszkc.length">
                            <ul class="scroll" style="flex:2">
                                <li v-for="(item, index) in zzszkc" :key="index">
                                    <span class="s0" style="flex:1">{{item.time}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.nr">{{item.nr}}</span>
                                    <span class="s2 center" style="flex:2" :title="item.jg">{{item.jg}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 180px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                </div>
                <div class="content-box part l-2">
                    <div class="content-box-title">实际维度</div>
                    <div class="tab-list">
                        <div class="item" @click="sjwdIndex = index" :class="[index == sjwdIndex ? 'act' : '']" v-for="(item, index) in sjwdTab" :key="index">
                            {{ item }}
                        </div>
                    </div>

                    <!-- 业绩年报 -->
                    <div class="table_box" v-if="sjwdIndex == 0">
                        <div class="colums">
                            <span class="s0" style="flex: 1">年度</span>
                            <span class="s2" style="flex: 2">本人最满意工作</span>
                            <span class="s2" style="flex: 2">本人最不满意或遗憾工作</span>
                        </div>
                        <el-scrollbar style="height: 160px" v-if="yjnb && yjnb.length">
                            <ul class="scroll" style="flex:2">
                                <li v-for="(item, index) in yjnb" :key="index">
                                    <span class="s0" style="flex:1">{{item.year}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.zmygz">{{item.zmygz}}</span>
                                    <span class="s2 center" style="flex:2" :title="item.zbmygz">{{item.zbmygz}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 绩效指标 -->
                    <div class="table_box" v-if="sjwdIndex == 1">
                        <div class="colums">
                            <span class="s0" style="flex: 1">年度</span>
                            <span class="s2" style="flex: 2">本人最满意工作</span>
                            <span class="s2" style="flex: 2">本人最不满意或遗憾工作</span>
                        </div>
                        <el-scrollbar style="height: 160px"  v-if="jxzb && jxzb.length">
                            <ul class="scroll" style=" flex:2">
                                <li v-for="(item, index) in jxzb" :key="index">
                                    <span class="s0" style="flex:1">{{item.year}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.zmygz">{{item.zmygz}}</span>
                                    <span class="s2 center" style="flex:2" :title="item.zbmygz">{{item.zbmygz}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 年度重点工作 -->
                    <div class="table_box" v-if="sjwdIndex == 2">
                        <div class="colums">
                            <!-- <span class="s0" style="flex: 1">年度</span> -->
                            <span class="s2" style="flex: 2">重大任务</span>
                        </div>
                        <el-scrollbar style="height: 160px" v-if="ndzdgz && ndzdgz.length">
                            <ul class="scroll" style="flex:2">
                                <li v-for="(item, index) in ndzdgz" :key="index">
                                    <span class="s2" style="flex:2;" :title="item.value">{{item.value}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                </div>
                <div class="content-box part l-3">
                    <div class="content-box-title">口碑维度</div>
                    <div class="kb-box">
                        <div class="pj_1">
                            <div class="tit">
                                <span>评价口碑：</span>
                                <span style="cursor: pointer;text-decoration: underline;">查看详情</span>
                            </div>
                            <el-scrollbar style="height: 70px;">
                                <div class="des" v-html="pjkb_z">
                                </div>
                            </el-scrollbar>
                            
                            
                        </div>
                        <div class="pj_2">
                            <div class="tit">
                                <span>评价口碑：</span>
                                <span style="cursor: pointer;text-decoration: underline;">查看详情</span>
                            </div>
                            <el-scrollbar style="height: 70px;">
                                <div class="des" v-html="pjkb_f">
                            </div>
                            </el-scrollbar>
                        </div>
                    </div>
                </div>
            </div>
            <div class="center-part content-box">
                <el-dropdown size="small" class="fix-bz-box" split-button type="primary" @command="handleCommand">
                    所在班子
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(item, index) in userInfo.bzlb" :key="index" :command="item">{{item.bzName}}</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <div class="bx-box">
                    <el-button size="small" type="primary" @click="joinBxk" title="添加至比选库">
                        <i style="font-size: 22px" class="el-icon-circle-plus-outline"></i>
                    </el-button>
                    <el-button size="small" type="primary" @click="goBxk" title="比选库">
                        <i style="font-size: 22px" class="el-icon-coin"></i>
                    </el-button>
                </div>
                <div class="info-box">
                    <div class="info-img">
                        <img :src="userInfo.photo" style="height: 100%;width: 100%">
                    </div>
                    <div class="info-box__right">
                        <div class="info-item">
                            <span class="label">姓&emsp;&emsp;名：</span>
                            <span class="val">{{userInfo.name}}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">出生年月：</span>
                            <span class="val">{{userInfo.csny}}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">学&emsp;&emsp;历：</span>
                            <span class="val">{{userInfo.xl}}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">现任职务：</span>
                            <span class="val" style="width: 250px">{{userInfo.xrzw}}</span>
                        </div>
                        <div class="info-item">
                            <span class="label">任现领导职务时间：</span>
                            <span class="val">{{userInfo.xrzjccsj}}</span>
                        </div>
                    </div>
                </div>

                <div class="section" style="margin-top: 20px">
                    <div class="sub-tit-box">
                        <div class="tit">一言素描</div>
                    </div>
                    <div>
                        <template v-if="userInfo.yysm">
                            <el-scrollbar :style="{height: '120px',marginTop:'15px',marginBottom:'20px'}">
                                <div class="sec_2" v-if="userInfo.yysm" v-html="userInfo.yysm">
                                </div>
                            </el-scrollbar>
                        </template>
                        <div class="no-data" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项数据</span>
                        </div>
                    </div>
                </div>
                <div class="section">
                    <div class="sub-tit-box">
                        <div class="tit">分管领域</div>
                    </div>
                    <el-scrollbar style="height: 120px;margin-top:15px;margin-bottom:20px">
                        <div class="sec_2" style="margin-bottom:20px" v-html="userInfo.fgly" v-if="userInfo.fgly">
                        </div>
                        <div class="no-data" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项数据</span>
                        </div>
                    </el-scrollbar>
                </div>
                <div class="section">
                    <div class="sub-tit-box">
                        <div class="tit">熟悉领域</div>
                    </div>
                    <el-scrollbar :style="{height:userInfo.ssxlh ? '100px' : '200px',marginTop:'15px',marginBottom:'15px'}">
                        <div class="sec_3" v-if="userInfo.sxly">
                            <span class="item" v-for="(item, index) in userInfo.sxly" :key="index">{{item}}</span>
                        </div>
                        <div class="no-data" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项数据</span>
                        </div>
                    </el-scrollbar>
                </div>

                <div class="section" v-if="userInfo.ssxlh">
                    <div class="sub-tit-box">
                        <div class="tit">说说心里话</div>
                    </div>
                    <el-scrollbar style="height: 70px;margin-top:10px">
                        <div class="sec_4" v-html="userInfo.ssxlh">
                        </div>
                    </el-scrollbar>
                </div>
            </div>
            <div class="right-part">
                <div class="content-box part r-1">
                    <div class="content-box-title">考核维度</div>
                    <div class="tab-list">
                        <div class="item" @click="khwdIndex = index" :class="[index == khwdIndex ? 'act' : '']" v-for="(item, index) in khwdTab" :key="index">
                            {{ item }}
                        </div>
                    </div>

                    <!-- 年度考核 -->
                    <div class="ndkh" style="height: 234px;" v-if="khwdIndex == 0">
                        <gqgx-line :params="ndkh" v-if="loadFlag && khwdIndex == 0"></gqgx-line>
                    </div>
                    <!-- 专项考核 -->
                    <div class="ndkh" style="height: 234px;" v-if="khwdIndex == 1">
                        <gqgx-line :params="zxkh" v-if="loadFlag && khwdIndex == 1"></gqgx-line>
                    </div>
                    <!-- 平时考核 -->
                    <div class="ndkh" style="height: 234px;" v-if="khwdIndex == 2">
                        <gqgx-line :params="pskh" v-if="loadFlag && khwdIndex == 2"></gqgx-line>
                    </div>
                </div>
                <div class="content-box part r-2">
                    <div class="content-box-title">监督维度</div>
                    <div class="tab-list">
                        <div class="item" @click="jdwdIndex = index" :class="[index == jdwdIndex ? 'act' : '']" v-for="(item, index) in jdwdTab" :key="index">
                            {{ item }}
                        </div>
                    </div>

                    <!-- 审计 -->
                    <div class="table_box" v-if="jdwdIndex == 0">
                        <div class="colums">
                            <span class="s0" style="flex: 1">审计年度</span>
                            <span class="s2" style="flex: 2">问题</span>
                            <span class="s2" style="flex: 2">评价内容</span>
                        </div>
                        <el-scrollbar style="height: 160px" v-if="sj && sj.length">
                            <ul class="scroll" style="flex:2" v-if="sj && sj.length">
                                <li v-for="(item, index) in sj" :key="index">
                                    <span class="s0" style="flex:1">{{item.year}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.wt">{{item.wt}}</span>
                                    <span class="s2 center" style="flex:2" :title="item.pjnr">{{item.pjnr}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 巡视巡察 -->
                    <div class="table_box" v-if="jdwdIndex == 1">
                        <div class="colums">
                            <span class="s0" style="flex: 1">问题类型</span>
                            <span class="s2" style="flex: 2">问题内容</span>
                            <span class="s2" style="flex: 2">结果</span>
                        </div>
                        <el-scrollbar style="height: 160px" v-if="xsxc && xsxc.length">
                            <ul class="scroll" style="flex:2">
                                <li v-for="(item, index) in xsxc" :key="index">
                                    <span class="s0" style="flex:1">{{item.wtlx}}</span>
                                    <span class="s2 center" style="flex:2;" :title="item.wtnr">{{item.wtnr}}</span>
                                    <span class="s2 center" style="flex:2" :title="item.jg">{{item.jg}}</span>
                                </li>
                            </ul>
                        </el-scrollbar>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 信访举报 -->
                    <div class="table_box" v-if="jdwdIndex == 2">
                        <div class="colums">
                            <span class="s0" style="flex: 1">时间</span>
                            <span class="s2" style="flex: 2">事项类别</span>
                            <span class="s2" style="flex: 2">事项类容</span>
                        </div>
                        <ul class="scroll" style="height: 160px; flex:2" v-if="xfjb && xfjb.length">
                            <li v-for="(item, index) in xfjb" :key="index">
                                <span class="s0" style="flex:1">{{item.time}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.sxlb">{{item.sxlb}}</span>
                                <span class="s2 center" style="flex:2" :title="item.sxnr">{{item.sxnr}}</span>
                            </li>
                        </ul>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 个人事项 -->
                    <div class="table_box" v-if="jdwdIndex == 3">
                        <div class="colums">
                            <span class="s0" style="flex: 1">时间</span>
                            <span class="s2" style="flex: 2">事项类别</span>
                            <span class="s2" style="flex: 2">事项类容</span>
                        </div>
                        <ul class="scroll" style="height: 160px; flex:2" v-if="grsx && grsx.length">
                            <li v-for="(item, index) in grsx" :key="index">
                                <span class="s0" style="flex:1">{{item.time}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.sxlb">{{item.sxlb}}</span>
                                <span class="s2 center" style="flex:2" :title="item.sxnr">{{item.sxnr}}</span>
                            </li>
                        </ul>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                </div>
                <div class="content-box part r-3">
                    <div class="content-box-title">廉政维度</div>

                    <div class="tab-list">
                        <div class="item" style="padding: 0px 9px" @click="lzwdIndex = index" :class="[index == lzwdIndex ? 'act' : '']" v-for="(item, index) in lzwdTab" :key="index">
                            {{ item }}
                        </div>
                    </div>

                    <!-- 党风廉政意见 -->
                    <div class="table_box" v-if="lzwdIndex == 0">
                        <div class="colums">
                            <span class="s0" style="flex: 1">纪委反馈时间</span>
                            <span class="s2" style="flex: 2">纪委意见</span>
                        </div>
                        <ul class="scroll" style="height: 160px; flex:2" v-if="dflzyj && dflzyj.length">
                            <li v-for="(item, index) in dflzyj" :key="index">
                                <span class="s0" style="flex:1">{{item.time}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.yj">{{item.yj}}</span>
                            </li>
                        </ul>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 处理处分情况 -->
                    <div class="table_box" v-if="lzwdIndex == 1">
                        <div class="colums">
                            <span class="s0" style="flex: 1">时间</span>
                            <span class="s2" style="flex: 2">处理结果</span>
                            <span class="s2" style="flex: 2">事项</span>
                        </div>
                        <ul class="scroll" style="height: 160px; flex:2" v-if="clcfqk && clcfqk.length">
                            <li v-for="(item, index) in clcfqk" :key="index">
                                <span class="s0" style="flex:1">{{item.time}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.cljg">{{item.cljg}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.sx">{{item.sx}}</span>
                            </li>
                        </ul>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 一把手评议意见 -->
                    <div class="table_box" v-if="lzwdIndex == 2">
                        <div class="colums">
                            <span class="s0" style="flex: 1">时间</span>
                            <span class="s2" style="flex: 2">廉政评语</span>
                        </div>
                        <ul class="scroll" style="height: 160px; flex:2" v-if="ybspyyj && ybspyyj.length">
                            <li v-for="(item, index) in ybspyyj" :key="index">
                                <span class="s0" style="flex:1">{{item.time}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.lzpy">{{item.lzpy}}</span>
                            </li>
                        </ul>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>

                    <!-- 问题线索了结情况 -->
                    <div class="table_box" v-if="lzwdIndex == 3">
                        <div class="colums">
                            <span class="s0" style="flex: 1">受理时间</span>
                            <span class="s2" style="flex: 2">违纪行为分类</span>
                            <span class="s2" style="flex: 2">了结结论</span>
                        </div>
                        <ul class="scroll" style="height: 160px; flex:2" v-if="wtxsljqk && wtxsljqk.length">
                            <li v-for="(item, index) in wtxsljqk" :key="index">
                                <span class="s0" style="flex:1">{{item.time}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.wjxwfl">{{item.wjxwfl}}</span>
                                <span class="s2 center" style="flex:2;" :title="item.ljjl">{{item.ljjl}}</span>
                            </li>
                        </ul>
                        <div class="no-data" style="height: 160px;" v-else>
                            <div class="no_data_img"></div>
                            <span>该干部暂无此项教招</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
import { http_get } from '@/api';
import gqgxLine from './comp/gqgxLine.vue'

export default {
    components: {
        headerBg,
        gqgxLine
    },
    data () {
        return {
            loadFlag: false,
            zzwdIndex: 0,
            zzwdTab: ['领导批示落实', '清单整改', '基层党建述职评议', '政治素质考察'],

            ldpsls: [], // 批示落实
            qdzg: [],
            jcdjszpy: [],
            zzszkc: [], // 政治素质考察

            sjwdTab: ['业绩年报', '绩效指标', '年度重点工作'],
            sjwdIndex: 0,
            yjnb: [],
            jxzb: [],
            ndzdgz: [],

            khwdTab: ['年度考核', '专项考核', '平时考核'],
            khwdIndex: 0,
            ndkh: {},
            zxkh: {},
            pskh: {},

            jdwdTab: ['审计', '巡视巡查', '信访举报', '个人事项'],
            jdwdIndex: 0,
            sj: [],
            xsxc: [],
            xfjb: [],
            grsx: [],

            lzwdTab: ['党风廉政意见', '处理处分情况', '一把手评议意见', '问题线索了结情况'],
            lzwdIndex: 0,
            dflzyj: [],
            clcfqk: [],
            ybspyyj: [],
            wtxsljqk: [],
            

            // 成员信息
            userInfo: {
                name: "",
                csny: "",
                xl: "",
                xrzw: "",
                yysm: "",
                xrzjccsj: "",
                sxly: "",
                fgly: "",
                ssxlh: "",
                bzlb: []
            },

            a00: "",

            pjkb_z: '',
            pjkb_f: ''
        }
    },
    mounted () {
        this.a00 = this.$route.query.id
        this.init()
    },
    methods: {
        handleCommand (command) {
            console.log(command)
            this.$router.push({
                path: "/bzhx",
                query: {
                    id: command.b00
                }
            })
        },
        init () {
            http_get('gbhx', {
                a00: this.a00
            }).then(res => {
                if (res && res.data) {
                    let _data = res.data.data
                    this.userInfo = _data.userInfo

                    this.ldpsls = _data.ldpsls
                    this.qdzg = _data.qdzg
                    this.jcdjszpy = _data.jcdjszpy
                    this.zzszkc = _data.zzszkc

                    this.yjnb = _data.yjnb
                    this.jxzb = _data.jxzb
                    this.ndzdgz = _data.ndzdgz

                    this.sj = _data.sj
                    this.xsxc = _data.xsxc
                    this.xfjb = _data.xfjb
                    this.grsx = _data.grsx

                    this.dflzyj = _data.dflzyj
                    this.clcfqk = _data.clcfqk
                    this.ybspyyj = _data.ybspyyj
                    this.wtxsljqk = _data.wtxsljqk

                    this.ndkh = _data.ndkh
                    this.pskh = _data.pskh
                    this.zxkh = _data.zxkh

                    this.pjkb_f = _data.pjkb_f
                    this.pjkb_z = _data.pjkb_z

                    this.loadFlag = true
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: calc(100% - 130px);
    color: #fff;
    margin-top: 5px;
}

.tab-list {
    display: flex;
    flex-direction: row;
    color: #fff;
    margin-top: 10px;
    .item {
        display: flex;
        background-color: rgba($color: #00e8ff, $alpha: 0.2);
        // width: 125px;
        padding: 0px 15px;
        height: 33px;
        background-size: 100%;
        line-height: 33px;
        justify-content: center;
        color: rgba($color: #00e8ff, $alpha: 0.6);
        // transition: all 0.3s;
        cursor: pointer;
        margin: 0px 6px;
        text-align: center;

        background-image: url('@/assets/img/bianjiao1.png'), url('@/assets/img/bianjiao2.png'), url('@/assets/img/bianjiao3.png'), url('@/assets/img/bianjiao4.png');
        background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
        background-position: top left, top right, bottom left, bottom right;
        background-size: 10px;

        &.act {
            background-color: rgba($color: #00e8ff, $alpha: 0.3);
            background-image: url('@/assets/img/jiao1.png'), url('@/assets/img/jiao2.png'), url('@/assets/img/jiao3.png'), url('@/assets/img/jiao4.png'), url('@/assets/img/bg-arrow.png');
            background-repeat: no-repeat, no-repeat, no-repeat, no-repeat,no-repeat;
            background-position: top left, top right, bottom left, bottom right, center bottom;
            color: rgba($color: #00e8ff, $alpha: 1);
        }
    }
}
.left-part {
    width: 580px;
    margin-left: 10px;
}

.right-part {
    margin-right: 10px;
    width: 580px;
}

.part {
    margin-top: 10px;
}

.center-part {
    height: 100%;
    width: 695px;
    margin-top: 10px;
    position: relative;
}

.table_box {
    margin: 10px 5px 0px 5px;
    .colums {
        background-color: rgba($color: #00e8ff, $alpha: 0.1);
        color: #fff;
        height: 38px;
        line-height: 40px;
        flex: 3;
        display: flex;
        flex-direction: row;

        .s0 {
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }

        .s1 {
            flex: 2;
            display: flex;
            justify-content: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }

        .s2 {
            flex: 1;
            display: flex;
            justify-content: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            word-break: break-all;
        }
    }

    .scroll {
        cursor: pointer;
    }

    ul {
        li {
            display: flex;
            flex-direction: row;

            .s0 {
                text-align: center;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }

            .s1 {
                padding-left: 20px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: break-all;
            }

            .s2 {
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;
            }
        }
        li:nth-child(odd) {
            height: 40px;
            line-height: 40px;
        }

        li:nth-child(even) {
            height: 40px;
            line-height: 40px;
            background-color: rgba($color: #00e8ff, $alpha: 0.1)
        }
    }
}

.no-data  {
    display: flex;
    flex-direction: column;
    color: #fff;
    align-items: center;
    justify-content: center;
    
    .no_data_img {
        height: 100px;
        width: 100px;
        background: url('../../assets/img/no-data.png') no-repeat;
    }
}

.info-box {
    color: #fff;
    display: flex;
    flex-direction: row;
    padding: 40px 50px 0px 50px;
    justify-content: flex-start;
    align-items: flex-start;
    cursor: pointer;
    .info-img {
        width: 160px;
        height: 200px;
        margin-right: 20px;
        margin-top: 10px;
    }

    .info-box__right {
        display: flex;
        flex-direction: column;
        position: relative;
        width: calc(100% - 180px);
        line-height:20px;

        .xlh {
            position: absolute;
            top: 155px;
            right: 0px;
            font-size: 20px;
            color: #f8da5c;
            padding: 10px 12px;
            border: 1px solid #f8da5c;
            border-radius: 20px;
            cursor: pointer;
        }

        .info-item {
            display: flex;
            flex-direction: row;
            margin: 7px 0px;
            font-size: 16px;
            .label {
                color: #fff;
                white-space: nowrap;
            }
            .val {
                color: #fff;
                text-align: left;
                line-height: 20px;
            }
        }
    }
}


.section {
    margin: 0px 40px;
    .sub-tit-box {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .tit {
            color: #6fdaff;
            font-size: 20px;
            padding: 0px 5px 5px 5px;
            border-bottom: 3px solid #6fdaff;
        }

        .all_btn {
            font-size: 16px;
            padding: 4px 6px;
            border-radius: 8px;
            border: 1px solid #fff;
            color: #fff;
            cursor: pointer;
            transition: all 0.5s;
            &:hover {
                opacity: 0.8;
            }
        }
    }

    .sec_1 {
        padding: 10px 0px;
        height: 40px;
        color: #fff;
        font-size: 18px;
        line-height: 36px;
        text-align: left;
    }

    .sec_2 {
        color: #fff;
        font-size: 18px;
        line-height: 32px;
        text-indent: 36px;
        text-align: left;
    }

    .sec_4 {
        color: #fff;
        font-size: 18px;
        line-height: 32px;
        text-indent: 36px;
        text-align: left;
    }

    .sec_3 {
        font-size: 16px;
        line-height: 40px;
        text-align: left;

        .item {
            display: inline-block;
            margin: 5px 10px 5px 0px;
            padding: 0px 20px;
            background-color: #0064b2;
            color: #ffffff;
            border-bottom-right-radius: 30px;
            border-top-left-radius: 30px;
            border-top-right-radius: 3px;
            border-bottom-left-radius: 3px;
        }
    }
}

.fix-bz-box {
    position: absolute;
    right: 20px;
    top: 47px;
    z-index: 201;
}

.bx-box {
    position: absolute;
    right: 16px;
    top: 80px;
    z-index: 100;
    display: flex;
    .el-button--primary {
        margin: 5px 5px;
        padding: 5px 5px;
        width: 47px;
    }
}

.kb-box {
    height: 245px;
    display: flex;
    flex-direction: column;
    margin-top: 10px;
    .pj_1 {
        height: 125px;
        width: 100%;
        background: url('../../assets/img/pj_z.png') no-repeat;
        background-position: center;

        .tit {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 25px 40px 0px 110px;
            color: #00e6ff;
        }

        .des {
            padding: 8px 30px 0px 110px;
            line-height: 20px;
        }
    }

    .pj_2 {
        height: 125px;
        width: 100%;
        background: url('../../assets/img/pj_f.png') no-repeat;
        background-position: center;

        .tit {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 25px 110px 0px 40px;
            color: #ff6a00;
            
        }

        .des {
            padding: 8px 110px 0px 40px;
            line-height: 20px;
        }
    }
}

.center {
    text-align: center
}
</style>