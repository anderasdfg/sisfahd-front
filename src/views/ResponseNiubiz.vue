<template>
  <div style="margin-top: 40px">
    Hola asfkjsfbndkjsgbjsdgds
  </div>
</template>
<script>
import axios from "axios";


export default {
  name: "ResponseNiubiz",  
  data: () => ({
    
  }),

  async created() {
    this.muestraInfo()
  },
  methods: {
    muestraInfo() {
      console.log(this.$route.params.purchaseNumber);
    },
  },
};
</script>

<style lang="scss" scoped>
.v-current-time {
  height: 2px;
  background-color: #ea4335;
  position: absolute;
  left: -1px;
  right: 0;
  pointer-events: none;

  &.first::before {
    content: "";
    position: absolute;
    background-color: #ea4335;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: -5px;
    margin-left: -6.5px;
  }
}

.card {
  display: flex;
  flex-direction: column;
  padding: 2%;
}

.card-detallecita {
  padding: 1.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .card-detallecita_left {
    display: flex;
    flex-direction: column;
    h1 {
      color: $blue;
      font-size: 20px !important;
      font-weight: normal;
    }
    h3 {
      color: $blue;
      font-size: 15px !important;
      font-weight: normal;
      margin-bottom: 2%;
    }
  }
  .card-detallecita_right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-medico {
    width: 50%;
    height: 100%;
    border-radius: 50%;
    margin: 0 0 3% 0;
  }
  .stars-bottom {
    width: 25%;
    height: 10%;
    padding: 0 0 1% 0;
  }
}
.card-datoscupo {
  display: flex;
  flex-direction: row;
  .card-datocupo {
    border-radius: 6px;
    background: $sky-blue;
    color: $black;
    font-size: 18px;
    width: 20%;
    text-align: center;
    margin: 1%;
  }
}
.button-reservar {
  margin: 1%;
  background: $blue;
  color: $white;
  text-align: center;
  border-radius: 6px !important;
  width: 42%;
  height: 5vh;
}
</style>