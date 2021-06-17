<template>
  <div class="main">
    <div class="left">
      <img
        src="https://ma.com.pe/sites/default/files/noticias/que-obligaciones-tiene-el-medico-ocupacional-frente-al-covid-19.jpg"
        alt=""
        class="profile-medico"
      />
    </div>
    <div class="right">
      <h1>Dr. {{medico.nombre_medico}}</h1>
      <p>Cardiología</p>
      <p>C.M. 2342342</p>
      <img
        src="https://www.perutourism.com/images/experiences/estrellas/5-estrellas.png"
        alt=""
        class="stars"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CardInfoMedico",
  props: ["medico"],
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-around;
  padding: 3%;
  margin: 0;
  .left {
    width: 30%;
    .profile-medico {
      margin: 0 5%;
      width: 8rem;
      height: 8rem;
      border-radius: 8rem;
    }
  }
  .right {
    width: 70%;
    h1 {
      color: $blue;
      font-size: 1.4em;
    }
    p {
      color: $blue;
      font-size: 1em;
      margin: 0.5rem 0;
    }
    .stars {
      width: 9rem;
    }
  }
}
</style>