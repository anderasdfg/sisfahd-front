<template>
  <v-card elevation="0" class="px-5 py-2">
    <v-card-title class="">
      <span class="orden-detalle-titulo">RESERVA PARA PROCEDIMIENTO</span>
    </v-card-title>
    <v-card-text class="pb-1">
      <div>
        <h4 class="text-blue">Ingrese los datos para buscar la disponibilidad para la reserva</h4>
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
            <v-date-picker
              v-model="date"
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="modal = false"
              >
                Cancelar
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="verificarHorario(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </div>
      </div>
    </v-card-text>
    <v-card style="min-height:400px !important;" class="mx-5">
      <v-card v-for="(value, index) in listaTurnos" :key="index"
          class="mx-5" width="200" height="200">
        
        <v-row justify="space-around">
          <v-avatar class="mt-5">
            <img
              :src="value.item2.datos.foto"
              alt="John"
            >
          </v-avatar>
        </v-row>
        <v-card-title>Médico</v-card-title>
        <v-row justify="center">
          <p style="margin-top:15px;">{{value.item2.datos.nombre}} {{value.item2.datos.apellido_paterno}} {{value.item2.datos.apellido_materno}}</p>
        </v-row>
        <v-row justify="center" class="mt-3">
          <v-btn
            text  
            color="primary"
            @click="OpenDialogPago(value)"
          >
            Reservar
          </v-btn>
        </v-row>
      </v-card>
    </v-card>
    <v-card-actions class="px-5 py-5">
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="CloseDialog()"
      >
        Cerrar
      </v-btn>
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
          ></CardPagoReserva>
        </v-dialog>
      </v-row>
    </template>
  </v-card>
</template>

<script>
import axios from "axios";
import CardPagoReserva from "@/components/Ordenes/CardPagoReserva";
import {
  required,
} from "vuelidate/lib/validators";
export default {
  name: "CardReservaProcedimiento",
  props: ["ListTableElem","InfoOrden"],
  components:{
    CardPagoReserva,
  },
  data() {
    return {
      listaTurnos:[],
      dialog: false,
      date: null,
      modal: false,
      queryReserva:[],
      dialogPagoReserv:false,
      InfoTurno:[]
    };
  },
  async created(){
    this.date = this.fechaModificable(1).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    this.verificarHorario(this.date);
  },
  async mounted() {
    //await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    CloseDialog(){
      this.$emit("emit-close-dialog");
    },
    OpenDialogPago(value){
      let query ={
        idTurnoOrden: value.item1.id,
        idExamen: this.ListTableElem.id_examen,
        idUsuario:  this.InfoOrden.usuario,
        idOrden: this.InfoOrden.id,
        fecha: this.date
      };
      console.log(query);
      this.InfoTurno=value;
      this.queryReserva=query;
      this.dialogPagoReserv=true;
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
    async verificarHorario(date){
      var splitDate = date.split("T")[0].split("-");
      let query = {
        idespecialidad:this.ListTableElem.datos_examen.id_especialidad,
        año:parseInt(splitDate[0]),
        mes:parseInt(splitDate[1]),
        dia:parseInt(splitDate[2])
      }
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
    
    fechaModificable(dias){
      var fecha = new Date();
      console.log(fecha)
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
  },
  computed:{
    errorFechaTurno() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required &&
        errors.push("Debe ingresar la fecha de del turno obligatoriamente");
      var dateselected = new Date(this.date.replace(/\-/gi,'/'));
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
      date:{
        required,
      }
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
.content-resultados{
  padding: 1%;
  margin-top: 20px !important;
  /*background-color: #4172F2 !important;*/
  min-height: 500px;
}
</style>

