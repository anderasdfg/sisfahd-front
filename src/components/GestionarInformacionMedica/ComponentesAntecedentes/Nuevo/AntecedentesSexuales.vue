<template>
  <div>
    Antecedentes Sexuales
    <br>
    <v-btn dark color="#4172F2" @click="CambiarSeccion(true)">Continuar</v-btn>
    <v-btn text color="#4172F2" @click="CambiarSeccion(false)">Retroceder</v-btn>
  </div>
</template>

<script>
export default {
  name: 'AntecedentesSexuales',
  data(){
    return{

    }
  },
  methods:{
    CambiarSeccion(valor) {
      this.$emit("emit-cambiar-seccion",valor);
    },
  }
}
</script>

<style>

</style>