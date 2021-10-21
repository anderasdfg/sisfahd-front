<template>
  <div style="margin-top: 40px" class="home">
    <v-card elevation="3" class="card" style="width: 85%">
      <v-col>
        <v-row>
          <div
            class="card-detalle-atencion"
            style="
              width: 75%;
              margin: 0 auto;
              margin-top: 50px;
              background-color: #f2f7fd;
            "
          >
            <v-row>
              <h1 style="margin: auto; margin-top: 20px; margin-bottom: 20px">
                Datos del paciente
              </h1>
            </v-row>
            <v-row>
              <v-col >
                <img
                  :src="
                    this.usuario.datos.foto
                      ? this.user.datos.foto
                      : 'https://image.flaticon.com/icons/png/512/2741/2741191.png'
                  "
                  alt="Perfil"
                  class="perfil"
                />
              </v-col>
              <v-col>
                <span
                  ><h3>Nombre del paciente</h3>
                  {{
                    this.usuario.datos.nombre +
                    " " +
                    this.usuario.datos.apellido_paterno +
                    " " +
                    this.usuario.datos.apellido_materno
                  }}</span
                >
                <span
                  ><h3>Correo</h3> {{ this.usuario.datos.correo }}</span
                >
                <span
                  ><h3>Documento</h3> {{ this.usuario.datos.tipo_documento +
              " - " +
              this.usuario.datos.numero_documento }}</span
                >
              </v-col>
              <v-col>                
                <span
                  ><h3>Fecha de nacimiento</h3>
                  {{
                    this.usuario.datos.fecha_nacimiento
                  }}</span
                >
                <span
                  ><h3>Sexo</h3> {{ this.usuario.datos.sexo }}</span
                >
                <span
                  ><h3>Telefono</h3> {{ this.usuario.datos.telefono }}</span
                >
              </v-col>
              <v-col>
                <button class="little" style="margin-bottom:50px; width:100%" >Historia clínica</button>
        <button class="little" style="width:100%">Información Médica</button>
              </v-col>
            </v-row>
          </div>

          <!-- <CardPaciente
            class="card-paciente"
            :user="this.usuario"
            style="margin: 0 auto; margin-top: 20px"
          /> -->
        </v-row>
        <v-row>
          <div
            class="card-detalle-atencion"
            style="
              width: 75%;
              margin: 0 auto;
              margin-top: 50px;
              margin-bottom: 50px;
              background-color: #f2f7fd;
            "
          >
            <v-col>
              <v-row>
                <h1 style="margin: auto; margin-top: 20px">
                  Detalle de la atención
                </h1>
              </v-row>
              <v-row>
                <v-col>
                  <h2 style="margin: auto; margin-top: 20px">
                    Especialidad elegida:
                  </h2>
                  <h3>{{ especialidad }}</h3>
                </v-col>
                <v-col>
                  <h2 style="margin: auto; margin-top: 20px">
                    Fecha de la cita:
                  </h2>
                  <h3>{{ fechainicio }}</h3>
                </v-col>
              </v-row>
            </v-col>
          </div>
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
              v-if="esAtencion"
            >
              <v-icon left>mdi-check</v-icon>
              Iniciar atención
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-card>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Cargando el inicio de la atención</v-card-title
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
    <v-snackbar v-model="snackbar" color="success" elevation="24" bottom>
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
import axios from "axios";
import CardPaciente from "@/components/CardPaciente.vue";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "DetalleAtencion",
  data: () => ({
    especialidad: "",
    fechainicio: "",
    id_actoM: "",
    id_cita: "",
    estado_atencion: "",
    esAtencion: false,
    cargaRegistro: false,
    misDatitos: {},
    id_usuario: "",
    usuario: {},
    snackbar: false,
    text: `Algo paso al insertala el acto medico en la cita, anderley tranquila! intenta nuevamente`,
    actomedico: {
      medicacion: {
        medicacion_previa: [],
        reaccion_adversa: [],
      },
      diagnostico: [],
      signos_vitales: {
        constantes_vitales: {
          temperatura: {
            valor: "",
            medida: "ºC",
          },
          presion_arterial: {
            valor: "",
            medida: "mmhg",
          },
          saturacion: {
            valor: "",
            medida: "%",
          },
          frecuencia_cardiaca: {
            valor: "",
            medida: "min",
          },
          frecuencia_respiratoria: {
            valor: "",
            medida: "min",
          },
        },
        datos_antropometricos: {
          peso: {
            valor: "",
            medida: "kg",
          },
          talla: {
            valor: "",
            medida: "m",
          },
          perimetro_abdominal: {
            valor: "",
            medida: "cm",
          },
          superficie_corporal: {
            valor: "",
            medida: "m2",
          },
          imc: 0,
          clasificacion_imc: "",
        },
      },
      anamnesis: "",
      indicaciones: "",
    },
  }),
  components: {
    CardPaciente,
  },
  mounted() {},
  async created() {
    this.fetchUser();
    //console.log(this.$route.params.datitos);
    this.especialidad = this.$route.params.datitos.esp;
    this.fechainicio = this.$route.params.datitos.fi;
    this.id_actoM = this.$route.params.datitos.id_acto_medico;
    this.id_cita = this.$route.params.datitos.cita;
    this.estado_atencion = this.$route.params.datitos.estado_atencion;
    await this.getCita(this.id_cita);
    await this.getUsuario(this.id_usuario);
    var mifechai = new Date(this.fechainicio);
    var mifechaf = new Date(this.$route.params.datitos.fe);
    var fechaact = new Date();

    if (this.estado_atencion == "atendido") {
      this.esAtencion = false;
    } else {
      this.esAtencion = true;
    }

    /* poner cuando sea presentacion
    if (mifechai < fechaact && fechaact < mifechaf) {
      this.esAtencion = true;
    } else {
      this.esAtencion = false;
    }
    */

    this.misDatitos = this.$route.params.datitos;
  },
  methods: {
    ...mapActions(["fetchUser"]),
    navegarto(ruta) {
      this.$router.push(ruta);
    },
    async navegartoIniciar() {
      if (this.id_actoM == "" || this.id_actoM == null) {
        let idactitomediquito = "";
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
          id: this.id_cita,
        };

        if (
          idactitomediquito.trim() == "" ||
          idactitomediquito == undefined ||
          idactitomediquito == null
        ) {
          this.cargaRegistro = false;
          //por si pasa
          this.snackbar = true;
        } else {
          await axios
            .put("/Cita/actualizarSoloidActoMedico", micitatemporal)
            .then((x) => {
              console.log("resultado de la actualizacion");
              console.log(x.data);
            })
            .catch((err) => console.log(err));

          this.misDatitos.id_acto_medico = idactitomediquito;

          this.cargaRegistro = false;

          //Redirigimos
          this.$router.push({
            name: "IniciarAtencion",
            params: {
              datitos: this.misDatitos,
            },
          });
        }
      } else {
        //Redirigimos
        this.$router.push({
          name: "IniciarAtencion",
          params: {
            datitos: this.misDatitos,
          },
        });
      }
    },
    async getCita(idCita) {
      await axios
        .get(`/Cita/id?id=${idCita}`)
        .then(async (x) => {
          console.log(x.data);
          await axios
            .get(`/Paciente?id=${x.data.id_paciente}`)
            .then((y) => {
              console.log(y.data);
              console.log(y.data.id_usuario);
              this.id_usuario = y.data.id_usuario;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    async getUsuario(idUsuario) {
      await axios
        .get(`/Usuario/id?id=${idUsuario}`)
        .then(async (x) => {
          console.log(x.data);
          this.usuario = x.data;
        })
        .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapState(["drawer"]),
    ...mapGetters(["user"]),
  },

  filters: {},
};
</script>

<style lang="scss" scoped>
.home {
  margin: 1%;
  display: flex;
  justify-content: space-around;
}
.card-paciente {
  max-width: 60%;
}
.card-detalle-atencion {
  background: #f2f7fd;
  border-radius: 20px;
  padding: 20px;
  width: 90% !important;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
.perfil {
  width: 120px !important;
  height: 120px !important;
  border-radius: 120px;
  margin-left: 20px;
}
.little{
  background: white !important;
    color: $blue; 
    border-radius: 6px;    
    height: 5vh;
    padding: 1.5%;
    text-align: center;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
}
</style>