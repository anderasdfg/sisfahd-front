<template>
  <div class="div-anamnesis">
    <v-textarea
      class="input-anamnesis"
      label="Anamnesis"
      auto-grow
      rows="15"
      filled
      rounded
      row-height="25"
      v-model="mutatedAnamnesis"
      @input="$emit('getAnamnesis', mutatedAnamnesis)"
    ></v-textarea>
  </div>
</template>

<script>
export default {
  name: "Anamnesis",
  props: ["anamnesis"],
  data() {
    return {
      mutatedAnamnesis: '',
    };
  },
  created() {
    this.mutatedAnamnesis = this.anamnesis;
  },
};
</script>

<style lang="scss" scoped>
.div-anamnesis {
  padding: 2%;
  .input-anamnesis {
    border: 0;
  }
}
</style>