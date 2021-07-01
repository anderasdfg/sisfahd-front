<template>
  <div class="main">
    <div class="left">
      <img
        :src="this.infomedico.usuario.datos.foto"
        alt=""
        class="profile-medico"
      />
    </div>
    <div class="right">
      <h1>Dr. {{medico.nombre_medico}}</h1>
      <p>{{this.especialidad.nombre}}</p>
      <p>{{this.infomedico.datos_basicos.numero_colegiatura }}</p>
      <img
        src="https://www.perutourism.com/images/experiences/estrellas/5-estrellas.png"
        alt=""
        class="stars"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "CardInfoMedico",
  props: ["medico"],
  data() {
    return {
        infomedico: [],
        especialidad: []
    }
  },
  async created() {
    await this.getInfoMedico();
  },
  methods: {
    async getInfoMedico(){          
         await axios
          .get(`/Medico/medicousuario/${this.medico.id_medico}`)
          .then(async (x) => {
              this.infomedico = x.data;
              await axios
              .get(`/Especialidad/Id?id=${x.data.id_especialidad}`)
              .then((y) => {                                
                this.especialidad = y.data;
              })
              .catch((err) => console.log(err));  
          } );
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
 // justify-content: space-around;
  padding: 3%;
  margin: 0;
  .left {
    width: 30%;
    .profile-medico {
      margin: 0 5%;
      width: 8rem;
      height: 8rem;
      border-radius: 8rem;
    }
  }
  .right {
    width: 70%;
    h1 {
      color: $blue;
      font-size: 1.4em;
    }
    p {
      color: $blue;
      font-size: 1em;
      margin: 0.5rem 0;
    }
    .stars {
      width: 9rem;
    }
  }
}
</style>