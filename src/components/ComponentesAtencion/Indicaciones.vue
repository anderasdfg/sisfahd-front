<template>
  <div class="div-indicaciones">
      <v-textarea
          class="input-indicaciones"          
          label="Indicaciones" 
          auto-grow  
          rows="15"
          filled
          rounded
          row-height="25"   
          v-model="mutatedIndicacion"       
          @input="$emit('getIndicaciones', mutatedIndicacion)"  
        ></v-textarea>
  </div>
</template>

<script>
export default {
    name: 'Indicaciones',
    props: ["indicaciones"],
    data() {
    return {
      mutatedIndicacion: this.indicaciones,
    };
  },
  created() {
    this.mutatedIndicacion = this.indicaciones;
  },  
}
</script>

<style lang="scss" scoped>
.div-indicaciones {
    padding: 2%;
   .input-indicaciones {
       border: 0;
     
   }
}
</style>