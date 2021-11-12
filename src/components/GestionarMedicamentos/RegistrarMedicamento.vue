<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Medicina</v-card-title>
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
              @click="RegistrarMedicamento()"
              >Registrar</v-btn
            >
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog()">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Registrando Medicina</v-card-title>
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="blue"
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
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "RegistrarMedicamento",
  props: ["Medicinas"],
  components: {},
  data() {
    return {
      medicina: {
        descripcion: "",
        generico: "",
        precio: "",
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
    ...mapMutations(["addListaMedicamento"]),



    async RegistrarMedicamento() {
       this.medicina.descripcion;
        this.medicina.generico;
       this.medicina.precio;

      console.log(this.medicina);

      this.$v.medicina.$touch();
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
        console.log(this.medicina);
        this.medicina.precio = parseFloat(this.medicina.precio);
        this.cargaRegistro = true;

        await axios
          .post("/Medicinas/Registrar", this.medicina)

          .then((res) => {
            console.log(this.medicina);
            this.addListaMedicamento(this.medicina);
            console.log(res.data);
            this.limpiarMedicamento();
            this.resetRegistrarMedicinaValidationState();
            this.cargaRegistro = false;

            this.$emit("emit-obtener-1medicamentos");
            this.closeDialog();
          })
          .catch((err) => console.log(err));
          
      }
      
    },

        closeDialog() {
      this.limpiarMedicamento();
      this.resetRegistrarMedicinaValidationState();
      this.$emit("close-dialog-Registrar");
    },

    resetRegistrarMedicinaValidationState() {
      this.$v.medicina.$reset();
    },

    limpiarMedicamento() {
      this.medicina.descripcion = "";
      this.medicina.generico = "";
      this.medicina.precio = "";
    },
  },

  computed: {
    errorDescripcion() {
      const errors = [];
      if (!this.$v.medicina.descripcion.$dirty) return errors;
      !this.$v.medicina.descripcion.required &&
        errors.push("Debe ingresar una descripcion de la medicina");
      !this.$v.medicina.descripcion.minLength &&
        errors.push(
          "La descripcion de la medicina debe poseer al menos 6 caracteres"
        );

      return errors;
    },
    errorGenerico() {
      const errors = [];
      if (!this.$v.medicina.generico.$dirty) return errors;
      !this.$v.medicina.generico.required &&
        errors.push("Debe ingresar el generico de la medicina");
      !this.$v.medicina.generico.minLength &&
        errors.push(
          "El generico de la medicina debe poseer al menos 6 caracteres"
        );
      return errors;
    },
    errorPrecio() {
      const errors = [];
      if (!this.$v.medicina.precio.$dirty) return errors;
      !this.$v.medicina.precio.required &&
        errors.push("Debe ingresar el precio de la medicina");
      !this.$v.medicina.precio.minLength &&
        errors.push("El precio debe poseer al menos 2 caracteres");

      return errors;
    },
  },
  validations() {
    return {
      medicina: {
        descripcion: {
          required,
          minLength: minLength(6),
        },
        generico: {
          required,
          minLength: minLength(6),
        },
        precio: {
          required,
          minLength: minLength(2),
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
