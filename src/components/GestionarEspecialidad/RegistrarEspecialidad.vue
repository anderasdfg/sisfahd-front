<template>
  <v-card>
    <h1 class="title-card">Registrar Nueva Especialidad</h1>
    <div class="estilo-stepper">
    <v-stepper v-model="step">
     
    <v-stepper-items>
    <v-stepper-content step="1">
    <v-card-text>
      <v-text-field
        label="nombre"
        class="campos"
        v-model="Especialidad.nombre" 
        outlined
      ></v-text-field>
      <v-text-field
        label="codigo"
        class="campos"
        v-model="Especialidad.codigo" 
        outlined
      ></v-text-field>
      <v-row class="filas">
        <v-text-field
        label="descripcion"
        class="campos"
        v-model="Especialidad.descripcion" 
        outlined
      ></v-text-field>
      
      </v-row>
     
      
      <v-row class="filas">
       
         <v-col cols="12" sm="6" md="6">
          <button class="btn-registrar" block @click="RegistrarEspecialidad">Registrar</button>    
          </v-col>
           <v-col cols="12" sm="6" md="6">      
          <button class="btn-volver" block @click="cerrarDialogo()">Volver</button>
        </v-col>
      </v-row>
    </v-card-text>
      </v-stepper-content>
     
      </v-stepper-items>
    </v-stepper>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
       <v-card height="300px">
          <v-card-title class="justify-center">Registrando Especialidad</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="blue"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import {
  required,
} from "vuelidate/lib/validators";
export default {
  name: "RegistrarEspecialidad",
  props: ["Especialidad"],
  data() {
    return {
     
      step: 1,
      
      
      especialidad : {
        nombre: "",
        codigo: "",
        descripcion: "",
      },
      cargaRegistro:false,
    };
  },
  async created(){
    
    this.RegistrarEspecialidad();
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      
      this.$emit("emit-close-dialog");
    },    
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    
    async RegistrarEspecialidad() {
      this.Especialidad.nombre = this.Especialidad.nombre;
      this.Especialidad.codigo = this.Especialidad.codigo;
      this.Especialidad.descripcion = this.Especialidad.descripcion;
           
     
      console.log(this.Especialidad)
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {
        if (false) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
          console.log("no hay errores");
          this.cargaRegistro = true;
          await axios
            .post("/Especialidad/Registrar", this.Especialidad)
            .then((res) => {
              this.Especialidades = res.data;
              this.$emit("emit-obtener-Especialidad");
              this.cargaRegistro = false;
              this.cerrarDialogo();
            })
            .catch((err) => console.log(err));
        /*await this.mensaje(
          "success",
          "Listo",
          "Turno registrado satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar turnos<strong>"
        );*/
      }     
    },
      
  },
    /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
  computed:{
 
  },
  validations() {
    
 
    return{
      
     

      
        especialidad:{
          nombre:{
            required,
            esParrafo
          },
          codigo:{
            required,
            esParrafo
          },
          descripcion:{
            required,
            esParrafo
          },
          
        },
      
    }
  
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