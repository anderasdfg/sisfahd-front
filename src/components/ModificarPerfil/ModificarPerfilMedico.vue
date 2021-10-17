<template>
  <v-card elevation="3" class="card-modificarPerfil">
    <div class="top-card" v-if="this.user">
      <h1 class="titulo">Modificar Perfil Médico</h1>
      <div class="image">
        <img
          :src="
            this.user.datos.foto
              ? this.user.datos.foto
              : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
          "
          alt="Perfil"
          class="image"
        />
      </div>

      <div class="info-paciente">
        <h3 class="font-weight-medium subtitulo">Nombre</h3>
        <p>{{ this.user.datos.nombre }}</p>
        <h3 class="font-weight-medium subtitulo">Apellido paterno</h3>
        <p>{{ this.user.datos.apellido_paterno }}</p>
        <h3 class="font-weight-medium subtitulo">Apellido materno</h3>
        <p>{{ this.user.datos.apellido_materno }}</p>
        <h3 class="font-weight-medium subtitulo">Tipo de documento</h3>
        <p>{{ this.user.datos.tipo_documento }}</p>
        <h3 class="font-weight-medium subtitulo">Número de documento</h3>
        <p>{{ this.user.datos.numero_documento }}</p>
        <h3 class="font-weight-medium subtitulo">Teléfono</h3>
        <p>{{ this.user.datos.telefono }}</p>
        <h3 class="font-weight-medium subtitulo">Fecha de nacimiento</h3>
        <p>{{ this.user.datos.fecha_nacimiento }}</p>
        <h3 class="font-weight-medium subtitulo">Correo</h3>
        <p>{{ this.user.datos.correo }}</p>
        <h3 class="font-weight-medium subtitulo">Sexo</h3>
        <p>{{ this.user.datos.sexo }}</p>

        <v-row align="center" justify="space-around">
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            @click="abrirDialogoModificarPerfilMedico()"
          >
            Modificar
          </v-btn>
        </v-row>
      </div>
    </div>

    <v-dialog v-model="dialogoModificarPerfilMedico" high="200px" width="650px">
      <v-card outlined>
        <v-card-title class="justify-center">
          <h3>Modificar Perfil</h3>
        </v-card-title>

        <v-stepper v-model="e1">
          <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">
              Información del usuario
            </v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step step="2">
              Información de inicio de sesión
            </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <div class="container-user">
                <v-text-field
                  v-model="user.datos.nombre"
                  label="Escribe tu nombre"
                  @input="$v.user.datos.nombre.$touch()"
                  @blur="$v.user.datos.nombre.$touch()"
                  :error-messages="errorNombre"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos.apellido_paterno"
                  label="Escribe tu Apellido Paterno"
                  @input="$v.user.datos.apellido_paterno.$touch()"
                  @blur="$v.user.datos.apellido_paterno.$touch()"
                  :error-messages="errorApellidoP"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos.apellido_materno"
                  label="Escribe tu Apellido Materno"
                  @input="$v.user.datos.apellido_materno.$touch()"
                  @blur="$v.user.datos.apellido_materno.$touch()"
                  :error-messages="errorApellidoM"
                ></v-text-field>

                <v-select
                  v-model="user.datos.tipo_documento"
                  :items="itemsTD"
                  :item-text="itemsTD.text"
                  :item-value="itemsTD.value"
                  label="Selecciona un tipo de documento"
                  @input="$v.user.datos.tipo_documento.$touch()"
                  @blur="$v.user.datos.tipo_documento.$touch()"
                  :error-messages="errorTipoDocumento"
                ></v-select>

                <v-text-field
                  v-model="user.datos.numero_documento"
                  label="Ingresa tu número de documento"
                  @input="$v.user.datos.numero_documento.$touch()"
                  @blur="$v.user.datos.numero_documento.$touch()"
                  :error-messages="errorNumeroDocumento"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos.telefono"
                  label="Ingresa tu número de celular"
                  @input="$v.user.datos.telefono.$touch()"
                  @blur="$v.user.datos.telefono.$touch()"
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
                      v-model="user.datos.fecha_nacimiento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :error-messages="errorFechaNacimiento"
                      @input="$v.user.datos.fecha_nacimiento.$touch()"
                      @blur="$v.user.datos.fecha_nacimiento.$touch()"
                      :required="true"
                      color="#009900"
                      outlined
                      label="Fecha de tu nacimiento"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="user.datos.fecha_nacimiento"
                    @input="menu1 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>

                <v-text-field
                  v-model="user.datos.correo"
                  label="Ingresa tu correo electronico"
                  :error-messages="errorCorreo"
                  @input="$v.user.datos.correo.$touch()"
                  @blur="$v.user.datos.correo.$touch()"
                  :required="true"
                ></v-text-field>

                <v-select
                  v-model="user.datos.sexo"
                  :items="itemsS"
                  :item-text="itemsS.text"
                  :item-value="itemsS.value"
                  label="Selecciona tu sexo"
                  @input="$v.user.datos.sexo.$touch()"
                  @blur="$v.user.datos.sexo.$touch()"
                  :error-messages="errorSexo"
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
          
                <v-btn 
                  color="error"
                  @click="dialogoModificarPerfilMedico = false"
                >
                  Cancelar
                </v-btn>

                <v-btn 
                  color="primary" 
                  @click="e1 = 2">
                  Continuar
                </v-btn>
              </div>
            </v-stepper-content>

            <v-stepper-content step="2">
              <div class="container-user">
                <v-text-field
                  v-model="user.datos_basicos.lugar_trabajo"
                  label="Lugar de trabajo"
                  @input="$v.user.datos_basicos.lugar_trabajo.$touch()"
                  @blur="$v.user.datos_basicos.lugar_trabajo.$touch()"
                  :error-messages="errorLugarTrabajo"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.numero_colegiatura"
                  label="Número de colegiatura"
                  @input="$v.user.datos_basicos.numero_colegiatura.$touch()"
                  @blur="$v.user.datos_basicos.numero_colegiatura.$touch()"
                  :error-messages="errorNumeroColegiatura"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.idiomas"
                  label="Idiomas que manejas"
                  @input="$v.user.datos_basicos.idiomas.$touch()"
                  @blur="$v.user.datos_basicos.idiomas.$touch()"
                  :error-messages="errorIdiomas"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.universidad"
                  label="Universidad en donde estudiaste"
                  @input="$v.user.datos_basicos.universidad.$touch()"
                  @blur="$v.user.datos_basicos.universidad.$touch()"
                  :error-messages="errorUniversidad"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.experiencia"
                  label="Describe la experiencia con la que cuentas"
                  @input="$v.user.datos_basicos.experiencia.$touch()"
                  @blur="$v.user.datos_basicos.experiencia.$touch()"
                  :error-messages="errorExperiencia"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.cargos"
                  label="Escribe los cargos que haz ejercido"
                  @input="$v.user.datos_basicos.cargos.$touch()"
                  @blur="$v.user.datos_basicos.cargos.$touch()"
                  :error-messages="errorCargos"
                ></v-text-field>
              </div>

              <v-btn color="error" @click="e1 = 1">
                Regresar
              </v-btn>

              <v-btn color="success" @click="modificarPerfilMedico()">
                Modificar datos
              </v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <v-dialog width="450px" v-model="cargaModificarPerfilMedico" persistent>
          <v-card height="300px">
            <v-card-title class="justify-center"
              >Modificando datos</v-card-title
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

        <v-divider> </v-divider>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { required, minLength, email, numeric } from "vuelidate/lib/validators";

export default {
  name: "ModificarPerfilMedico",
  props: ["user"],
  data() {
    return {
      // usuario: {
      //   datos: {
      //     nombre: "",
      //     apellido_paterno: "",
      //     apellido_materno: "",
      //     tipo_documento: "",
      //     numero_documento: "",
      //     telefono: "",
      //     fecha_nacimiento: "",
      //     correo: "",
      //     sexo: "",
      //     foto: "",
      //   },
      //   datos_basicos: {
      //     lugar_trabajo: "",
      //     numero_colegiatura: "",
      //     idiomas: "",
      //     universidad: "",
      //     experiencia: "",
      //     cargos: "",
      //   },
      // },
      e1: 1,
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        acceptedFiles: ".jpg, .png, .jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage: "Seleccione su foto de perfi o arrástrelo aquí",
      },

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
      userAux: [],
      datemenuR: false,
      dialogoModificarPerfilMedico: false,
      cargaModificarPerfilMedico: false,
    };
  },

  components: {
    vueDropzone: vue2Dropzone,
  },

  methods: {
    mounteddropzone() {
      var file = {
        size: 123,
        name: "Foto de perfil del usuario",
        type: "image/jpg",
      };
      this.$refs.myVueDropzone.manuallyAddFile(
        file,
        this.user.datos.foto,
        null,
        null,
        true
      );
    },

    afterRemoved(file, error, xhr) {
      this.user.dataURL = "";
    },
    afterSuccess(file, response) {
      this.userAux.push(file);
      this.user.datos.foto = file.dataURL.split(",")[1];
    },
    async abrirDialogoModificarPerfilMedico() {
      // this.user = await this.loadUsuarioMedico(id);
      // console.log("usuario consultado");
      this.user;
      console.log(this.user);
      this.dialogoModificarPerfilMedico = true;
    },

    // async loadUsuarioMedico(id) {
    //   var user = {};
    //   await axios
    //     .get("/MiUsuario/usuarioIdMedico?id=" + id)
    //     .then((res) => {
    //       var fecha = res.data.datos.usuario.fecha_nacimiento.split("T");
    //       res.data.datos.usuario.fecha_nacimiento = fecha[0];
    //       user = res.data;
    //     })

    //     .catch((err) => console.log(err));
    //   return user;
    // },

    async modificarPerfilMedico() {
      console.log(this.user);
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {

      console.log("no hay errores");
      this.cargaModificarPerfilMedico = true;
      await axios
        .put("/MiUsuario/ModificarPerfilMedico", this.user)
        .then((res) => {
          this.user.datos.foto = res.data.datos.foto;
          console.log(res.data);
          this.cargaModificarPerfilMedico = false;
          this.dialogoModificarPerfilMedico = false;
        })

        .catch((err) => console.log(err));
      console.log("ya esta modificado");
    },
  },

  computed: {
    errorNombre() {
      const errors = [];
      if (!this.$v.user.datos.nombre.$dirty) return errors;
      !this.$v.user.datos.nombre.required &&
        errors.push("Debe ingresar el nombre del usuario");
      !this.$v.user.datos.nombre.minLength &&
        errors.push("El nombre del usuario debe poseer al menos 2 caracteres");

      return errors;
    },

    errorApellidoP() {
      const errors = [];
      if (!this.$v.user.datos.apellido_paterno.$dirty) return errors;
      !this.$v.user.datos.apellido_paterno.required &&
        errors.push("Debe ingresar el apellido paterno del usuario paciente");
      !this.$v.user.datos.apellido_paterno.minLength &&
        errors.push(
          "El apellido paterno del usuario debe poseer al menos 2 caracteres"
        );

      return errors;
    },

    errorApellidoM() {
      const errors = [];
      if (!this.$v.user.datos.apellido_materno.$dirty) return errors;
      !this.$v.user.datos.apellido_materno.required &&
        errors.push("Debe ingresar el apellido materno del usuario paciente");
      !this.$v.user.datos.apellido_materno.minLength &&
        errors.push(
          "El apellido materno del usuario debe poseer al menos 2 caracteres"
        );

      return errors;
    },

    errorTipoDocumento() {
      const errors = [];
      if (!this.$v.user.datos.tipo_documento.$dirty) return errors;
      !this.$v.user.datos.tipo_documento.required &&
        errors.push("Debe ingresar el tipo de documento del usuario paciente");
      return errors;
    },

    errorNumeroDocumento() {
      const errors = [];
      if (!this.$v.user.datos.numero_documento.$dirty) return errors;
      !this.$v.user.datos.apellido_materno.required &&
        errors.push(
          "Debe ingresar el numero de documento del usuario paciente"
        );
      !this.$v.user.datos.apellido_materno.minLength &&
        errors.push("El numero de documento debe poseer 8 caracteres");

      return errors;
    },

    errorTelefono() {
      const errors = [];
      if (!this.$v.user.datos.telefono.$dirty) return errors;
      !this.$v.user.datos.telefono.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.user.datos.telefono.numeric &&
        errors.push("Ingrese solo numeros válidos");
      return errors;
    },

    errorFechaNacimiento() {
      const errors = [];
      if (!this.$v.user.datos.fecha_nacimiento.$dirty) return errors;
      !this.$v.user.datos.fecha_nacimiento.required &&
        errors.push("El campo no puede estar en blanco");
      return errors;
    },

    errorCorreo() {
      const errors = [];
      if (!this.$v.user.datos.correo.$dirty) {
        return errors;
      }
      !this.$v.user.datos.correo.email &&
        errors.push("Ingrese una dirección de correo válida");
      !this.$v.user.datos.correo.required &&
        errors.push("El campo de correo no puede estar en blanco");
      return errors;
    },

    errorSexo() {
      const errors = [];
      if (!this.$v.user.datos.sexo.$dirty) {
        return errors;
      }
      !this.$v.user.datos.sexo.required &&
        errors.push("El campo no puede estar en blanco");
      return errors;
    },

    errorLugarTrabajo() {
      const errors = [];
      if (!this.$v.user.datos_basicos.lugar_trabajo.$dirty) return errors;
      !this.$v.user.datos_basicos.lugar_trabajo.required &&
        errors.push("Debe ingresar el campo requerido");
      return errors;
    },

    errorNumeroColegiatura() {
      const errors = [];
      if (!this.$v.user.datos_basicos.numero_colegiatura.$dirty) return errors;
      !this.$v.user.datos_basicos.numero_colegiatura.required &&
        errors.push("Debe ingresar el campo requerido");
      return errors;
    },

    errorIdiomas() {
      const errors = [];
      if (!this.$v.user.datos_basicos.idiomas.$dirty) return errors;
      !this.$v.user.datos_basicos.idiomas.required &&
        errors.push("Debe ingresar el campo requerido");
      return errors;
    },

    errorUniversidad() {
      const errors = [];
      if (!this.$v.user.datos_basicos.universidad.$dirty) return errors;
      !this.$v.user.datos_basicos.universidad.required &&
        errors.push("Debe ingresar el campo requerido");
      return errors;
    },

    errorExperiencia() {
      const errors = [];
      if (!this.$v.user.datos_basicos.experiencia.$dirty) return errors;
      !this.$v.user.datos_basicos.experiencia.required &&
        errors.push("Debe ingresar el campo requerido");
      return errors;
    },

    errorCargos() {
      const errors = [];
      if (!this.$v.user.datos_basicos.cargos.$dirty) return errors;
      !this.$v.user.datos_basicos.cargos.required &&
        errors.push("Debe ingresar el campo requerido");
      // !this.$v.usuario.datos.nombre.minLength &&
      //   errors.push("El nombre del usuario debe poseer al menos 7 caracteres");
      return errors;
    },
  },

  validations() {
    return {
      user: {
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
      },

      userAux: {
        required,
      },
    };
  },
};
</script>
<style lang="scss">
// .home {
//   margin: 1%;
//   display: flex;
//   justify-content: space-around;
// }
// .home {
//   margin: 1%;
//   display: flex;
//   justify-content: space-around;
// }
.card-modificarPerfil {
  // max-width: 100%;
  // justify-content: space-around;
  // // border-radius: 20px !important;

  padding: 3%;
  width: 600px;
  border-radius: 20px;
  height: 100%;
}
.image {
  margin-left: auto;
  margin-right: auto;
  display: block;
}
.info-paciente {
  h2 {
    font-size: 24px;
  }
  p {
    margin-bottom: 1%;
  }

  h3 {
    font-size: 15px;
  }
}

.titulo {
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.subtitulo {
  font-size: 1.2rem;
  color: $blue;
}
.button-little {
  background: $sky-light;
  color: $blue;
  border-radius: 6px;
  height: 5vh;
  padding: 1.5%;
  text-align: center;
}
.perfil {
  width: 25%;
  height: 25%;
  border-radius: 20px;
}
.card-modificarPerfil {
  max-width: 80%;
  border-radius: 20px !important;
}

.info-paciente {
  h2 {
    font-size: 24px;
  }
  p {
    margin-bottom: 1%;
  }
}
</style>
