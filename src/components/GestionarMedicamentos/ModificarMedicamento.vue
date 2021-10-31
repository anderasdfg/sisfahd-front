<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Medicamento</v-card-title>

    <div class="container-Medicamento">
       <v-form>
        <v-text-field
          v-model.trim="medicina.descripcion"
          label="Descripción"
          outlined
          @input="$v.medicina.descripcion.$touch()"
          @blur="$v.medicina.descripcion.$touch()"
          :error-messages="errorDescripcion"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="medicina.generico"
          label="Generico"
          outlined
          @input="$v.medicina.generico.$touch()"
          @blur="$v.medicina.generico.$touch()"
          :error-messages="errorGenerico"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="medicina.precio"
          label="Precio"
          @input="$v.medicina.precio.$touch()"
          @blur="$v.medicina.precio.$touch()"
          height="25"
          rows="2"
          :error-messages="errorPrecio"
          outlined
          color="#009900"
        ></v-text-field>


        
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click.prevent="ModificarMedicamento"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Medicamentos</span>
            </v-btn>

          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Modificando el medicamento</v-card-title
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
import { mapMutations, mapState } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  name: "ModificarMedicamento",
  props: ["Medicinas"],
  data() {
    return {
 step: 1,
      medicina: {
        descripcion: "",
        generico: "",
        precio: "",
      },

      cargaRegistro: false,
    };
  },
  components: {
  },
  methods: {

    async modificarMedicamentos() {
      
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
            "/Medicinas/Modificar",
            this.Medicinas
          )
          .then((res) => {
            
             console.log("");
             
            if (this.Medicinas.id !== "") {
              this.cargaRegistro = false;

               this.closeDialog();  
                this.$emit("emit-obtener-medicamentos");          
              this.mensaje(
                "success",
                "Listo",
                "Medicamento actualizado",
                true
              );
            }
            
          })
          .catch((err) => console.log(err));
          
      }
    },
    closeDialog() {
      this.$emit("close-dialog-Modificar");
    },
  },



};
</script>

<style scoped>
.container-Medicamento {
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
