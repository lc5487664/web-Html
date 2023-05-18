<template>
    <div class="gwhxTab-container-view container-view">
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
            <div class="content-left">
                <ul class="tab">
                    <li v-for="(item, index) in tabTitle" :key="item.code" class="tab-item" :class="item.code === type? 'is-selected':'no-selected'" @click="tabCilck(item, index)">{{ item.name }}</li>
                </ul>
            </div>
            <div class="content-right">
                <div v-for="item in data[type]" :key="item.title" class="person">
                    <div class="unit-title">{{ item.title }}</div>
                    <div class="person-info">
                        <div v-for="int in item.personInfo" :key="int.xm" class="person-info-item" :class="itemType === int.a00?'item-select':'' " @click="itemClick(int)">{{ int.xm }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import headerBg from '../header/index.vue'
    // import data from '../../../public/staticData/gwhxTab.json'
    import { http_get } from '@/api';
    export default {
        name: 'gwhxTab-container-view',
        components: {
            headerBg,
        },
        data() {
            return {
               tabTitle:[
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
               ],
               type: '',
               itemType: '',
               data:[]
            }
        },
        created () {
            this.type = this.$route.query.id;
            http_get('gwhx_tab-detail').then(res => {
                this.data = res.data
            })
        },
        methods: {
            tabCilck(item, index) {
                if(this.type === item.code) {
                    return
                }
                this.itemType = ''
                this.type = item.code
            },
            itemClick(item) {
                this.itemType = item.a00
                console.log(location, global)
                window.open(location.origin+location.pathname+"#/gwhx?id="+item.a00)
            }
        },
    }
</script>

<style lang="scss" scoped>
.content {
    display: flex;
    height: 100%;
    width: 100%;
    padding: 10px;
    .content-left {
        padding-left: 20px;
        .tab{
            display: flex;
            flex-direction: column;
            margin-top: 40px;
            .no-selected {
                background: url('@/assets/img/gwhx-tab-title.png') no-repeat;
                color: #00f5f5;
            }
            .no-selected:hover {
                background: url('@/assets/img/tab-title-active.png') no-repeat;
                color: #001414;
            }
            .is-selected {
                background: url('@/assets/img/tab-title-active.png') no-repeat;
                color: #001414;
            }
            .tab-item {
                width: 200px;
                height: 60px;
                text-align: center;
                line-height: 60px;
                margin: 20px;
                font-size: 20px;
                font-weight: bolder;
                cursor: pointer;
            }
        }
       
    }
    .content-right {
            display: flex;
            flex-direction: column;
            margin-top: 40px;
            margin-left: 80px;
            overflow-y: scroll;
        .person {
            color: #00f5f5;
            display: flex;
            flex-direction: column;
            .unit-title {
                font-size: 18px;
                font-weight: bolder;
                margin-bottom: 10px;
                margin-top: 20px;
            }
            .unit-title::before {
                display: inline-block;
                content: '';
                background: url('@/assets/img/arrow.png') no-repeat;
                width: 18px;
                height: 17px;
                margin-right: 15px;
                position: relative;
                top: 2px;
            }
            .person-info {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                .person-info-item {
                width: 151px;
                height: 48px;
                background: url('@/assets/img/unit-item-bg.png') no-repeat;
                text-align: center;
                line-height: 48px;
                margin: 10px 30px;
                cursor: pointer;
                font-weight: bold;
            }
            .person-info-item:hover {
                background: url('@/assets/img/unit-item-active.png') no-repeat;
                color: #001414;
                }
                .item-select {
                    background: url('@/assets/img/unit-item-active.png') no-repeat;
                    color: #001414;
                }
            }
            

        }
      
    }
}
</style>