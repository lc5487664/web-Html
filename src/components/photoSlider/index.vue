<template>
    <div class="page-slider">
        <span class="title" v-if="params && params.name">{{ params && params.name}}</span>
        <div class="content">
            <div class="left_btn" v-if="showLeftBtn" @click="btnLeft()"></div>
            <div class="trans_box" v-else></div>
            <div class="photo_box_bg" :style="{width: minWidth + 'px'}">
                <div class="photo_box" :style="{width:maxWidth + 'px', left: -(minWidth * curIndex) + 'px'}" v-if="cvData && cvData.data">
                    <div class="photo_item" :style="{width: itemWidth + 'px'}"  v-for="(item, index) in cvData.data" :key="index">
                        <div class="img" @click="getUserInfo(item)">
                            <img :src="item.photoUrl">
                        </div>
                        <div v-if="showBox" class="photo_name">
                            <el-checkbox v-model="item.checked" @change="addBxk($event, item)">
                                {{item.name}}
                            </el-checkbox>
                        </div>
                        <div class="photo_name" v-else>
                            {{item.name}}
                        </div>
                        <div class="zw_box" :title="item.zw" :style="{width: itemWidth + 'px'}">{{item.zw}}</div>
                    </div>
                </div>
            </div>
            <div class="right_btn" v-if="showRightBtn" @click="btnRight()"></div>
            <div class="trans_box" v-else></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        params: {
            type: Object,
            defalut() {
                return {}
            }
        },
        length: {
            type: Number,
            defalut: 3
        },
        itemWidth: {
            type: Number,
            defalut: 130
        },
        showBox: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            curIndex: 0,
            showLeftBtn: false,
            showRightBtn: false,
            ids: [],
            cvData: {}
        }
    },

    computed: {
        minWidth() {
            return this.length * this.itemWidth;
        },
        maxWidth() {
            return this.params ? this.params.data.length * this.itemWidth : 0
        },
        maxIndex() {
            return this.params ? Math.ceil(this.params.data.length / this.length) : 0
        }
    },

    watch: {
        params: {
            handler (newVal, oldVal) {
                this.curIndex = 0
                this.init();
            },
            deep: true
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            if((this.params && this.params.data &&  this.params.data.length) > this.length) {
                this.showRightBtn = true;
            }
            this.ids = []
            this.cvData = JSON.parse(JSON.stringify(this.params))
            console.log('init', this.cvData.data, this.params.data)
        },
        btnRight() {
            this.curIndex += 1;
            this.showLeftBtn = true;
            if((this.curIndex + 1) == this.maxIndex) {
                this.showRightBtn = false;
            }
        },
        btnLeft() {
            this.curIndex -= 1;
            this.showRightBtn = true;
            if(this.curIndex == 0) {
                this.showLeftBtn = false;
            }
        },
        getUserInfo(item) {
            this.$emit('itemClick', item)
        },
        addBxk (e, el) {
            if (e) {
                this.ids.push(el.id)
            } else {
                this.ids = this.ids.filter(item => item != el.id)
            }
            console.log(this.ids)
            this.$forceUpdate()
            this.$emit('getIds', this.ids)
        }
    }
}
</script>

<style lang="scss" scoped>
.page-slider {
    height: 100%;
}
.photo_box_bg {
    overflow: hidden;
    position: relative;
    height: 180px;
    margin-left: 10px;
    margin-right: 10px;
}

.photo_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    // cursor: pointer;

    .img {
        width: 100px;
        height: 130px;
        margin-bottom: 10px;

        img {
            height: 100%;
            width: 100%;
        }
    }
}

.photo_name {
    color: #fff;
    font-size: 18px;
}
.photo_box {
    display: flex;
    flex-direction: row;
    position: absolute;
    left: 0px;
    top: 0px;
    transition: all 0.5s;
}

.right_btn {
    height: 50px;
    width: 50px;
    background: url('../../assets/img/right.png') no-repeat;
    background-size: contain;
    cursor: pointer;
    margin-bottom: 50px;
}

.left_btn {
    height: 50px;
    width: 50px;
    background: url('../../assets/img/left.png') no-repeat;
    background-size: contain;
    cursor: pointer;
    margin-bottom: 50px;
}

.trans_box {
    height: 50px;
    width: 50px;
    background: transparent;
}

.content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 25px;
}

.title {
    font-size: 18px;
    color: #ffffff;
    background-color: #23557a;
    padding: 5px 20px 5px 25px;
    border-radius: 0px 15px 15px 0px;
    margin-bottom: 20px;
    position: absolute;
    top: 0px;
    left: 0px;
}

.title::before {
    content: "";
    position: absolute;
    width: 4px;
    height: 16px;
    background-color: #ffd61a;
    top: 6px;
    left: 8px;
}

.zw_box {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    white-space: nowrap;
    margin-top: 10px;
    font-size: 16px;
}

.page {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
    padding-left: 15px;
}
</style>