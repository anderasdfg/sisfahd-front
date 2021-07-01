<template>
  <v-card elevation="3" class="card-modificarPerfil">
    <div class="top-card">

      <h1> Modificar Perfil
      </h1>
      <img
        src="https://images.clarin.com/2015/03/20/claima20150320-8312-thinkstock-photos-mujer___HkwKuZR7x_340x340.jpg"
        alt="Perfil"
        class="perfil"
      />
      <div class="info-paciente">
        <h2>{{this.user.datos.nombre}} {{this.user.datos.apellido_paterno}} {{this.user.datos.apellido_materno }}</h2>
        <p>{{this.user.datos.fecha_nacimiento}}</p>
        <p>{{this.user.datos.telefono}}</p>
        <p>{{this.user.datos.correo}}</p>
      </div>
      <button class="button-little">Historia clínica</button>
    </div>
    <div class="info-adicional">         
        
          <p><b>Peso (kg) </b>54</p>
          <p><b>Grupo sanguíneo </b>O+</p>
        
        
          <p><b>Talla (m) </b>1.45</p>
          <p><b>Edad </b>38 años</p>
        
    </div>
  </v-card>
</template>

<style lang="scss">
// .home {
//   margin: 1%;
//   display: flex;
//   justify-content: space-around;
// }
.card-modificarPerfil {
  max-width: 80%;
  border-radius: 20px !important;
}
</style>