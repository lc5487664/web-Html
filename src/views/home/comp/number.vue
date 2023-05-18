v<!--
  @auth:lcw
  数字递增组件
  修改：@lyq 去掉组件id 增加{{number}}
-->

<template>
    <div class="num-bg">
        <div class="bg">
            <div class="item" v-for="(item, index) in len" :key="index"></div>
        </div>
        <div class="incNumber" :style="{color: incNumberColor || '#fff'}" v-if="len">{{number}}</div>
    </div>
</template>

<script>
  export default {
    props: {
      incNumberColor: String,
      // 数值
      incNumber: {
        type: [Number, String],
        default() {
          return 0
        }
      }
    },
    data() {
      return {
        number: 0,
        len: 0
      }
    },
    created() {
        
        this.init();
    },
    mounted() {
        this.len = this.incNumber.toString().length
    },
    methods: {
      init() {
        this.NumAutoPlusAnimation({
          time: 2000,
          num: this.incNumber,
          regulator: 100
        });
      },
      //数字自增到某一值动画参数（目标元素,自定义配置）
      NumAutoPlusAnimation(options) {
        options = options || {};

        let
          // $this = document.getElementById(targetEle),
          // time = options.time || $this.data('time'), //总时间--毫秒为单位
          time = options.time || 10, //总时间--毫秒为单位
          //  finalNum = options.num || $this.data('value'), //要显示的真实数值
          finalNum = (options.num === undefined || options.num === 'null') ? 0 : options.num, //上面那行报错//后台数据出现了'null'的情况，所以对'null'做了判断
          regulator = options.regulator || 100, //调速器，改变regulator的数值可以调节数字改变的速度

          step = finalNum / (time / regulator), /*每30ms增加的数值--*/
          decimalSplit,
          decimalNum,
          count = 0, //计数器
          initial = -1;//真实数据为0时会有问题 所以initial不能为0

        if (finalNum % 1 !== 0) {
          decimalSplit = String(finalNum).split(".");
          decimalNum = decimalSplit[1].length;
        }

        let timer = setInterval(() => {

          count = count + step;

          if (count >= finalNum) {
            clearInterval(timer);
            count = finalNum;
          }

          //t未发生改变的话就直接返回
          //避免调用text函数，提高DOM性能
          let t = 0;
          // 判断最终数值是否是整数
          if (finalNum % 1 === 0) {
            t = Math.floor(count);
          } else {
            t = count.toFixed(decimalNum);
          }

          if (t === initial) return;

          initial = t;
          // 格式化数值（添加千分位符）
          // let formatNumber = this.formatMoney(initial, 1);
          // $this.innerHTML = initial;
          this.number = initial;
        }, 30);
      },

      /*
       * formatMoney(s,type)
       * 功能：数值按千位逗号分隔
       * 参数：s，需要格式化的金额数值.
       * 参数：type,判断格式化后的金额是否需要小数位（0/1）.
       * 返回：返回格式化后的数值字符串.
       */
      formatMoney(s, type) {
        if (/[^0-9\.]/.test(s))
          return "0.00";
        if (s == null || s == "null" || s == "")
          return "0.00";
        s = s.toString().replace(/^(\d*)$/, "$1.");
        s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
        s = s.replace(".", ",");
        var re = /(\d)(\d{3},)/;
        while (re.test(s))
          s = s.replace(re, "$1,$2");
        s = s.replace(/,(\d\d)$/, ".$1");
        if (type == 0) {
          var a = s.split(".");
          if (a[1] == "00") {
            s = a[0];
          }
        }
        return s;
      }
    },
    watch: {
      incNumber: {
        handler() {
            this.init();
            this.len = this.incNumber.toString().length
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" scoped>

.num-bg {
    display: flex;
    position: relative;
    align-items: center;
    .bg {
        display: flex;
        .item {
            height: 30px;
            width: 26px;
            margin: 0 2px;
            background-color: #09304e;
            color: #fff;
        }
    }
}
.incNumber {
    position: absolute;
    letter-spacing: 21px;
    padding-left: 10px;
}
</style>
