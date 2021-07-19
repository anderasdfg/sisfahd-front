<template>
  <v-card elevation="3" class="card">
    <div class="top-card" v-if="this.user">
      <img        
        :src="this.user.datos.foto ? this.user.datos.foto : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'"
        alt="Perfil"
        class="perfil"
       
      />
      <div class="info-paciente" >
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
     <div class="top-card" v-else>
         <v-skeleton-loader          
          type="article, actions"
        ></v-skeleton-loader>

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
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "CardPaciente",
  props: ["user"], 
  data() {
    return {
      fechaNacimiento : "",
      hasInfo: false,
      dataPaciente:null
    }
  }, 
  async created() {
      this.getFechaNacimiento();
  },
  methods: {
    ...mapMutations(["setDataPaciente"]),
     verHistoria(idUsuario) {
       //console.log(idUsuario);
      this.$router.push({ name: "VisualizarHCI", params: { idUsuario: idUsuario } });
    },
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer
      });
    },
    async verInformacionMedica(){
      console.log(this.user.id);
      await axios
          .get(`/Paciente/usuario?idusuario=${this.user.id}`)
          .then(res => {
            var dataPaciente = res.data;
            for (var x=0;x<res.data.antecedentes.personales.enfermedades.length;x++){
              if(res.data.antecedentes.personales.enfermedades[x].fecha_inicio!=null){
                dataPaciente.antecedentes.personales.enfermedades[x].fecha_inicio = res.data.antecedentes.personales.enfermedades[x].fecha_inicio.split("T")[0];
              }
            }
            for (var x=0;x<res.data.antecedentes.familiares.enfermedades.length;x++){
              if(res.data.antecedentes.familiares.enfermedades[x].fecha_inicio!=null){
                dataPaciente.antecedentes.familiares.enfermedades[x].fecha_inicio = res.data.antecedentes.familiares.enfermedades[x].fecha_inicio.split("T")[0];
              }
            }
            for (var x=0;x<res.data.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos.length;x++){
              if(res.data.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos[x].fecha_inicio!=null){
                dataPaciente.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos[x].fecha_inicio = res.data.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos[x].fecha_inicio.split("T")[0];
              }
              if(res.data.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos[x].fecha_fin!=null){
                dataPaciente.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos[x].fecha_fin = res.data.antecedentes.sexuales.uso_metodos_anticonceptivos.metodos[x].fecha_fin.split("T")[0];
              }
            }
            console.log(dataPaciente);
            this.setDataPaciente(dataPaciente);
            this.$router.push({ name: "InformacionMedica"});
          })
          .catch(err => {
            this.mensaje(
              "error",
              "..Oops",
              "Error al obtener los datos. Por favor intentelo más tarde.",
            );
          });
    },
    getFechaNacimiento() {
      if(this.user != null) {
          this.fechaNacimiento = new Date(this.user.datos.fecha_nacimiento).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
      }
      
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
    height: 100%;
  }
  .info-paciente {
    margin-left:15px;
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
