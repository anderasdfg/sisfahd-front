<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Tarifa</v-card-title>

    <div class="container-ModificarTarifa">
      <form>
        <v-text-field
          v-model.trim="Tarifa2.descripcion"
          label="Descripcion"
          outlined
          @input="$v.Tarifa2.descripcion.$touch()"
          @blur="$v.Tarifa2.descripcion.$touch()"
          :error-messages="errorDescripcion"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.number="Tarifa2.impuesto"
          label="Impuesto"
          outlined
          @input="$v.Tarifa2.impuesto.$touch()"
          @blur="$v.Tarifa2.impuesto.$touch()"
          :error-messages="errorImpuesto"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.number="Tarifa2.subtotal"
          label="Subtotal"
          outlined
          @input="$v.Tarifa2.subtotal.$touch()"
          @blur="$v.Tarifa2.subtotal.$touch()"
          :error-messages="errorSubtotal"
          color="#009900"
        ></v-text-field>

        <v-textarea
          v-model.number="Tarifa2.precio_final"
          type="number"
          label="Precio"
          @input="$v.Tarifa2.precio_final.$touch()"
          @blur="$v.Tarifa2.precio_final.$touch()"
          height="25"
          rows="2"
          :error-messages="errorPrecio"
          outlined
          color="#009900"
        ></v-textarea>
        <!--Para archivos :3 -->

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="modificarTarifa">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Tarifas</span>
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
          >Modificando la tarifa</v-card-title
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
import {
  required,
  minLength,
  decimal,
  between,
} from "vuelidate/lib/validators";
export default {
  props: ["Tarifa2"],
  data() {
    return {
      cargaRegistro: false,
    };
  },

  methods: {
    async modificarTarifa() {
      //this.Tarifa2.precio_final="150";
     this.Tarifa2.impuesto = 0.18;
     this.Tarifa2.subtotal = this.Tarifa2.precio_final * this.Tarifa2.impuesto;
      this.Tarifa2.id_Medico = this.user.id;    

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
        console.log("no hay errores");
console.log(this.Tarifa2);

      console.log(this.user.id);
         await axios
          .put("/Tarifa/tarifasmedico/Modificar", this.Tarifa2)
          .then((res) => {
            this.Tarifa = res.data;
            if (this.Tarifa2.id !== "") {
              this.cargaRegistro = false;
               this.closeDialog();     
              this.$emit("emit-obtener-tarifas");
              this.mensaje(
                "success",
                "Listo",
                "Tarifa actualizada satisfactoriamente",
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
    ...mapGetters(["user"]),
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Tarifa2.descripcion.$dirty) return errors;
      !this.$v.Tarifa2.descripcion.required &&
        errors.push("Debe ingresar un nombre obligatoriamente");
      !this.$v.Tarifa2.descripcion.minLength &&
        errors.push("El nombre de la Tarifa debe poseer al menos 6 caracteres");
      return errors;
    },
    errorSubtotal() {
      const errors = [];
      if (!this.$v.Tarifa2.subtotal.$dirty) return errors;
      !this.$v.Tarifa2.subtotal.required &&
        errors.push("Debe ingresar una descripcion obligatoriamente");
      !this.$v.Tarifa2.subtotal.decimal &&
        errors.push("El Impuesto de la tarifa solo debe poseer numeros");
      !this.$v.Tarifa2.subtotal.minLength &&
        errors.push("El codigo de la Tarifa debe poseer al menos 1 caracteres");
      return errors;
    },
    errorPrecio() {
      const errors = [];
      if (!this.$v.Tarifa2.precio_final.$dirty) return errors;
      !this.$v.Tarifa2.precio_final.required &&
        errors.push("Debe ingresar un precio obligatoriamente");
      !this.$v.Tarifa2.precio_final.decimal &&
        errors.push("El Impuesto de la tarifa solo debe poseer numeros");
      !this.$v.Tarifa2.precio_final.minLength &&
        errors.push("La descripción debe poseer al menos 3 caracteres");
      return errors;
    },
    errorImpuesto() {
      const errors = [];
      if (!this.$v.Tarifa2.impuesto.$dirty) return errors;
      !this.$v.Tarifa2.impuesto.required &&
        errors.push("Debe ingresar un precio obligatoriamente");
      !this.$v.Tarifa2.impuesto.decimal &&
        errors.push("El Impuesto de la tarifa solo debe poseer numeros");
      !this.$v.Tarifa2.impuesto.minLength &&
        errors.push("La descripción debe poseer al menos 3 caracteres");
      return errors;
    },
  },
  /*created() {
    this.fetchUser();    
  },*/

  validations() {
    return {
      Tarifa2: {
        descripcion: {
          required,
          minLength: minLength(6),
        },
        subtotal: {
          required,
          minLength: minLength(0),
          decimal,
        },
        precio_final: {
          required,
          minLength: minLength(3),
          decimal,
        },
        impuesto: {
          required,
          minLength: minLength(3),
          decimal,
        },
      },
    };
  },
};
</script>

<style scoped>
.container-ModificarTarifa {
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
