<template>
  <div class="content">
    <img :src="linkImg" alt="" />
    <div>
      <span class="titulo-item">{{ cita.datos_turno.especialidad.nombre }}</span
      ><br />
      <span
        >Dr(a). {{ cita.datos_turno.datos_medico.nombre_apellido_medico }}</span
      >      
    </div>
    <div class="right-side">
      <span class="titulo-item"> {{ cita.datos_turno.hora_inicio }}</span><br />
      <span
        >{{ cita.estado_pago }}</span
      >
    </div>
  </div>
</template>

<script>
function capitalizarPrimeraLetra(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

import axios from "axios";
export default {
  name: "CardCita",
  props: ["cita"],
  data() {
    return {
      linkImg: "https://qullana.com.pe/wp-content/uploads/2020/08/esp02.png",
    };
  },
  async created() {
    this.obtenerEspecialidad(this.cita.datos_turno.especialidad.codigo);
    this.cita.estado_pago = capitalizarPrimeraLetra(this.cita.estado_pago);
  },

  methods: {
    async obtenerEspecialidad(id) {
      //this.loadingEspecialidad = true;
      await axios
        .get(`/Especialidad/Id?id=${id}`)
        .then((x) => {
          this.linkImg = x.data.url;
          //   this.especialidades = x.data;
          //   this.cargaEspecialidades = false
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: rgb(95, 149, 255);
  background: linear-gradient(
    281deg,
    rgba(95, 149, 255, 1) 0%,
    rgba(101, 164, 240, 0.9051995798319328) 100%
  );
  width: 50vh;
  color: black;
  align-self: center;
  border-radius: 20px;
  height: 10vh;
  //font-weight: bold;
  display: flex;
  align-items: center;
  img {
    width: 30%;
    padding: 5%;
  }
  .titulo-item {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .right-side {
    margin-left: 10%;
  }
}
</style>