<template>
  <input type="range" @input="this.handleChange" min="0" max="255" step="1" :value="value"/>
</template>

<script>
export default {
  props: ['value', 'onChange'],
  data() {
    return {
    };
  },
  methods: {
    handleChange(e) {
      this.onChange(+e.target.value);
    },
  },
};
</script>

<style scoped>
</style>
