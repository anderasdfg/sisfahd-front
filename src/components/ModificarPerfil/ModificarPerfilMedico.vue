<template>
  <v-card elevation="3" class="card-modificarPerfil">
    
    <div class="top-card" v-if="this.user">
      <h1 class="titulo">Modificar Perfil Medico</h1>
      <div class="image">
        <img
          :src="
            this.user.usuario.datos.foto
              
          "
          alt="Perfil"
          class="image"
        />
      </div>

      <div class="info-paciente">
        <h3 class="font-weight-medium subtitulo">Nombre</h3>
        <p>{{ this.user.usuario.datos.nombre }}</p>
        <h3 class="font-weight-medium subtitulo">Apellido paterno</h3>
        <p>{{ this.user.usuario.datos.apellido_paterno }}</p>
        <h3 class="font-weight-medium subtitulo">Apellido materno</h3>
        <p>{{ this.user.usuario.datos.apellido_materno }}</p>
        <h3 class="font-weight-medium subtitulo">Tipo de documento</h3>
        <p>{{ this.user.usuario.datos.tipo_documento }}</p>
        <h3 class="font-weight-medium subtitulo">Numero de documento</h3>
        <p>{{ this.user.usuario.datos.numero_documento }}</p>
        <h3 class="font-weight-medium subtitulo">Telefono</h3>
        <p>{{ this.user.usuario.datos.telefono }}</p>
        <h3 class="font-weight-medium subtitulo">Fecha de nacimiento</h3>
        <p>{{ this.user.usuario.datos.fecha_nacimiento }}</p>
        <h3 class="font-weight-medium subtitulo">Correo</h3>
        <p>{{ this.user.usuario.datos.correo }}</p>
        <h3 class="font-weight-medium subtitulo">Sexo</h3>
        <p>{{ this.user.usuario.datos.sexo }}</p>

        <v-row align="center" justify="space-around">
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            @click="abrirDialogoModificarPerfilMedico(user.id)"
          >
            Modificar
          </v-btn>
        </v-row>
      </div>
    </div> 

    <v-dialog v-model="dialogoModificarPerfilMedico"  high="200px" width="650px">
      <v-card outlined>
        <v-card-title class="justify-center">
          <h3>Modificar Perfil</h3>
        </v-card-title>

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
                  v-model="user.usuario.datos.nombre"
                  label="Escribe tu nombre"
                ></v-text-field>

                <v-text-field
                  v-model="user.usuario.datos.apellido_paterno"
                  label="Escribe tu Apellido Paterno"
                ></v-text-field>

                <v-text-field
                  v-model="user.usuario.datos.apellido_materno"
                  label="Escribe tu Apellido Materno"
                ></v-text-field>

                <v-select
                  v-model="user.usuario.datos.tipo_documento"
                  :items="itemsTD"
                  :item-text="itemsTD.text"
                  :item-value="itemsTD.value"
                  label="Selecciona un tipo de documento"
                ></v-select>

                <v-text-field
                  v-model="user.usuario.datos.numero_documento"
                  label="Ingresa tu numero de documento"
                ></v-text-field>

                <v-text-field
                  v-model="user.usuario.datos.telefono"
                  label="Ingresa tu numero de celular"
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
                      v-model="user.usuario.datos.fecha_nacimiento"
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
                    v-model="user.usuario.datos.fecha_nacimiento"
                    @input="menu1 = false"
                    locale="es-es"
                  ></v-date-picker>
                </v-menu>

                <v-text-field
                  v-model="user.usuario.datos.correo"
                  label="Ingresa tu correo electronico"
                ></v-text-field>

                <v-select
                  v-model="user.usuario.datos.sexo"
                  :items="itemsS"
                  :item-text="itemsS.text"
                  :item-value="itemsS.value"
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

                <v-btn
                  color="error"
                  @click="dialogoModificarPerfilMedico = false"
                >
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
                  v-model="user.datos_basicos.lugar_trabajo"
                  label="Lugar de trabajo"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.numero_colegiatura"
                  label="Numero de colegiatura"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.idiomas"
                  label="Idiomas que manejas"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.universidad"
                  label="Universidad en donde estudiaste"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.experiencia"
                  label="Describe la experiencia con la que cuentas"
                ></v-text-field>

                <v-text-field
                  v-model="user.datos_basicos.cargos"
                  label="Escribe los cargos que haz ejercido"
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

        <v-dialog
          width="450px"
          v-model="cargaModificarPerfilMedico"
          persistent
        >
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
        this.user.usuario.datos.foto,
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
      this.user.usuario.datos.foto = file.dataURL.split(",")[1];
    },
    async abrirDialogoModificarPerfilMedico(id) {
      // this.user = await this.loadUsuarioMedico(id);
      // console.log("usuario consultado");
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
          

          
          console.log(res.data);
          this.$emit("close-dialog-modificaru");
          this.cargaModificarPerfilMedico = false;
        })
        .catch((err) => console.log(err));
    },
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
