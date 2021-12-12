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
          <template v-if="listExamenes.length > 0">
            <div>
              <v-data-table
                :headers="headerPedidos"
                :items="listExamenes"
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
            <v-tooltip top v-if="item.procedimientos.estado == 'pagado' &&  item.procedimientos.estado_resultado == 'pendiente'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-0"
                small
                dark
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="abrirDialodoConfirmar(item)"
              >
                <v-icon dark left>
                  mdi-check
                </v-icon>
                <span>Confirmar</span>
              </v-btn>
            </template>
            <span>Confirmar atención.</span>
          </v-tooltip>
          <v-tooltip top v-if="item.procedimientos.estado_resultado == 'en proceso'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="abrirDialogoRegistrar(item)"
              >
                <v-icon dark left>
                  mdi-upload
                </v-icon>
                <span>Subir resultado</span>
              </v-btn>
            </template>
            <span>Visualice los productos del pedido</span>
          </v-tooltip>
          <v-tooltip top v-if="item.procedimientos.estado_resultado == 'subido'">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mx-2"
                small
                dark
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="abrirDialogoVisualizar(item)"
              >
                <v-icon dark left>
                  mdi-card-search
                </v-icon>
                <span>Visualizar resultado</span>
              </v-btn>
            </template>
            <span>Visualice el resultado subido</span>
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
        max-width="700px"
    >
    <SubirResultExamenAux :resultadoObjToAgregar="resultadoObjToAgregar" :userId="idusuario" :objOrdenes="objOrdenes" @emit-close-dialog="cerrarDialogoRegistrar" @emit-recargar-tablas="recargaTablas"></SubirResultExamenAux>
    </v-dialog>
    <v-dialog
        transition="dialog-bottom-transition"
        v-model="abrirDialogoVisua"
        max-width="700px"
    >
    <ConsultarResultExamenAux :infoResultExamenAuxiliar="resultadoDetalle" @emit-close-dialog="cerrarDialogoVisualizar"></ConsultarResultExamenAux>
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
      <v-dialog v-model="dialogConfirmacion" max-width="500">
        <v-card>
          <v-card-title class="label-title">
            <h3>¿Desea confirmar la atención?</h3>          
          </v-card-title>
          <v-card-text>
            Una vez confirmada la atención podra subir los resultados del examen
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="red darken-1"
              text
              @click="dialogConfirmacion = false"
            >
              Cancelar
            </v-btn>

            <v-btn
              color="green darken-1"
              text
              @click="atender()"
            >
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </v-card>
</template>
<script>
import axios from "axios"
import SubirResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/SubirResultExamenAux";
import ConsultarResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/ConsultarResultExamenAux";
export default {
name: "ExamenesPorPaciente",
components: {
    SubirResultExamenAux,
    ConsultarResultExamenAux
},
props: {
    idusuario: {
      type: String,
    },
    idpaciente: {
      type: String,
    },
    idmedico: {
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
     abrirDialogoVisua : false,
     dialogConfirmacion: false,
     estado:"",
     cargaRegistro : false,
     listaPedidos:[],
     listaProductos:[],
     listaOrdenes:[],
     listaTurnos:[],
     listExamenes:[],
     examenUnico: "",
     headerPedidos: [
        {
          text: "Examen a realizar",
          value: "datosexamen.descripcion",
          sortable: false,
          align: "start",
        },
        {
          text: "Estado del examen",
          sortable: false,
          value: "procedimientos.estado",
        },
        {
          text: "Fecha de atención",
          sortable: false,
          value: "fecha",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
      objOrdenes:{
        id_orden: "",
        id_examen: "",
        id_turno_orden: "",
        estado:"subido",
      },
      resultadoObjToAgregar:{
        codigo: "",
        nombre: "",
        tipo: "",
      },
      resultadoDetalle:{

      }
    };
},
async created(){
    this.showInfo = true,
    await this.obtenerusuario();
    await this.obtenerPaciente();
    await this.obtenerExamenes();
    this.showInfo = false
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
  async obtenerExamenes() {
      await this.obtenerTurnosMedicos();
      await this.obtenerOrdenes();
      for(var i = 0; i < this.listaTurnos.length; i++){
        for(var j = 0; j < this.listaOrdenes.length; j++){
          if(this.listaTurnos[i].id == this.listaOrdenes[j].procedimientos.id_turno_orden){
            var examen = this.listaOrdenes[j];
            examen.id = examen.id + "-" + j
            examen.procedimientos.estado = this.capitalizarPrimeraLetra(examen.procedimientos.estado);
            for(var k = 0; k < this.listaTurnos[i].cupos.length; k++){
              if(this.listaTurnos[i].cupos[k].id_examen == this.listaOrdenes[j].procedimientos.id_examen && this.listaTurnos[i].cupos[k].paciente == this.idpaciente){
                examen.fecha = this.obtenerFecha(this.listaTurnos[i].cupos[k].hora_inicio);
                examen.hora = this.obtenerHora(this.listaTurnos[i].cupos[k].hora_inicio);
              }
            }
            this.listExamenes.push(examen);
          }
        }
      }
      console.log("Estos son mi lista de Examnes")
      console.log(this.listExamenes)
  },
  async obtenerOrdenes() {
      await axios
      .get("/Ordenes/ordenesbypaciente?id_paciente="+this.idpaciente)
      .then((x) => {
        this.listaOrdenes = x.data;
      })
      .catch((err) => console.log(err));
  },
  async obtenerTurnosMedicos() {
      await axios
      .get("/Turno_Orden/GetByIdMedico?id="+this.idmedico)
      .then((x) => {
        this.listaTurnos = x.data;
        console.log(this.listaTurnos);
      })
      .catch((err) => console.log(err));
  },
  /*async obtenerPedidos() {
      await axios
          .get("/Pedidos/byidpacientepedidospendiente?id_paciente="+this.idpaciente)
          .then((x) => {
            this.listaPedidos = x.data;
            console.log("Estos son los pedidos :D")
            console.log(this.listaPedidos)
          })
          .catch((err) => console.log(err));
  },*/
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
  async abrirDialodoConfirmar(pedido){   
    this.examenUnico = pedido,
    this.dialogConfirmacion = true
  },
  obtenerFecha(fecha){
    return new Date(fecha).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
  },
  obtenerHora(fecha){
    return fecha.substr(11, 5);
  },
  capitalizarPrimeraLetra(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
  },
  async atender(){
    this.cargaRegistro = true;
    this.listExamenes = [];    
    console.log("/Ordenes/modificarestado/"+ this.examenUnico.id.substr(0,24) + "/" + this.examenUnico.procedimientos.id_examen + "/"+ this.examenUnico.procedimientos.id_turno_orden + "/" + "en proceso" + "/" + "fake");
    await axios
      .put("/Ordenes/modificarestado/"+ this.examenUnico.id.substr(0,24) + "/" + this.examenUnico.procedimientos.id_examen + "/"+ this.examenUnico.procedimientos.id_turno_orden + "/" + "en proceso" + "/" + "fake")
      .then((x) => {
        console.log("hola");
        console.log(x.data)
      })
      .catch((err) => console.log(err));
      console.log("ya actualizó");
     await this.obtenerExamenes();
    this.dialogConfirmacion = false;
     this.cargaRegistro = false;
  },
  abrirDialogoRegistrar(orden){
    console.log("No me carga mis cosas ayuda"),
    console.log(orden);
    this.objOrdenes.id_orden = orden.id.substr(0,24),
    this.objOrdenes.id_examen = orden.procedimientos.id_examen,
    this.objOrdenes.id_turno_orden = orden.procedimientos.id_turno_orden,
    this.resultadoObjToAgregar.codigo = orden.procedimientos.id_examen,
    this.resultadoObjToAgregar.nombre = orden.datosexamen.descripcion,
    this.resultadoObjToAgregar.tipo = "Examen",
    this.abrirDialogoDetalle = true;
  },
  cerrarDialogoRegistrar(){
      this.objOrdenes = {
        id_orden: "",
        id_examen: "",
        id_turno_orden: "",
        estado:"subido",
      },
      this.resultadoObjToAgregar ={
        codigo: "",
        nombre: "",
        tipo: "",
      }
      this.abrirDialogoDetalle = false;
  },
  async recargaTablas(){
    this.listExamenes = [];
    await this.obtenerExamenes();
  },
  async abrirDialogoVisualizar(orden){
    await this.obtenerResultado(orden.procedimientos.id_resultado_examen)
    this.abrirDialogoVisua = true;
  },
  async obtenerResultado(id_resultado){
    await axios
      .get("/ResultadoExamen/id?id="+id_resultado)
      .then((x) => {
        this.resultadoDetalle = x.data;
        console.log(this.listaTurnos);
      })
      .catch((err) => console.log(err));
  },
  cerrarDialogoVisualizar(){
    this.resultadoDetalle = {

    },
    this.abrirDialogoVisua = false;
  },
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