<template>
  <v-card>
    <h1 class="title-card">ES HORA DE CALIFICAR AL DOCTOR</h1>
    <div class="estilo-stepper">
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step  editable step="1">
            ¿Comó calificaría su atención?
          </v-stepper-step>
         
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
             <v-row style="margin:-5px 500px 0 0px">
            <v-card-text>             
              <v-col cols="5" sm="12">
                
                <div class="star-wrapper">
               
                  <v-btn
                    class="fas fa-star s1"
                    icon
                    outlined
                    large
                    @click=" guardarCalificacion(5)"
                  >
                    <span> <v-icon>mdi-star</v-icon> </span>
                  </v-btn>
                  <v-btn
                    class="fas fa-star s2"
                    icon
                    outlined
                    large
                    @click=" guardarCalificacion(4)"
                  >
                    <v-icon>mdi-star</v-icon> </v-btn
                  ><v-btn
                    class="fas fa-star s3"
                    icon
                    outlined
                    large
                    @click=" guardarCalificacion(3)"
                  >
                    <v-icon>mdi-star</v-icon> </v-btn
                  ><v-btn
                    class="fas fa-star s4"
                    icon
                    outlined
                    large
                    @click=" guardarCalificacion(2)"
                  >
                    <v-icon>mdi-star</v-icon> </v-btn
                  ><v-btn
                    class="fas fa-star s5"
                    icon
                    outlined
                    large
                    @click=" guardarCalificacion(1)"
                  >
                    <v-icon>mdi-star</v-icon>
                  </v-btn>
                </div>                
              </v-col>              
            </v-card-text>
            </v-row>
            <h2 class="azul">Déjanos un Comentario:</h2>
             <form>
                <v-text-field
                  v-model="opiniones.observacion"
                  label="Introducir comentario"
                  class="campos"
                  outlined
                ></v-text-field>
                <!-- Botones de cada step-->
                <v-row style="margin:200px 0 0 110px">
                   <v-col>
                  <button class="btn-volver" block @click="cerrarDialogo">
                    Volver
                  </button>
                </v-col>
                  <v-col>
                    <button
                      class="btn-guardar"
                      block
                      @click="guardarEvaluacion()"
                    >
                      Guardar Evaluacion
                    </button>
                  </v-col>
                </v-row>
              </form>

          </v-stepper-content>
        
        </v-stepper-items>
      </v-stepper>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
export default {
  name: "EvaluarOpiniones",
  props: ["evaluacion"],
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
    guardarCalificacion(a) {
      this.opiniones.calificacion = a;
      this.opiniones.datos_paciente.nombre = this.user.datos.nombre;
      this.opiniones.datos_paciente.apellido =this.user.datos.apellido_paterno+" "+this.user.datos.apellido_materno;
      this.user.apellido_materno + this.user.apellido_paterno;
    
      console.log("este es la calificacion:" + this.opiniones.calificacion);
    },
    async guardarEvaluacion() {
      console.log(this.opiniones.calificacion);
      this.opiniones.datos_medico.id_medico = this.evaluacion.id_medico;
      this.opiniones.datos_medico.nombre = this.evaluacion.datos_turno.datos_medico.nombre_apellido_medico;
      this.opiniones.datos_paciente.id_paciente = this.evaluacion.id_paciente;
      //this.opiniones.datos_paciente.nombre = this.evaluacion.datos_paciente.datos.nombre_apellido_paciente;
      this.opiniones.datos_cita.fecha = this.evaluacion.fecha_cita;
      this.opiniones.datos_cita.id_cita = this.evaluacion.id;
      this.opiniones.observacion = this.opiniones.observacion;
      //console.log(this.opiniones.datos_medico.id_medico);
      console.log("esta es el nuevo estado" + this.evaluacion.estado_atencion);
      await axios
        .post("/Calificacion/Registrar", this.opiniones)
        .then((res) => {
          this.opiniones = res.data;
          this.$emit("emit-obtener-citas");
          this.cargaRegistro = false;
          this.cerrarDialogo();
          this.mensaje(
            "success",
            "Listo",
            "Se guardo tu opinion",
            "<strong>Gracias<strong>",
            true
          );
        });
      await axios
        .put(
          "Cita/actualizarCitaEvaluada?idCita=" +
            this.opiniones.datos_cita.id_cita
        )
        .then(async (res) => {
          console.log("YA ACTUALIZO CREO, SI NO FUNCIONA A BAILAR WIWIWIWIW");
          console.log(res.data);
        });

      //console.log(this.Evaluaciones);
      //console.log(this.opiniones);
    },

    cerrarDialogo() {
      this.$emit("close-dialog-evaluar");
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
  },
  computed: {
    ...mapGetters(["user"]),
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
  margin: 2% 5% 5% 8%;
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
.btn-guardar {
  background: $green;
  color: white;
  border-radius: 10px;
  width: 70%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
button {
  margin: 0 15px;
  position: relative;
  padding: 0px 20px;
  background: rgb(255, 255, 255);
  color: rgb(255, 255, 255);
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s;
}

.star-wrapper {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  direction: rtl;

}
.star-wrapper button:hover {
  color: gold;
  transform: scale(1.3);
}
.s1:hover ~ button {
  color: gold;
}
.s2:hover ~ button {
  color: gold;
}
.s3:hover ~ button {
  color: gold;
}
.s4:hover ~ button {
  color: gold;
}
.s5:hover ~ button {
  color: gold;
}
.wrapper {
  position: absolute;
  bottom: 30px;
  right: 50px;
}
.azul{
  color:  $blue;
  font-size: 20px;
   text-align: center;;
}
</style>
