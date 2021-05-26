<template>
  <v-card elevation="3"  class="card">
        <button class="button-cita">Reservar cita</button>
        <h2>CITAS AGENDADAS</h2>
  </v-card>
    
</template>

<style lang="scss" scoped>
 
  .card {  
    padding: 1%;
    border-radius: 20px;       
    .button-cita{  
    background-color: $blue;
    width: 50vh;
    color: white;        
    align-self: center;
    border-radius: 10px;  
    height: 10vh;
    font-size: 25px;
  }
  }
  
  h2 {
      font-size: 18px ;
      margin-top: 5%;
  }
  
</style>

<script>
export default {
  name: "CardCitas",
};
</script>
