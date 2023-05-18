<template>
    <div  class="home-container-view container-view">
        <header-bg>
            <template slot="header-left">
                 <el-breadcrumb separator-class="el-icon-arrow-right" >
                    <el-breadcrumb-item :to="{ path: '/' }">泉城好干部</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/lthx' }">干部立体画像</el-breadcrumb-item>
                    <el-breadcrumb-item>岗位画像</el-breadcrumb-item>
                </el-breadcrumb>
            </template>
        </header-bg>
        <div class="content">
            <div v-for="item in title" :key="item.name" class="title" @click="handleChange(item)">{{ item.name }}</div>
        </div>
    </div>
</template>

<script>
import headerBg from '../header/index.vue'
    export default {
        components: {
            headerBg,
        },
        data() {
            return {
                title: [
                    {
                        name: "市直单位",
                        code: 'szdw'
                    },
                    {
                        name: "区县",
                        code: 'qx'
                    },
                    {
                        name: "市管高校",
                        code: 'sggx'
                    },
                    {
                        name: "市管企业",
                        code: 'sgqy'
                    }
                ]
            }
        },
        methods: {
            handleChange(item) {
                this.$router.push({path:'gwhxTabDetail',query: {id: item.code}})
            }
        },
    }
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    justify-content: center;
    height: 90%;
    align-items: center;
    .title {
        height: 256px;
        width: 212px;
        background: url('@/assets/img/title-bg.png') no-repeat;
        text-align: center;
        color: #fff;
        line-height: 256px;
        font-size: 24px;
        font-weight: bolder;
        margin: 0 40px;
        letter-spacing: 2px;
        cursor: pointer;
    }
    .title:hover {
        background: url('@/assets/img/title-bg-active.png') no-repeat;
    }
}
</style>