<template>
  <v-app>
    <section class="body">
      <div class="body-izq">
        <div class="contenido-izq">
          <div class="texto-stepper">Realiza el pago de tu consulta</div>
          <h3>Datos de la cita</h3>
           <p><b>FECHA </b><br> {{this.cita.fecha_cita.split("T")[0].substr(0, 10)}} </p>
          <p><b>HORA </b><br> {{this.cita.fecha_cita.split("T")[1].substr(0, 5)}} </p> 
          <p><b>PACIENTE </b> <br>{{this.cita.datos_paciente.datos.nombre_apellido_paciente}} <br> {{this.cita.datos_paciente.datos.correo}} </p>
          <p><b>ESPECIALIDAD </b><br> {{this.cita.datos_turno.especialidad.nombre}} </p>
          <p><b>MÉDICO </b><br> {{this.cita.datos_turno.datos_medico.nombre_apellido_medico}} </p>
        </div>
      </div>
      <div class="body-der">
        <div class="div1">
          <h3>El costo de tu reserva es <br> S/. {{this.cita.precio_neto}}</h3>
          <p class="subtitle">Paga aquí: </p>
          <img class="img-cards" src="https://i.ibb.co/YPDZ1x8/tarjetas.png" alt="tarjetas">
          <BotonNiubiz :pago="this.cita"/>
        </div>
        <div class="div2">
          <img class="img-der" src="https://i.ibb.co/fn1GnYz/undraw-online-payments-luau-1.png" alt="payment">
        </div>

      </div>
    </section>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from 'vuex';
import BotonNiubiz from "../../components/GestionarCitas/ComponentesPagos/BotonNiubiz.vue"

export default {
  name: "Pago",

  components: {
    BotonNiubiz
  },
   data() {
    return {
        idCita: '',
        cita: {},
        model: {
          username: '',
          password: ''
      },
    }
  },
  async created() {
    this.obtenerDetalleCita();
   // this.iniciarSesion(); //inicia al tratarse de un paciente nuevo
  },
  methods: {
     ...mapActions(['indirectLogIn']),
    async obtenerDetalleCita() {
      console.log(this.$route.params.idCita);
      this.idCita = this.$route.params.idCita;
        await axios
        .get(
          `/Cita/id?id=${this.idCita}`
        )
        .then((x) => {
            console.log(x.data);
            this.cita  = x.data;
            this.model.username = this.cita.datos_paciente.usuario;
            this.model.password = this.cita.datos_paciente.clave;
            console.log("aqui");
            console.log(this.model);
            this.indirectLogIn(this.model);

        })
        .catch((err) => console.log(err));
    },
    // iniciarSesion() {
    //   this.model.username = this.cita.datos_paciente.clave;
    //   this.model.password = this.cita.datos_paciente.usuario;
    // }
  },
}
</script>


<style lang="scss" scoped>
@import "../../styles/main.scss";
.toolbar-login {
  background-color: black;
  min-width: 10%;
  height: 10%;
}
.body {
  display: flex;
  flex-direction: row;
  .body-izq {
    background-color: #f2f7fd;
    width: 30%;
    flex-shrink: 0;
    padding-left: 10%px;
    overflow: hidden;
    position: relative;
    .contenido-izq {
      padding: 10% 10% 0 10%;
      .texto-stepper {
        text-align: left;
        padding-bottom: 20px;
        font-weight: bold;
        color: #535b6c;
        font-size: 30px;
        line-height: 40px;
        letter-spacing: 0.2px;
      }
      h3 {
        text-align: left;
        padding-bottom: 30px;
        font-weight: bold;
        color: #535b6c;
        font-size: 20px;
        line-height: 40px;
      }
    }
  }
  .body-der {
    min-height: 100vh ;
    padding: 3%;
    background-color: white;
   // background-color: #e5e5e5;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    flex-wrap: wrap;

    h3 {
       font-weight: bold;
        color: #535b6c;
        font-size: 30px;
    }
    .img-der {
      width: 100%;
      height: 70%;
    }
    .div1, .div2 {
      width: 50%;
    }
    .subtitle {
      padding: 5% 0;
      font-size: 20px;
    }
    .img-cards {
      width: 30%;
      margin-bottom: 5%;
    }
  }
}
</style>
