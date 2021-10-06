<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Servicio</v-card-title>
    <div class="container-Servicio">
      <v-form>
        <v-text-field
          v-model.trim="Servicio.titulo"
          label="titulo"
          outlined
          @input="$v.Servicio.titulo.$touch()"
          @blur="$v.Servicio.titulo.$touch()"
          :error-messages="errortitulo"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="Servicio.descripcion"
          label="descripcion"
          outlined
          @input="$v.Servicio.descripcion.$touch()"
          @blur="$v.Servicio.descripcion.$touch()"
          :error-messages="errordescripcion"
          color="#009900"
        ></v-text-field>
        <v-textarea
          v-model.number="Servicio.monto"
          label="monto"
          @input="$v.Servicio.monto.$touch()"
          @blur="$v.Servicio.monto.$touch()"
          height="25"
          rows="2"
          :error-messages="errormonto"
          outlined
          color="#009900"
        ></v-textarea>

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
            >Seleccione el archivo respectivo o arrastrelo aqui</v-card-text
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
              @click.prevent="RegistrarServicio"
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
        <v-card-title class="justify-center">Registrando Servicio</v-card-title>
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
import { required, minLength, decimal } from "vuelidate/lib/validators";
export default {
  name: "RegistrarServicio",
  props: ["Servicio"],
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
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
      },

      Servicio: {
        titulo: "",
        descripcion: "",
        monto: "",
        url: "",
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
        name: "Imagen de Servicio",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.Servicio.url,
        null,
        null,
        true
      );
    },
    afterSuccess(file, response) {
      console.log(file);
      this.Servicio.url = file.dataURL.split(",")[1];
      this.$v.Servicio.url.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },

    afterRemoved(file, error, xhr) {
      this.Servicio.url = "";
      this.$v.Servicio.url.$model = "";
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
    resetServicioValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.Servicio.$reset();
    },
    closeDialog() {
      this.Servicio = this.limpiarServicio();
      this.step = 1;
      this.resetServicioValidationState();
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async RegistrarServicio() {
      this.Servicio.titulo = this.Servicio.titulo;
      this.Servicio.descripcion = this.Servicio.descripcion;
      this.Servicio.monto = this.Servicio.monto;

      console.log(this.Servicio);
      this.$v.Servicio.$touch();
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
          .post("/Servicio/Registrar", this.Servicio)
          .then((res) => {
            this.Servicio = res.data;
            this.$emit("emit-obtener-Servicios");
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

    limpiarServicio() {
      return {
        Servicio: {
          titulo: "",
          descripcion: "",
          monto: "",
          url: "",
        },
      };
    },
  },

  async mensaje(icono, titulo, texto, footer) {
    await this.$swal({
      icon: icono,
      title: titulo,
      text: texto,
      footer: footer,
    });
  },
  computed: {
    errortitulo() {
      const errors = [];
      if (!this.$v.Servicio.titulo.$dirty) return errors;
      !this.$v.Servicio.titulo.required &&
        errors.push("Debe ingresar el titulo de la Servicio");
      !this.$v.Servicio.titulo.minLength &&
        errors.push(
          "El titulo de la Servicio debe poseer al menos 6 caracteres"
        );

      return errors;
    },
    errordescripcion() {
      const errors = [];
      if (!this.$v.Servicio.descripcion.$dirty) return errors;
      !this.$v.Servicio.descripcion.required &&
        errors.push("Debe ingresar el descripcion de la Servicio");
      !this.$v.Servicio.descripcion.minLength &&
        errors.push(
          "El descripcion de la especialida debe poseer al menos 3 caracteres"
        );
      return errors;
    },
    errormonto() {
      const errors = [];
      if (!this.$v.Servicio.monto.$dirty) return errors;
      !this.$v.Servicio.monto.required &&
        errors.push("Debe ingresar la monto del Servicio");
      !this.$v.Servicio.monto.minLength &&
        errors.push("La descripción debe poseer al menos 3 caracteres");
      !this.$v.Servicio.monto.decimal &&
        errors.push("El Monto del Servicio solo debe poseer numeros");
      return errors;
    },
    errorImagen() {
      return this.$v.Servicio.url.required == false &&
        this.$v.Servicio.url.$dirty == true
        ? true
        : false;
    },
  },
  validations() {
    return {
      Servicio: {
        titulo: {
          required,
          minLength: minLength(6),
        },
        descripcion: {
          required,
          minLength: minLength(7),
        },
        monto: {
          required,
          minLength: minLength(3),
          decimal,
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
.container-Servicio {
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
