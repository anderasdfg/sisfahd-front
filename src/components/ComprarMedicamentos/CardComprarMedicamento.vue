<template>
  <v-card elevation="3" class="card-home-prescripcion">
    <div class="header-logo">
      <img src="https://i.ibb.co/C1DWyrk/logo-s.png" alt="" />
      <h2>Medicamentos recetados</h2>      
    </div>
    <button style="text-align: right;">
      <v-icon color="#4172F2" @click="refresh()">mdi-refresh</v-icon>
    </button>
    <div v-for="medicamento in listaMedicamentosCompra" :key="medicamento.codigo">
      <CardVentaMedicamento
        :medicamento="medicamento"
      />
    </div>
    <div v-if="listaMedicamentosCompra.length == 0" >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="item-prescripcion"> </v-list-item-title>
          <v-list-item-subtitle class="item-prescripcion-subtitle">
            No se han ordenado exámenes para este
            diagnóstico</v-list-item-subtitle
          >
        </v-list-item-content>
      </v-list-item>
    </div>
    <div style="display: flex; justify-content:space-between; margin-top:3%;">
      <div style="display: flex; justify-content:flex-start" >
        <h3 class="campos"> Total: </h3>
        <h3 class="resultados">{{ "S/" + totalPrecioMedicamentos}}</h3>
      </div>
      <div style="display: flex; justify-content:flex-start; ">
        <button class="btn-pagar" block @click="comprarMedicamento()" >Pagar</button>
      <div style="margin-left:4%"></div>
        <button class="btn-volver" block @click="$emit('abriertoComprarMedicamentos', false)" >Volver</button>
      </div>
      <!-- Pago -->
      <v-dialog
        v-model="dialogPagarMedicamentos"
        max-width="500"
        transition="dialog-bottom-transition"
        persistent
      >
        <div class="content-modal-examenes">
          <div class="content-pagar">
            <h3>Pagar</h3>
            <p>
              Seleccione el botón de pagar para culminar con la reserva de los
              examenes
            </p>
            <p><b>Total a pagar: </b>{{ "S/. " + this.totalPrecioMedicamentos }}</p>
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
                @click="cerrarModalPagarMedicamentos()"
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
import CardVentaMedicamento from "@/components/ComprarMedicamentos/CardVentaMedicamento.vue";
import BotonNiubiz from "@/components/GestionarCitas/ComponentesPagos/BotonNiubiz.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "CardComprarMedicamento",
  props: ["cita", "idPaciente"],
  components: {
    CardVentaMedicamento,
    BotonNiubiz
  },
  data() {
    return {
      listaDiagnosticos: [],
      acto_medico: {},
      medicamento:{
        codigo:"",
        nombre: "",
        cantidad: 0,
        formula: "",
        enfermedad: "",
        precio: 0,
      },
      listaMedicamento: [],
      dialogPagarMedicamentos: false,
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
        tipo: "Medicamentos",
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
    await this.setListaMedicamentosConPrecio();
    await this.setListaMedicamentosCompra(this.listaMedicamento);   
  },
  async mounted() {
    await this.obtenerDiagnostico(this.cita.id_acto_medico);
  },
  methods: {
    ...mapActions(["setListaMedicamentosCompra"]),
    async obtenerDiagnostico(idcita) {
      await axios
        .get("/ActoMedico/id?id=" + idcita)
        .then((x) => {
          this.acto_medico = x.data;
          console.log(this.acto_medico);
          this.listaDiagnosticos = this.acto_medico.diagnostico;
          console.log(this.listaDiagnosticos);
        })
        .catch((err) => console.log(err));
    },
    async setListaMedicamentosConPrecio() {
      this.listaMedicamento = [];
      for (var i in this.listaDiagnosticos) {
        for (var j in this.listaDiagnosticos[i].prescripcion) {
          this.medicamento = {};
          this.medicamento.codigo =
            this.listaDiagnosticos[i].prescripcion[j].codigo;
          this.medicamento.nombre =
            this.listaDiagnosticos[i].prescripcion[j].nombre;
          this.medicamento.formula =
            this.listaDiagnosticos[i].prescripcion[j].formula;
          this.medicamento.enfermedad =
            this.listaDiagnosticos[i].nombre_enfermedad;
          await axios
            .get("/Medicinas/filter?descripcion=" + this.medicamento.nombre)
            .then((x) => {
              /*if(x.data.length == 0){
                this.medicamento.precio = 25;
              }*/
              var cantidad = this.listaDiagnosticos[i].prescripcion[j].dosis.cantidad;
              if(this.listaDiagnosticos[i].prescripcion[j].dosis.frecuencia.medida == "minutos"){
                cantidad = cantidad * 1400/ this.listaDiagnosticos[i].prescripcion[j].dosis.frecuencia.valor;
                cantidad = parseInt(cantidad, 10);
              }else{
                cantidad = cantidad * 1400/ this.listaDiagnosticos[i].prescripcion[j].dosis.frecuencia.valor * 60;
                cantidad = parseInt(cantidad, 10);
              }
              if(this.listaDiagnosticos[i].prescripcion[j].dosis.tiempo.medida == "dias"){
                cantidad = cantidad * this.listaDiagnosticos[i].prescripcion[j].dosis.tiempo.valor;
              }else if(this.listaDiagnosticos[i].prescripcion[j].dosis.tiempo.medida == "semanas"){
                cantidad = cantidad * this.listaDiagnosticos[i].prescripcion[j].dosis.tiempo.valor * 7;
              }else{
                cantidad = cantidad * this.listaDiagnosticos[i].prescripcion[j].dosis.tiempo.valor * 30;
              }
              this.medicamento.cantidad = cantidad;
              if(x.data.length == 0){
                this.medicamento.precio = cantidad * 25;
              }else{
                this.medicamento.precio = x.data[0].precio * 25;
              }
            })
            .catch((err) => console.log(err));
          this.listaMedicamento.push(this.medicamento);
        }
      }
    },
    async refresh() {      
      this.$store.commit('setEmptyListaMedicamentosCompra')     
      await this.setListaMedicamentosConPrecio();
      await this.setListaMedicamentosCompra(this.listaMedicamento); 
    },
    async comprarMedicamento() {
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
      this.pago.precio_neto = this.totalPrecioMedicamentos;
      this.pago.tipo_pago = "Niubiz";
      this.pago.fecha_pago = "";

      this.dialogPagarMedicamentos = true;
    },
    async registrarPedido() {
      this.pedido.paciente.id_paciente = this.idPaciente;
      this.pedido.paciente.nombre = this.user.datos.nombre;
      this.pedido.paciente.apellido_paterno = this.user.datos.apellido_paterno;
      this.pedido.paciente.apellido_materno = this.user.datos.apellido_materno;
      this.pedido.id_acto_medico = this.cita.id_acto_medico;

      for (var i in this.listaMedicamentosCompra) {
        this.producto.codigo = this.listaMedicamentosCompra[i].codigo;
        this.producto.nombre = this.listaMedicamentosCompra[i].nombre;
        this.producto.precio = this.listaMedicamentosCompra[i].precio;
        this.producto.cantidad = this.listaMedicamentosCompra[i].cantidad;
        this.itemsProductos.push(this.producto);
      }

      this.pedido.productos = this.itemsProductos;
      this.pedido.precio_neto = this.totalPrecioMedicamentos;
      
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
    cerrarModalPagarMedicamentos() {
      this.dialogPagarMedicamentos = false;
    },
  },
  computed:{
    ...mapGetters(["listaMedicamentosCompra"]),
    ...mapGetters(["totalPrecioMedicamentos"]),
    ...mapGetters(["user"]),
  }
};
</script>

<style lang="scss" scoped>
.card-home-prescripcion {  
  padding: 3% ;
  border-radius: 20px;
  width: 100%;
  display: flex;
  flex-direction: column; 
}
.header-logo {
  display: flex;
  margin: 1%;
  align-content: center;
  align-items: center;
  justify-content: space-between;
  color: $blue !important;
}
.campos {
  color: $blue !important; 
  font-weight: normal !important;
}
.resultados{
  color: $black !important;
  font-weight: normal !important;
  padding-left: 10%;
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
.item-prescripcion {
  font-size: 16px !important;
}
.item-prescripcion-subtitle {
  font-size: 16px !important;
}
.content-modal-examenes {
  padding: 3%;
}
.img-cards {
  width: 30%;
  margin-bottom: 5%;
}
</style>
