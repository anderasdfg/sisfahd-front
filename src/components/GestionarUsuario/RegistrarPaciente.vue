<template>
<v-card>
    <v-card-title class="justify-center">Registro de datos del paciente</v-card-title>
    
<v-stepper v-model="step">

     <v-stepper-header>

       <v-stepper-step editabled step="1"> Informacion del Usuario </v-stepper-step>

     </v-stepper-header>


<v-stepper-items>

 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Escribe tu nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Escribe tus apellidos"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Selecciona un tipo de documento"
      required
    ></v-select>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Ingresa tu numero de documento"
      required
    ></v-text-field>

 <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Selecciona tu sexo"
      required
    ></v-select>

    <v-text-field
          v-model="phoneNumber"
          :counter="7"
          :error-messages="errors"
          label="Ingresa tu numero de celular"
          required
        ></v-text-field>

    <v-btn

      block color="success"
      class="mr-4"
      @click="validate"
    >
      Continuar
    </v-btn>



  </v-form>

</v-stepper-items>

</v-stepper>
 
 </v-card>

</template>



<!--


------------------------------------------
      <form>
      <v-text-field
        label="Nombre"
         class="container-Paciente"
        v-model="Usuario.Nombre" 
        outlined 
      ></v-text-field>

      <v-text-field
        label="Apellido Paterno"
         class="container-Paciente"
        v-model="Usuario.Apellidos" 
        outlined
      ></v-text-field>
     
      
      <v-row class="filas">
       
         <v-col cols="12" sm="6" md="6">
          <button class="btn-registrar" block @click="RegistrarPaciente">Registrar</button>    
          </v-col>
           <v-col cols="12" sm="6" md="6">      
          <button class="btn-volver" block @click="closeDialog">Volver</button>
        </v-col>
      </v-row>   
       </form>    -->
      




<script>
import axios from "axios";

export default {
  name: "RegistrarUsuario",
  props: ["idusuario"],
  data() {
    return {
      listaCupos:[],
      search:"",
      headers: [
        { text: "Duración", align: "start", sortable: false, value: "duracion" },
        { text: "Hora Inicio", value: "hora_inicio", sortable: false},
        { text: "Hora Fin", value: "hora_fin", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      step: 1,
      dialog: false,
      date: null,      
      modal: false,
      horasInicio: [],
      horasFin: [],
      ratios: ['15 min', '30 min'],
      //ratios: ['15 min', '30 min', '45 min'], 45 inavilitado por problemas locos
      ratio: null,
      listaTarifas:[],
      //Esto sera reemplazado luego
      turno: {
        id: "",
        especialidad: {
          nombre: "",
          codigo: "",
        },
        estado: "pendiente",
        fecha_fin: null,
        fecha_inicio: null,
        hora_fin: '8:15',
        hora_inicio: '8:00',
        id_medico: "",
        id_tarifa: "",
        cupos: [], 
      },
      medico : {
        id: "",
        id_especialidad : "",
        id_usuario: "",
        especialidad: {
          nombre: "",
          codigo: ""
        }
      },
      cargaRegistro:false,
      listaTurnos:[],
    };
  },
  async created(){
    
  },
  watch: {
  
  },
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("emit-close-dialog");
    },
  },
  computed:{
    
  },
 }

</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.estilo-stepper{
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;  
}
.filas{
  margin: 2% 8% 5% 8%;
}
.filas2{
  margin-top: 4%;
  margin-bottom: 1%;
}
.btn-registrar {  
  background: $green;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-volver {  
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>