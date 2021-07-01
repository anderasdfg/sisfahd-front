<template>
  <v-card elevation="3" class="card">
    <div class="top-card">
      <img
        src="https://images.clarin.com/2015/03/20/claima20150320-8312-thinkstock-photos-mujer___HkwKuZR7x_340x340.jpg"
        alt="Perfil"
        class="perfil"
      />
      <div class="info-paciente">
        <h2>{{this.user.datos.nombre}} {{this.user.datos.apellido_paterno}} {{this.user.datos.apellido_materno }}</h2>
        <p>{{this.fechaNacimiento}}</p>
        <p>{{this.user.datos.telefono}}</p>
        <p>{{this.user.datos.correo}}</p>
      </div>
      <div style="width:130px">
        <button class="button-little" style="margin-bottom:50px; width:100%" @click="verHistoria(user.id)">Historia clínica</button>
        <button class="button-little" @click="verInformacionMedica()">Informacion Medica</button>
      </div>

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
export default {
  name: "CardPaciente",
  props: ["user"], 
  data() {
    return {
      fechaNacimiento : "",
      hasInfo: false
    }
  }, 
  async created() {
      this.fechaNacimiento = new Date(this.user.datos.fecha_nacimiento).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
  },
  methods: {
     verHistoria(idUsuario) {
       //console.log(idUsuario);
      this.$router.push({ name: "VisualizarHCI", params: { idUsuario: idUsuario } });
    },
    verInformacionMedica(){
      this.$router.push({ name: "InformacionMedica"});
    }
  }
};
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
  .info-paciente {
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
