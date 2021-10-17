<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Servicios Adicionales </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaServicio"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-toolbar flat>
                <v-btn
                  class="mr-4"
                  color="white darken-1"
                  @click="abrirDialogo"
                >
                  <span>Registrar Nuevo Servicio</span>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <v-btn color="success" dark @click="abrirModificarDetalle(item.id)">
              <v-icon center> mdi-file-eye </v-icon>
              <span></span>
            </v-btn>
            <v-btn
              v-if="estadoActual(item.id)"
              color="info"
              dark
              @click="abrirDialogoDetalle(item.id)"
            >
              <v-icon center> info </v-icon>
              <span></span>
            </v-btn>

            <v-btn
              v-if="estadoActual(item.id)"
              color="red"
              dark
              @click="abrirEliminarDetalle(item.id)"
            >
              <v-icon center> mdi-close-outline </v-icon>
              <span></span>
            </v-btn>
          </v-row>
        </template>
      </v-data-table>
      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
        <RegistrarServicio
          v-if="dialogoRegistrar"
          :Servicio="Servicio"
          @close-dialog-Registrar="closeDialogRegistrar()"
          @emit-obtener-Servicio="obtenerServicio()"
        >
        </RegistrarServicio>
      </v-dialog>

      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarServicio
          v-if="dialogoactualizacion"
          :Servicio3="Servicio3"
          @close-dialog-Modificar="closeDialogModificar()"
          @emit-obtener-Servicio="obtenerServicio()"
        >
        </ModificarServicio>
      </v-dialog>

      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <VisualizarServicio
          v-if="dialogodetalle"
          :Servicio2="Servicio2"
          @close-dialog-detalle="closeDialogDetalle()"
        >
        </VisualizarServicio>
      </v-dialog>
      <v-dialog persistent v-model="dialogoeliminar" max-width="880px">
        <EliminarServicio
          v-if="dialogoeliminar"
          :Servicio4="Servicio4"
          @close-dialog-eliminar="closeDialogEliminar()"
          @emit-obtener-Servicio="obtenerServicio()"
        >
        </EliminarServicio>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import RegistrarServicio from "@/components/GestionarServicio/RegistrarServicio.vue";
import ModificarServicio from "@/components/GestionarServicio/ModificarServicio.vue";
import VisualizarServicio from "@/components/GestionarServicio/VisualizarServicio.vue";
import EliminarServicio from "@/components/GestionarServicio/EliminarServicio.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarServicios",
  components: {
    RegistrarServicio,
    ModificarServicio,
    VisualizarServicio,
    EliminarServicio,
  },
  data() {
    return {
      search: "",
      Servicio: {},
      Servicio3: {},
      Servicio4: {},
      Servicio2: {},

      headers: [
        { text: "Título", align: "start", sortable: false, value: "titulo" },
        { text: "Descripción", value: "descripcion" },
        { text: "Monto", value: "monto" },

        { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogoeliminar: false,
      dialogodetalle: false,
    };
  },
  async created() {
    this.obtenerServicio();
  },
  methods: {
    ...mapMutations(["setListaServicio"]),
    //cerrar dialogo
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
    closeDialogDetalle() {
      this.dialogodetalle = false;
    },
    closeDialogEliminar(){
      this.dialogoeliminar =false
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
      this.dialogoRegistrar = !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      console.log(this.id);
      console.log("muestra la listaE");
      this.Servicio2 = await this.loadUsuarioServicio(id);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      this.Servicio3 = await this.loadUsuarioServicio(id);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    async abrirEliminarDetalle(id) {
      this.Servicio4 = await this.loadUsuarioServicio(id);
      this.dialogoeliminar = !this.dialogoeliminar;
    },
    //obtener todos los pagos del usuario
    async obtenerServicio() {
      await axios
        .get("/Adicionales/all")
        .then((x) => {
          let listaE = [];
          this.listaE = x.data;
          console.log(this.listaE);
          console.log(this.prueba);
          this.setListaServicio(this.listaE);
        })
        .catch((err) => console.log(err));
    },
    async loadUsuarioServicio(id) {
      var user = {};
      await axios
        .get("/Adicionales/Id?id=" + id)
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

  computed: {
    ...mapState(["listaServicio"]),
  },
};
</script>
<style scoped>
.card {
  margin: 20px;
}
</style>
