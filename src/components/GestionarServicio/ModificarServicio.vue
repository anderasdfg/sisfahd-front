<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Especialidad</v-card-title>

    <div class="container-Especialidad">
      <form>
        <v-text-field
          v-model.trim="Servicio3.titulo"
          label="titulo"
          outlined
          @input="$v.Servicio3.titulo.$touch()"
          @blur="$v.Servicio3.titulo.$touch()"
          :error-messages="errortitulo"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="Servicio3.descripcion"
          label="descripcion"
          outlined
          @input="$v.Servicio3.descripcion.$touch()"
          @blur="$v.Servicio3.descripcion.$touch()"
          :error-messages="errordescripcion"
          color="#009900"
        ></v-text-field>
        <v-textarea
          v-model.number="Servicio3.monto"
          label="monto"
          @input="$v.Servicio3.monto.$touch()"
          @blur="$v.Servicio3.monto.$touch()"
          height="25"
          rows="2"
          :error-messages="errormonto"
          outlined
          color="#009900"
        ></v-textarea>
        <!--Para archivos :3 -->

        <div>
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
        </div>
        <v-alert type="error" v-if="!$v.Servicio3.url.required" class="mt-2">
          Debe ingresar una imagen obligatoriamente
        </v-alert>

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click="modificarServicio"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Servicio</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Modificando el Servicio</v-card-title
        >
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
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
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  name: "ModificarEspecialidad",
  props: ["Servicio3"],
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione el archivo respectivo o arrástrelo aquí",
      },
      url: [],
      cargaRegistro: false,
    };
  },
  components: {
    vueDropzone: vue2Dropzone,
  },
  methods: {
    mounteddropzone() {
      var file = {
        size: 123,
        name: "Imagen de Servicio",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.Servicio3.url,
        null,
        null,
        true
      );
    },

    async modificarServicio() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
        );
      } else {
        this.cargaRegistro = true;
        await axios
          .put("/Adicionales/Modificar", this.Servicio3)
          .then((res) => {
            this.Servicio = res.data;
            console.log("todo nice");

            if (this.Servicio3.id !== "") {
              this.cargaRegistro = false;

              this.closeDialog();
              this.$emit("emit-obtener-Servicio");
              this.mensaje(
                "success",
                "Listo",
                "Servicio actualizado satisfactoriamente",
                "<strong>Se redirigiá a la Interfaz de Gestión<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
      }
    },
    afterRemoved(file, error, xhr) {
      this.Servicio3.url = "";
    },
    afterSuccess(file, response) {
      this.url.push(file);
      this.Servicio3.url = file.dataURL.split(",")[1];
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
      this.$emit("close-dialog-Modificar");
    },
  },
  computed: {
    errortitulo() {
      const errors = [];
      if (!this.$v.Servicio3.titulo.$dirty) return errors;
      if (!this.$v.Servicio3.titulo)
        this.errors.push("El titulo es obligatorio.");
      !this.$v.Servicio3.titulo.required &&
        errors.push("Debe ingresar un titulo obligatoriamente");
      !this.$v.Servicio3.titulo.minLength &&
        errors.push("El titulo del Servicio debe poseer al menos 6 caracteres");
      return errors;
    },
    errordescripcion() {
      const errors = [];
      if (!this.$v.Servicio3.descripcion.$dirty) return errors;
      !this.$v.Servicio3.descripcion.required &&
        errors.push("Debe ingresar una descripcion obligatoriamente");
      !this.$v.Servicio3.descripcion.minLength &&
        errors.push(
          "La descripcion del Servicio debe poseer al menos 8 caracteres"
        );
      return errors;
    },
    errormonto() {
      const errors = [];
      if (!this.$v.Servicio3.monto.$dirty) return errors;
      !this.$v.Servicio3.monto.required &&
        errors.push("Debe ingresar un monto obligatoriamente");
      !this.$v.Servicio3.monto.minLength &&
        errors.push("El monto debe poseer al menos 3 digitos");
      return errors;
    },
  },

  validations() {
    return {
      Servicio3: {
        titulo: {
          required,
          minLength: minLength(6),
        },
        descripcion: {
          required,
          minLength: minLength(6),
        },
        monto: {
          required,
          minLength: minLength(3),
        },
        url: {
          required,
        },
      },
    };
  },
};
</script>

<style scoped>
.container-Especialidad {
  margin: 15px;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}
.inputTextField {
  border-color: green;
}
</style>
