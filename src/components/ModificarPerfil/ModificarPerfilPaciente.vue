<template>
  <v-card elevation="3" class="card-modificarPerfil">
    <div class="top-card" v-if="this.user">
      <h1 class="titulo">Modificar Perfil Paciente</h1>
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
        <h3 class="font-weight-medium subtitulo">Numero de documento</h3>
        <p>{{ this.user.datos.numero_documento }}</p>
        <h3 class="font-weight-medium subtitulo">Telefono</h3>
        <p>{{ this.user.datos.telefono }}</p>
        <h3 class="font-weight-medium subtitulo">Fecha de nacimiento</h3>
        <p>{{ this.user.datos.fecha_nacimiento }}</p>
        <h3 class="font-weight-medium subtitulo">Correo</h3>
        <p>{{ this.user.datos.correo }}</p>
        <h3 class="font-weight-medium subtitulo">Sexo</h3>
        <p>{{ this.user.datos.sexo }}</p>

        <!-- <button class="button-little">Modificar perfil</button> -->

        <v-row align="center" justify="space-around">
          <v-btn
            class="ma-2"
            outlined
            color="indigo"
            @click="abrirDialogoModificarPerfilPaciente()"
          >
            Modificar
          </v-btn>
        </v-row>
      </div>
    </div>
<v-dialog v-model="dialogoModificarPerfiPaciente" high="200" width="400px">
        <v-card outlined>
          <v-card-title class="text-h5 grey lighten-2">
            <h3>Seleccion de rol</h3>
          </v-card-title>

          <v-card-text>
            Seleccione el rol del usuario a registrar

            <v-combobox
              solo
              :items="misItems"
              v-model="miRol"
              label="Rol del usuario"
            >
            </v-combobox>
          </v-card-text>

          <v-divider> </v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text dark @click="dialogoregistro = false">
              Cerrar
            </v-btn>

            <v-btn color="success" dark class="mb-2" @click="rolSelecionado">
              <span>Registrar nuevo Usuario</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
     
  </v-card>
</template>

<script>
export default {
  name: "ModificarPerfilPaciente",
  props: ["user"],
  data() {
    return {};
  },

  methods: {
    async modificarPerfilPaciente() {},
  },
};
</script>
<style lang="scss">
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
</style>
