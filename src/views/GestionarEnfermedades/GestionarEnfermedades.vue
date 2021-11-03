<template>
  <div>
    <v-card class="card" style="margin:80px auto 0;width:80%;">
      <v-card-title> Gestionar Enfermedades </v-card-title>
      <v-data-table
        :headers="headers"
        :items="listaEnfermedades"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-text-field
              item-text="codigo_cie"
              item-value="codigo_cie"
              v-model="codigo_cie"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              @input="obtenerEnfermedades(codigo_cie)"
            ></v-text-field>
            <v-col cols="12" sm="6" md="4">
              <v-toolbar flat>
                <v-btn
                  class="mr-4"
                  color="white darken-1"
                  @click="abrirDialogo"
                >
                  <span>Registrar nueva enfermedad</span>
                </v-btn>
              </v-toolbar>
            </v-col>

            <v-spacer></v-spacer>
          </v-toolbar>
        </template>

        <!--Aqui va todo los botones -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-row align="center" justify="space-around">
            <div class="in-flex">
              <v-btn
                x-small
                color="info"
                dark
                @click="abrirDialogoDetalle(item.id)"
              >
                <v-icon left> info </v-icon>
              </v-btn>
            </div>
            <div class="in-flex">
              <v-btn
                x-small
                color="success"
                dark
                @click="abrirModificarDetalle(item.id)"
              >
                <v-icon left> mdi-file-eye </v-icon>
              </v-btn>
            </div>

            <div class="in-flex">
              <v-btn
                x-small
                color="error"
                dark
                @click="abrirEliminarDetalle(item.id)"
              >
                <v-icon left> mdi-close-outline </v-icon>
              </v-btn>
            </div>
          </v-row>
        </template>
      </v-data-table>
      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
        <RegistrarEnfermedades
          v-if="dialogoRegistrar"
          :Enfermedad="Enfermedad"
          @close-dialog-Registrar="closeDialogRegistrar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
        >
        </RegistrarEnfermedades>
      </v-dialog>

      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarEnfermedades
          v-if="dialogoactualizacion"
          :Enfermedad="Enfermedad"
          @close-dialog-Modificar="closeDialogModificar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
        >
        </ModificarEnfermedades>
      </v-dialog>

      <v-dialog persistent v-model="dialogoeliminar" max-width="880px">
        <EliminarEnfermedades
          v-if="dialogoeliminar"
          :Enfermedad="Enfermedad"
          @close-dialog-eliminar="closeDialogEliminar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
        >
        </EliminarEnfermedades>
      </v-dialog>
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <VisualizarEnfermedades
          v-if="dialogodetalle"
          :Enfermedad="Enfermedad"
          @close-dialog-visualizar="closeDialogVisualizar()"
        >
        </VisualizarEnfermedades>
      </v-dialog>
    </v-card>
  </div>
</template>
<script>
import RegistrarEnfermedades from "@/components/ComponenteGestionarEnfermedades/RegistrarEnfermedades.vue";
import ModificarEnfermedades from "@/components/ComponenteGestionarEnfermedades/ModificarEnfermedades.vue";
import EliminarEnfermedades from "@/components/ComponenteGestionarEnfermedades/EliminarEnfermedades.vue";
import VisualizarEnfermedades from "@/components/ComponenteGestionarEnfermedades/VisualizarEnfermedades.vue";
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "GestionarEnfermedades",
  components: {
    RegistrarEnfermedades,
    ModificarEnfermedades,
    EliminarEnfermedades,
    VisualizarEnfermedades,
  },
  data() {
    return {
      codigo_cie: "",
      search: "",
      Enfermedad: {},
      a: "",
      headers: [
        {
          text: "Codigo_CIE",
          align: "start",
          sortable: false,
          value: "codigo_cie",
        },
        { text: "Descripcion", value: "descripcion" },

        { text: "", value: "actions", sortable: false },
      ],
      dialogoRegistrar: false,
      dialogoactualizacion: false,
      dialogodetalle: false,
      dialogoeliminar: false,
    };
  },
  async created() {
    this.obtenerEnfermedades();
  },
  methods: {
    ...mapMutations(["setListaEnfermedades"]),
    //cerrar dialogo
    closeDialogRegistrar() {
      this.dialogoRegistrar = false;
    },
    closeDialogVisualizar() {
      this.dialogodetalle = false;
    },
    closeDialogModificar() {
      this.dialogoactualizacion = false;
    },
    closeDialogEliminar() {
      this.dialogoeliminar = false;
    },
    estadoActual(array) {
      if (array === "listo") {
        return false;
      } else {
        return true;
      }
    },
    async abrirDialogo(codigo_cie) {
      this.dialogoRegistrar = !this.dialogoRegistrar;
    },
    async abrirDialogoDetalle(id) {
      console.log("CODIGO CIE" + this.id);
      this.Enfermedad = await this.loadEnfermedad(id);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirModificarDetalle(id) {
      console.log("CODIGO CIE" + this.id);
      this.Enfermedad = await this.loadEnfermedad(id);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    async abrirEliminarDetalle(id) {
      console.log("CODIGO CIE" + this.id);
      this.Enfermedad = await this.loadEnfermedad(id);
      this.dialogoeliminar = !this.dialogoeliminar;
    },
    //obtener todas las enfermedades
    async obtenerEnfermedades(codigo_cie) {
      if (this.codigo_cie == "" || this.codigo_cie == null) {
        await axios
          .get("/Enfermedades/all")
          .then((x) => {
            let listaE = [];
            this.listaE = x.data;

            this.setListaEnfermedades(this.listaE);
          })
          .catch((err) => console.log(err));
      }
      if (
        this.codigo_cie.charAt(1) == "1" ||
        this.codigo_cie.charAt(1) == "2" ||
        this.codigo_cie.charAt(1) == "3" ||
        this.codigo_cie.charAt(1) == "4" ||
        this.codigo_cie.charAt(1) == "5" ||
        this.codigo_cie.charAt(1) == "6" ||
        this.codigo_cie.charAt(1) == "7" ||
        this.codigo_cie.charAt(1) == "8" ||
        this.codigo_cie.charAt(1) == "9" ||
        this.codigo_cie.charAt(1) == "0"
      ) {
        //Busca por codigo
        await axios
          .get(
            "Enfermedades/obtenerporcodigo?codigo=" +
              this.codigo_cie.toUpperCase()
          )
          .then((x) => {
            console.log(this.codigo_cie);
            let listaE = [];
            this.listaE = x.data;

            console.log("Funciona Codigo");
            console.log(this.listaE);
            this.setListaEnfermedades(this.listaE);
          })
          .catch((err) => console.log(err));
      } else {
        //Busca por descripcion
        await axios
          .get(
            "Enfermedades/obtenerpordescripcion?descripcion=" +
              this.codigo_cie.toUpperCase()
          )
          .then((x) => {
            console.log(this.codigo_cie);
            let listaE = [];
            this.listaE = x.data;

            console.log("Funciona Descripcion");
            this.setListaEnfermedades(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      }

      //
    },

    async loadEnfermedad(id) {
      var e = {};
      await axios
        .get("Enfermedades/Id?id=" + id)
        .then((res) => {
          e = res.data;
          console.log(e);
        })
        .catch((err) => console.log(err));

      return e;
    },
  },

  computed: {
    ...mapState(["listaEnfermedades"]),
  },
};
</script>
<style scoped>
.card {
  margin: 10px;
}
* {
  padding: 0px;
  margin: 0px;
}

.home {
  display: flex;
  flex-wrap: wrap;
}
.in-flex {
  flex: 1;
  min-width: 2px;
}
.in-flex :first-child {
  flex: 2;
  padding: 0px;
  margin: 8px;
}
</style>
