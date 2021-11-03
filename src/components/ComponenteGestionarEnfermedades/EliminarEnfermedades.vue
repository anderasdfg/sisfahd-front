<template>
  <v-card>
    <v-card-title class="justify-center">Eliminar Enfermedad</v-card-title>

    <div class="container-EliminarEnfermedad">
      <form>
        <v-text-field
          label="Codigo"
          class="campos"
          v-model="Enfermedad.codigo_cie"
          readonly
        ></v-text-field>
        <v-text-field
          label="Descripcion"
          class="campos"
          v-model="Enfermedad.descripcion"
          readonly
        ></v-text-field>
        
       
        <!--Para botones :3 -->

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="eliminarEnfermedad">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Eliminar Enfermedad</span>
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
        <v-card-title class="justify-center">Eliminando la Enfermedad</v-card-title>
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

import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["Enfermedad"],
  data() {
    return {
    
      cargaRegistro: false,
    };
  },

  methods: {
    async eliminarEnfermedad() {
      this.$v.$touch();
      if (this.$v.$valid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
        );
      } else {
          this.cargaRegistro = true;
        console.log(this.user.id);

        await axios
          .delete("/Enfermedades/Delete?id=" + this.Enfermedad.id)
          .then((res) => {
            this.Enfermedad = res.data;
           
              this.cargaRegistro = false;
              this.closeDialog();
              this.$emit("emit-obtener-enfermedades");
              this.mensaje(
                "success",
                "Listo",
                "Enfermedad eliminada satisfactoriamente",
                "<strong>Se redirigirá a la Interfaz de Gestión<strong>",
                true
              );
            
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
          this.$emit("modifier-Complete");
        }
      });
    },
    closeDialog() {
      this.$emit("close-dialog-eliminar");
    },
  },
  computed: {
 
 
    
  },

  validations() {
    return {
     
     
    };
  },
};
</script>

<style scoped>
.container-EliminarEnfermedad {
  margin: 15px;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
</style>
