<template>
  <div class="main items">    
    <div v-for="cupo in cupos" :key="cupo.fecha_cupo">        
        <button class="item" @click="reserva">{{cupo.hora_inicio.split('T')[1].substr(0, 5) }}</button>        
    </div>  
     <v-dialog
          transition="dialog-bottom-transition"
          v-model="selectedOpen"
          max-width="700px"
        >
        <!-- Componente de reserva -->
          <v-card class="card">
            <div class="card-detallecita">
              <div class="card-detallecita_left">
                <h1>Dr. Stefano García Luza</h1>
                <h3><b>Especialidad</b> Cardiología</h3>
                <div>
                  Médico Especialista en Cardiología formado en el Hospital
                  Universitario Virgen Macarena (HUVM) de Sevilla (España). He
                  recibido una formación global dentro de la patología
                  cardiovascular con un enfoque humanista en el trato al
                  paciente y con un interés particular en investigación clínica.
                  Idiomas: Inglés. <br />
                  <h3>
                    <b>Costo de la cita: </b> S/. 150.00
                  </h3>
                </div>
              </div>
              <div class="card-detallecita_right">
                <img
                  src="https://ma.com.pe/sites/default/files/noticias/que-obligaciones-tiene-el-medico-ocupacional-frente-al-covid-19.jpg"
                  alt=""
                  class="profile-medico"
                />
                <img
                  src="https://www.perutourism.com/images/experiences/estrellas/5-estrellas.png"
                  alt=""
                  class="stars-bottom"
                />
              </div>
            </div>

            <div class="card-datoscupo">
              <div class="card-datocupo">
                23:00
              </div>
              <div class="card-datocupo">30 minutos</div>
            </div>
            <button class="button-reservar" @click="registrarCita">
              RESERVAR CITA
            </button>
            <v-dialog width="450px" v-model="cargaReserva" persistent>
              <v-card height="300px">
                <v-card-title class="justify-center"
                  >Reservando la cita</v-card-title
                >
                <div>
                  <v-progress-circular
                    style="display: block; margin: 40px auto"
                    :size="90"
                    :width="9"
                    color="blue"
                    indeterminate
                  ></v-progress-circular>
                </div>
                <v-card-subtitle
                  class="justify-center"
                  style="font-weight: bold; text-align: center"
                  >En unos momentos finalizaremos...</v-card-subtitle
                >
              </v-card>
            </v-dialog>
          </v-card>
        </v-dialog> 
  </div>
</template>

<script>
export default {
  name: "CardCuposDia",
  props: ["cupos"],  
  data() {
    return {
      selectedOpen: false,
      cargaReserva: false,
    };
  },
  methods: {
    registrarCita() {
      console.log("hola");
    },
    reserva() {
      this.selectedOpen = true;
      console.log("ghdkgfdskl");
    }
  }
};
</script>

<style lang="scss" scoped>
.main {
  @include flex-center;

  .items {
    display: flex;
    flex-wrap: wrap;
    margin: 0 10% 1.5%;
    .item {
      margin: 1rem 0.4rem;
      background: $sky-blue;
      width: 8rem;
      height: 2.4rem;
      border-radius: 1rem;
      font-size: 1.2rem;
      align-self: center;
      box-shadow: 0.14rem 0.14rem 0.14rem #999;
    }
  }
}


.card {
  display: flex;
  flex-direction: column;
  padding: 2%;
}

.card-detallecita {
  padding: 1.5%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .card-detallecita_left {
    display: flex;
    flex-direction: column;
    h1 {
      color: $blue;
      font-size: 20px !important;
      font-weight: normal;
    }
    h3 {
      color: $blue;
      font-size: 15px !important;
      font-weight: normal;
      margin-bottom: 2%;
    }
  }
  .card-detallecita_right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .profile-medico {
    width: 50%;
    height: 100%;
    border-radius: 50%;
    margin: 0 0 3% 0;
  }
  .stars-bottom {
    width: 25%;
    height: 10%;
    padding: 0 0 1% 0;
  }
}
.card-datoscupo {
  display: flex;
  flex-direction: row;
  .card-datocupo {
    border-radius: 6px;
    background: $sky-blue;
    color: $black;
    font-size: 18px;
    width: 20%;
    text-align: center;
    margin: 1%;
  }
}
.button-reservar {
  margin: 1%;
  background: $blue;
  color: $white;
  text-align: center;
  border-radius: 6px !important;
  width: 42%;
  height: 5vh;
}
</style>