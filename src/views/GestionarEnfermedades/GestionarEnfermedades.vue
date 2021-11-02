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
              small
              color="info"
              dark
              @click="abrirDialogoDetalle(item.codigo_cie)"
            >
              <v-icon center> info </v-icon>
            </v-btn>
            </div> 
            <div  class="in-flex">
            <v-btn
              small
              color="success"
              dark
              @click="abrirModificarDetalle(item.codigo_cie)"
            >
              <v-icon center> mdi-file-eye </v-icon>
            </v-btn>
            </div>  

            <div class="in-flex">
            <v-btn
              small
              color="error"
              dark
              @click="abrirDialogoEliminar(item.codigo_cie)"
            >
              <v-icon center> mdi-close-outline </v-icon>
            </v-btn>
            </div>
          </v-row>
        </template>
        
      </v-data-table>
      <!--Aqui llamo a los componentes de vuetify-->
      <v-dialog persistent v-model="dialogoRegistrar" max-width="880px">
        <RegistrarEnfermedades
          v-if="dialogoRegistrar"
          :RegistrarEnfermedad="RegistrarEnfermedad"
          @close-dialog-Registrar="closeDialogRegistrar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
        >
        </RegistrarEnfermedades>
      </v-dialog>

      <v-dialog persistent v-model="dialogoactualizacion" max-width="880px">
        <ModificarEnfermedades
          v-if="dialogoactualizacion"
          :ModificoEnfermedad="ModificarEnfermedad"
          @close-dialog-Modificar="closeDialogModificar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
        >
        </ModificarEnfermedades>
      </v-dialog>

      <v-dialog persistent v-model="dialogoeliminar" max-width="880px">
        <EliminarEnfermedades
          v-if="dialogoeliminar"
          :EliminarEnfermedad="EliminarEnfermedad"
          @close-dialog-eliminar="closeDialogEliminar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
        >
        </EliminarEnfermedades>
      </v-dialog>
      <v-dialog persistent v-model="dialogodetalle" max-width="880px">
        <VisualizarEnfermedades
          v-if="dialogodetalle"
          :VisualizarEnfermedad="VisualizarEnfermedad"
          @close-dialog-visualizar="closeDialogVisualizar()"
          @emit-obtener-enfermedades="obtenerEnfermedades(codigo_cie)"
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
      console.log("muestra la listaE");
      this.Enfermedad = await this.loadEnfermedad(codigo_cie);
      this.dialogodetalle = !this.dialogodetalle;
    },
    async abrirModificarDetalle(codigo_cie) {
      this.Enfermedad = await this.loadEnfermedad(codigo_cie);
      this.dialogoactualizacion = !this.dialogoactualizacion;
    },
    async abrirEliminarDetalle(codigo_cie) {
      this.Enfermedad = await this.loadEnfermedad(codigo_cie);
      this.dialogoeliminar = !this.dialogoeliminar;
    },
    //obtener todas las enfermedades
    async obtenerEnfermedades(codigo_cie) {
      if (codigo_cie == "" || codigo_cie == null) {
        await axios
          .get("/Enfermedades/all")
          .then((x) => {
            let listaE = [];
            this.listaE = x.data;
            console.log(this.listaE);
            this.setListaEnfermedades(this.listaE);
          })
          .catch((err) => console.log(err));
        
        
      }else{
        if (this.codigo_cie.length <=4) {
          await axios
            .get("Enfermedades/Filter?cie=" + this.codigo_cie.toUpperCase())
            .then((x) => {
              console.log(this.codigo_cie);
              let listaE = [];
              this.listaE = x.data;
              console.log(this.listaE);
              console.log("Funciona Codigo");
              this.setListaEnfermedades(this.listaE);
            })
            .catch((err) => console.log(err));
        } else {
          await axios
            .get(
              "Enfermedades/Filter?descripcion=" + this.codigo_cie.toUpperCase()
            )
            .then((x) => {
              console.log(this.codigo_cie);
              let listaE = [];
              this.listaE = x.data;
              console.log(this.listaE);
              console.log("Funciona Descripcion");
              this.setListaEnfermedades(this.listaE);
            })
            .catch((err) => console.log(err));}
      }
    },

    async loadEnfermedad(codigo_cie) {
      var examen = {};
      await axios
        .get("/Enfermedad/Id?id=" + codigo_cie)
        .then((res) => {
          console.log(res);
          examen = res.data;
        })
        .catch((err) => console.log(err));

      return examen;
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
*{
  padding: 0px;
  margin: 0px;  
}

.home{
  display: flex;
  flex-wrap: wrap;
}
.in-flex{
  flex: 1;
  min-width: 2px;
}
.in-flex :first-child{
flex: 2;
padding: 0px;
margin:  8px;
}
</style>
