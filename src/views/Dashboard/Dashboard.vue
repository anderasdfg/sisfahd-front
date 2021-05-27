<template>
    <div class="home">
        <CardPaciente class="card-paciente"/>        
        <CardCitas/>
    </div>
</template>

<style lang="scss" scoped>
    .perfil {
       width: 20%; 
       height: 20%;
       border-radius: 20px;
    }
</style>

<script>

import CardPaciente from '@/components/CardPaciente.vue'
import CardCitas from '@/components/CardCitas.vue'

export default {
  name: "Dashboard",
  components : {
      CardPaciente,
      CardCitas
  }
};
</script>

<style lang="scss">
    .home {
    margin: 1%;
    display: flex;
    justify-content: space-around;   
    }
    .card-paciente {
        max-width: 60%;
    }
</style>