<template>
  <v-card>
    <h1 class="title-card">{{nombreMedico}}}</h1>
    <v-card-text>
      hola
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "DetalleCupo",
  data() {
    return {
      nombreMedico: "Jorge"     
    };
  },  
  methods: {    

  },
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 10%;
  text-align: left;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.autocomplete-search {
  margin: 2% 10% 7% 10%;
  label {
    color: $black;
    font-size: 20px;
  }
}
.btn-buscar {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 80%;
  height: 4vh;
  font-weight: bold;
  font-size: 20px;
  margin: 0 10% 10% 10%;
}
</style>