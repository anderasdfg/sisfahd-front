<template>
  <v-card elevation="3" class="card-modificarPerfil">
    <div class="top-card" v-if="this.user">

      <h1> Datos de Perfil Medico </h1>
       <img        
        :src="this.user.datos.foto ? this.user.datos.foto : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'"
        alt="Perfil"
        class="perfil"
      />

      <div class="info-paciente" >
        <h3> Nombre </h3>
        <p>{{this.user.datos.nombre}}</p>

        
        <!-- <p>{{this.fechaNacimiento}}</p>
        <p>{{this.user.datos.telefono}}</p>
        <p>{{this.user.datos.correo}}</p> -->
      </div>  

      


      
      
    </div>
  </v-card>
</template>

<script>
export default {
  name: "ModificarPerfilMedico",
  props: ["user"], 
  data() {
    return {
     
    }
  }, 

  
};
</script>
<style lang="scss">
// .home {
//   margin: 1%;
//   display: flex;
//   justify-content: space-around;
// }

.perfil {
    width: 25%;
    height: 25%;
    border-radius: 20px;
  }
.card-modificarPerfil {
  max-width: 80%;
  border-radius: 20px !important;
}

.info-paciente {
    h2 {
      font-size: 24px;
    }
    p {
      margin-bottom: 1%;
    }
  }
</style>
