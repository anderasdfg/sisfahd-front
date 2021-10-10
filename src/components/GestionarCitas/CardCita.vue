<template>
  <div class="content">
    <img :src="cita.medico.especialidad.url" alt="" style="width:116px;"/>
    <div>
      <span class="titulo-item">{{ cita.turno.especialidad.nombre }}</span
      ><br />
      <span
        >Dr(a). {{ nombreMedico }}</span
      >      
    </div>
    <div class="right-side">
      <span class="titulo-item"> {{ cita.turno.hora_inicio }}</span><br />
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
      nombreMedico: "",
    };
  },
  async created() {
    this.obtenerNombreMedico(this.cita.medico.id_usuario);
    this.cita.estado_pago = capitalizarPrimeraLetra(this.cita.estado_pago);
  },

  methods: {
    async obtenerNombreMedico(id) {
      //this.loadingEspecialidad = true;
      await axios
        .get(`/Usuario/id?id=${id}`)
        .then((x) => {
          this.nombreMedico = `${x.data.datos.nombre} ${x.data.datos.apellido_paterno} ${x.data.datos.apellido_materno} ` ;
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