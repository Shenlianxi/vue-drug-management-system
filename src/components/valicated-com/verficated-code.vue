<template>
  <div class="valicated-wrapper" @click="createCode">
    <input disabled class="vertification-code"  v-model="checkCode" />
  </div>
</template>

<script>
export default {
  name: 'valicated-code',
  data() {
    return {
      checkCode: ''
    };
  },
  props: {
    refreshState: {
      type: Number
    }
  },
  mounted() {
    this.createCode();
  },
  watch: {
    refreshState(newVal, oldVal) {
      this.createCode();
    }
  },
  methods: {
    createCode() {
      var code = '';
      const codeLength = 4;
      const random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
        'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
        'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g',
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
        's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      for (var i = 0; i < codeLength; i++) {
        const index = Math.floor(Math.random() * 60);
        code = code + random[index];
      }
      this.checkCode = code;
      const codeData = this.changeLowerCase(code);
      this.$emit('checkCode', codeData);
    },
    changeLowerCase(value) {
      return value.toLowerCase();
    }
  }
};
</script>

<style lang="scss" scoped>
.valicated-wrapper {
  height: 36px;
  width: 80px;
  background: #05615c;
  background-image:
        linear-gradient(45deg, rgba(24, 114, 173, 0.25) 25%, transparent 0, transparent 75%, rgba(24, 114, 173, 0.25) 0),
        linear-gradient(45deg, rgba(24, 114, 173, 0.25) 25%, transparent 0, transparent 75%, rgba(24, 114, 173, 0.25) 0);
  background-position: 0 0, 5px 3px;
  background-size: 18px 5px;
}
.vertification-code {
    font-size: 20px;
    height: 100%;
    width: 100%;
    background: none;
    border: none;
    text-align: center;
    color: #fff;
    opacity: 0.7;
    font-style: italic;
}
</style>
