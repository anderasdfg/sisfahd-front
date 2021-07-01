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
              :item-text="itemsTD.text"
                 :item-value="itemsTD.value"
              label="Selecciona un tipo de documento"
              @input="$v.usuario.datos.tipo_documento.$touch()"
              @blur="$v.usuario.datos.tipo_documento.$touch()"
              :error-messages="errorTipoDocumento"
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
                  readonly
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
              :item-text="itemsS.text"
              :item-value="itemsS.value"
              @input="$v.usuario.datos.sexo.$touch()"
              @blur="$v.usuario.datos.sexo.$touch()"
              :error-messages="errorSexo"
              label="Selecciona tu sexo"
            ></v-select>

           <div>
          <vue-dropzone
            ref="myVueDropzone"
            id="dropzone"
            @vdropzone-success="afterSuccess"
            @vdropzone-removed-file="afterRemoved"
            @vdropzone-mounted="mounteddropzone"
            :options="dropzoneOptions"
          >
          </vue-dropzone>
        </div>

        <v-divider class="divider-custom"></v-divider>

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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations } from "vuex";
import { required, minLength, email, numeric} from "vuelidate/lib/validators";

function esContraseña(value) {
  //Minimum eight characters, at least one letter and one number:
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,60}$/.test(value); 
}

export default {

  name: "ModificarUsuario",
  props: ["usuario"],
  data() {
    return {

      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".jpg, .png, .jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione su foto de perfi o arrástrelo aquí",
      },
      usuarioAux: [],
      dialog: false,
      date: null,
      modal: false,
      // itemsTD: ["DNI", "Pasaporte"],
      itemsTD: [
        { value: "DNI", text: "DNI" },
        { value: "CE", text: "Carnet de extranjería" },
        { value: "CD", text: "Cédula diplomática" },
        { value: "Pasaporte", text: "Pasaporte" },
      ],
      itemsS: [ {
          value:'M',
          text:'Masculino'
        },
        {
          value:'F',
          text:'Femenino'
        },],
      fecha_nacimiento: "",
      datemenuR: false,
      //Esto sera reemplazado luego
      cargaModificarUsuario: false,
      e1: 1,
      show1: false,
    };
  },

  components: {
    vueDropzone: vue2Dropzone,
  },
  methods: {
    ...mapMutations(["replaceListaUsuarios"]),

    mounteddropzone() {
      var file = {
        size: 123,
        name: "Foto de perfil del usuario",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.usuario.datos.foto,
        null,
        null,
        true
      );
    },

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

    afterRemoved(file, error, xhr) {
      this.usuario.dataURL = "";
    },
    afterSuccess(file, response) {
      this.usuarioAux.push(file);
      this.usuario.datos.foto = file.dataURL.split(",")[1];
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

    errorTipoDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.tipo_documento.$dirty) return errors;
      !this.$v.usuario.datos.tipo_documento.required &&
        errors.push(
          "Debe ingresar el tipo de documento del usuario paciente"
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

    errorSexo() {
      const errors = [];
      if (!this.$v.usuario.datos.sexo.$dirty) {
        return errors;
      }
      !this.$v.usuario.datos.sexo.required &&
        errors.push("El campo no puede estar en blanco");
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
      !this.$v.usuario.clave.esContraseña &&
        errors.push(
          "Debe tener como mínimo 8 caracteres, con almenos una letra y un numero");
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

        usuario: {
          required,
          email,
        },

        clave: {
          required,
          esContraseña
        },
      },

      usuarioAux:{
            required,
          }
    };
  },
};
</script>
