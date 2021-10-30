<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Medicamento</v-card-title>
    <div class="container-Medicamento">
      <v-form>
        <v-text-field
          v-model.trim="medicamentos.nombre"
          label="Nombre"
          outlined
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="medicamentos.concentracion"
          label="Concentracion"
          outlined
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="medicamentos.presentacion"
          label="Presentacion"
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
              @click.prevent="RegistrarMedicamento"
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
          >Registrando Medicamento</v-card-title
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

import { mapMutations, mapState } from "vuex";
export default {
  name: "RegistrarMedicamento",
  props: ["Medicamento"],
  components: {
  },
  data() {
    return {
      step: 1,
      medicamento: {
        nombre: "",
        concentracion: "",
        presentacion: "",
      },

      cargaRegistro: false,
    };
  },

  methods: {
    ...mapMutations(["setE"]),

    closeDialog() {
      this.medicamento = this.limpiarMedicamento();
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async RegistrarMedicamento() {
      this.medicamento.nombre = this.medicamento.nombre;
      this.medicamento.concentracion = this.medicamento.concentracion;
      this.medicamento.presentacion = this.medicamento.presentacion;

      console.log(this.medicamento);
      this.$v.medicamento.$touch();
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
          .post("/Medicamento/Registrar", this.medicamento)
          .then((res) => {
            this.medicamento = res.data;
            this.$emit("emit-obtener-medicamentos");
            this.cargaRegistro = false;
            this.closeDialog();
          })
          .catch((err) => console.log(err));
      }
    },

    limpiarMedicamento() {
      return {
        medicamento: {
          nombre: "",
          concentracion: "",
          presentacion: "",
        },
      };
    },
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
.container-Medicamento {
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
