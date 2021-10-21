<template>
  <v-card elevation="3" class="card-home-prescripcion">
    <div class="header-logo">
      <img src="https://i.ibb.co/C1DWyrk/logo-s.png" alt="" />
      <h3>RESERVAR EXÁMENES</h3>
    </div>
    <button style="text-align: right" @click="refresh()">
      <v-icon color="#4172F2">mdi-refresh</v-icon>
    </button>
    <div v-for="examen in listaExamenes" :key="examen.codigo">
      <CardItemExamen :examen="examen" />
    </div>
    <div v-if="listaExamenes.length == 0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="item-prescripcion"> </v-list-item-title>
          <v-list-item-subtitle class="item-prescripcion-subtitle">
            La lista de examenes a reservar está vacía</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </div>

    <div style="display: flex; justify-content: space-between; margin-top: 3%">
      <div style="display: flex; justify-content: flex-start">
        <h3 class="campos">Total:</h3>
        <h3 class="resultados">{{ "S/. " + this.totalPrecio }}</h3>
      </div>
      <div style="display: flex; justify-content: flex-start">
        <button class="btn-pagar" block @click="reservarExamenes()">
          Pagar
        </button>
        <div style="margin-left: 4%"></div>
        <button
          class="btn-volver"
          block
          @click="$emit('abiertoComprarExamenes', false)"
        >
          Volver
        </button>
      </div>
      <v-dialog
        v-model="dialogPagarExamenes"
        max-width="500"
        transition="dialog-bottom-transition"
        v-if="abiertoPagarExamenes"
        persistent
      >
        <div class="content-modal-examenes">
          <div class="content-pagar">
            <h3>Pagar</h3>
            <p>
              Seleccione el botón de pagar para culminar con la reserva de los
              examenes
            </p>
            <p><b>Total a pagar: </b>{{ "S/. " + this.totalPrecio }}</p>
            <img
              class="img-cards"
              src="https://i.ibb.co/YPDZ1x8/tarjetas.png"
              alt="tarjetas"
            />
          </div>
          <v-row>
            <v-col>
              <button
                class="btn-volver"
                block
                @click="$emit('abiertoPagarExamenes', false)"
              >
                Volver
              </button>
            </v-col>
            <v-col>
              <BotonNiubiz :pago="this.pago" />
            </v-col>
          </v-row>
        </div>
      </v-dialog>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import CardItemExamen from "@/components/ComponentesDashboardPaciente/ReservarExamenes/CardItemExamen.vue";
import BotonNiubiz from "@/components/GestionarCitas/ComponentesPagos/BotonNiubiz.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardReservarExamenes",
  props: ["cita", "idPaciente"],

  components: {
    CardItemExamen,
    BotonNiubiz,
  },
  data() {
    return {
      listaDiagnosticos: [],
      acto_medico: {},
      examen: {
        codigo: "",
        nombre: "",
        precio: "",
        precioTotal: 0,
      },
      listaExamenesReserva: [],
      dialogPagarExamenes: false,
      abiertoPagarExamenes: false,
      pago: {
        datos_paciente: {
          datos: {
            correo: "",
            nombre_apellido_paciente: "",
          },
          nombre_rol: {
            nombre: "",
          },
          usuario: "",
        },
        id: "",
        id_paciente: "",
        precio_neto: "",
        tipo_pago: "",
        fecha_pago: "",
      },
      pedido: {
        paciente: {
          id_paciente: "",
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
        },
        tipo: "Examenes",
        id_acto_medico: "",
        productos: [
          {
            codigo: "",
            nombre: "",
            precio: 0,
            cantidad: 0,
          },
        ],
        estado_pago: "No pagado",
        fecha_creacion: new Date(),
        fecha_pago: null,
        precio_neto: 0,
      },
      producto: {
        codigo: "",
        nombre: "",
        precio: 0,
        cantidad: 0,
      },
      itemsProductos: [],
      idPedido: ''
    };
  },
  async created() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
    await this.setListaExamenesConPrecio();
    await this.setListaExamenes(this.listaExamenesReserva);
  },
  async mounted() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    ...mapActions(["setListaExamenes"]),
    async obtenerDiagnostico(idcita) {
      await axios
        .get("/ActoMedico/id?id=" + idcita)
        .then((x) => {
          this.acto_medico = x.data;
          this.listaDiagnosticos = this.acto_medico.diagnostico;
        })
        .catch((err) => console.log(err));
    },
    async setListaExamenesConPrecio() {
      this.listaExamenesReserva = [];
      for (var item in this.listaDiagnosticos) {
        console.log(this.listaDiagnosticos[item].examenes_auxiliares);
        for (var i in this.listaDiagnosticos[item].examenes_auxiliares) {
          this.examen = {};
          this.examen.codigo =
            this.listaDiagnosticos[item].examenes_auxiliares[i].codigo;
          this.examen.nombre =
            this.listaDiagnosticos[item].examenes_auxiliares[i].nombre;
          this.examen.enfermedad =
            this.listaDiagnosticos[item].nombre_enfermedad;
          await axios
            .get("/Examenes/id?id=" + this.examen.codigo)
            .then((x) => {
              this.examen.precio = x.data.precio;
            })
            .catch((err) => console.log(err));
          this.listaExamenesReserva.push(this.examen);
        }
      }
    },
    async refresh() {
      this.$store.commit("setEmptyExamenes");
      await this.setListaExamenesConPrecio();
      await this.setListaExamenes(this.listaExamenesReserva);
    },
    async reservarExamenes() {
      await this.registrarPedido();
      
      this.pago.datos_paciente.datos.correo = this.user.usuario;
      this.pago.datos_paciente.datos.nombre_apellido_paciente =
        this.user.datos.nombre +
        " " +
        this.user.datos.apellido_paterno +
        " " +
        this.user.datos.apellido_materno;
      this.pago.datos_paciente.nombre_rol.nombre = "Paciente";
      this.pago.datos_paciente.usuario = this.user.id;
      this.pago.id = this.idPedido;
      this.pago.id_paciente = this.idPaciente;
      this.pago.precio_neto = this.totalPrecio;
      this.pago.tipo_pago = "Niubiz";
      this.pago.fecha_pago = "";

      this.dialogPagarExamenes = true;
      this.abiertoPagarExamenes = true;
    },
    cerrarModalPagarExamenes() {
      this.dialogPagarExamenes = false;
      this.abiertoPagarExamenes = false;
    },
    async registrarPedido() {
      console.log("pedidos");
      this.pedido.paciente.id_paciente = this.idPaciente;
      this.pedido.paciente.nombre = this.user.datos.nombre;
      this.pedido.paciente.apellido_paterno = this.user.datos.apellido_paterno;
      this.pedido.paciente.apellido_materno = this.user.datos.apellido_materno;
      this.pedido.id_acto_medico = this.cita.id_acto_medico;

      for (var i in this.listaExamenes) {
        this.producto.codigo = this.listaExamenes[i].codigo;
        this.producto.nombre = this.listaExamenes[i].nombre;
        this.producto.precio = this.listaExamenes[i].precio;
        this.producto.cantidad = 1;
        this.itemsProductos.push(this.producto);
      }

      this.pedido.productos = this.itemsProductos;
      this.pedido.precio_neto = this.totalPrecio;
      
      await axios
        .post("/Pedidos", this.pedido)
        .then(async (res) => {
          console.log(res.data);
          this.idPedido = res.data.id;
          
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    ...mapGetters(["listaExamenes"]),
    ...mapGetters(["totalPrecio"]),
    ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.card-home-prescripcion {
  padding: 3%;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.header-receta {
  margin: 2% 0;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.content-diagnostico {
  display: flex;
  justify-content: space-between;
}
.single-line {
  background: #efefef;
}
.item-prescripcion {
  font-size: 16px !important;
}
.item-prescripcion-subtitle {
  font-size: 16px !important;
}
.text-span {
  font-size: 16px !important;
}
.header-logo {
  display: flex;
  margin: 2%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  color: $blue !important;
}
.text-blue {
  color: $blue !important;
  margin-bottom: 1%;
}
.btn-pagar {
  background: $green;
  color: white;
  border-radius: 10px;
  width: 9vh;
  height: 3.5vh;
  font-weight: bold;
  font-size: 15px;
}
.btn-volver {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 9vh;
  height: 3.5vh;
  font-weight: bold;
  font-size: 15px;
}
.content-modal-examenes {
  padding: 3%;
}
.img-cards {
  width: 30%;
  margin-bottom: 5%;
}
</style>

