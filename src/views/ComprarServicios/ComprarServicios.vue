<template>
  <v-card>
    <template>
      <div class>
        <v-card-title class="titulo">Servicios Adicionales</v-card-title>
      </div>

      <div class="carrito">
        <button @click="detallesPedidos()">
          <img src="https://i.ibb.co/8r082Dt/Carrito.png" alt="" />
        </button>
      </div>

      <v-spacer></v-spacer>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Examenes</v-card-title>
          <v-data-table
            :headers="headers1"
            :items="listaExamenes"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                  item-text="des1"
                  item-value="des1"
                  v-model="des1"
                  append-icon="mdi-magnify"
                  label="Descripcion"
                  single-line
                  hide-details
                  @input="obtenerExamenes(des1)"
                ></v-text-field>
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
                    @click="abrirDialogoDetalleExamenes(item.id)"
                  >
                    <v-icon center> info </v-icon>
                  </v-btn>
                </div>
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="success"
                    dark
                    @click="agregarExamenaPedidos(item.id)"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </div>
              </v-row>
            </template>
          </v-data-table>
        </v-card>
      </v-card-text>

      <v-card-text class="card-text">
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Medicamentos</v-card-title>
          <v-data-table
            :headers="headers2"
            :items="listaGMedicamentos"
            class="elevation-1"
          >
            <template v-slot:top>
              <v-toolbar flat>
                <v-spacer></v-spacer>
                <v-text-field
                  item-text="des2"
                  item-value="des2"
                  v-model="des2"
                  append-icon="mdi-magnify"
                  label="Descripcion"
                  single-line
                  hide-details
                  @input="obtenerMedicamento(des2)"
                ></v-text-field>
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
                    @click="abrirDialogoDetalleMedicamentos(item.id)"
                  >
                    <v-icon left> info </v-icon>
                  </v-btn>
                </div>
                <div class="in-flex">
                  <v-btn
                    x-small
                    color="success"
                    dark
                    @click="agregarMedicamentoaPedidos(item.id)"
                  >
                    <v-icon dark> mdi-plus </v-icon>
                  </v-btn>
                </div>
              </v-row>
            </template>
          </v-data-table>

          <v-dialog persistent v-model="dialogodetalleExamen" max-width="880px">
            <VisualizarExamenes
              v-if="dialogodetalleExamen"
              :examen="examen"
              @close-dialog-detalle="closeDialogDetalle()"
            >
            </VisualizarExamenes>
          </v-dialog>

          <v-dialog
            persistent
            v-model="dialogodetalleMedicina"
            max-width="880px"
          >
            <VisualizarMedicamentos
              v-if="dialogodetalleMedicina"
              :Medicinas="Medicinas"
              @close-dialog-detalle="closeDialogDetalle()"
            >
            </VisualizarMedicamentos>
          </v-dialog>

          <v-dialog persistent v-model="dialogodetallePedido" max-width="880px">
            <VerListaPedido
              v-if="dialogodetallePedido"
              :pedi2="pedi2"
              @close-dialog-detalle="closeDialogDetalle()"
            >
            </VerListaPedido>
          </v-dialog>
        </v-card>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
import VerListaPedido from "@/components/GestionarPedidos/VerListaPedido.vue";
import VisualizarExamenes from "@/components/GestionarPedidos/VisualizarExamenes.vue";
import VisualizarMedicamentos from "@/components/GestionarPedidos/VisualizarMedicamentos.vue";
import axios from "axios";
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "ComprarServicios",
  components: {
    VisualizarExamenes,
    VisualizarMedicamentos,
    VerListaPedido,
  },
  data() {
    return {
      countC: 0,
      pedi2:{},
      x: "",
      pedidoid: {},
      count: 0,
      des1: "",
      des2: "",
      examen: {
        id: "",
        descripcion: "",
        precio: 0,
        id_especialidad: "",
        duracion: "",
        recomendaciones_previas: "",
        recomendaciones_posteriores: "",
      },
      headers1: [
        {
          text: "Descripción",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Precio", value: "precio" },
        { text: "Duracion", value: "duracion" },

        { text: "", value: "actions", sortable: false },
      ],
      headers2: [
        {
          text: "Descripcion",
          align: "start",
          sortable: false,
          value: "descripcion",
        },
        { text: "Generico", value: "generico" },
        { text: "Precio", value: "precio" },

        { text: "", value: "actions", sortable: false },
      ],
      Medicinas: {
        id: "",
        descripcion: "",
        generico: "",
        precio: "",
      },
      Pedido: {
        paciente: {
          id_paciente: "",
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
        },
        tipo: "",
        id_acto_medico: "",
        productos: [],

        estado_pago: "",
        fecha_creacion: null,
        fecha_pago: null,
        precio_neto: 0,
      },

      dialogodetalleExamen: false,
      dialogodetalleMedicina: false,
      dialogodetallePedido: false,
      producto: {
        nombre: "",
        codigo: "",
        precio: 0,
        cantidad: 0,
      },
    };
  },
  async created() {
    this.obtenerExamenes();
    this.obtenerMedicamento();
  },
  methods: {
    //cerrar dialogo
    closeDialogDetalle() {
      this.dialogodetalleExamen = false;
      this.dialogodetalleMedicina = false;
      this.dialogodetallePedido = false;
    },
    async detallesPedidos() {
      this.pedi2 = await this.loadPedidoById(this.pedidoid);
      console.log(this.pedi2);
      console.log("este se pasa a detalle");
      console.log(this.pedidoid);
      this.dialogodetallePedido = !this.dialogodetallePedido;
    },
    async abrirDialogoDetalleExamenes(id) {
      this.examen = await this.loadExamenByID(id);
      this.dialogodetalleExamen = !this.dialogodetalleExamen;
    },
    async abrirDialogoDetalleMedicamentos(id) {
      this.Medicinas = await this.loadMedicamento(id);
      this.dialogodetalleMedicina = !this.dialogodetalleMedicina;
    },

    async agregarExamenaPedidos(idExamen) {
      if (this.count == 0) {
        this.count++;
        this.countC++;
        this.agregarDatospaciente();
        var examen = {};
        await axios.get("/Examenes/Id?id=" + idExamen).then((res) => {
          examen = res.data;
          this.producto.codigo = idExamen;
          this.producto.nombre = examen.descripcion;
          this.producto.cantidad = this.count;
          this.producto.precio = examen.precio;
          this.Pedido.fecha_creacion = new Date();
          this.Pedido.fecha_pago = new Date();
          this.Pedido.tipo = "Examenes";
          this.Pedido.id_acto_medico = "";
        });
        this.Pedido.estado_pago = "No pagado";
        this.Pedido.precio_neto = this.producto.cantidad * this.producto.precio;
        this.Pedido.productos.push(this.producto);

        console.log(this.Pedido);
        await axios
          .post("/Pedidos", this.Pedido)
          .then((res) => {
            this.x = res.data;
          var a="";
          this.a = this.x.id;
            this.Pedido.id = this.a;
          })
          .catch((err) => console.log(err));
      } else {
        console.log("ESTA AQUI");
        if (this.producto.codigo == idExamen) {
            this.count++;
        this.countC++;
        console.log(this.count);
        console.log(this.countC);
          var producto={codigo:"",cantidad:0};
           producto.codigo = this.idExamen;
          this.producto.cantidad = this.countC;
          console.log(this.Pedido);
          await axios
            .put("/Pedidos/ModificarProductos", this.Pedido)
            .then((x) => {
              let listaE = [];
              this.listaE = x.data;
              console.log(this.listaE);
            })
            .catch((err) => console.log(err));
        } else {
          var producto = { codigo: "", nombre: "", precio: 0, cantidad: 0 };
          await axios
            .get("/Examenes/Id?id=" + idExamen)
            .then((res) => {
              examen = res.data;
              console.log(examen);
              producto.codigo = idExamen;
              producto.nombre = examen.descripcion;
              producto.cantidad = this.countC;
              producto.precio = examen.precio;
              console.log(producto);
            })
            .catch((err) => console.log(err));
          console.log("ESTA ACA");
          this.Pedido.productos.push(producto);
          console.log(this.Pedido);
          await axios
            .put("/Pedidos/ModificarProductos", this.Pedido)
            .then((x) => {
              let listaE = [];
              this.listaE = x.data;
              console.log("no funciona");
            })
            .catch((err) => console.log(err));
        }
      }
    },
    async agregarDatospaciente() {
      await axios
        .get("Paciente/usuario?idusuario=" + this.user.id)
        .then((X) => {
          let listaE = {};
          this.listaE = X.data;
          this.pedidoid = this.listaE.id;
        });
      this.Pedido.paciente.id_paciente = this.listaE.id;
      this.Pedido.paciente.nombre = this.user.datos.nombre;
      this.Pedido.paciente.apellido_paterno = this.user.datos.apellido_paterno;
      this.Pedido.paciente.apellido_materno = this.user.datos.apellido_materno;
      console.log("este es idpaciente");
      console.log(this.Pedido.paciente.id_paciente);
    },
    async agregarMedicamentoaPedidos(id) {
      if (this.count == 0) {
        this.count++;
        this.agregarDatospaciente();
        var med = {};
        await axios.get("/Medicinas/Id?id=" + id).then((res) => {
          med = res.data;
          this.producto.nombre = med.descripcion;
          this.producto.codigo = id;
          this.producto.precio = med.precio;
          this.producto.cantidad = this.count;
          this.Pedido.id_acto_medico = "";
          this.Pedido.tipo = "Medicamentos";
        });
        this.Pedido.fecha_creacion = new Date();
        this.Pedido.fecha_pago = null;
        this.Pedido.estado_pago = "No pagado";
        this.Pedido.precio_neto = this.producto.cantidad * this.producto.precio;
        this.Pedido.productos.push(this.producto);
        console.log(this.Pedido);
        await axios
          .post("/Pedidos", this.Pedido)
          .then((x) => {
            console.log(this.x.id);
             this.x = res.data;
          var a="";
          this.a = this.x.id;
            this.Pedido.id = this.a;
            console.log(this.x.id);
          })
          .catch((err) => console.log(err));
      } else {
        console.log("ESTA AQUI");
        if (this.producto.codigo == idExamen) {
            this.count++;
        this.countC++;
        console.log(this.count);
        console.log(this.countC);
          var producto={codigo:"",cantidad:0};
           producto.codigo = this.idExamen;
          this.producto.cantidad = this.countC;
          console.log(this.Pedido);
          await axios
            .put("/Pedidos/ModificarProductos", this.Pedido)
            .then((x) => {
              let listaE = [];
              this.listaE = x.data;
              console.log(this.listaE);
            })
            .catch((err) => console.log(err));
        } else {
          var producto = { codigo: "", nombre: "", precio: 0, cantidad: 0 };
          await axios
            .get("/Examenes/Id?id=" + idExamen)
            .then((res) => {
              examen = res.data;
              console.log(examen);
              producto.codigo = idExamen;
              producto.nombre = examen.descripcion;
              producto.cantidad = this.countC;
              producto.precio = examen.precio;
              console.log(producto);
            })
            .catch((err) => console.log(err));
          console.log("ESTA ACA");
          this.Pedido.productos.push(producto);
          console.log(this.Pedido);
          await axios
            .put("/Pedidos/ModificarProductos", this.Pedido)
            .then((x) => {
              let listaE = [];
              this.listaE = x.data;
              console.log("no funciona");
            })
            .catch((err) => console.log(err));
        }  }
    },
    async obtenerExamenes(des1) {
      if (this.des1 == "" || this.des1 == null) {
        await axios
          .get("/Examenes/100Examnes")
          .then((x) => {
            let listaE = [];
            this.listaE = x.data;
            this.setListaExamenes(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .get("/Examenes/nombre?nombre=" + this.des1.toUpperCase())
          .then((x) => {
            console.log(this.des1);
            let listaE = [];
            this.listaE = x.data;
            this.setListaExamenes(this.listaE);
            console.log(this.listaE);
          })
          .catch((err) => console.log(err));
      }
    },
    async obtenerMedicamento() {
      if (this.des2 == "" || this.des2 == null) {
        await axios
          .get("/Medicinas/100Medicinas")
          .then((x) => {
            let lista = [];
            this.lista = x.data;
            this.setListaMedicamento(this.lista);
            console.log(this.lista);
          })
          .catch((err) => console.log(err));
      } else {
        await axios
          .get("/Medicinas/filter?descripcion=" + this.des2.toUpperCase())
          .then((x) => {
            console.log(this.des2);
            let lista = [];
            this.lista = x.data;
            this.setListaMedicamento(this.lista);
            console.log(this.lista);
          })
          .catch((err) => console.log(err));
      }
    },
    async loadMedicamento(id) {
      var med = {};
      await axios
        .get("/Medicinas/Id?id=" + id)
        .then((res) => {
          med = res.data;
        })
        .catch((err) => console.log(err));

      return med;
    },

    async loadExamenByID(id) {
      var examen = {};
      await axios
        .get("/Examenes/Id?id=" + id)
        .then((res) => {
          examen = res.data;
        })
        .catch((err) => console.log(err));

      return examen;
    },
    async loadPedidoById() {
      var pedido = {};
      await axios
       .get("/Pedidos/byCarritoPaciente?id_paciente=" + this.pedidoid)
        .then((x) => {
          console.log(x);
          this.pedi2 = x.data;
          console.log(this.pedi2);
        })
        .catch((err) => console.log(err));
      return this.pedi2;
    },

    ...mapMutations([
      "setListaExamenes",
      "setListaMedicamento",
      "setListaPedidos",
    ]),
  },
  computed: {
    ...mapState(["listaExamenes", "listaGMedicamentos", "listaPedidos"]),
    ...mapGetters(["user"]),
  },
};
</script>
<style lang="scss" scoped>
.card-text {
  padding-top: 30px;
}
.card {
  width: 95%;
  margin: 0px auto;
  margin-left: 50px;
  margin-top: 40px;
  padding-bottom: 20px;
}

.progress {
  width: 50%;
  margin: 0px auto;
  text-align: center;
  padding-top: 15px;
}

.label-title {
  font-size: 1.2rem;
  color: $blue;
}
.label-text {
  margin-top: 2px;
  font-size: 1rem;
  text-transform: capitalize;
}
.titulo {
  padding-top: 30px;
  margin-top: 50px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo {
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
.carrito {
  float: right;
  padding-right: 12px;
}
</style>
