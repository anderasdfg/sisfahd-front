<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Examen Auxiliar</v-card-title>

    <div class="container-Especialidad">
      <form>
        
        
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
        <!--Para archivos :3 -->

        <!-- <div>
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            @vdropzone-mounted="mounteddropzone"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
        </div> -->
        <!-- <v-alert
            type="error"  
            v-if="!$v.Especialidad3.url.required"
            class="mt-2"
          >
            Debe ingresar una imagen obligatoriamente
          </v-alert> -->

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click="modificarExamen"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Examen Auxiliar</span>
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
          >Modificando el examen auxiliar</v-card-title
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
import { required, minLength, numeric } from "vuelidate/lib/validators";
export default {
  name: "ModificarExamenAux",
  props: ["examen"],
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
    // mounteddropzone() {
    //   var file = {
    //     size: 123,
    //     name: "Imagen de Especialidad",
    //     type: "image/jpg",
    //   };
    //   this.$refs.myVueDropzone.manuallyAddFile(
    //     file,
    //     this.Especialidad3.url,
    //     null,
    //     null,
    //     true
    //   );
    // },

    
    async modificarExamen() {
      
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
        this.examen.precio=parseFloat(this.examen.precio),
        console.log(this.examen),
        await axios
          .put(
            "/Examenes/Modificar",
            this.examen
          )
          .then((res) => {
            
            this.examen = res.data;
             console.log("todo nice");
             
            if (this.examen.id !== "") {
              this.cargaRegistro = false;

              //this.replaceEspecialidad(Especialidad3);
               this.closeDialog();  
                this.$emit("emit-obtener-especialidades");          
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
    // afterRemoved(file, error, xhr) {
    //   this.Especialidad3.url = "";
    // },
    // afterSuccess(file, response) {
    //   this.url.push(file);
    //   this.Especialidad3.url = file.dataURL.split(",")[1];
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
    closeDialog() {
      this.$emit("close-dialog-Modificar");
    },
  },
  computed: {
    // errorNombre() {
    //   const errors = [];
    //   if (!this.$v.Especialidad3.nombre.$dirty) return errors;
    //   if (!this.$v.Especialidad3.nombre)
    //     this.errors.push("El nombre es obligatorio.");
    //   !this.$v.Especialidad3.nombre.required &&
    //     errors.push("Debe ingresar un codigo obligatoriamente");
    //   !this.$v.Especialidad3.nombre.minLength &&
    //     errors.push(
    //       "El nombre de la especialidad debe poseer al menos 6 caracteres"
    //     );
    //   return errors;
    // },
    // errorCodigo() {
    //   const errors = [];
    //   if (!this.$v.Especialidad3.codigo.$dirty) return errors;
    //   !this.$v.Especialidad3.codigo.required &&
    //     errors.push("Debe ingresar un codigo obligatoriamente");
    //   !this.$v.Especialidad3.codigo.minLength &&
    //     errors.push(
    //       "El codigo de la especialida debe poseer al menos 6 caracteres"
    //     );
    //   return errors;
    // },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.examen.descripcion.$dirty) return errors;
      !this.$v.examen.descripcion.required &&
        errors.push("Debe ingresar una descripción obligatoriamente");
      !this.$v.examen.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 6 caracteres");
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
