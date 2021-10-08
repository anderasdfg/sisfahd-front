<template>
  <v-card>
    <v-card-title class="justify-center">Eliminar Servicio</v-card-title>

    <div class="container-eliminarServicio">
      <form>
        <v-text-field
          label="titulo"
          class="campos"
          v-model="Servicio4.titulo"
          readonly
        ></v-text-field>
        <v-text-field
          label="descripcion"
          class="campos"
          v-model="Servicio4.descripcion"
          readonly
        ></v-text-field>
        <v-text-field
          label="monto"
          class="campos"
          v-model="Servicio4.monto"
          readonly
        ></v-text-field>
        <v-card style="margin:5px; padding:5px;border:1px solid #b3b3b3;">
          <v-row>
            <v-col> </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-img
                style="display:block"
                height="170"
                width="170"
                :src="Servicio4.url"
              ></v-img>
            </v-col>
          </v-row>
        </v-card>
        <!--Para archivos :3 -->
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click="eliminarServicio"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Eliminar Servicio</span>
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
          >Eliminando el Servicio</v-card-title
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

import { mapMutations, mapState, mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["Servicio4"],
  data() {
    return {
      cargaRegistro: false,
    };
  },
  methods: {
    async eliminarServicio() {
      //let tarifas={titulo:this.Servicio4.titulo,monto:this.Servicio4.monto,descripcion:this.Servicio4.descripcion,id:this.Servicio4.id,precio_final:this.Servicio4.precio_final,id_Medico:this.Servicio4.id_Medico};
      this.$v.$touch();
      
        this.Servicio4.id_Medico = this.user.id;
        console.log(this.user.id);
        await axios
          .delete("/Adicionales/Delete?id=" + this.Servicio4.id)
          .then((res) => {
            this.Especialidad = res.data;
            if (this.Servicio4.id !== "") {
              this.cargaRegistro = false;
              this.closeDialog();
              this.$emit("emit-obtener-Servicio");
              this.mensaje(
                "success",
                "Listo",
                "Servicio eliminado satisfactoriamente",
                "<strong>Se redirigirá a la Interfaz de Gestión<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
      
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
    ...mapGetters(["user"]),
  },

  validations() {
    return {};
  },
};
</script>

<style scoped>
.container-eliminarServicio {
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
