<template>
  <div class="content" v-if="this.medico != {}">
    <div class="one">
      <img :src="this.medico.usuario.datos.foto" alt="icono" class="img-w" />
    </div>
    <div class="two">
      <h5>{{ this.turno.especialidad.nombre }}</h5>
      <h3>{{ this.turno.nombre_medico }}</h3>
    </div>
    <div class="three">
      <v-progress-circular
        :rotate="360"
        :size="100"
        :width="20"
        :value="value"
        color="green"
      >
        {{this.cantidadCitasAtendidas}}/{{this.cantidadCitasReservadas}}
      </v-progress-circular>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Cardcito",
  props: ["turno"],
  data: () => ({
    value: 0,
    medico: {
      usuario: {
        datos: {
          foto: "",
        },
      },
    },
    cita: {},
    cantidadCitasReservadas: 0,
    cantidadCitasAtendidas: 0    
  }),
  async created() {
    await this.getInfoMedico();
    await this.obtenerCantidadCitas();
  },
  methods: {
    async getInfoMedico() {      
      await axios
        .get(`/Medico/medicousuario/${this.turno.id_medico}`)
        .then((x) => {
          this.medico = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerCantidadCitas() {
      for (var i in this.turno.cupos) {
        if (this.turno.cupos[i].estado == "ocupado") {
          this.cantidadCitasReservadas ++;                
          await this.getInfoCita(this.turno.cupos[i].id_cita);
        }
      }
    },
    async getInfoCita(id) {
      console.log("cita");      
      console.log(id);
      await axios
        .get(`/Cita/id?id=${id}`)
        .then((x) => {
          this.cita = x.data;
          if(this.cita.estado_atencion=="atendido"){
            this.cantidadCitasAtendidas++;
          }
        })
        .catch((err) => console.log(err));

        this.value = (this.cantidadCitasAtendidas/this.cantidadCitasReservadas)*100;
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  border-radius: 20px;
  display: flex;
  align-content: center;
  align-items: center;
  background: #A2DBFA;
  justify-content: space-around;
}
.img-w {
  width: 72px;
  height: 72px;
  border-radius: 72px;
}
.three {
  padding: 1% 0;
}
</style>