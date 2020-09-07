
<template>
  <transition name="el-loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="el-loading-mask"
      :style="{ backgroundColor: background || '' }"
      :class="[customClass, { 'is-fullscreen': fullscreen }]">
      <div class="el-loading-spinner">
        <div class="loading-circle">
          <div class="circle">
            <div class="circle-in"></div>
          </div>
          <img src="@/assets/images/loading.png" />
        </div>
        <p v-if="text" class="el-loading-text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        text: null,
        spinner: null,
        background: null,
        fullscreen: true,
        visible: false,
        customClass: ''
      }
    },
    methods: {
      handleAfterLeave() {
        this.$emit('after-leave')
      },
      setText(text) {
        this.text = text
      }
    }
  }
</script>
<style lang="less" scoped>
.el-loading-spinner  {
  .el-loading-text {
    color: #409eff;
    margin: 3px 0;
    font-size: 14px;
  }
}
.loading-circle {
  margin: 0 auto;
  width: 96px;
  height: 96px;
  position: relative;
  img {
    position: absolute;
    width: 54px;
    height: 54px;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
.circle {
  margin: 0 auto;
  width: 96px;
  height: 96px;
  border-radius: 48px;
  padding: 0;
  background-color: @primary-color;
  overflow: hidden;
  animation: rotating 1s ease-in-out infinite;
  .circle-in {
    width: 96px;
    height: 96px;
    border-radius: 48px 0 0 0;
    background: #E7EAEA;
    margin: 3px auto auto 3px;
  }
}
@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
      transform: rotate(1turn);
  }
}
</style>
