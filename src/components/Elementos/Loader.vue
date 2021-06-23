<template>
  <v-card height="300px">
    <v-card-title class="justify-center">{{this.titulo}}</v-card-title>
    <div>
      <v-progress-circular
        style="display: block; margin: 40px auto"
        :size="90"
        :width="9"
        color="blue"
        indeterminate
      ></v-progress-circular>
    </div>
    <v-card-subtitle
      class="justify-center"
      style="font-weight: bold; text-align: center"
      >{{this.mensaje}}</v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  name: "Loader",
  props: ["titulo", "mensaje"]
};
</script>
