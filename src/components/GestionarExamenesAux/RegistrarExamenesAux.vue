<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Examen Auxiliar</v-card-title>
    <div class="container-Especialidad">
      <v-form>

        <v-textarea
          v-model.trim="examen.descripcion"
          label="Descripcion"
          @input="$v.examen.descripcion.$touch()"
          @blur="$v.examen.descripcion.$touch()"
          height="25"
          rows="2"
          :error-messages="errorDescripcion"
          outlined
          color="#009900"
        ></v-textarea>

        <v-text-field
          v-model.trim="examen.precio"
          label="Precio"
          outlined
          @input="$v.examen.precio.$touch()"
          @blur="$v.examen.precio.$touch()"
          :error-messages="errorPrecio"
          color="#009900"
        ></v-text-field>

        <!-- <vue-dropzone
          ref="myVueDropzone"
          @vdropzone-success="afterSuccess"
          @vdropzone-removed-file="afterRemoved"
          id="dropzone"
          :options="dropzoneOptions"
        >
        </vue-dropzone>

        <v-alert v-if="errorImagen" color="red">
          <v-card-text class="mt-2" style="color: white"
            >Seleccione el archivo respectivo o arrastrelo aquí</v-card-text
          >
        </v-alert> -->

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click.prevent="RegistrarExamenesAux"
              >Registrar</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog"
              >Volver</v-btn
            >
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Registrando Examen</v-card-title
        >
        <div>
          <v-progress-circular
            style="display: block;margin:40px auto;"
            :size="90"
            :width="9"
            color="blue"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight:bold;text-align:center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, numeric } from "vuelidate/lib/validators";
export default {
  name: "RegistrarExamenesAux",
  props: ["examen"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      
      step: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela aquí",
      },

      examen: {
        
        descripcion: "",
        precio:0,
      },

      cargaRegistro: false,
    };
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    ...mapMutations(["setE"]),

    // dropzone() {
    //   var file = {
    //     size: 123,
    //     name: "Imagen de Especialidad",
    //     type: "image/jpg",
    //   };
    //   this.$refs.myVueDropzone.manuallyAddFile(
    //     file,
    //     this.especialidad.url,
    //     null,
    //     null,
    //     true
    //   );
    // },
    // afterSuccess(file, response) {
    //   console.log(file);
    //   this.especialidad.url = file.dataURL.split(",")[1];
    //   this.$v.especialidad.url.$model = file.dataURL.split(",")[1];
    //   //console.log(file.dataURL.split(",")[1]);
    // },

    // afterRemoved(file, error, xhr) {
    //   this.especialidad.url = "";
    //   this.$v.especialidad.url.$model = "";
    // },
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
    resetEspecialidadValidationState() {
      this.$v.examen.$reset();
    },
    closeDialog() {
      this.examen = this.limpiarExamen();
      this.step = 1;
      this.resetEspecialidadValidationState();
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async RegistrarExamenesAux() {
      this.examen.descripcion = this.examen.descripcion;
      this.examen.precio=parseFloat(this.examen.precio),
      
      console.log("hola");

      console.log(this.examen);
      this.$v.examen.$touch();
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
          .post("/Examenes/Registrar", this.examen)
          .then((res) => {
            
            this.$emit("emit-obtener-examenes");
            this.cargaRegistro = false;
            this.closeDialog();
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

    limpiarExamen() {
      return {
        examen: {
          descripcion: "",
          precio:0,
        },
      };
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
  computed: {
   
    errorDescripcion() {
      const errors = [];
      if (!this.$v.examen.descripcion.$dirty) return errors;
      !this.$v.examen.descripcion.required &&
        errors.push("Debe ingresar la descripción de la especialidad");
      !this.$v.examen.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 7 caracteres");
      return errors;
    },
    errorPrecio(){
      const errors = [];
      if (!this.$v.examen.precio.$dirty) return errors;
      !this.$v.examen.precio.required &&
        errors.push("Debe ingresar un precio obligatoriamente");
      !this.$v.examen.precio.numeric &&
        errors.push("El precio debe ser un valor numerico");
      return errors;

    }
   
  },
  validations() {
    return {
      examen: {
        
        descripcion: {
          required,
          minLength: minLength(7),
        },
        precio:{
          required,
          numeric

        }
        
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
.estilo-stepper {
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;
}
.filas {
  margin: 2% 8% 5% 8%;
}
.filas2 {
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
.container-Especialidad {
  margin: 15px;
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
