<template>
  <v-card>
    <v-card-title class="justify-center"
      >Registro de los datos del Usuario Medico
    </v-card-title>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Informacion general del usuario
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Datos basicos del medico
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Inicio de sesion
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

              <v-text-field
                v-model="foto"
                label="Ingresa tu hermosa cara"
                required
              ></v-text-field>

              <v-row align="center" justify="space-around">
                <v-btn text>
                  Cancel
                </v-btn>
                <v-btn color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
              </v-row>
            </v-form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="lugar_trabajo"
                :counter="10"
                :rules="nameRules"
                label="Lugar de trabajo"
                required
              ></v-text-field>

              <v-text-field
                v-model="numero_colegiatura"
                :counter="10"
                :rules="nameRules"
                label="Numero de colegiatura"
                required
              ></v-text-field>

              <v-text-field
                v-model="idiomas"
                :counter="10"
                :rules="nameRules"
                label="Idiomas que manejas"
                required
              ></v-text-field>

              <v-text-field
                v-model="universidad"
                :counter="10"
                :rules="nameRules"
                label="Universidad en donde estudiaste"
                required
              ></v-text-field>

              <v-text-field
                v-model="experiencia"
                :counter="10"
                :rules="nameRules"
                label="Describe la experiencia con la que cuentas"
                required
              ></v-text-field>

              <v-text-field
                v-model="experiencia"
                :counter="10"
                :rules="nameRules"
                label="Escribe los cargos que haz ejercido"
                required
              ></v-text-field>
            </v-form>
          </div>
          <v-row align="center" justify="space-around">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn color="primary" @click="e1 = 3">
              Continue
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-5" height="200px">
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
          </v-card>

          <v-row align="center" justify="space-around">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn color="primary" @click="e1 = 1">
              Continue
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
export default {
  data() {

    
    return {
      e1: 1,
      usuarios: {
        datos: {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          tipo_documento: "",
          numero_documento: "",
          telefono: "",
          fecha_nacimiento: "",
          correo: "",
          sexo: "",
        },
        usuario: "",
        clave: "",
        datos_basicos: {
          lugar_trabajo: "",
          numero_colegiatura: "",
          idiomas: "",
          universidad: "",
          experiencia: "",
          cargos: "",
          id_especialidad: "",
          id_usuario: "",
        },
      },
    };
  },
};
</script>
