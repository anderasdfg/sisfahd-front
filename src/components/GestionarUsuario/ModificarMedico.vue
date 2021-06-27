<template>
  <v-card>
    <v-card-title class="justify-center"
      >Modificar datos del Usuario Medico
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
              <v-text-field
                v-model="usuario.datos.nombre"
                label="Escribe tu nombre"
                 @input="$v.usuario.datos.nombre.$touch()"
              @blur="$v.usuario.datos.nombre.$touch()"
              :error-messages="errorNombre"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.apellido_paterno"
                label="Escribe tu Apellido Paterno"
                @input="$v.usuario.datos.apellido_paterno.$touch()"
              @blur="$v.usuario.datos.apellido_paterno.$touch()"
              :error-messages="errorApellidoP"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.apellido_materno"
                label="Escribe tu Apellido Materno"
                @input="$v.usuario.datos.apellido_materno.$touch()"
              @blur="$v.usuario.datos.apellido_materno.$touch()"
              :error-messages="errorApellidoM"
              ></v-text-field>

              <v-select
                v-model="usuario.datos.tipo_documento"
                :items="itemsTD"
                
                label="Selecciona un tipo de documento"
              :rules="[(v) => !!v || 'Tipo de documento requerido']"
              ></v-select>

              <v-text-field
                v-model="usuario.datos.numero_documento"
                
                label="Ingresa tu numero de documento"
                @input="$v.usuario.datos.numero_documento.$touch()"
              @blur="$v.usuario.datos.numero_documento.$touch()"
              :error-messages="errorNumeroDocumento"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.telefono"
                label="Ingresa tu numero de celular"
                @input="$v.usuario.datos.telefono.$touch()"
              @blur="$v.usuario.datos.telefono.$touch()"
              :error-messages="errorTelefono"
              :required="true"
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
                    
                    v-bind="attrs"
                    v-on="on"

                    :error-messages="errorFechaNacimiento"
                  @input="$v.usuario.datos.fecha_nacimiento.$touch()"
                  @blur="$v.usuario.datos.fecha_nacimiento.$touch()"
                  :required="true"
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
                 :error-messages="errorCorreo"
              @input="$v.usuario.datos.correo.$touch()"
              @blur="$v.usuario.datos.correo.$touch()"
              :required="true"
              ></v-text-field>

              <v-select
                v-model="usuario.datos.sexo"
                :items="itemsS"
                
                label="Selecciona tu sexo"
                :rules="[(v) => !!v || 'Sexo requerido']"
              
              ></v-select>

              <!-- <v-text-field
                v-model="foto"
                label="Ingresa tu hermosa cara"
                required
              ></v-text-field> -->

              <div align="center" justify="space-around">
               
                <v-btn  text @click="cerrarModificarMedico">
                  Cancelar
                </v-btn>
                
                
                <v-btn  color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
                
              </div>

              <v-divider></v-divider>
              <v-divider></v-divider>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
              <v-text-field
                v-model="usuario.datos_basicos.lugar_trabajo"
                label="Lugar de trabajo"
                @input="$v.usuario.datos_basicos.lugar_trabajo.$touch()"
              @blur="$v.usuario.datos_basicos.lugar_trabajo.$touch()"
              :error-messages="errorLugarTrabajo"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.numero_colegiatura"
                label="Numero de colegiatura"
                @input="$v.usuario.datos_basicos.numero_colegiatura.$touch()"
              @blur="$v.usuario.datos_basicos.numero_colegiatura.$touch()"
              :error-messages="errorNumeroColegiatura"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.idiomas"   
                label="Idiomas que manejas"
                @input="$v.usuario.datos_basicos.idiomas.$touch()"
              @blur="$v.usuario.datos_basicos.idiomas.$touch()"
              :error-messages="errorIdiomas"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.universidad"
                label="Universidad en donde estudiaste"
                @input="$v.usuario.datos_basicos.universidad.$touch()"
              @blur="$v.usuario.datos_basicos.universidad.$touch()"
              :error-messages="errorUniversidad"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.experiencia"
                label="Describe la experiencia con la que cuentas"
                @input="$v.usuario.datos_basicos.experiencia.$touch()"
              @blur="$v.usuario.datos_basicos.experiencia.$touch()"
              :error-messages="errorExperiencia"
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.cargos"
                label="Escribe los cargos que haz ejercido"
                 @input="$v.usuario.datos_basicos.cargos.$touch()"
              @blur="$v.usuario.datos_basicos.cargos.$touch()"
              :error-messages="errorCargos"
              ></v-text-field>
          </div>
          <v-row align="center" justify="space-around">
            <v-btn color="error" text dark @click="e1 = 1">
              Regresar
            </v-btn>
            <v-btn color="primary" @click="e1 = 3">
              Continue
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="container-user">
              <v-text-field
                v-model="usuario.usuario"
                label="Escribe tu usuario"
                :error-messages="errorUsuario"
              @input="$v.usuario.usuario.$touch()"
              @blur="$v.usuario.usuario.$touch()"
              :required="true"
              ></v-text-field>

              <v-text-field
                v-model="usuario.clave"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Escribe tu contraseña"
                :error-messages="errorClave"
              @input="$v.usuario.clave.$touch()"
              @blur="$v.usuario.clave.$touch()"
              :required="true"
                @click:append="show1 = !show1"
              ></v-text-field>
          </div>

          <v-row align="center" justify="space-around">
            <v-btn color="error" text dark @click="e1 = 2">
              Regresar
            </v-btn>
            <v-btn  x-large color="success" @click="modificarMedico()">
              Modificar
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog width="450px" v-model="cargaModificarUsuarioMedico" persistent>
       <v-card height="300px">
          <v-card-title class="justify-center">Modificando </v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="blue"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex';
import { required, minLength, email, numeric } from "vuelidate/lib/validators";
function esContraseña(value) {
  //Minimum eight characters, at least one letter and one number:
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,60}$/.test(value);
}
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
      cargaModificarUsuarioMedico: false,
      e1: 1,
       show1: false,
    };
  },
   methods: {
   ...mapMutations(["replaceListaUsuarios"]),

      cerrarModificarMedico(){
        this.$emit("close-dialog-modificarm");
      },
        async modificarMedico(){
      console.log(this.usuario)
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {
       
          console.log("no hay errores");
          this.cargaModificarUsuarioMedico = true;
          await axios
            .put("/MiUsuario/ModificarUsuarioMedico", this.usuario)
            .then((res) => {

              let usuarioMedicoAlterado ={
                urol:{
                  nombre:"Medico"
                },
                datos:{
                  nombresyapellidos:this.usuario.datos.nombre+" "+this.usuario.datos.apellido_paterno+" "+this.usuario.datos.apellido_materno,
                  tipo_documento:this.usuario.datos.tipo_documento,
                  numero_documento:this.usuario.datos.numero_documento
                },

                id: res.data.id,

                estado: res.data.estado
                
              }
              this.replaceListaUsuarios(usuarioMedicoAlterado);
              console.log(res.data);
              this.$emit("close-dialog-modificarm");
              this.cargaModificarUsuarioMedico = false;
            })
            .catch((err) => console.log(err));
 
    },

   },

   computed: {
    errorNombre() {
      const errors = [];
      if (!this.$v.usuario.datos.nombre.$dirty) return errors;
      !this.$v.usuario.datos.nombre.required &&
        errors.push("Debe ingresar el nombre del usuario");
      !this.$v.usuario.datos.nombre.minLength &&
        errors.push("El nombre del usuario debe poseer al menos 7 caracteres");

      return errors;
    },

    errorApellidoP() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido_paterno.$dirty) return errors;
      !this.$v.usuario.datos.apellido_paterno.required &&
        errors.push("Debe ingresar el apellido paterno del usuario paciente");
      !this.$v.usuario.datos.apellido_paterno.minLength &&
        errors.push(
          "El apellido paterno del usuario debe poseer al menos 7 caracteres"
        );

      return errors;
    },

    errorApellidoM() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido_materno.$dirty) return errors;
      !this.$v.usuario.datos.apellido_materno.required &&
        errors.push("Debe ingresar el apellido materno del usuario paciente");
      !this.$v.usuario.datos.apellido_materno.minLength &&
        errors.push(
          "El apellido materno del usuario debe poseer al menos 7 caracteres"
        );

      return errors;
    },

    errorNumeroDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.numero_documento.$dirty) return errors;
      !this.$v.usuario.datos.apellido_materno.required &&
        errors.push(
          "Debe ingresar el numero de documento del usuario paciente"
        );
      !this.$v.usuario.datos.apellido_materno.minLength &&
        errors.push("El numero de documento debe poseer 8 caracteres");

      return errors;
    },

    errorTelefono() {
      const errors = [];
      if (!this.$v.usuario.datos.telefono.$dirty) return errors;
      !this.$v.usuario.datos.telefono.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.telefono.numeric &&
        errors.push("Ingrese solo numeros válidos");
      return errors;
    },

    errorFechaNacimiento() {
      const errors = [];
      if (!this.$v.usuario.datos.fecha_nacimiento.$dirty) return errors;
      !this.$v.usuario.datos.fecha_nacimiento.required &&
        errors.push("El campo no puede estar en blanco");
      return errors;
    },

    errorCorreo() {
      const errors = [];
      if (!this.$v.usuario.datos.correo.$dirty) {
        return errors;
      }
      !this.$v.usuario.datos.correo.email &&
        errors.push("Ingrese una dirección de correo válida");
      !this.$v.usuario.datos.correo.required &&
        errors.push("El campo de correo no puede estar en blanco");
      return errors;
    },

    errorLugarTrabajo() {
      const errors = [];
      if (!this.$v.usuario.datos_basicos.lugar_trabajo.$dirty) return errors;
      !this.$v.usuario.datos_basicos.lugar_trabajo.required &&
        errors.push("Debe ingresar el campo requerido");
      return errors;
    },

    errorNumeroColegiatura() {
      const errors = [];
      if (!this.$v.usuario.datos_basicos.numero_colegiatura.$dirty)
        return errors;
      !this.$v.usuario.datos_basicos.numero_colegiatura.required &&
        errors.push("Debe ingresar el campo requerido");
      // !this.$v.usuario.datos_basicos.numero_colegiatura.minLength &&
      //   errors.push("El campo de correo no puede estar en blanco");
      return errors;
    },

    errorIdiomas() {
      const errors = [];
      if (!this.$v.usuario.datos_basicos.idiomas.$dirty) return errors;
      !this.$v.usuario.datos_basicos.idiomas.required &&
        errors.push("Debe ingresar el campo requerido");
      // !this.$v.usuario.datos.nombre.minLength &&
      //   errors.push("El nombre del usuario debe poseer al menos 7 caracteres");
      return errors;
    },

    errorUniversidad() {
      const errors = [];
      if (!this.$v.usuario.datos_basicos.universidad.$dirty) return errors;
      !this.$v.usuario.datos_basicos.universidad.required &&
        errors.push("Debe ingresar el campo requerido");
      // !this.$v.usuario.datos.nombre.minLength &&
      //   errors.push("El nombre del usuario debe poseer al menos 7 caracteres");
      return errors;
    },

    errorExperiencia() {
      const errors = [];
      if (!this.$v.usuario.datos_basicos.experiencia.$dirty) return errors;
      !this.$v.usuario.datos_basicos.experiencia.required &&
        errors.push("Debe ingresar el campo requerido");
      // !this.$v.usuario.datos.nombre.minLength &&
      //   errors.push("El nombre del usuario debe poseer al menos 7 caracteres");
      return errors;
    },

    errorCargos() {
      const errors = [];
      if (!this.$v.usuario.datos_basicos.cargos.$dirty) return errors;
      !this.$v.usuario.datos_basicos.cargos.required &&
        errors.push("Debe ingresar el campo requerido");
      // !this.$v.usuario.datos.nombre.minLength &&
      //   errors.push("El nombre del usuario debe poseer al menos 7 caracteres");
      return errors;
    },

    errorUsuario() {
      const errors = [];
      if (!this.$v.usuario.usuario.$dirty) {
        return errors;
      }
      !this.$v.usuario.usuario.email &&
        errors.push("Ingrese una dirección de correo válida");
      !this.$v.usuario.usuario.required &&
        errors.push("El campo de correo no puede estar en blanco");
      return errors;
    },

    errorClave() {
      const errors = [];
      if (!this.$v.usuario.clave.$dirty) {
        return errors;
      }
      !this.$v.usuario.clave.required &&
        errors.push("El campo de contrasena no puede estar en blanco");
      // !this.$v.usuario.clave.esContraseña &&
      //   errors.push(
      //     "Debe tener como mínimo 8 caracteres, con almenos una letra y un numero"
      //   );
      return errors;
    },
  },

  validations() {
    return {
      usuario: {
        datos: {
          nombre: {
            required,
            minLength: minLength(3),
          },
          apellido_paterno: {
            required,
            minLength: minLength(3),
          },
          apellido_materno: {
            required,
            minLength: minLength(3),
          },
          tipo_documento: {
            required,
          },
          numero_documento: {
            required,
            minLength: minLength(8),
          },
          telefono: {
            required,
            minLength: minLength(9),
            numeric,
          },

          fecha_nacimiento: {
            required,
          },

          correo: {
            required,
            email,
          },

          sexo: {
            required,
          },
        },
        
        datos_basicos: {
          lugar_trabajo:{
            required,
          },
          numero_colegiatura:{
            required,
          },
          idiomas:{
           required,
          },
          universidad:{
           required,
          },
          experiencia:{
           required,
          },
          cargos:{
           required,
          },
        },

         usuario: {
          required,
          email,
        },

        clave: {
          required,
          // esContraseña
        },
      },
    };
  },
};
</script>