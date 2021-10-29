<template>
  <div class="principal">
    <v-row justify="center">
      <h2 class="titulo-principal">Agendar cita</h2>
    </v-row>
    <!-- <v-divider style="margin-bottom:12px;"/> -->
    <div class="contenido">
      <p class="texto">
        Agende una nueva cita para el paciente
        <span class="resaltado">{{ this.nombrePaciente }}</span>
      </p>
      <v-row>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Fecha de la cita"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-row>
      <div class="botones">
        <button class="btn-cancelar">Cancelar</button>
        <button class="btn-agendar">Agendar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Agendar",
  props: ["idCita"],
  data: () => ({
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    menu: false,
    modal: false,
    menu2: false,
    cita: {},
    nombrePaciente: "",
    cita: {
      estado_atencion: "no atendido",
      estado_pago: "no pagado",
      fecha_cita: "",
      fecha_pago: null,
      fecha_reserva: "",
      id_paciente: "",
      enlace_cita: "",
      precio_neto: 0,
      calificacion: 0,
      observaciones: [],
      tipo_pago: "",
      id_turno: "",
      id_acto_medico: "",
      fecha_cita_fin: "",
      motivo_consulta: "",
      id_medico: "",
    },
  }),
  async created() {
    await this.getCita(this.idCita);
  },
  methods: {
    async getCita(idCita) {
      await axios
        .get(`/Cita/id?id=${idCita}`)
        .then(async (x) => {
          console.log("información de la cita");
          console.log(x.data);
          this.cita = x.data;
          this.nombrePaciente =
            this.cita.datos_paciente.datos.nombre_apellido_paciente;
          // await axios
          //   .get(`/Paciente?id=${x.data.id_paciente}`)
          //   .then((y) => {
          //     console.log("información del paciente");
          //     console.log(y.data);
          //   })
          //   .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    async registrarCita() {
      
      //this.cita.estado_atencion = "no atendido"
      //this.cita.estado_pago = "no pagado"
      this.cita.fecha_cita = ""
      //this.cita.fecha_pago = null
      this.cita.fecha_reserva = ""
      this.cita.id_paciente = ""
      this.cita.enlace_cita = ""
      this.cita.precio_neto = 0
      //this.cita.calificacion = 0
      //this.cita.observaciones = []
      //this.cita.tipo_pago = ""
      this.cita.id_turno = ""
      this.cita.id_acto_medico = ""
      this.cita.fecha_cita_fin = ""
      this.cita.motivo_consulta = ""
      this.cita.id_medico = ""
  
      //   this.usuario.usuario = this.usuario.datos.correo;
      //   this.usuario.datos.tipo_documento =
      //     this.usuario.datos.tipo_documento.value;
      //   this.cargaRegistro = true;
      //   await axios
      //     .post("/Usuario", this.usuario)
      //     .then(async (res) => {
      //       this.usuario = res.data;
      //       this.paciente.id_usuario = this.usuario.id;
      //       await axios
      //         .post("/Paciente", this.paciente)
      //         .then(async (x) => {
      //           this.paciente = x.data;
      //           var hoy = new Date();
      //           var fechaFin = moment(this.cupos.hora_inicio)
      //             .add(this.cupos.ratio, "minutes")
      //             .format("YYYY-MM-DDTHH:mm:ss");
      //           this.cita.fecha_cita = this.cupos.hora_inicio;
      //           this.cita.id_paciente = this.paciente.id;
      //           this.cita.enlace_cita = `https://meet.jit.si/${
      //             this.paciente.id
      //           }${hoy.getMinutes()}`;
      //           this.cita.precio_neto = this.cupos.precio;
      //           this.cita.id_turno = this.cupos.id_turno;
      //           this.cita.fecha_cita_fin = fechaFin;
      //           this.cita.fecha_reserva = new Date(
      //             Date.now() - new Date().getTimezoneOffset() * 60000
      //           ).toISOString();
      //           this.cita.id_medico = this.cupos.id_medico;
      //           console.log("cita");
      //           console.log(this.cita);
      //           await axios
      //             .post("/Cita/cita", this.cita)
      //             .then((y) => {
      //               this.cita = y.data;
      //               this.cargaRegistro = false;
      //               this.realizarPago(this.cita.id);
      //             })
      //             .catch((err) => {
      //               console.log(err);
      //             });
      //         })
      //         .catch((err) => {
      //           console.log(err);
      //         });
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
    },
  },
};
</script>

<style lang="scss" scoped>
.principal {
  padding: 3% 5%;
}
.titulo-principal {
  color: $blue;
  margin: 20px;
}
.botones {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  button {
    padding: 1% 2%;
    border: none;
    border-radius: 10px;
    color: $white;
  }
  .btn-agendar {
    background-color: $blue;
  }
  .btn-cancelar {
    background-color: $red;
  }
}
.resaltado {
  color: $blue;
  font-weight: bold;
}
.texto {
  margin: 20px 0 30px;
}
</style>