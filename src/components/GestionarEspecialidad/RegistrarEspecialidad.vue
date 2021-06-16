<template>
  <v-card>
    <h1 class="title-card">Registrar Nueva Especialidad</h1>
    <div class="justify-center">
    <v-stepper v-model="step">
     <v-form>
      
      <v-text-field
        label="Nombre"
         class="container-Especialidad"
         @input="$v.Especialidad.nombre.$touch()"
         @blur="$v.Especialidad.nombre.$touch()"
        v-model="Especialidad.nombre" 
        outlined
       
        :error-messages="errorNombre"
        
      ></v-text-field>
      <v-text-field
        label="Codigo"
         class="container-Especialidad"
         @input="$v.Especialidad.codigo.$touch()"
          @blur="$v.Especialidad.codigo.$touch()"
        v-model="Especialidad.codigo" 
        outlined
       
       :error-messages="errorCodigo"
      ></v-text-field>
    
        <v-text-field
        label="Descripcion"
        class="container-Especialidad"
         @input="$v.Especialidad.descripcion.$touch()"
          @blur="$v.Especialidad.descripcion.$touch()"
        v-model="Especialidad.descripcion" 
        outlined
         
       :error-messages="errorDescripcion"
      ></v-text-field>
      
      
      <div>  
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            class="campos"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            @vdropzone-file-added="vfileAdded"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
          <v-alert type="error" v-if="!$v.EspecialidadAux" class="mt-2">
            Debe subir un anexo obligatoriamente
          </v-alert>
        </div>
     
      
      <v-row class="filas">
       
         <v-col cols="12" sm="6" md="6">
          <button class="btn-registrar" block @click.prevent="RegistrarEspecialidad">Registrar</button>    
          </v-col>
           <v-col cols="12" sm="6" md="6">      
          <button class="btn-volver" block @click="closeDialog">Volver</button>
        </v-col>
      </v-row>   
       </v-form>    
      
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "RegistrarEspecialidad",
  props: ["Especialidad"],
  data() {
    return {
      
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "Seleccione el archivo respectivo o arrástrelo aquí",
      },
     
      step: 1,
      
      
      especialidad : {
        nombre: "",
        codigo: "",
        descripcion: "",
      },
      cargaRegistro:false,
      EspecialidadAux: [],
    };
  },
   components:{
     vueDropzone:vue2Dropzone
     },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
     ...mapMutations(["setE"]),
    vfileAdded(file) {
      //console.log(file);
       },
    afterSuccess(file, response) {
      this.EspecialidadAux.push(file);
    },
    afterRemoved(file, error, xhr) {
      let indexFile = this.EspecialidadAux.findIndex((document) => document == file);
      if (indexFile != -1) {
        this.EspecialidadAux.splice(indexFile, 1);
      }
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    closeDialog() {
      
      this.$emit("close-dialog-Registrar");
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
       if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
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
    
 errorNombre() {
      const errors = [];
      if (!this.$v.Especialidad.nombre.$dirty) return errors;
            !this.$v.Especialidad.nombre.minLength &&
        errors.push("El nombre de la especialidad debe poseer al menos7 caracteres");
      return errors;
    },
    errorCodigo() {
      const errors = [];
      if (!this.$v.Especialidad.codigo.$dirty) return errors;
            !this.$v.Especialidad.codigo.minLength &&
        errors.push("El codigo de la especialida debe poseer al menos 6 caracteres");
      return errors;
    },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Especialidad.descripcion.$dirty) return errors;
           !this.$v.Especialidad.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 7 caracteres");
      return errors;
    },
  },
  validations() {    
    return{              
        Especialidad:{
          nombre:{
            required,
             minLength: minLength(7),
          },
          codigo:{
            required,
             minLength: minLength(7),
          },
          descripcion:{
            required,
            minLength: minLength(7),
          },          
        },    
        
    };
  },
};
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