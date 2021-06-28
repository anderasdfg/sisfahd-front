<template>

  <div class="home">
    <ModificarPerfilPaciente :user="this.user" class="card-modificarPerfil" />
    <v-card elevation="3" class="card">
      <div class="top-card">
      <img
        src="https://images.clarin.com/2015/03/20/claima20150320-8312-thinkstock-photos-mujer___HkwKuZR7x_340x340.jpg"
        alt="Perfil"
        class="perfil"
      />
      
      <div class="info-paciente">
      <h1> Datos del usuario </h1>

      <p> Nombre: </p>
      <p> Apellido paterno: </p>
      <p> Apellido materno: </p>
      <p> Tipo de documento: </p>
      <p> Numero de documento: </p>
      <p> Telefono: </p>
      <p> Fecha de nacimiento: </p>
      <p> Correo: </p>
      <p> Sexo: </p>
      </div>

      <button class="button-little">Modificar perfil</button>

</div>

    

    </v-card>
  </div>

  
</template>

<style lang="scss" scoped>
.perfil {
  width: 20%;
  height: 20%;
  border-radius: 20px;
}
</style>

<script>
import ModificarPerfilPaciente from "@/components/ModificarPerfil/ModificarPerfilPaciente.vue";

export default {
  name: "ModificarPerfil",
  components: {
    ModificarPerfilPaciente,
  },
  data(){ 
    return {

      rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
      //
    }
  },
//   computed: {
//     ...mapState(["drawer"]),
//     ...mapGetters(["user"]),
//   },
//   created() {
//     this.fetchUser();    
//   },
//   methods: {
//     ...mapActions(["fetchUser"]),    
//   },
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

.home {
  margin: 1%;
  display: flex;
  justify-content: space-around;
}
.card-modificarPerfil {
  max-width: 60%;
  border-radius: 20px !important;
}
</style>