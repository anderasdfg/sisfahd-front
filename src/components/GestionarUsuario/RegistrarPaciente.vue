<template>
  <v-card>
    <v-card-title class="justify-center">
      <h2>Registro de datos del usuario Paciente</h2>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="nombre"
                :counter="10"
                :rules="nameRules"
                label="Escribe tu nombre"
                required
              ></v-text-field>

              <v-text-field
                v-model="apellido_paterno"
                :rules="emailRules"
                label="Escribe tu Apellido Paterno"
                required
              ></v-text-field>

              <v-text-field
                v-model="apellido_materno"
                :rules="emailRules"
                label="Escribe tu Apellido Materno"
                required
              ></v-text-field>

              <v-select
                v-model="tipo_documento"
                :items="itemsTD"
                :rules="[(v) => !!v || 'El tipo de documento es requerido']"
                label="Selecciona un tipo de documento"
                required
              ></v-select>

              <v-text-field
                v-model="numero_documento"
                :counter="8"
                :rules="emailRules"
                label="Ingresa tu numero de documento"
                required
              ></v-text-field>

              <v-text-field
                v-model="telefono"
                :counter="9"
                :error-messages="errors"
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
                    v-model="fecha_nacimiento"
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
                  v-model="fecha_nacimiento"
                  @input="menu1 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="correo"
                label="Ingresa tu correo electronico"
                required
              ></v-text-field>

              <v-select
                v-model="sexo"
                :items="itemsS"
                :rules="[(v) => !!v || 'Selecciona tu sexo']"
                label="Selecciona tu sexo"
                required
              ></v-select>

              <!-- <v-text-field
                v-model="foto"
                label="Ingresa tu hermosa cara"
                required
              ></v-text-field> -->

              <!-- <input type="file" accept="image/"> -->

              <v-file-input
                :rules="rules"
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Subir foto"
                prepend-icon="mdi-camera"
                label="Foto"
              ></v-file-input>

              <v-btn color="error">
                Cancelar
              </v-btn>

              <v-btn color="primary" @click="e1 = 2">
                Continuar
              </v-btn>
            </v-form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="usuario"
                label="Escribe tu usuario"
                required
              ></v-text-field>

              <v-text-field
                v-model="password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Escribe tu contraseña"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
          </div>

          <v-btn text>
            Cancelar
          </v-btn>

          <v-btn color="success" @click="e1 = 1">
            Registrar
          </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      usuarios: {
        datos: {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          tipo_documento: "",
          numero_de_documento: "",
          telefono: "",
          fecha_nacimiento: "",
          correo: "",
          sexo: "",
        },
        usuario: "",
        clave: "",
      },
      dialog: false,
      date: null,
      modal: false,
      itemsTD: ["DNI", "Pasaporte"],
      itemsS: ["M", "F"],
      fecha_nacimiento: "",
      datemenuR: false,
      //Esto sera reemplazado luego
      cargaRegistro: false,
      e1: 1,
    };
  },
};
</script>
