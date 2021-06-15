<template>
  <v-card>
    <v-card-title class="justify-center">Eliminar Tarifa</v-card-title>

    <div class="container-EliminarTarifa">
      <form>
        <v-text-field
          v-model.trim="Tarifa4.nombre"
          label="Nombre"
          outlined
          @input="$v.Tarifa4.nombre.$touch()"
          @blur="$v.Tarifa4.nombre.$touch()"
          :error-messages="errorNombre"
          color="#009900"
        ></v-text-field>
          
          <v-text-field
          v-model.trim="Tarifa4.codigo"
          label="Codigo"
          outlined
          @input="$v.Tarifa4.codigo.$touch()"
          @blur="$v.Tarifa4.codigo.$touch()"
          :error-messages="errorCodigo"
          color="#009900"
        ></v-text-field>
        <v-textarea
          v-model.trim="Tarifa4.descripcion"
          label="Descripcion"
          @input="$v.Tarifa4.descripcion.$touch()"
          @blur="$v.Tarifa4.descripcion.$touch()"
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
            @vdropzone-file-added="vfileAdded"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
          <v-alert type="error" v-if="!$v.EspecialidadAux.required" class="mt-2">
            Debe subir un anexo obligatoriamente
          </v-alert>
        </div>
        

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="eliminarTarifa">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Eliminar Tarifa</span>
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
        <v-card-title class="justify-center">Eliminando la tarifa</v-card-title>
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
  props: ["Tarifa4"],
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
     /* Options: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".pdf",
        headers: { "My-Awesome-Header": "header value" },
        addropzonedRemoveLinks: true,
        dictDefaultMessage: "Seleccione el archivo respectivo o arrástrelo aquí",
      },*/      
      EspecialidadAux: [],
      cargaRegistro: false
    };
  },
  components:{
     vueDropzone:vue2Dropzone
      },
  methods: {
    
    async eliminarTarifa() {
      //this.$v.$touch();
      /*if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
         
          false
        );
      } else {*/
        this.cargaRegistro = true;
        
        for (let index = 0; index < this.EspecialidadAux.length; index++) {
          if (this.EspecialidadAux[index].url !== undefined) {
            this.Tarifa.id.push({
              link: this.EspecialidadAux[index].url,
              descripcion: "id " + (index + 1),
            });
           
          } 
        }
     // let especialidad={codigo:this.Especialidad3.codigo,nombre:this.Especialidad3.nombre,descripcion:this.Especialidad3.descripcion,id:this.Especialidad3.id};
     
      await axios
          .put("/Especialidad/Modificar", this.Especialidad3)
          .then((res) => {
            this.Especialidad = res.data;
            if (this.Tarifa4.id !== "") {
              this.cargaRegistro = false;
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
//      }
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
      if (!this.$v.Tarifa4.nombre.$dirty) return errors;
      if (!this.$v.Tarifa4.nombre) this.errors.push('El nombre es obligatorio.');
            !this.$v.Tarifa4.nombre.minLength &&
        errors.push("El nombre de la especialidad debe poseer al menos7 caracteres");
      return errors;
    },
    errorCodigo() {
      const errors = [];
      if (!this.$v.Tarifa4.codigo.$dirty) return errors;
            !this.$v.Tarifa4.codigo.minLength &&
        errors.push("El codigo de la especialida debe poseer al menos 6 caracteres");
      return errors;
    },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Tarifa4.descripcion.$dirty) return errors;
           !this.$v.Tarifa4.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 7 caracteres");
      return errors;
    },
   
   /*mounted() {
    this.$refs.myVueDropzone.removeAllFiles();
    for (let index = 0; index < this.Especialidad3.id.length; index++) {
      var file = {
        size: 250,
        name: `${this.Especialidad3.id[index].descripcion}.pdf`,
        type: "application/pdf",
        url: `${this.Especialidad3.id[index].link}`,
        accepted: true,
      };
      var url = this.Especialidad3.id[index].link;
      this.$refs.myVueDropzone.manuallyAddFile(file, url);
      this.EspecialidadAux.push(
        this.$refs.myVueDropzone.$refs.dropzoneElement.dropzone.files[index]
      );
    }
   },*/
    
  },
  /*watch: {
    searchResidente(value) {
      if (value == null) {
        this.residente = {
          residente: "",
          id: "",
        };
      }

      if (this.listResidentes.length > 0) {
        return;
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get("/residente/all")
        .then((res) => {
          let residentesMap = res.data.map(function (res) {
            return {
              residente: res.nombre + " " + res.apellido,
              numeroDocumento: res.numeroDocumento,
              id: res.id,
            };
          });

          this.listResidentes = residentesMap;

          this.loadingSearch = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },*/
  validations() {
    return {
     /* residente: {
        id: {
          required,
        },
      },*/
      Tarifa4: {
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
          minLength: minLength(6),
        },
      },
      EspecialidadAux: {
        required,
      },
    };
  },
};
</script>

<style  scoped>
.container-EliminarTarifa {
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