<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Enfermedad</v-card-title>
    <div class="container-Especialidad">
      <v-form>
        <v-text-field
          v-model.trim="Enfermedad.codigo_cie"
          label="Codigo"
          outlined
          @input="$v.Enfermedad.codigo_cie.$touch()"
          @blur="$v.Enfermedad.codigo_cie.$touch()"
          :error-messages="errorCodigo_cie"
          color="#009900"
        ></v-text-field>

        <v-textarea
          v-model.trim="Enfermedad.descripcion"
          label="Descripcion"
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
              @click.prevent="RegistrarEnfermedad"
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
          >Registrando Enfermedad</v-card-title
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

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";
export default {
  name: "RegistrarEnfermedades",
  props: ["Enfermedad"],
  components: {
    vueDropzone: vue2Dropzone,
  },
  data() {
    return {
      step: 1,

      enfermedad: {
        codigo_cie: "",
        descripcion: "",
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
    ...mapMutations(["setE"]),

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
      this.enfermedad = this.limpiarEnfermedad();
      this.step = 1;
      this.$emit("close-dialog-Registrar");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async RegistrarEnfermedad() {
      this.Enfermedad.codigo_cie = this.Enfermedad.codigo_cie;
      this.Enfermedad.descripcion = this.Enfermedad.descripcion;

      console.log(this.Enfermedad);
      this.$v.Enfermedad.$touch();
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
        this.cargaRegistro = true;
        await axios
          .post("/Enfermedades/Registrar", this.Enfermedad)
          .then((res) => {
            this.Enfermedad = res.data;
            this.$emit("emit-obtener-enfermedades");
            this.cargaRegistro = false;
            this.closeDialog();
          })
          .catch((err) => console.log(err));

        await this.mensaje(
          "success",
          "Listo",
          "Enfermedad registrada satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar enfermedades<strong>"
        );
      }
    },

    limpiarEnfermedad() {
      return {
        enfermedad: {
          codigo_cie: "",
          descripcion: "",
        },
      };
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
.container-Especialidad {
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
