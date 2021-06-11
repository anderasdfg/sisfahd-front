<template>
  <div class="main">
    <div class="left">
    <p class="title">Bienvenidos al</p>    
    <h1>Hospital digital</h1>
    <button>Reserva tu cita</button>
   </div>
  <div class="right">
      <img
        src="https://i.ibb.co/hCvzRNK/undraw-medicine-b1ol-1.png"
        alt=""
      />
   </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      listaPro: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../styles/main.scss";
.main {
  font-family: "Nunito", sans-serif;
  background-color: $sky-light;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .left {

  }
  .right {
    img {
      width: 50%;
    }
  }
  
}
</style>