<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Usuarios </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaUsuario"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>

            <v-spacer></v-spacer>

            <v-btn
              color="success"
              elevation="2"
              outlined
              dark
              class="mb-2"
              @click="dialogoregistro = true"
            >
              <v-icon left>mdi-account-multiple-plus-outline</v-icon>
              <span>Registrar nuevo Usuario</span>
            </v-btn>
          </v-toolbar>
        </template>
        <!--Aqui van los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn
              color="success"
              small
              dark
              @click="abrirModificarDetalle(item.id)"
            >
              <v-icon left> mdi-file-eye </v-icon>
              <span>Modificar</span>
            </v-btn>

            <v-btn
              color="info"
              small
              dark
              @click="abrirDialogoDetalle(item.id)"
            >
              <v-icon left> info </v-icon>
              <span>Ver detalles</span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Dialogo de Modificacion-->
      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarUsuario
          v-if="dialogoactualizacion"
          :usuario="usuario"
          @close-dialog-update="closeDialogModificar()"
        >
        </ModificarUsuario>
      </v-dialog>
      <!--Dialogo de Detalle-->
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <VisualizarUsuario
          v-if="dialogodetalle"
          :usuario="usuario"
          @close-dialog-detail="closeDialogDetalle()"
        >
        </VisualizarUsuario>
      </v-dialog>

      <v-dialog v-model="dialogoregistro" idth="500">
        <v-card class="mx-auto" max-width="600" outlined>
          <v-card-title class="text-h5 grey lighten-2">
            Seleccion de rol
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

      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog max-width="800" v-model="dialogUsuarioRegistrar">
        <component
          :is="miRol.value"
          @cerrar-modal-registro-usuario="cerrarmodalregistrousuario"
        >
        </component>
      </v-dialog>
    </v-card>
  </div>
</template>

<script>
import RegistrarMedico from "@/components/GestionarUsuario/RegistrarMedico.vue";
import RegistrarPaciente from "@/components/GestionarUsuario/RegistrarPaciente.vue";
import ModificarUsuario from "@/components/GestionarUsuario/ModificarUsuario.vue";
import ModificarMedico from "@/components/GestionarUsuario/ModificarMedico.vue";
import VisualizarUsuario from "@/components/GestionarUsuario/VisualizarUsuario.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarUsuario",
  components: {
    RegistrarMedico,
    ModificarUsuario,
    VisualizarUsuario,
    RegistrarPaciente,
  },
  data() {
    return {
      search: "",
      usuario: {},
      usuarioRM: {},
      usuarioRP: {},
      usuarioA: {},
      usuarioV: {},
      headers: [
        {
          text: "Rol ",
          align: "start",
          sortable: false,
          value: "urol.nombre",
        },
        { text: "Nombre y Apellidos", value: "datos.nombresyapellidos" },
        { text: "Tipo Doc", value: "datos.tipo_documento" },
        { text: "N° Doc", value: "datos.numero_documento" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      misItems: [
        {
          text: "Medico",
          value: "RegistrarMedico",
        },
        {
          text: "Paciente",
          value: "RegistrarPaciente",
        },
      ],
      miRol: {
        text: "",
        value: "",
      },


      dialogoregistro: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      dialogUsuarioRegistrar: false,
    };
  },
  async created() {
    this.obtenerUsuarios();
  },
  methods: {
    ...mapMutations(["setListUsuarios"]),

    rolSelecionado() {
      //console.log(this.miRol.value)
      this.dialogoregistro = false;
      this.dialogUsuarioRegistrar = true;
    },

    cerrarmodalregistrousuario() {
      this.dialogUsuarioRegistrar = false;
    },

    //cerrar dialogo
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
    estadoActual(array) {
      if (array === "listo") {
        return false;
      } else {
        return true;
      }
    },
    async abrirDialogo(id) {
      this.Usuario = await this.loadUsuario(id);
      this.dialogoRegistrar = !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      this.Usuario = await this.loadUsuario(id);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.Usuario = await this.loadUsuario(id);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    //

    ///////////////////Consumo de  apis
    async obtenerUsuarios() {
      await axios
        .get("/MiUsuario/all")
        .then((x) => {
          this.setListUsuarios(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },

    async loadUsuario(id) {
      var user = {};
      await axios
        .get("/Usuario/Id?id=" + id)
        .then((res) => {
          console.log(res);
          user = res.data;
          console.log(user);
        })
        .catch((err) => console.log(err));
      console.log(user);
      return user;
    },
  },
  //

  computed: {
    ...mapState(["listaUsuario"]),
  },
};
</script>

<style></style>
