<template>
  <div class="contenedor-general">
    <div class="contenedor-izquierda">
      <div class="contenedor-reunion">
        <iframe
          :src="this.urlCita"
          title="Reunion"
          class="item-reunion"
          allow="camera;microphone"
        ></iframe>
      </div>
      <div class="contenedor-info-paciente">
        <InfoPaciente :datos="this.info_cita" />
      </div>
    </div>
    <div class="contenedor-derecha">
      <div class="contenedor-derecha-top">
        <v-tabs
          background-color="#4172F2"
          dark
          v-model="tab"
          class="contenedor-tab"
        >
          <v-tab>Anamnesis</v-tab>
          <v-tab>Medicación</v-tab>
          <v-tab>Signos vitales</v-tab>
          <v-tab>Diagnóstico</v-tab>
          <v-tab>Indicaciones</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="contenedor-item-tab">
          <v-tab-item>
            <div class="item-atencion">
              <Anamnesis @getAnamnesis="getAnamnesis" :anamnesis="this.acto_medico.anamnesis"/>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">
              <Medicacion
                @getMedicacionPrevia="getMedicacionPrevia"
                @getReaccionAdversa="getReaccionAdversa"
                :medicacion="this.acto_medico.medicacion"
              />
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">
              <SignosVitales @getSignosVitales="getSignosVitales" 
              :signos_vitales="this.acto_medico.signos_vitales"/>
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">
              <Diagnostico @getDiagnostico="getDiagnostico"
              :diagnostico="this.acto_medico.diagnostico" />
            </div>
          </v-tab-item>
          <v-tab-item>
            <div class="item-atencion">
              <Indicaciones @getIndicaciones="getIndicaciones"
              :indicaciones="this.acto_medico.indicaciones" />
            </div>
          </v-tab-item>
        </v-tabs-items>
      </div>
      <div class="contenedor-derecha-bottom">
        <button class="btn-guardar orange" @click="guardarActoMedico()">
          Guardar
        </button>
        <button class="btn-guardar green" @click="dialogConfirmacion = true">
          Finalizar
        </button>
      </div>
      <v-dialog v-model="dialogConfirmacion" max-width="500">
        <v-card>
          <v-card-title> ¿Esta seguro que desea finalizar? </v-card-title>

          <v-card-text>
            La acción no se podrá deshacer y no podrá editar más los campos.
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="red darken-1"
              text
              @click="dialogConfirmacion = false"
            >
              Cancelar
            </v-btn>

            <v-btn color="green darken-1" text @click="terminar()">
              Aceptar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import InfoPaciente from "@/components/ComponentesAtencion/InfoPaciente.vue";
import Anamnesis from "@/components/ComponentesAtencion/Anamnesis.vue";
import Indicaciones from "@/components/ComponentesAtencion/Indicaciones.vue";
import Medicacion from "@/components/ComponentesAtencion/Medicacion.vue";
import SignosVitales from "@/components/ComponentesAtencion/SignosVitales.vue";
import Diagnostico from "@/components/ComponentesAtencion/Diagnostico.vue";

import axios from "axios";
import { createLogger } from 'vuex';

export default {
  name: "Atencion",
  components: {
    InfoPaciente,
    Anamnesis,
    Medicacion,
    SignosVitales,
    Diagnostico,
    Indicaciones,
  },
  data() {
    return {
      tab: null,
      id_cita: "",
      dialogConfirmacion: false,
      acto_medico: {
        anamnesis: "",
        indicaciones: "",
        diagnostico: [],
        medicacion: {
          medicacion_previa: [],
          reaccion_adversa: [],
        },
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
      },
      cita: {},
      idHistoria: "",
      info_cita: {
        paciente: "",
        fecha_hora: "",
        especialidad: "",
        documento: "",
        genero: "",
        fecha_nacimiento: "",
        codigo_cita: "",
      },
      paciente: {},
      usuarioPaciente: {},
      urlCita: "",
      acto_medico_dto: {
        acto_medico: {},
        datos_orden: {
          id_paciente: "",
          precio_neto: "",
          id_medico: "",
        },
      },
      neto: 0,
      historia: {
        id: "",
        historial: [],
      },
    };
  },
  async created() {
    this.id_cita = this.$route.params.datitos.cita;
    this.urlCita = this.$route.params.datitos.enlace_cita;
    await this.getCita(this.id_cita);
    await this.obtenerActoMedico();
  },
  methods: {
    async obtenerActoMedico() {
      await axios
        .get("/ActoMedico/id?id=" + this.$route.params.datitos.id_acto_medico)
        .then((x) => {
          console.log("Acto obtenido de la BD");
          console.log(x.data);
          this.acto_medico = x.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getAnamnesis(anamnesis) {
      this.acto_medico.anamnesis = anamnesis;
    },
    getMedicacionPrevia(medicacionPrevia) {
      this.acto_medico.medicacion.medicacion_previa = medicacionPrevia;
    },
    getReaccionAdversa(reaccionAdversa) {
      this.acto_medico.medicacion.reaccion_adversa = reaccionAdversa;
    },
    getSignosVitales(signosVitales) {
      this.acto_medico.signos_vitales = signosVitales;
    },
    getDiagnostico(diagnostico) {
      this.acto_medico.diagnostico = diagnostico;
    },
    getIndicaciones(indicaciones) {
      this.acto_medico.indicaciones = indicaciones;
    },
    async getCita(idCita) {
      await axios
        .get(`/Cita/id?id=${idCita}`)
        .then(async (x) => {
          console.log("información de la cita");
          console.log(x.data);
          this.cita = x.data;
          await axios
            .get(`/Paciente?id=${x.data.id_paciente}`)
            .then((y) => {
              console.log("información del paciente");
              console.log(y.data);
              this.paciente = y.data;
              console.log(y.data.id_usuario);
              this.idHistoria = y.data.id_historia;
            })
            .catch((err) => console.log(err));
          await axios
            .get(`/Usuario/id?id=${this.paciente.id_usuario}`)
            .then((t) => {
              console.log("información del usuario");
              console.log(t.data);
              this.usuarioPaciente = t.data;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));

      this.info_cita.paciente =
        this.cita.datos_paciente.datos.nombre_apellido_paciente;
      this.info_cita.fecha_hora = this.cita.fecha_cita;
      this.info_cita.especialidad = this.cita.datos_turno.especialidad.nombre;
      this.info_cita.documento = this.usuarioPaciente.datos.numero_documento;
      this.info_cita.genero = this.usuarioPaciente.datos.sexo;
      this.info_cita.fecha_nacimiento =
        this.usuarioPaciente.datos.fecha_nacimiento;
      this.info_cita.codigo_cita = this.cita.id;
    },
    async guardarActoMedico() {

      await this.getPrecioNetoExamenes();
      this.acto_medico_dto.acto_medico = this.acto_medico;
      this.acto_medico_dto.datos_orden.id_paciente = this.cita.id_paciente;
      this.acto_medico_dto.datos_orden.id_medico = this.cita.id_medico;
      this.acto_medico_dto.datos_orden.precio_neto = this.neto;
      console.log("acto médico");
      console.log(this.acto_medico_dto);
      await axios
        .put("/ActoMedico/Actualizar", this.acto_medico_dto)
        .then((x) => {
          console.log("GUARDADO PS");
          console.log(x.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async getPrecioNetoExamenes() {
      let examenesAux =[]
      
    for( let item_diagnostico in this.acto_medico.diagnostico){
        for(let item_examen in this.acto_medico.diagnostico[item_diagnostico].examenes_auxiliares ) {
          examenesAux.push(this.acto_medico.diagnostico[item_diagnostico].examenes_auxiliares[item_examen])
        }            
    }    
     examenesAux.forEach(element => {       
        this.getExamen(element.codigo)
     });
      
      console.log(this.neto);
        
    },
    async getExamen(id) {
      await axios
        .get("/Examenes/id?id=" +id)
        .then((x) => {
          console.log(x);
          console.log(x.data.precio);
          this.neto += x.data.precio;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async obtenerHistoria(idHistoria) {
      await axios
        .get("/Historia/id?id=" + idHistoria)
        .then(async (x) => {
          this.historia = x.data;
          console.log("historiaaa");
          console.log(this.historia);
          
          this.historia.id = this.idHistoria;
          let historial = {
            fecha_cita: "",
            hora_inicio: "",
            hora_fin: "",
            datos_medico: {
              nombre_medico: "",
              id_medico: "",
              nombre_especialidad: "",
            },
            id_cita: "",
          };
          historial.fecha_cita = this.cita.fecha_cita;
          historial.hora_inicio = this.cita.fecha_cita
            .split("T")[1]
            .substr(0, 5);
          historial.hora_fin = "8:30";
          historial.datos_medico.nombre_medico =
            this.cita.datos_turno.datos_medico.nombre_apellido_medico;
          historial.datos_medico.id_medico = this.cita.id_medico;
          historial.datos_medico.nombre_especialidad =
            this.cita.datos_turno.especialidad.nombre;
          historial.id_cita = this.cita.id;
          this.historia.historial = [];
          this.historia.historial.push(historial);
          console.log("Historia pusheada");
          console.log(this.historia);
          //hace el put c:
          await axios
            .put("/Historia/historia", this.historia)
            .then((res) => {
              console.log("fdskjfdsfkjsdfs");
              console.log(res.data);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    navegarto(ruta) {
      this.$router.push(ruta);
    },
     async sendCorreo() {
       await axios
        .post("/ActoMedico/enviarDiagnostico?idCita=" + this.cita.id)
        .then((res) => {          
            console.log(res.data);
        })
        .catch((err) => console.log(err));
    },
    async terminar() {
      this.obtenerHistoria(this.idHistoria);
      await axios
        .put(
          "/Cita/actualizarCitaAtendida?idCita=" +
            this.$route.params.datitos.cita
        )
        .then(async (res) => {
          console.log("YA ACTUALIZO CREO, SI NO FUNCIONA A BAILAR WIWIWIWIW");
          console.log(res.data);
          await this.sendCorreo();
        })
        .catch((err) => console.log(err));

      this.dialogConfirmacion = false;
      this.navegarto("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.contenedor-general {
  display: flex;
  width: 100%;
  height: 83vh;
  margin-top: 35px;
  .contenedor-izquierda {
    width: 25%;
    margin: 1%;
    display: flex;
    flex-direction: column;
    .contenedor-reunion {
      margin: 1%;
      height: 30vh;
      .item-reunion {
        border-radius: 20px;
        height: 100%;
        width: 100%;
      }
    }
    .contenedor-info-paciente {
      height: 70vh;
      margin: 1%;
    }
  }
  .contenedor-derecha {
    width: 75%;
    margin: 1%;
    display: flex;
    flex-direction: column;
    .contenedor-derecha-top {
      height: 95vh;
      .contenedor-tab {
        border-radius: 10px;
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.068);
      }
      .contenedor-item-tab {
        box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.068);
        margin-top: 10px;
        border-radius: 10px;
        height: 65vh;
      }
    }
    .contenedor-derecha-bottom {
      height: 5vh;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      .btn-guardar {
        color: white;
        border-radius: 6px;
        padding: 1%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-left: 10px;
        width: 10%;
      }
    }
  }
}
</style>