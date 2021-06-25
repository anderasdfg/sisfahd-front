<template>
  <v-card>
    <v-card-title class="justify-center">
      <h2>Modificar datos del usuario</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Informacion del usuario
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          Informacion de inicio de sesion
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            <v-text-field
              v-model="usuario.datos.nombre"
              :counter="10"
              label="Escribe tu nombre"
              required
            ></v-text-field>

            <v-text-field
              v-model="usuario.datos.apellido_paterno"
              label="Escribe tu Apellido Paterno"
              required
            ></v-text-field>

            <v-text-field
              v-model="usuario.datos.apellido_materno"
              label="Escribe tu Apellido Materno"
              required
            ></v-text-field>

            <v-select
              v-model="usuario.datos.tipo_documento"
              :items="itemsTD"
              label="Selecciona un tipo de documento"
              required
            ></v-select>

            <v-text-field
              v-model="usuario.datos.numero_documento"
              :counter="8"
              label="Ingresa tu numero de documento"
              required
            ></v-text-field>

            <v-text-field
              v-model="usuario.datos.telefono"
              :counter="9"
              label="Ingresa tu numero de celular"
              required
            ></v-text-field>

            <v-menu
              v-model="datemenuR"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="usuario.datos.fecha_nacimiento"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="#009900"
                  outlined
                  label="Fecha de tu nacimiento"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="usuario.datos.fecha_nacimiento"
                @input="menu1 = false"
                locale="es-es"
              ></v-date-picker>
            </v-menu>

            <v-text-field
              v-model="usuario.datos.correo"
              label="Ingresa tu correo electronico"
              required
            ></v-text-field>

            <v-select
              v-model="usuario.datos.sexo"
              :items="itemsS"
              label="Selecciona tu sexo"
              required
            ></v-select>

            <!-- <v-text-field
                v-model="foto"
                label="Ingresa tu hermosa cara"
                required
              ></v-text-field> -->

            <!-- <input type="file" accept="image/"> -->

            <!-- <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Subir foto"
                prepend-icon="mdi-camera"
                label="Foto"
              ></v-file-input> -->

            <v-btn color="error" @click="closeDialogModificarU">
              Cancelar
            </v-btn>

            <v-btn color="primary" @click="e1 = 2">
              Continuar
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <v-text-field
              v-model="usuario.usuario"
              label="Confirma tu correo"
              required
            ></v-text-field>

            <v-text-field
              v-model="usuario.clave"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Escribe tu contraseña"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
            ></v-text-field>
          </div>

          <v-btn color="error" @click="e1 = 1">
            Regresar
          </v-btn>

          <v-btn color="success" @click="modificarUsuario()">
            Modificar datos
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog width="450px" v-model="cargaModificarUsuario" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Modificando datos del usuario</v-card-title
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
import { mapMutations } from "vuex";
export default {
  props: ["usuario"],
  data() {
    return {
      dialog: false,
      date: null,
      modal: false,
      itemsTD: ["DNI", "Pasaporte"],
      itemsS: ["M", "F"],
      fecha_nacimiento: "",
      datemenuR: false,
      //Esto sera reemplazado luego
      cargaModificarUsuario: false,
      e1: 1,
      show1: false,
    };
  },
  methods: {
    ...mapMutations(["replaceListaUsuarios"]),

    closeDialogModificarU() {
      this.$emit("close-dialog-modificaru");
    },
    async modificarUsuario() {
      console.log(this.usuario);
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {

      console.log("no hay errores");
      this.cargaModificarUsuario = true;
      await axios
        .put("/MiUsuario/ModificarUsuario", this.usuario)
        .then((res) => {
          let usuarioPacienteAlterado = {
            urol: {
              nombre: "Paciente",
            },
            datos: {
              nombresyapellidos:
                this.usuario.datos.nombre +
                " " +
                this.usuario.datos.apellido_paterno +
                " " +
                this.usuario.datos.apellido_materno,
              tipo_documento: this.usuario.datos.tipo_documento,
              numero_documento: this.usuario.datos.numero_documento,
            },

            id: res.data.id,

            estado: res.data.estado,
          };

          this.replaceListaUsuarios(usuarioPacienteAlterado);
          console.log(res.data);
          this.$emit("close-dialog-modificaru");
          this.cargaModificarUsuario = false;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
