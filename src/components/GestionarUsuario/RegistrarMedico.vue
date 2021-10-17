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

        <v-stepper-step step="3"> Inicio de sesión </v-stepper-step>
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
              label="Ingresa tu número de documento"
              @input="$v.usuario.datos.numero_documento.$touch()"
              @blur="$v.usuario.datos.numero_documento.$touch()"
              :error-messages="errorNumeroDocumento"
            ></v-text-field>

            <v-text-field
              v-model="usuario.datos.telefono"
              label="Ingresa tu número de celular"
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
              label="Ingresa tu correo electrónico"
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

            <vue-dropzone
              ref="myVueDropzone"
              @vdropzone-success="afterSuccess"
              @vdropzone-removed-file="afterRemoved"
              id="dropzone"
              :options="dropzoneOptions"
            >
            </vue-dropzone>

            <v-alert v-if="errorFoto" color="red">
              <v-card-text class="mt-2" style="color: white"
                >Seleccione el archivo respectivo o arrastrelo aqui</v-card-text
              >
            </v-alert>

            <v-divider class="divider-custom"></v-divider>

            <div align="center" justify="space-around">
              <v-btn text @click="cerrarRegistrar"> Cancel </v-btn>

              <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>
            </div>

            <v-divider></v-divider>
            <v-divider></v-divider>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <v-autocomplete
              v-model="usuario.id_especialidad"
              :items="especialidades"
              item-text="nombre"
              item-value="id"
              cache-items
              class="autocomplete-search"
              label="Especialidad"
            ></v-autocomplete>
            <v-text-field
              v-model="usuario.datos_basicos.lugar_trabajo"
              label="Lugar de trabajo"
              @input="$v.usuario.datos_basicos.lugar_trabajo.$touch()"
              @blur="$v.usuario.datos_basicos.lugar_trabajo.$touch()"
              :error-messages="errorLugarTrabajo"
            ></v-text-field>

            <v-text-field
              v-model="usuario.datos_basicos.numero_colegiatura"
              label="Número de colegiatura"
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
            <v-btn color="error" @click="e1 = 1"> Regresar </v-btn>
            <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>
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
            <v-btn color="error" @click="e1 = 2"> Regresar </v-btn>
            <v-btn x-large color="success" @click="registrarMedico()">
              Registrar
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog width="450px" v-model="cargaRegistroUsuarioMedico" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Registrando Usuario Medico</v-card-title
        >
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
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, numeric } from "vuelidate/lib/validators";

// function esContraseña(value) {
//   //Minimum eight characters, at least one letter and one number:
//   return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,60}$/.test(value);
// }

export default {
  components: {
    vueDropzone: vue2Dropzone,
  },
  name: "RegistrarMedico",
  props: ["GestionarUsuario"],
  data() {
    return {
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, .jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: " Seleccione o arrastre su foto de perfil ",
      },
      usuario: {
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
          foto: "",
        },
        usuario: "",
        clave: "",
        rol: "607f2beacb41a8de70be1dec",
        estado: "registrado/activo/inactivo",
        datos_basicos: {
          lugar_trabajo: "",
          numero_colegiatura: "",
          idiomas: "",
          universidad: "",
          experiencia: "",
          cargos: "",
        },
        id_especialidad: "",
        id_usuario: "",
      },
      datemenuR: false,
      cargaRegistroUsuarioMedico: false,
      // itemsTD: ["DNI", "Pasaporte"],
      itemsTD: [
        { value: "DNI", text: "DNI" },
        { value: "CE", text: "Carnet de extranjería" },
        { value: "CD", text: "Cédula diplomática" },
        { value: "Pasaporte", text: "Pasaporte" },
      ],
      itemsS: [
        {
          value: "M",
          text: "Masculino",
        },
        {
          value: "F",
          text: "Femenino",
        },
      ],
      e1: 1,
      show1: false,
      especialidades: [],
    };
  },
  async created() {
    this.obtenerEspecialidades();
  },
  methods: {
    ...mapMutations(["addListUsuarios"]),

    mounteddropzone() {
      var file = { size: 123, name: "Foto del usuario", type: "image/jpg" };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.usuario.datos.foto,
        null,
        null,
        true
      );
    },
    afterSuccess(file, response) {
      console.log(file);
      this.usuario.datos.foto = file.dataURL.split(",")[1];
      this.$v.usuario.datos.foto.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },

    afterRemoved(file, error, xhr) {
      this.usuario.datos.foto = "";
      this.$v.usuario.datos.foto.$model = "";
    },

    inicioStep(){
      this.e1=1;
    },
    cerrarRegistrar() {
      this.limpiarRegistrarMedico();
      this.resetRegistrarMedicoValidationState();
      this.$emit("cerrar-modal-registro-usuario");
    },
    async registrarMedico() {
      console.log(this.usuario);
      console.log("no hay errores");
      this.cargaRegistroUsuarioMedico = true;
      await axios
        .post("/MiUsuario/RegistrarUsuarioMedico", this.usuario)
        .then((res) => {
          let usuarioalterado = {
            urol: {
              nombre: "Medico",
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
          };
          this.addListUsuarios(usuarioalterado);
          console.log(res.data);
          this.limpiarRegistrarMedico();
          this.resetRegistrarMedicoValidationState();
          this.inicioStep();
          this.$emit("cerrar-modal-registro-usuario");
          this.cargaRegistroUsuarioMedico = false;
        })
        .catch((err) => console.log(err));
    },

    resetRegistrarMedicoValidationState() {
      this.$refs.myVueDropzone.removeAllFiles();
      this.$v.usuario.$reset();
    },

    limpiarRegistrarMedico() {
      this.usuario.datos.nombre = "";
      this.usuario.datos.apellido_paterno = "";
      this.usuario.datos.apellido_materno = "";
      this.usuario.datos.tipo_documento = "";
      this.usuario.datos.numero_documento = "";
      this.usuario.datos.telefono = "";
      this.usuario.datos.fecha_nacimiento = "";
      this.usuario.datos.correo = "";
      this.usuario.datos.sexo = "";
      this.usuario.datos.foto = "";
      this.usuario.usuario = "";
      this.usuario.clave = "";
      this.usuario.rol = "607f2beacb41a8de70be1dec";
      this.usuario.estado = "activo";
      this.usuario.id_especialidad = "";
      this.usuario.id_usuario = "";
      this.usuario.datos_basicos.lugar_trabajo = "";
      this.usuario.datos_basicos.numero_colegiatura = "";
      this.usuario.datos_basicos.idiomas = "";
      this.usuario.datos_basicos.universidad = "";
      this.usuario.datos_basicos.experiencia = "";
      this.usuario.datos_basicos.cargos = "";
    },
    async obtenerEspecialidades() {
      await axios
        .get("/especialidad/all")
        .then((x) => {
          this.especialidades = x.data;
          console.log(this.especialidades);
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
        errors.push("El nombre del usuario debe poseer al menos 2 caracteres");

      return errors;
    },

    errorApellidoP() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido_paterno.$dirty) return errors;
      !this.$v.usuario.datos.apellido_paterno.required &&
        errors.push("Debe ingresar el apellido paterno del usuario paciente");
      !this.$v.usuario.datos.apellido_paterno.minLength &&
        errors.push(
          "El apellido paterno del usuario debe poseer al menos 2 caracteres"
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
          "El apellido materno del usuario debe poseer al menos 2 caracteres"
        );

      return errors;
    },
    errorTipoDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.tipo_documento.$dirty) return errors;
      !this.$v.usuario.datos.tipo_documento.required &&
        errors.push("Debe ingresar el tipo de documento del usuario paciente");
      return errors;
    },

    errorNumeroDocumento() {
      const errors = [];
      if (!this.$v.usuario.datos.numero_documento.$dirty) return errors;
      !this.$v.usuario.datos.apellido_materno.required &&
        errors.push(
          "Debe ingresar el número de documento del usuario paciente"
        );
      !this.$v.usuario.datos.apellido_materno.minLength &&
        errors.push("El número de documento debe poseer 8 caracteres");

      return errors;
    },

    errorTelefono() {
      const errors = [];
      if (!this.$v.usuario.datos.telefono.$dirty) return errors;
      !this.$v.usuario.datos.telefono.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.telefono.numeric &&
        errors.push("Ingrese solo números válidos");
      !this.$v.usuario.datos.telefono.minLength &&
        errors.push("El número de documento debe poseer 8 caracteres");

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

    errorFoto() {
      return this.$v.usuario.datos.foto.required == false &&
        this.$v.usuario.datos.foto.$dirty == true
        ? true
        : false;
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
        errors.push("El campo de contraseña no puede estar en blanco");
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
            minLength: minLength(2),
          },
          apellido_paterno: {
            required,
            minLength: minLength(2),
          },
          apellido_materno: {
            required,
            minLength: minLength(2),
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

          foto: {
            required,
          },
        },

        datos_basicos: {
          lugar_trabajo: {
            required,
          },
          numero_colegiatura: {
            required,
          },
          idiomas: {
            required,
          },
          universidad: {
            required,
          },
          experiencia: {
            required,
          },
          cargos: {
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
