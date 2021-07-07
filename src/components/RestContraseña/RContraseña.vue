<template>
  <v-card>
    <h1 class="title-card">¿Olvidaste tu contraseña?</h1>
    <div class="estilo-stepper">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step step="1">
            Reestablecer contraseña
          </v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step step="2">
            Obtener codigo de verificacion
          </v-stepper-step>
          <v-stepper-step step="3">
            Reestablecer contraseña
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card-text>
              <img src="../../assets/img_login.png" alt="login image" />
              <v-text-field
                placeholder="Ingrese sus nombres"
                outlined
                label="Nombres"
                v-model="model.username"
                :error-messages="username_Errors"
                @input="$v.model.username.$touch()"
                @blur="$v.model.username.$touch()"
                :required="true"
              ></v-text-field>
              <v-row class="filas">
                <v-col cols="12" sm="6" md="6">
             <v-btn dark color="primary" @click="step=2">
                          Continuar
                        </v-btn>
                          </v-col>
                <v-col align="right">
                  <v-btn
                    color="error"
                    elevation="2"
                    block
                    @click="closeDialog()"
                  >
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="2">
            <v-card-text>
              <h1>
                Se le enviara un codigo de verificacion al correo
                ********@gmail.com
              </h1>

              <v-row class="filas2">
                <v-col align="right">
                  <v-btn
                    color="error"
                    elevation="2"
                    block
                    @click="1"
                  >
                    <v-icon left>mdi-close-outline</v-icon>
                    Cerrar
                  </v-btn>
                </v-col>
                <v-col align="left"
                  ><v-btn block @click="1" color="success">
                    <v-icon left>mdi-content-save-all-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-content>


          <v-card-text>
            <v-row class="filas2">
              <v-col align="left"> </v-col>
              <v-col align="right"> </v-col>
            </v-row>
          </v-card-text>
        </v-stepper-items>
      </v-stepper>
    </div>
    <!--<v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Registrando contraseña</v-card-title
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
    </v-dialog>-->
  </v-card>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { required, numeric, email } from "vuelidate/lib/validators";
export default {
  name: "RContraseña",
  props: ["Especialidad2"],
  data() {
    return {
       e1: 1,
      model: {
        username: "",
        password: "",
      },
    };
  },
  async created() {},

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    closeDialog() {
      this.$emit("close-dialog-detalle");
    },
    CambiarStep(step) {
      if (this.e1 == 1) {
        return;
      } else if (this.e1 == 2) {
        return;
      } else if (this.e1 == 3) {
        return;
      } else {
        console.log("asdasdasd");
        this.e1 = step;
      }
    },
  },

  computed: {
    username_Errors() {
      const errors = [];
      if (!this.model.username.$dirty) {
        return errors;
      }
      !this.$v.model.username.email &&
        errors.push("Ingrese una dirección de correo válida");
      !this.$v.model.username.required &&
        errors.push("El campo de usuario no puede estar en blanco");
      return errors;
    },
  },
  validations() {},
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
