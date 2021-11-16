<template>
  <div class="div-medicacion">
    <div class="container-medicacion">
      <div class="div-title">
        <h3 class="tit-medicacion">Medicación previa</h3>
        <button class="btn-medicacion" @click="openMedicacionPrevia()">
          <v-icon dark> mdi-plus </v-icon>
        </button>
      </div>
      <div class="body-medicacion">
        <v-alert
          v-if="medicacion.medicacion_previa.length == 0"
          text
          outlined
          border="left"
          color="deep-orange"
          width="97%"
          class="ml-3"
          icon="info"
        >
          No se ha registrado ninguna medicación previa
        </v-alert>
        <v-list subheader two-line rounded>
          <v-list-item
            v-for="(item, i) in medicacion.medicacion_previa"
            :key="i"
          >
            <v-list-item-avatar>
              <v-avatar color="indigo">
                <v-icon dark>medication</v-icon>
              </v-avatar>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title
                v-for="tag in splitJoin(item.nombre)"
                :key="tag"
              >
                {{ tag }}
              </v-list-item-title>
              <v-list-item-subtitle
                v-text="'Dosis:' + item.dosis"
              ></v-list-item-subtitle>
              <v-list-item-subtitle
                v-text="'Observación:' + item.observaciones[0]"
              ></v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <button class="btn-remove" @click="eliminarMP(i)">
                <v-icon dark>remove_circle</v-icon>
              </button>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </div>
    </div>

    <v-dialog v-model="dialogMedicacionPrevia" persistent max-width="600px">
      <div class="content-modal-medicacion">
        <h3 class="titulo-prom">Medicación previa</h3>
        <div class="content-modal-items">
          <v-autocomplete
            filled
            rounded
            label="Medicamento"
            v-model="medicamento"
            :loading="loadingSearch"
            :search-input.sync="searchMedicamento"
            :items="listMedicamentos"
            item-text="descripcion"
            hide-no-data
            hide-selected
            return-object
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title> Busque el medicamento </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="text-h5 font-weight-light white--text"
              >
                {{ item.descripcion.charAt(0) }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.descripcion"
                ></v-list-item-title>
                <v-list-item-subtitle
                  v-text="item.generico"
                ></v-list-item-subtitle>
              </v-list-item-content>
            </template>
          </v-autocomplete>
          <v-text-field
            label="Dosis"
            filled
            rounded
            v-model="dosis"
          ></v-text-field>
          <v-text-field
            label="Observación"
            filled
            rounded
            v-model="observacion"
          ></v-text-field>
        </div>
        <div class="content-modal-medicacion-footer">
          <v-btn
            color="blue darken-1"
            text
            @click="dialogMedicacionPrevia = false"
            >Cerrar</v-btn
          >
          <v-btn color="blue darken-1" text @click="guardarMedicamento()"
            >Registrar</v-btn
          >
        </div>
      </div>
    </v-dialog>
    <div class="container-medicacion">
      <div class="div-title">
        <h3 class="tit-medicacion">Reacción adversa</h3>
      </div>
      <v-text-field
        label="Reacción adversa"
        filled
        rounded
        dense
        hide-details
        v-model="reaccion_adversa_item"
        v-on:keyup.enter="guardarReaccionAdversa"
      ></v-text-field>

      <div class="body-reaction">
        <div class="scrollable">
          <v-list subheader two-line rounded>
            <v-list-item
              v-for="(item, i) in medicacion.reaccion_adversa"
              :key="i"
            >
              <v-list-item-avatar>
                <v-avatar color="indigo">
                  <v-icon dark>bolt</v-icon>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-subtitle
                  >Reacción adversa {{ i + 1 }}</v-list-item-subtitle
                >
                <v-list-item-title>
                  {{ item }}
                </v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <button class="btn-remove" @click="eliminarRA(i)">
                  <v-icon dark>remove_circle</v-icon>
                </button>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </div>

        <v-alert
          v-if="medicacion.reaccion_adversa.length == 0"
          text
          outlined
          border="left"
          color="deep-orange"
          width="97%"
          class="ml-3"
          icon="info"
        >
          No se ha registrado ninguna reacción adversa
        </v-alert>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Medicacion",
  props: ["medicacion"],
  data() {
    return {
      dialogMedicacionPrevia: false,
      listMedicamentos: [],
      // medicacion: {
      //   medicacion_previa: [],
      //   reaccion_adversa: [],
      // },
      medicacion_previa_item: {
        codigo: "",
        nombre: "",
        dosis: "",
        observaciones: [],
      },
      medicamento: {
        id: "",
        descripcion: "",
        generico: "",
        familia: "",
        precio: "",
      },
      searchMedicamento: null,
      loadingSearch: false,
      dosis: "",
      observacion: "",
      observaciones: [],
      reaccion_adversa_item: "",
    };
  },
  methods: {
    splitJoin(theText) {
      return theText.split(";");
    },
    openMedicacionPrevia() {
      this.dialogMedicacionPrevia = true;
    },
    guardarMedicamento() {
      this.medicacion_previa_item.codigo = this.medicamento.id;
      this.medicacion_previa_item.nombre = this.medicamento.descripcion;
      this.medicacion_previa_item.dosis = this.dosis;
      this.medicacion_previa_item.observaciones.push(this.observacion);
      this.medicacion.medicacion_previa.push(this.medicacion_previa_item);
      this.$emit('getMedicacionPrevia', this.medicacion.medicacion_previa)
      this.cerrarDialogMedicacionPrevia();
    },
    guardarReaccionAdversa() {
      this.medicacion.reaccion_adversa.push(this.reaccion_adversa_item);
      this.$emit('getReaccionAdversa', this.medicacion.reaccion_adversa)
      this.reaccion_adversa_item = "";
    },
    eliminarMP(index) {
      this.medicacion.medicacion_previa.splice(index, 1);
    },
    eliminarRA(index) {
      this.medicacion.reaccion_adversa.splice(index, 1);
    },
    cerrarDialogMedicacionPrevia() {
      this.limpiarMedicacionPreviaModal();
      this.dialogMedicacionPrevia = false;
    },
    limpiarMedicacionPreviaModal() {
      this.medicamento = {
        id: "",
        descripcion: "",
        generico: "",
        precio: 0,
      };
      this.medicacion_previa_item = {
        codigo: "",
        nombre: "",
        dosis: "",
        observaciones: [],
      };
      this.observaciones = [];
      this.observacion = "";
      this.dosis = "";
    },
  },
  watch: {
    searchMedicamento(value) {
      if (value == null || value == "") {
        this.medicamento = {
          id: "",
          descripcion: "",
          generico: "",
          familia: "",
          precio: "",
        };
        return;
      }
      if (this.listMedicamentos.length > 0 && value != null) {
        if (value.length < 3) {
          return;
        }
      }
      if (this.loadingSearch) {
        return;
      }

      this.loadingSearch = true;

      axios
        .get(`/Medicinas/generico?generico=${value.toUpperCase()}`)
        .then((res) => {
          let medicamentosMap = res.data.map(function (res) {
            return {
              id: res.id,
              descripcion: res.descripcion,
              generico: res.generico,
              familia: res.familia,
              precio: res.precio,
            };
          });

          this.listMedicamentos = medicamentosMap;          
          this.loadingSearch = false;          
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.div-medicacion {
  padding: 2%;
  .container-medicacion {
    margin: 10px 0;  
    border-radius: 6px;
    padding-bottom: 6px;
  }
  .div-title {
    background: $blue;
    padding: 1%;
    border-radius: 6px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tit-medicacion {
    color: white;
  }
  .btn-medicacion {
    background: #4caf50;
    color: white;
    padding: 2px 3px;
    border-radius: 6px;
  }
}
.content-modal-medicacion {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.titulo-prom {
  margin-top: 2%;
  color: $blue;
}
.content-modal-items {
  padding: 5%;
  width: 100%;
}
.content-modal-medicacion-footer {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 2%;
}
.btn-remove {
  background: $red;
  color: white;
  padding: 3px;
  border-radius: 6px;
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
}
.margin-t {
  margin-top: -10px !important;
}
.scrollable {
  overflow-y: scroll;
  height: 40vh;
}
.scrollable::-webkit-scrollbar {
  -webkit-appearance: none;
}

.scrollable::-webkit-scrollbar:vertical {
  width: 10px;
}
</style>