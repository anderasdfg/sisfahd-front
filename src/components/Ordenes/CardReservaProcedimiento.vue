<template>
  <v-card elevation="0" class="px-5 py-2">
    <v-card-title class="">
      <span class="orden-detalle-titulo">RESERVA PARA PROCEDIMIENTO</span>
    </v-card-title>
    <v-card-text class="pb-1">
      <div>
        <h4 class="text-blue">
          Ingrese los datos para buscar la disponibilidad para la reserva
        </h4>
        <div class="content-diagnostico">
          <v-text-field
            label="Especialidad"
            v-model="ListTableElem.especialidad_examen"
            readonly
            disabled
          ></v-text-field>
          <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Fecha del turno"
                prepend-icon="mdi-calendar"
                readonly
                class="campos"
                v-bind="attrs"
                v-on="on"
                @input="$v.date.$touch()"
                @blur="$v.date.$touch()"
                :error-messages="errorFechaTurno"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="modal = false">
                Cancelar
              </v-btn>
              <v-btn text color="primary" @click="verificarHorario(date)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </div>
      </div>
    </v-card-text>
    <div class="mx-5 content-cupos">
      <v-card
        v-for="(value, index) in listaTurnos"
        :key="index"
        class="content-cupos-item"
        width="200"
        height="200"
      >
        <v-row justify="space-around">
          <v-avatar class="mt-5">
            <img :src="value.item2.datos.foto" alt="John" />
          </v-avatar>
        </v-row>
        <v-card-title>Médico</v-card-title>
        <v-row justify="center">
          <p style="margin-top: 15px">
            {{ value.item2.datos.nombre }}
            {{ value.item2.datos.apellido_paterno }}
            {{ value.item2.datos.apellido_materno }}
          </p>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-btn text color="primary" 
            :loading="chargingBtnReserva"
            @click="OpenDialogPago(value)"
          > Reservar 
          </v-btn>
        </v-row>
      </v-card>
    </div>
    <v-card-actions class="px-5 py-5">
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="CloseDialog()"> Cerrar </v-btn>
    </v-card-actions>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialogPagoReserv"
          max-width="800"
        >
          <CardPagoReserva
            @emit-close-dialog="CloseDialogPago"
            :ListTableElem="ListTableElem"
            :InfoTurno="InfoTurno"
            :queryReserva="queryReserva"
            :query2="query2"
            :pago="pago"
          ></CardPagoReserva>
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>

<script>
import axios from "axios";
import CardPagoReserva from "@/components/Ordenes/CardPagoReserva";
import { required } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  name: "CardReservaProcedimiento",
  props: ["ListTableElem","InfoOrden"],
  components:{
    CardPagoReserva,
  },
  data() {
    return {
      listaTurnos: [],
      dialog: false,
      date: null,
      modal: false,
      queryReserva:[],
      dialogPagoReserv:false,
      InfoTurno:[],
      chargingBtnReserva:false,
      query2:[],
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
      prescripciones: [],
      listaDiagnosticos: [],
      acto_medico: {},
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
      idPedido: "",
      producto: {
        codigo: "",
        nombre: "",
        precio: 0,
        cantidad: 0,
      },
      itemsProductos: [],
      paciente: {},    
      totalPrecio: 0  
    };
  },
  async created() {
    this.date = this.fechaModificable(1)
      .toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//gi, "-");
    this.verificarHorario(this.date);
  },
  async mounted() {
    //await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    CloseDialog() {
      this.$emit("emit-close-dialog");
    },
    async OpenDialogPago(value){
      let query ={
        idTurnoOrden: value.item1.id,
        idExamen: this.ListTableElem.id_examen,
        idUsuario:  this.InfoOrden.usuario,
        idOrden: this.InfoOrden.id,
        fecha: this.date
      };
      this.query2 ={
        idTurnoOrden: value.item1.id,
        idExamen: this.ListTableElem.id_examen,
        idUsuario:  this.InfoOrden.usuario,
        idOrden: this.InfoOrden.id,
        fecha: this.date,
        idActoMedico: this.InfoOrden.datos_acto_medico.id
      };
      console.log(query);
      this.InfoTurno=value;
      this.queryReserva=query;
      await this.RealizarReserva();
      await this.RealizarReserva_2();
      await this.generarPago();
    },
    async RealizarReserva() {
      this.chargingBtnReserva=true;
      console.log(this.queryReserva);
      await axios
        .put("/Turno_Orden/ReservarTurnoOrden", this.queryReserva)
        .then((x) => {
          console.log(x);
          this.chargingBtnReserva=false;
          this.dialogPagoReserv=true;
        })
        .catch((err) => console.log(err));
    },
    async RealizarReserva_2() {
      console.log(this.queryReserva);
      await this.getPacienteByUsuario(this.queryReserva.idUsuario);
      await this.registrarPedido();
        
    },
    async registrarPedido() {
      console.log("pedidos");
      this.pedido.paciente.id_paciente = this.paciente.id;
      this.pedido.paciente.nombre = this.user.datos.nombre;
      this.pedido.paciente.apellido_paterno = this.user.datos.apellido_paterno;
      this.pedido.paciente.apellido_materno = this.user.datos.apellido_materno;
      this.pedido.id_acto_medico = this.query2.idActoMedico;

      this.producto.codigo = this.ListTableElem.datos_examen.id;
      this.producto.nombre = this.ListTableElem.datos_examen.descripcion;
      this.producto.precio = this.ListTableElem.datos_examen.precio;
      this.producto.cantidad = 1;
      this.itemsProductos.push(this.producto);
      this.pedido.productos = this.itemsProductos;
      this.pedido.precio_neto = this.ListTableElem.datos_examen.precio;

      this.totalPrecio = this.ListTableElem.datos_examen.precio;

      console.log(this.pedido);
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
    async getPacienteByUsuario(idUsuario) {
      await axios
        .get(`/Paciente/usuario?idusuario=${idUsuario}`)
        .then((x) => {
          this.paciente = x.data;
        })
        .catch((err) => console.log(err));    
    },
    async generarPago(){
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
      this.pago.id_paciente = this.paciente.id;
      this.pago.precio_neto = this.ListTableElem.datos_examen.precio;
      this.pago.tipo_pago = "Niubiz";
      this.pago.fecha_pago = "";
    },
    CloseDialogPago(){
      this.dialogPagoReserv=false;
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
    async verificarHorario(date) {
      var splitDate = date.split("T")[0].split("-");
      let query = {
        idespecialidad: this.ListTableElem.datos_examen.id_especialidad,
        año: parseInt(splitDate[0]),
        mes: parseInt(splitDate[1]),
        dia: parseInt(splitDate[2]),
      };
      await this.obtenerTurnos(query);
      this.$refs.dialog.save(date);
    },
    async obtenerTurnos(query) {
      await axios
        .post("/Turno_Orden/listaturnosO", query)
        .then((x) => {
          this.listaTurnos = [];
          this.listaTurnos = x.data;
          console.log("Lista turnos:");
          console.log(this.listaTurnos);
        })
        .catch((err) => console.log(err));
    },
    fechaModificable(dias) {
      var fecha = new Date();
      console.log(fecha);
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
  },
  computed: {
    ...mapGetters(["user"]),
    errorFechaTurno() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required &&
        errors.push("Debe ingresar la fecha de del turno obligatoriamente");
      var dateselected = new Date(this.date.replace(/\-/gi, "/"));
      var mindate = this.fechaModificable(0);
      var maxdate = this.fechaModificable(180);
      !(dateselected.getTime() <= maxdate.getTime()) &&
        errors.push("La fecha no debe ser mayor a los 6 meses");
      !(dateselected.getTime() >= mindate.getTime()) &&
        errors.push("La fecha debe ser mayor a un dia de la actual");
      return errors;
    },
  },
  validations() {
    return {
      date: {
        required,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.content-diagnostico {
  display: flex;
  justify-content: space-between;
}
.orden-detalle-titulo {
  font-weight: 700;
  color: $blue !important;
}
.text-blue {
  color: $blue !important;
  margin-bottom: 1%;
}
.content-resultados {
  padding: 1%;
  margin-top: 20px !important;  
  min-height: 500px;
}
.content-cupos {
  min-height: 400px !important;
  border-radius: 6px;
  margin: 0px;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.content-cupos-item {  
  margin-bottom: 10px !important;
}
/* width */
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #888; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
</style>

