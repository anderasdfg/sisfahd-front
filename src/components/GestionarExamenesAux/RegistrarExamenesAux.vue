<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Examen Auxiliar</v-card-title>
    <div class="container-Especialidad">
      <v-form>

        <v-textarea
          v-model.trim="examenes.descripcion"
          label="Descripcion"
          @input="$v.examenes.descripcion.$touch()"
          @blur="$v.examenes.descripcion.$touch()"
          height="25"
          rows="2"
          :error-messages="errorDescripcion"
          outlined
          color="#009900"
        ></v-textarea>

        <v-text-field
          v-model.trim="examenes.nombre"
          label="Precio"
          outlined
          @input="$v.examenes.nombre.$touch()"
          @blur="$v.examenes.nombre.$touch()"
          :error-messages="errorNombre"
          color="#009900"
        ></v-text-field>

        <vue-dropzone
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
        </v-alert>

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click.prevent="RegistrarEspecialidad"
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
          >Registrando Examen Auxiliar</v-card-title
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
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "RegistrarEspecialidad",
  props: ["Especialidad"],
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

      examenes: {
        descripcion: "",
        precio: "",
  
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

    dropzone() {
      var file = {
        size: 123,
        name: "Imagen de Examen Auxiliar",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.especialidad.url,
        null,
        null,
        true
      );
    },
    afterSuccess(file, response) {
      console.log(file);
      this.especialidad.url = file.dataURL.split(",")[1];
      this.$v.especialidad.url.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },

    afterRemoved(file, error, xhr) {
      this.especialidad.url = "";
      this.$v.especialidad.url.$model = "";
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
    resetEspecialidadValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.especialidad.$reset();
    },
    closeDialog() {
      this.especialidad = this.limpiarEspecialidad();
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

    async RegistrarEspecialidad() {
      this.especialidad.descripcion = this.especialidad.descripcion;
      this.especialidad.precio = this.examenes.precio;

      console.log(this.especialidad);
      this.$v.especialidad.$touch();
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
          .post("/Especialidad/Registrar", this.especialidad)
          .then((res) => {
            this.especialidad = res.data;
            this.$emit("emit-obtener-especialidades");
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

    limpiarEspecialidad() {
      return {
        especialidad: {
          nombre: "",
          codigo: "",
          descripcion: "",
          url: "",
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
      if (!this.$v.especialidad.descripcion.$dirty) return errors;
      !this.$v.especialidad.descripcion.required &&
        errors.push("Debe ingresar la descripción de la especialidad");
      !this.$v.especialidad.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 7 caracteres");
      return errors;
    },
    errorImagen() {
      return this.$v.especialidad.url.required == false &&
        this.$v.especialidad.url.$dirty == true
        ? true
        : false;
    },
  },
  validations() {
    return {
      especialidad: {
        nombre: {
          required,
          minLength: minLength(6),
        },
        codigo: {
          required,
          minLength: minLength(3),
        },
        descripcion: {
          required,
          minLength: minLength(7),
        },
        url: {
          required,
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