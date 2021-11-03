<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Enfermedades</v-card-title>

    <div class="container-Enfermedad">
      <form>
        <v-text-field
          v-model.trim="Enfermedad.codigo_cie"
          label="Código"
          outlined
          @input="$v.Enfermedad.codigo_cie.$touch()"
          @blur="$v.Enfermedad.codigo_cie.$touch()"
          :error-messages="errorCodigo_cie"
          color="#009900"
        ></v-text-field>        
        
        <v-textarea
          v-model.trim="Enfermedad.descripcion"
          label="Descripción"
          @input="$v.Enfermedad.descripcion.$touch()"
          @blur="$v.Enfermedad.descripcion.$touch()"
          height="25"
          rows="2"
          :error-messages="errorDescripcion"
          outlined
          color="#009900"
        ></v-textarea>      

                
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click="modificarEnfermedad"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Enfermedad</span>
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
          >Modificando la enfermedad</v-card-title
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
  name: "ModificarEnfermedades",
  props: ["Enfermedad"],
  data() {
    return {      
      cargaRegistro: false,
    };
  },  
  methods: {        
    async modificarEnfermedad() {      
      this.$v.Enfermedad.$touch();
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
          .put("/Enfermedades/Modificar", this.Enfermedad)
          .then((res) => {            
            this.Enfermedad = res.data;
             console.log("todo gucci");
             
            if (this.Enfermedad.codigo_cie !== "") {
              this.cargaRegistro = false;

              //this.replaceEspecialidad(Enfermedad);
               this.closeDialog();  
                this.$emit("emit-obtener-enfermedades");          
              this.mensaje(
                "success",
                "Listo",
                "Enfermedad actualizada satisfactoriamente",
                "<strong>Se redirigiá a la Interfaz de Gestión<strong>",
                true
              );
            }
            
          })
          .catch((err) => console.log(err));
          
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
      this.$emit("close-dialog-Modificar");
    },
  },
  computed: {   
    errorCodigo_cie() {
      const errors = [];
      if (!this.$v.Enfermedad.codigo_cie.$dirty) return errors;
      !this.$v.Enfermedad.codigo_cie.required &&
        errors.push("Debe ingresar un codigo obligatoriamente");
      !this.$v.Enfermedad.codigo_cie.minLength &&
        errors.push(
          "El codigo de la enfermedad debe poseer al menos 4 caracteres"
        );
      return errors;
    },   
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Enfermedad.descripcion.$dirty) return errors;
      !this.$v.Enfermedad.descripcion.required &&
        errors.push("Debe ingresar una descripcion obligatoriamente");
      !this.$v.Enfermedad.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 6 caracteres");
      return errors;
    },
    
  },

  validations() {
    return {
      Enfermedad: {
        codigo_cie: {
          required,
          minLength: minLength(4),
        },
        descripcion: {
          required,
          minLength: minLength(8),
        },        
      },
      
    };
  },
};
</script>

<style scoped>
.container-Enfermedad {
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
