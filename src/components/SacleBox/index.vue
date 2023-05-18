<template>
    <div
    id="ScaleBox"
    class="ScaleBox"
    ref="ScaleBox"
    :style="{
      width: pageData.width + 'px',
      height: pageData.height + 'px',
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
    name: "sacle-box",
    data () {
        return {
            pageData: {
                scale: 0,
                width: 1920,
                height: 1080,
            }
        }
    },
    mounted () {
        this.init()
    },
    methods: {
        init () {
            this.setScale()
            this.addListen()
        },
        getScale () {
            const { width, height } = this.pageData
            const wh = window.innerHeight / height
            const ww = window.innerWidth / width
            console.log(ww < wh ? ww : wh)
            return ww < wh ? ww : wh
        },
        setScale () {
            this.pageData.scale = this.getScale()
            let ScaleBox = this.$refs.ScaleBox
            ScaleBox.style.setProperty("--scale", this.pageData.scale)
        },
        addListen () {
            window.addEventListener('resize', () => {
                this.setScale()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#ScaleBox {
  --scale: 1;
}
.ScaleBox {
  position: absolute;
  transform: scale(var(--scale)) translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  transform-origin: 0 0;
  left: 50%;
  top: 50%;
  transition: 0.3s;
  z-index: 999;
}
</style>
