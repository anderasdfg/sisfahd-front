<template>
<v-card>
    <v-card-title class="justify-center">Registros del datos del medico</v-card-title>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step editable step="1">
          General
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step editable step="2">
          Informacion de Inicio de Sesion
        </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items
        ><!--CONTIENE LOS STEPPERS CREADOS ARRIBA EN ESTE CASO SON dos-->
        <v-stepper-content step="1"
          ><!--CONTIENE EL STEPPERS 1 -->
          <div class="container-user">
            <form >
              <v-text-field
                v-model="datos.nombre"
                label="Nombre"
                outlined
                color="#009900"
              ></v-text-field>

              <v-text-field
                v-model="datos.apellidos"
                label="Apellidos"
                outlined
                color="#009900"
              ></v-text-field>

               <v-text-field
                v-model="datos.tipo_documento"
                label="Tipo de Documento"
                outlined
                color="#009900"
              ></v-text-field>
              
              <v-text-field
                v-model="datos.numero_documento"
                label="Numero de Documento"
                outlined
                color="#009900"
              ></v-text-field>

<!-- -->
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
            label="Fecha de Nacimiento"
            prepend-icon="mdi-calendar"
            readonly
            class="campos"
            v-bind="attrs"            
            v-on="on"
            @input="$v.date.$touch()"
            @blur="$v.date.$touch()"
            :error-messages="errorFechaNacimiento"             
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
        <!-- -->

            <v-text-field
                v-model="datos.sexo"
                label="Sexo"
                outlined
                color="#009900"
              ></v-text-field>
            
              <v-text-field
                v-model="datos.telefono"
                label="Numero de Celular"
                outlined
                color="#009900"
              ></v-text-field>

               <!-- Botones de cada step-->
              <v-row>
                <v-col>
                  <v-btn block @click="step = 2" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Modificar</span>
                  </v-btn>
                </v-col>
              <v-col>
                  <v-btn text color="primary" @click="modal = false"> Cancelar 
                    <v-icon left>mdi-close-outline</v-icon>
                    <span>Salir</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
        <v-stepper-content step="2"
          ><!--CONTIENE EL STEPPERS 2 -->
          <div class="container-user">
            <form>
              

               <!-- Botones de cada step-->
              <v-row>
                <v-col>
                  <v-btn block @click="step = 1" color="success">
                    <v-icon left>mdi-page-next-outline</v-icon>
                    <span>Continuar</span>
                  </v-btn>
                </v-col>
                <v-col>
                  <v-btn block @click="cerrarDialogo()" color="red">
                    <v-icon left >mdi-close-outline</v-icon>
                    <span>Cerrar</span>
                  </v-btn>
                </v-col>
              </v-row>
            </form>
          </div>
        </v-stepper-content>
      </v-stepper-items>
  </v-stepper> 
</v-card>
</template>

<script>
import axios from "axios";
import {
  required,
} from "vuelidate/lib/validators";
export default {
  name: "RegistrarUsuario",
  props: ["idusuario"],
  data() {
    return {
      listaCupos:[],
      search:"",
      headers: [
        { text: "Duración", align: "start", sortable: false, value: "duracion" },
        { text: "Hora Inicio", value: "hora_inicio", sortable: false},
        { text: "Hora Fin", value: "hora_fin", sortable: false },
        { text: "Estado", value: "estado", sortable: false },
      ],
      step: 1,
      dialog: false,
      date: null,      
      modal: false,
      horasInicio: [],
      horasFin: [],
      ratios: ['15 min', '30 min'],
      //ratios: ['15 min', '30 min', '45 min'], 45 inavilitado por problemas locos
      ratio: null,
      listaTarifas:[],
      //Esto sera reemplazado luego
      turno: {
        id: "",
        especialidad: {
          nombre: "",
          codigo: "",
        },
        estado: "pendiente",
        fecha_fin: null,
        fecha_inicio: null,
        hora_fin: '8:15',
        hora_inicio: '8:00',
        id_medico: "",
        id_tarifa: "",
        cupos: [], 
      },
      medico : {
        id: "",
        id_especialidad : "",
        id_usuario: "",
        especialidad: {
          nombre: "",
          codigo: ""
        }
      },
      cargaRegistro:false,
      listaTurnos:[],
    };
  },
  async created(){
    this.date = this.fechaModificable(1).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    await this.obtenerMedico();
    await this.obtenerTarifas();
    this.horasInicio = this.generadorHorarios(0,0);
    this.horasFin = this.generadorHorarios(0,0);
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("emit-close-dialog");
    },
    async verificarHorario(date){
      var splitDate = date.split("-");
      await this.obtenerTurnos(splitDate[1],splitDate[0]);
      this.$refs.dialog.save(date);
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    fechaModificable(dias){
      var fecha = new Date();
      console.log(fecha)
      fecha.setDate(fecha.getDate() + dias);
      return fecha;
    },
    async obtenerUsuarios() {
      await axios
          .get("/Medico/medicoespcialidad/"+this.idmedico)
          .then((x) => {
            this.medico = x.data;
            console.log(this.medico);
          })
          .catch((err) => console.log(err));
    },
    async obtenerTarifas() {
      await axios
          .get("/Tarifa/tarifasmedico/"+this.idmedico)
          .then((x) => {
            this.listaTarifas = x.data;
            console.log(this.listaTarifas);
          })
          .catch((err) => console.log(err));
    },
    async registrarTurno() {
      this.turno.id_medico = this.idmedico;
      this.turno.especialidad.nombre = this.medico.especialidad.nombre;
      this.turno.especialidad.codigo = this.medico.id_especialidad;
      this.turno.fecha_inicio = new Date(this.date.replace(/\-/gi,'/'));
      this.turno.fecha_fin = new Date(this.date.replace(/\-/gi,'/'));
      for(let i = 0; i < this.turno.cupos.length; i++){
        this.turno.cupos[i].hora_inicio = new Date(this.turno.cupos[i].hora_inicio.setMinutes(this.turno.cupos[i].hora_inicio.getMinutes() - 300))
      }
      console.log(this.date)
      console.log(this.turno)
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {
        if (false) {
        console.log("hay errores");
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
          console.log("no hay errores");
          this.cargaRegistro = true;
          await axios
            .post("/Turno", this.turno)
            .then((res) => {
              this.turno = res.data;
              this.$emit("emit-obtener-turnos");
              this.cargaRegistro = false;
              this.cerrarDialogo();
            })
            .catch((err) => console.log(err));
        /*await this.mensaje(
          "success",
          "Listo",
          "Turno registrado satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar turnos<strong>"
        );*/
      }     
    },
    async obtenerTurnos(mes, año) {
        await axios
          .get("/Turno/listaturnos/"+this.idmedico+"/"+mes+"/"+año)
          .then((x) => {
            this.listaTurnos = [];
            this.listaTurnos = x.data;
            console.log(this.listaTurnos);
          })
          .catch((err) => console.log(err));
    },
    generadorHorarios(hora, minutos){
      var listaHorarios = [];
      var horario="";
      for (let i = hora; i <= 23; i++) {
        for (let j = minutos; j <= 3; j++) {
          horario = i;
          if(j == 0){
            horario += ":"+"0"+j;
          }else{
            horario += ":" + j*15;
          }
          listaHorarios.push(horario);
        }
      }
      return listaHorarios;
    },
    obtenerHoraFin(){
      var splitHora = this.turno.hora_inicio.split(":");
      var hora = parseInt(splitHora[0]);
      var min = parseInt(splitHora[1]/15);
      if(hora != 23 && min != 3){
        if(min + 1 != 4){
          this.turno.hora_fin = hora + ":" + ((min+1)*15);
        }else{
          this.turno.hora_fin = (hora+1) + ":" + "00";
        }
      }else{
        this.turno.hora_fin = "0:00";
      }
    },
    obtenerDatosCupos(){
      this.turno.cupos = [];
      this.listaCupos = [],
      this.generadorDeCupos();
      this.llenarListaCupos();
      console.log(this.listaCupos);
      this.step = 2;
    },
    generadorDeCupos(){
      var splitRatio = this.ratio.split(" ");
      var numeroRatio = parseInt(splitRatio[0]);
      var splitHoraInicio = this.turno.hora_inicio.split(":");
      var horaInicio = parseInt(splitHoraInicio[0]);
      var minInicio = parseInt(splitHoraInicio[1]/15);
      var splitHoraFin = this.turno.hora_fin.split(":");
      var horaFin = parseInt(splitHoraFin[0]);
      var minFin = parseInt(splitHoraFin[1]/15);
      var cupo = null;

      for (let i = horaInicio; i <= horaFin; i++) {
        for (let j = 0; j <= 3; j++) {
          if(i == horaFin && j==minFin){
            i = 24;
            j = 4;
          }else{
            if(i == horaInicio && j < minInicio){
              j = minInicio;
            }
            console.log(j);
            cupo = {
              hora_inicio : null,
              paciente: "",
              ratio:numeroRatio,
              estado:"disponible",
              id_cita: "",
            };
            cupo.hora_inicio = new Date(this.date.replace(/\-/gi,'/') + " "+ i + ":"+ (j*15) +":"+"00");
            this.turno.cupos.push(cupo);
            if(j+(numeroRatio/15) > 4){
              i = i + 1;
              j = j+ (numeroRatio/15) - 4;
            } else{
              j = j + (numeroRatio/15) -1;
            }
          }
        }
      }
    },
    llenarListaCupos(){
      var listaCuposNormal = this.turno.cupos;
      var cupo = null;
      var horaFinal = null;
      for(let i = 0; i < listaCuposNormal.length; i++){
          cupo = {
            hora_inicio: null,
            hora_fin : null,
            duracion: null,
            estado: null,
          };
          if(i == listaCuposNormal.length-1){
            cupo.duracion = listaCuposNormal[i].ratio + " min";
            cupo.estado = listaCuposNormal[i].estado.charAt(0).toUpperCase() + listaCuposNormal[i].estado.slice(1);
            cupo.hora_inicio = listaCuposNormal[i].hora_inicio.toLocaleTimeString().substring(0,listaCuposNormal[i].hora_inicio.toLocaleTimeString().length - 3);
            horaFinal = new Date(listaCuposNormal[i].hora_inicio.setMinutes(listaCuposNormal[i].hora_inicio.getMinutes() + listaCuposNormal[i].ratio));
            cupo.hora_fin = horaFinal.toLocaleTimeString().substring(0,horaFinal.toLocaleTimeString().length - 3);
          }else{
            cupo.hora_inicio = listaCuposNormal[i].hora_inicio.toLocaleTimeString().substring(0,listaCuposNormal[i].hora_inicio.toLocaleTimeString().length - 3);
            cupo.duracion = listaCuposNormal[i].ratio + " min";
            cupo.estado = listaCuposNormal[i].estado.charAt(0).toUpperCase() + listaCuposNormal[i].estado.slice(1);
            cupo.hora_fin = listaCuposNormal[i+1].hora_inicio.toLocaleTimeString().substring(0,listaCuposNormal[i+1].hora_inicio.toLocaleTimeString().length - 3);
          }
          this.listaCupos.push(cupo);
      }
    }
  },
    /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
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
}
</script>

<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
  padding-top: 7%;
  text-align: center;
}
.estilo-stepper{
  padding-top: 2%;
}
.v-dialog .v-card .v-card__title {
  font-size: 25px;
  font-weight: bold;
}
.campos {
  margin: 2% 10% 5% 10%;  
}
.filas{
  margin: 2% 8% 5% 8%;
}
.filas2{
  margin-top: 4%;
  margin-bottom: 1%;
}
.btn-registrar {  
  background: $green;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
.btn-volver {  
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 90%;
  height: 5vh;
  font-weight: bold;
  font-size: 20px;
}
</style>