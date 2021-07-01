<template>
  <div style="margin-top: 40px;" class="home">
      <v-card elevation="3" class="card" style="width: 85%">
          <v-col>
            <v-row>
                <CardPaciente class="card-paciente"  :user="this.user" style="margin: 0 auto; margin-top: 20px"/>
            </v-row>
            <v-row>
                <v-card elevation="3" class="card" style="width: 75%; margin: 0 auto; margin-top: 50px; margin-bottom: 50px; background-color: #CDCDCD;">
                    <v-col>
                        <v-row>
                            <h1 style="margin: auto; margin-top: 20px">DETALLE DE LA ATENCIÓN</h1>
                        </v-row>
                        <v-row>
                            <v-col>
                                <h2 style="margin: auto; margin-top: 20px;">Especialidad elegida:</h2>
                                <h3>{{especialidad}}</h3>
                            </v-col>
                            <v-col>
                                <h2 style="margin: auto; margin-top: 20px;">Fecha de la cita:</h2>
                                <h3>{{fechainicio}}</h3>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-card>
            </v-row>
            <v-row>
                <v-col>
                    <v-btn
                        color="error"
                        elevation="2"
                        style="color: white"
                        @click="navegarto('/gestionarAtencion')"
                        >
                        <v-icon left>mdi-close-outline</v-icon>
                        Volver
                    </v-btn>
                </v-col>
                <v-col align="right">
                    <v-btn 
                        
                        color="success"
                        elevation="2"
                        style="color: white"
                        @click="navegartoIniciar()"
                        > <!--v-if="esAtencion" poner cuando sea presentacion-->
                        <v-icon left>mdi-check</v-icon>
                        Iniciar atención
                    </v-btn>
                </v-col>
            </v-row>
        </v-col>
      </v-card>
      <v-dialog width="450px" v-model="cargaRegistro" persistent>
            <v-card height="300px">
            <v-card-title class="justify-center">Cargando el inicio de la atención</v-card-title>
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
  </div>
</template>
<script>

import axios from "axios";
import CardPaciente from '@/components/CardPaciente.vue';
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "DetalleAtencion",
  data: () => ({
    especialidad: "",
    fechainicio: "",
    id_actoM: "",
    id_cita: "",
    esAtencion: false,
    cargaRegistro: false,
    misDatitos: {},
    actomedico: {
        medicacion: {
            medicacion_previa: [],
            reaccion_adversa: []
        },
        diagnostico: [],
        signos_vitales: {
            constantes_vitales: {
                temperatura: {
                    valor: "",
                    medida: "ºC"
                },
                presion_arterial: {
                    valor: "",
                    medida: "mmhg"
                },
                saturacion: {
                    valor: "",
                    medida: "%"
                },
                frecuencia_cardiaca: {
                    valor: "",
                    medida: "min"
                },
                frecuencia_respiratoria: {
                    valor: "",
                    medida: "min"
                }
            },
            datos_antropometricos: {
                peso: {
                    valor: "",
                    medida: "kg"
                },
                talla: {
                    valor: "",
                    medida: "m"
                },
                perimetro_abdominal: {
                    valor: "",
                    medida: "cm"
                },
                superficie_corporal: {
                    valor: "",
                    medida: "m2"
                },
                imc: 0,
                clasificacion_imc: ""
            },
        },
        anamnesis: "",
        indicaciones: ""
    }
  }),
  components : {
      CardPaciente
  },
  mounted () {
      
  },
  async created() {
      this.fetchUser();    
    //console.log(this.$route.params.datitos);
    this.especialidad = this.$route.params.datitos.esp;
    this.fechainicio = this.$route.params.datitos.fi;
    this.id_actoM = this.$route.params.datitos.id_acto_medico;
    this.id_cita = this.$route.params.datitos.cita;

    var mifechai = new Date(this.fechainicio);
    var mifechaf = new Date(this.$route.params.datitos.fe);
    var fechaact = new Date();

    if( mifechai < fechaact && fechaact < mifechaf) {
        this.esAtencion = true;
    }
    else {
        this.esAtencion = false;
    }

    this.misDatitos = this.$route.params.datitos;
  },
  methods: {
    ...mapActions(["fetchUser"]),  
    navegarto(ruta){
      this.$router.push(ruta)
    },
    async navegartoIniciar(){
        let idactitomediquito = "";
        if(this.id_actoM == "" || this.id_actoM == null) {

            this.cargaRegistro = true;

            await axios
            .post("/ActoMedico/Registrar", this.actomedico)
            .then((x) => {
                idactitomediquito = x.data.id;
                console.log("id acto medico: " + idactitomediquito);
            })
            .catch((err) => console.log(err));

            //creamos variable temporal para la cita
            let micitatemporal = {
                estado_atencion: "",
                estado_pago: "",
                id_paciente: "",
                enlace_cita: "",
                precio_neto: 0,
                calificacion: 0.0,
                observaciones: [],
                tipo_pago: "",
                id_turno: "",
                id_acto_medico: idactitomediquito,
                id_medico: "",
                id: this.id_cita
            };

            await axios
            .put("/Cita/actualizarSoloidActoMedico", micitatemporal)
            .then((x) => {
                console.log("resultado de la actualizacion");
                console.log(x.data);
            })
            .catch((err) => console.log(err));

            this.misDatitos.id_acto_medico = idactitomediquito;
            this.cargaRegistro = false;
        }        
        //Redirigimos
        this.$router.push({
            name: 'IniciarAtencion',
            params: {
                datitos: this.misDatitos
            }
        });
    }
  },
  computed: {
    ...mapState(["drawer"]),
    ...mapGetters(["user"]),
  },

  filters: {
    
  },
};
</script>

<style lang="scss">
    .home {
    margin: 1%;
    display: flex;
    justify-content: space-around;   
    }
    .card-paciente {
        max-width: 60%;
    }
    
</style>