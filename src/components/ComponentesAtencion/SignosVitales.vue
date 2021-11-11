<template>
  <div class="div-principal">
       <div class="container-principal">
      <div class="div-title">
        <h3 class="tit-white">Constantes vitales</h3>  
        </div>
        Otros datos aquí skadaskd
      </div>  
       <div class="container-principal">
      <div class="div-title">
        <h3 class="tit-white">Datos atropométricos</h3>  
        </div>
        Mas datitos aqui
      </div>        
  </div>
</template>

<script>
export default {
    name: "SignosVitales"
}
</script>

<style lang="scss" scoped>
.div-principal {
    padding: 2%;
   .container-principal {
    margin: 10px 0;    
    border-radius: 6px;
    padding-bottom: 6px;
  }
  .div-title {
    background: $blue;
    padding: 1%;
    border-radius: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tit-white {
      color: $white;
  }
}
</style>