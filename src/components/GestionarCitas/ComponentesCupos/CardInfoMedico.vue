<template>
  <div class="main">
    <div class="left">
      <img       
        :src="foto"
        alt=""
        class="profile-medico"
      />
    </div>
    <div class="right">
      <h1>Dr. {{medico.nombre_medico}}</h1>
      <p>{{this.especialidad.nombre}}</p>
      <p>{{colegiatura }}</p>
      <div
        @click="OpenDialogOpiniones()"
        style="max-width:180px;"
      >
        <ComponentQualification
          :qualification="infoOpiniones.item2"
          :imgSize="25"
        ></ComponentQualification>
      </div>
    </div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogOpiniones"
          persistent
          max-width="800"
        >
          <ComponentOpiniones
            @emit-close-dialog-opiniones="CloseDialogOpiniones()"
            :infoOpiniones="infoOpiniones"
            :infoMedico="infomedico"
            :nombreEspecialidad="especialidad.nombre"
          ></ComponentOpiniones>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import ComponentOpiniones from "@/components/Opiniones/ComponentOpiniones";
import ComponentQualification from "@/components/Opiniones/ComponentQualification";

export default {
  name: "CardInfoMedico",
  props: ["medico"],
  components:{
    ComponentOpiniones,
    ComponentQualification
  },
  data() {
    return {
      dialogOpiniones:false,
      infomedico: [],
      especialidad: [],
      infoOpiniones:[],
      foto: '',
      colegiatura : ''
    }
  },
  async created() {
    await this.getInfoMedico();
    await this.getInfoOpiniones();
  },
  methods: {
    OpenDialogOpiniones(){
      this.dialogOpiniones=true;
    },
    CloseDialogOpiniones(){
      this.dialogOpiniones=false;
    },
    async getInfoMedico(){          
         await axios
          .get(`/Medico/medicousuario/${this.medico.id_medico}`)
          .then(async (x) => {
              this.infomedico = x.data;
              this.foto = this.infomedico.usuario.datos.foto
              this.colegiatura = this.infomedico.datos_basicos.numero_colegiatura;
              await axios
              .get(`/Especialidad/Id?id=${x.data.id_especialidad}`)
              .then((y) => {                                
                this.especialidad = y.data;
              })
              .catch((err) => console.log(err));  
          } );
    },
    async getInfoOpiniones(){        
      let year;
      let month;
      let day;  
      await axios
      .get(`/Opiniones/all?idMedico=${this.medico.id_medico}`)
      .then((x) => {
        x.data.item2 = Math.round(x.data.item2);
        this.infoOpiniones = x.data;
        this.infoOpiniones.item1.forEach((item) => {
          year = item.fecha_opinion.split("T")[0].split("-")[0];
          month = item.fecha_opinion.split("T")[0].split("-")[1];
          day = item.fecha_opinion.split("T")[0].split("-")[2];
          item.fecha_opinion = day + "/" + month + "/" + year;
        });
      })
      .catch((err) => console.log(err));  
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