<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Especialidad</v-card-title>

    <div class="container-Especialidad">
      <form>
        <v-text-field
          v-model.trim="Especialidad3.nombre"
          label="Nombre"
          outlined
          @input="$v.Especialidad3.nombre.$touch()"
          @blur="$v.Especialidad3.nombre.$touch()"
          :error-messages="errorNombre"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="Especialidad3.codigo"
          label="Codigo"
          outlined
          @input="$v.Especialidad3.codigo.$touch()"
          @blur="$v.Especialidad3.codigo.$touch()"
          :error-messages="errorCodigo"
          color="#009900"
        ></v-text-field>
        <v-textarea
          v-model.trim="Especialidad3.descripcion"
          label="Descripcion"
          @input="$v.Especialidad3.descripcion.$touch()"
          @blur="$v.Especialidad3.descripcion.$touch()"
          height="25"
          rows="2"
          :error-messages="errorDescripcion"
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
            @vdropzone-mounted="mounteddropzone"
            :options="dropzoneOptions"
           :error-messages="errorURL"
          >
          </vue-dropzone>
        </div>
        <v-alert
            type="error"  
            v-if="!$v.Especialidad3.url.required"
            class="mt-2"
          >
            Debe cambiar la imagen obligatoriamente
          </v-alert>

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click="modificarEspecialidades"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Especialidades</span>
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
          >Modificando la especialidad</v-card-title
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
  props: ["Especialidad3"],
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
        name: "Imagen de Especialidad",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.Especialidad3.url,
        null,
        null,
        true
      );
    },

    
    async modificarEspecialidades() {
      
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
          .put(
            "/Especialidad/Modificar",
            this.Especialidad3
          )
          .then((res) => {
            this.Especialidad = res.data;
             console.log("todo nice");
            if (this.Especialidad3.id !== "") {
              this.cargaRegistro = false;
              this.replaceEspecialidad(Especialidad3);
              this.closeDialog();            
              this.mensaje(
                "success",
                "Listo",
                "Especialidad actualizada satisfactoriamente",
                "<strong>Se redirigiá a la Interfaz de Gestión<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
      }
    },
    afterRemoved(file, error, xhr) {
      this.Especialidad3.url = "";
    },
    afterSuccess(file, response) {
      this.url.push(file);
      this.Especialidad3.url = file.dataURL.split(",")[1];
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
    errorNombre() {
      const errors = [];
      if (!this.$v.Especialidad3.nombre.$dirty) return errors;
      if (!this.$v.Especialidad3.nombre)
        this.errors.push("El nombre es obligatorio.");
      !this.$v.Especialidad3.nombre.required &&
        errors.push("Debe ingresar un codigo obligatoriamente");
      !this.$v.Especialidad3.nombre.minLength &&
        errors.push(
          "El nombre de la especialidad debe poseer al menos 6 caracteres"
        );
      return errors;
    },
    errorCodigo() {
      const errors = [];
      if (!this.$v.Especialidad3.codigo.$dirty) return errors;
      !this.$v.Especialidad3.codigo.required &&
        errors.push("Debe ingresar un codigo obligatoriamente");
      !this.$v.Especialidad3.codigo.minLength &&
        errors.push(
          "El codigo de la especialida debe poseer al menos 6 caracteres"
        );
      return errors;
    },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Especialidad3.descripcion.$dirty) return errors;
      !this.$v.Especialidad3.descripcion.required &&
        errors.push("Debe ingresar un codigo obligatoriamente");
      !this.$v.Especialidad3.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 6 caracteres");
      return errors;
    },
    errorURL(){
       const errors = [];
       if (!this.$v.url=="") return errors;
       !this.$v.Especialidad3.url.required &&
        errors.push("Debe ingresar una imagen obligatoriamente");


    }
  },

  validations() {
    return {
      Especialidad3: {
        descripcion: {
          required,
          minLength: minLength(7),
        },
        nombre: {
          required,
          minLength: minLength(8),
        },
        codigo: {
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
