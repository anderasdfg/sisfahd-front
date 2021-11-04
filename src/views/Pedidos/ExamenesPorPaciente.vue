<template>
  <v-card elevation="3" outlined class="card">
    <template v-if="showInfo">
      <div class="progress">
        <v-progress-circular
          size="80"
          width="10"
          color="blue"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
    <template v-else>
    <div class>
    <v-card-title class="titulo">Exámenes pendientes por paciente</v-card-title>
    </div>
      <v-card-subtitle
        >Visualice todos los pedidos de examenes con los que cuenta el paciente.
      </v-card-subtitle>
    <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Datos del paciente</v-card-title>
          <v-row class="mt-2">
            <v-col cols="12" sm="12" md="12" lg="3" xl="3">
              <v-img                
                 :src="usuario.datos.foto ? usuario.datos.foto : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'"
                max-width="200"
                max-height="200"
                class="ml-sm-6 mr-sm-0 mb-3"
              ></v-img>              
            </v-col>
            <v-col cols="12" sm="12" md="12" lg="9" xl="9">
              <v-row class="ml-3 ml-sm-0">
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Nombres y apellidos</label
                  >
                  <p class="label-text">
                    {{ usuario.datos.nombre + " " +  usuario.datos.apellido_paterno + " "+  usuario.datos.apellido_materno }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >{{usuario.datos.tipo_documento}}</label
                  >
                  <p class="label-text">
                    {{ usuario.datos.numero_documento}}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Teléfono</label
                  >
                  <p class="label-text">{{ usuario.datos.telefono }}</p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Correo</label
                  >
                  <p class="label-text">
                    {{ usuario.datos.correo }}
                  </p>
                </v-col>
                <v-col
                  cols="12"
                  sm="6"
                  md="6"
                  lg="4"
                  xl="4"
                  class="text-center text-sm-start"
                >
                  <label class="font-weight-medium label-title"
                    >Domicilio</label
                  >
                  <p class="label-text">
                    {{ usuario.datos.domicilio ? usuario.datos.domicilio : '-'}}
                  </p>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
    </v-card-text>
    <!-- Tabla de los pedidos se puede hacer un componente pero que más da -->
    <v-card-text>
        <v-card elevation="0" outlined shaped>
          <v-card-title class="subtitulo">Pedidos Pendientes</v-card-title>
          <template v-if="listaPedidos.length > 0">
            <div>
              <v-data-table
                :headers="headerPedidos"
                :items="listaPedidos"
                :items-per-page="5"
                :page.sync="page"
                @page-count="pageCount = $event"
                hide-default-footer
                class="elevation-1"
              >
              <template v-slot:[`item.fecha_creacion`]="{ item }">
                  {{ item.fecha_creacion | toFechaB }}
              </template>
              <template v-slot:[`item.estado_pago`]="{ item }">
                  {{ item.estado_pago | capitalize}}
              </template>
              <template v-slot:[`item.actions`]="{ item }">
            <v-tooltip top v-if="!(item.estado_pago == 'en proceso')">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-0"
                small
                dark
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="atenderPedido(item)"
              >
                <v-icon dark>
                  mdi-check
                </v-icon>
              </v-btn>
            </template>
            <span>Atender pedidos.</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="abrirDialogo(item.productos, item.estado_pago)"
              >
                <v-icon dark left>
                  mdi-card-search
                </v-icon>
                <span>Detalle</span>
              </v-btn>
            </template>
            <span>Visualice los productos del pedido</span>
          </v-tooltip>
              </template>
              </v-data-table>
              <v-pagination
                style="padding:15px; borders"
                v-model="page"
                :length="pageCount"
                ></v-pagination>
            </div>
          </template>
          <template v-else>
            <v-alert
              text
              outlined
              border="left"
              color="deep-orange"
              width="97%"
              class="ml-3"
              icon="info"
            >
              No tiene pedidos pendientes
            </v-alert>
          </template>
        </v-card>
      </v-card-text>
    </template>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="abrirDialogoDetalle"
        max-width="1200px"
    >
    <DetallePendientes :listaproductos = listaProductos  :estado = estado @emit-cerrar-dialog ="cerrarDialogo()"></DetallePendientes>
    </v-dialog>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Aceptando el pedido</v-card-title>
          <div>
              <v-progress-circular
              style="display: block;margin:40px auto;"
              :size="90"
              :width="9"
              color="blue"
              indeterminate
            ></v-progress-circular>
          </div>
           <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center">En unos momentos finalizaremos...</v-card-subtitle>
        </v-card>
      </v-dialog>
  </v-card>
</template>
<script>
import axios from "axios"
import DetallePendientes from "@/components/Pedidos/DetallePendientes"
import { mapActions,mapGetters } from "vuex";
export default {
name: "ExamenesPorPaciente",
components: {
    DetallePendientes,
},
props: {
    idusuario: {
      type: String,
    },
    idpaciente: {
      type: String,
    },
},
data(){
    return{
     usuario:"", 
     showInfo:false,
     page: 1,
    pageCount: 0,
    abrirDialogoDetalle : false,
    abrirDialogoDetalle : false,
    estado:"",
    cargaRegistro : false,
     listaPedidos:[],
     listaProductos:[],
     headerPedidos: [
        {
          text: "Fecha de compra",
          value: "fecha_creacion",
          sortable: false,
          align: "start",
        },
        {
          text: "Estado del pedido",
          sortable: false,
          value: "estado_pago",
        },
        {
          text: "Precio total",
          sortable: false,
          value: "precio_neto",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
    };
},
async created(){
    this.showInfo = true,
    await this.obtenerusuario();
    await this.obtenerPaciente();
    await this.obtenerPedidos();
    this.showInfo = false,
    console.log(this.usuario)
},
methods:{
  async obtenerusuario() {
    await axios
    .get("/Usuario/id?id="+ this.idusuario)
    .then((x) => {    
      this.usuario = x.data;
    })
    .catch((err) => console.log(err));
  },
  async obtenerPaciente() {
      await axios
          .get("/Paciente/usuario?idusuario="+this.idusuario)
          .then((x) => {
            this.usuario.datospaciente = x.data.datos;
          })
          .catch((err) => console.log(err));
  },
  async obtenerPedidos() {
      await axios
          .get("/Pedidos/byidpacientepedidospendiente?id_paciente="+this.idpaciente)
          .then((x) => {
            this.listaPedidos = x.data;
            console.log("Estos son los pedidos :D")
            console.log(this.listaPedidos)
          })
          .catch((err) => console.log(err));
  },
  abrirDialogo(productos,estado){
      this.listaProductos = [],
      this.estado = "",
      this.estado = estado
      this.listaProductos = productos;
      this.abrirDialogoDetalle = true;
  },
  cerrarDialogo(){
      this.listaProductos = [],
      this.abrirDialogoDetalle = false;
  },
  async atenderPedido(pedido){
    this.cargaRegistro = true;
    pedido.estado_pago = "en proceso"
    await axios
        .put("/Pedidos", pedido)
        .then((res) => {
        })
        .catch((err) => console.log(err));
    await this.obtenerPedidos();
    this.cargaRegistro = false;
  }
},
computed:{
},
filters: {
    toFechaB(value) {
      return new Date(value).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    },
    capitalize(value) {
      return value.replace(/^\w/, (c) => c.toUpperCase()); 
    },
},
}
</script>
<style lang="scss" scoped>
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
}
.titulo{
  padding-top: 30px;
  color: $blue;
  font-weight: bold;
  font-size: 2rem;
}
.subtitulo{
  font-size: 1.5rem;
  color: $blue;
  font-weight: bold;
}
.v-data-table th {
  font-size: 50px;
}
</style>