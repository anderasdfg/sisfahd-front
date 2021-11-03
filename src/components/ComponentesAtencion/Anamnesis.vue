<template>
  <div class="div-anamnesis">
      <v-textarea
          class="input-anamnesis"
          outlined          
          label="Anamnesis" 
          auto-grow  
          rows="10"
          row-height="25"      
        ></v-textarea>
  </div>
</template>

<script>
export default {
    name: 'Anamnesis'
}
</script>

<style lang="scss" scoped>
.div-anamnesis {
    padding: 2%;
   .input-anamnesis {
       border: 0;
     
   }
}
</style>