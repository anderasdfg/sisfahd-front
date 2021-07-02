<template>
  <v-card elevation="3" class="card">
    <div class="top-card" v-if="this.user">
      <img
        :src="
          this.user.datos.foto
            ? this.user.datos.foto
            : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
        "
        alt="Perfil"
        class="perfil"
      />
      <div class="info-medico">
        <h2>
          {{ this.user.datos.nombre }} {{ this.user.datos.apellido_paterno }}
          {{ this.user.datos.apellido_materno }}
        </h2>
        <p>{{ this.especialidad.nombre }}</p>
        <!-- <p v-if="this.medico.datos_basicos.numero_colegiatura">{{ this.medico.datos_basicos.numero_colegiatura }}</p> -->
        <!-- <p>{{ this.user.datos.correo }}</p> -->
      </div>
      <button class="button-little" @click="atenciones()">
        Ver atenciones
      </button>
    </div>
    <div class="top-card" v-else>
      <v-skeleton-loader type="article, actions"></v-skeleton-loader>
    </div>
    <div class="info-adicional" v-if="hasInfo">
      <p><b>Peso (kg) </b>54</p>
      <p><b>Grupo sanguíneo </b>O+</p>
      <p><b>Talla (m) </b>1.45</p>
      <p><b>Edad </b>38 años</p>
    </div>
  </v-card>
</template>

<script>
import axios from 'axios';
export default {
  name: "CardMedico",
  props: ["user"], 
  data() {
    return {
      fechaNacimiento : "",
      hasInfo: false,
      medico: [],
      especialidad: []
    }
  }, 
  async created() {
      this.getFechaNacimiento();
      this.getInfoMedico();
  },
  methods: {
     verHistoria(idUsuario) {
       //console.log(idUsuario);
      this.$router.push({ name: "VisualizarHCI", params: { idUsuario: idUsuario } });
    },
    getFechaNacimiento() {
      if(this.user != null) {
          this.fechaNacimiento = new Date(this.user.datos.fecha_nacimiento).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
      }      
    },
    atenciones() {
        this.$router.push(`gestionarAtencion`);
    },
    async getInfoMedico(){
         await axios
          .get(`/Medico/medicodatos/${this.user.id}`)
          .then(async(x) => {            
            this.medico = x.data;
            await axios
              .get(`/Especialidad/Id?id=${x.data.id_especialidad}`)
              .then((y) => {                                
                this.especialidad = y.data;
              })
              .catch((err) => console.log(err));                 
          })
          .catch((err) => console.log(err));
    }

  }
}
   

</script>

<style lang="scss" scoped>
.perfil {
  width: 25%;
  height: 25%;
  border-radius: 20px;
}
.card {
  padding: 1%;
  border-radius: 20px;
}
.info-medico {
  h2 {
    font-size: 24px;
  }
  p {
    margin-bottom: 1%;
  }
}
.top-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.info-adicional {
  margin-top: 3%;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}
.button-little {
  background: $sky-light;
  color: $blue;
  border-radius: 6px;
  height: 5vh;
  padding: 1.5%;
  text-align: center;
}
</style>
