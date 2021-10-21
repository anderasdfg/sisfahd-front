<template>
  <v-card>
    <h1 class="title-card">ES HORA DE CALIFICAR AL DOCTOR</h1>
    <div class="estilo-stepper">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">
            ¿Comó calificaría su atención?
          </v-stepper-step>

          <v-divider></v-divider>
          <v-stepper-step editable step="2">
            Si desea dejar un comentario puede hacerlo en la casilla inferior
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card-text >
              <v-col center cols="24" sm="6">
                <v-btn
                icon
                  outlined                  
                  color="yellow"
                  @click="guardarEvaluacion(1)">  <span>        
                
                  <v-icon>mdi-star</v-icon>        </span>             
                </v-btn>
                <v-btn
                  icon
                  outlined
                  color="yellow"
                  @click="guardarEvaluacion(2)"
                >
                  <v-icon>mdi-star</v-icon> </v-btn
                ><v-btn
                  icon
                  outlined
                  color="yellow"
                  @click="guardarEvaluacion(3)"
                >
                  <v-icon>mdi-star</v-icon> </v-btn
                ><v-btn
                  icon
                  outlined
                  color="yellow"
                  @click="guardarEvaluacion(4)"
                >
                  <v-icon>mdi-star</v-icon> </v-btn
                ><v-btn
                  icon
                  outlined
                  color="yellow"
                  @click="guardarEvaluacion(5)"
                >
                  <v-icon>mdi-star</v-icon>
                </v-btn>
              </v-col>

              <v-row style="margin:0 0 0 150px">
                <v-col>
                  <button class="btn-siguiente" block @click="siguienteStep(2)">
                    Continuar
                  </button>
                </v-col>
                <v-col>
                  <button class="btn-volver" block @click="cerrarDialogo">
                    Volver
                  </button>
                </v-col>
              </v-row>
            </v-card-text>
          </v-stepper-content>
          <v-stepper-content step="2"
            ><!--CONTIENE EL STEPPERS 2 -->
            <v-card-text>
              <form>
                <v-text-field
                  v-model="opiniones.datos_medico.id_medico"
                  label="Introducir comentario"
                  class="campos"
                  outlined
                  readonly
                ></v-text-field>
                <!-- Botones de cada step-->
                <v-row style="margin:0 0 0 110px">
                  <v-col>
                    <button
                      class="btn-siguiente"
                      block
                      @click="siguienteStep(1)"
                    >
                      Continuar
                    </button>
                  </v-col>
                  <v-col>
                    <button class="btn-volver" block @click="cerrarDialogo">
                      Volver
                    </button>
                  </v-col>
                </v-row>
              </form>
            </v-card-text>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "EvaluarOpiniones",
  props: ["opinion"],
  data() {
    return {
      a: 1,
      step: 1,
      opiniones: {
        datos_medico: {
          nombre: "a",
          id_medico: "",
        },
        datos_paciente: {
          id_paciente: "",
          nombre: "",
          apellido: "",
        },
        calificacion: "",
        observacion: "",
        datos_cita: {
          fecha: "",
          id_cita: "",
        },
      },
      Evaluaciones: [],
    };
  },

  methods: {
    numeroEvaluacion(a) {
      console.log(a);
      return a;
    },
    async guardarEvaluacion(a) {
      
      this.Evaluaciones =  [];
      //   evaluacion.id_medico=opinion.datos_medico.id_medico;
      //  opinion.datos_medico.id_medico=;
      this.opiniones.datos_medico.nombre = this.opiniones.datos_medico.nombre;
      this.opiniones.datos_medico.id_medico = this.opiniones.datos_medico.id_medico;
      this.opiniones.datos_paciente.id_paciente = this.opiniones.datos_paciente.id_paciente;
      this.opiniones.datos_paciente.nombre =  this.opiniones.datos_paciente.nombre;
      this.opiniones.datos_paciente.apellido = this.opiniones.datos_paciente.apellido;
      this.opiniones.calificacion =  this.opiniones.calificacion;
      this.opiniones.observacion =  this.opiniones.observacion;
      this.opiniones.datos_cita.fecha = this.opiniones.datos_cita.fecha;
      this.opiniones.datos_cita.id_cita = this.opiniones.datos_cita.id_cita;         

      
      this.Evaluaciones = this.opiniones.datos_medico;
      
      console.log(this.Evaluaciones);
      console.log(this.opiniones);
      console.log(a);      
      
    },
    
    cerrarDialogo() {
      this.$emit("close-dialog-evaluar");
    },
    siguienteStep(num) {
      this.step = num;
      event.preventDefault();
    },
  },
};
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 2%;
  text-align: center;
}
.estilo-stepper {
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 2% 2% 2%;
  border-color: white;
  border: hidden;
}
.filas {
  margin: 2% 8% 5% 8%;
}
.btn-volver {
  background: $red;
  color: white;
  border-radius: 10px;
  width: 60%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-siguiente {
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 70%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
button{  
  margin:0 15px;
  position: relative;   
  padding: 0px 20px;   
  background: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  cursor: pointer; 
  overflow: hidden;
  transition: .3s;
}
button span{
  position: absolute;      
  border-radius: 50%; 
  transition: .3s;
}
button:hover span{  

}
button:hover{
  color: white;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.7);
}
</style>
