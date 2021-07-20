<template>
  <div class="content">
    <img :src="pacienteUsuario.datos.foto" alt="" class="img-rounded"/>
    <div>
      <span class="titulo-item">{{ pacienteUsuario.datos.nombre }} {{ pacienteUsuario.datos.apellido_paterno }}</span
      ><br />
      <span
        >{{cita.turno.especialidad.nombre}} </span
      >      
    </div>
    <div class="right-side">
      <span class="titulo-item"> {{ cita.turno.hora_inicio }}</span><br />
      <span
        >{{ cita.estado_pago }}</span
      >
      <br>
      <span
        >{{ cita.estado_atencion }}</span
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
      paciente : {},
      pacienteUsuario: {
          datos: {
              
          }
      },
    };
  },
  async created() {    
    this.cita.estado_atencion = capitalizarPrimeraLetra(this.cita.estado_atencion);
    this.cita.estado_pago = capitalizarPrimeraLetra(this.cita.estado_pago);
    await this.obtenerPacienteByUsuario(this.cita.datos_paciente.id_usuario);
    await this.ObtenerUsuario(this.cita.datos_paciente.id_usuario)
  },

  methods: {
    async obtenerPacienteByUsuario(idUsuario){
         await axios
        .get(`/Paciente/usuario?idusuario=${idUsuario}`)
        .then((x) => {
         this.paciente = x.data;
        })
        .catch((err) => console.log(err));
    },
    async ObtenerUsuario(idUsuario) {
        await axios
        .get(`/Usuario/id?id=${idUsuario}`)
        .then((x) => {
         this.pacienteUsuario = x.data;
        })
        .catch((err) => console.log(err));
    }
   
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
  .titulo-item {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .right-side {
    margin-left: 10%;
  }
}
.img-rounded {
    width:80px;
    border-radius: 120px;        
    margin-left: 16px;
    margin-right: 16px;
    object-fit: cover;

}
</style>