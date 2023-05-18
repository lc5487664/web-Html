<template>
    <div class="header-bg header">
            <div class="header-left">
                <slot name="header-left"></slot>
            </div>
            <div class="header-middle">
                <img src="../../assets/img/biaoti.png" alt="">
            </div>
            <div class="header-right"></div>
        </div>
</template>

<script>
    export default {
        name: 'header-bg'
    }
</script>

<style lang="scss" scoped>
::v-deep .el-breadcrumb__inner.is-link {
    color: #fff !important;
}
::v-deep .el-breadcrumb__inner {
    color: #fff !important;
}
.header-bg {
    background: url('@/assets/img/toubu.png') no-repeat;
    background-size: 100%;
    height: 85px;
}
.header {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
    
}
.header-left {
    flex: 1;
    padding-left: 20px;
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}
.header-left::before {
   content: '';
   background: url('@/assets/img/mbx.png') no-repeat;
   width: 16px;
   height: 16px;
   display: inline-block;
}
.header-middle {
    height: 100%;
    flex:1;
    text-align: center;
    margin-top: 30px;
}
.header-right {
    flex:1
}
</style>