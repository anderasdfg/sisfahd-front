<template>
  <v-card>
    <v-card-title>Sigue los pasos para reservar tu cita</v-card-title>
    <v-card-text>
      <p>{{ cupos.hora_inicio }} - <b>Precio: </b> S/.{{ cupos.precio }}</p>
    </v-card-text>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Información sobre el paciente
      </v-stepper-step>
      <v-stepper-content step="1">
        <v-form>
          <v-text-field
            placeholder="Ingrese sus nombres"
            outlined
            label="Nombres"
            v-model="usuario.datos.nombre"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                hide-details
                placeholder="Ingrese su apellido paterno"
                outlined
                label="Apellido Paterno"
                v-model="usuario.datos.apellido_paterno"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                hide-details
                placeholder="Ingrese su apellido materno"
                outlined
                label="Apellido Materno"
                v-model="usuario.datos.apellido_materno"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                placeholder="Ingrese su fecha de nacimiento"
                outlined
                label="Fecha de Nacimiento"
                v-model="usuario.datos.fecha_nacimiento"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-combobox
                outlined
                label="Seleccione su sexo"
                v-model="usuario.datos.sexo"
                :items="selectSexo"
              />
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="primary" @click="e6 = 2"> Continuar </v-btn>
        <v-btn text> Retroceder </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">
        Datos de contacto
      </v-stepper-step>
      <v-stepper-content step="2">
        <v-form>
          <v-text-field
            placeholder="Ingrese el motivo de su consulta"
            outlined
            label="Motivo de consulta"
            v-model="cita.motivo_consulta"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-combobox
                outlined
                label="Tipo de documento"
                :items="selectTipoDocumento"
                v-model="usuario.datos.tipo_documento"
              />
            </v-col>
            <v-col>
              <v-text-field
                placeholder="Nro. de documento"
                outlined
                label="Nro. de documento"
                v-model="usuario.datos.numero_documento"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-text-field
                placeholder="Celular"
                outlined
                label="Celular"
                v-model="usuario.datos.telefono"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                placeholder="Correo"
                outlined
                label="Correo"
                v-model="usuario.datos.correo"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="primary" @click="e6 = 3"> Continuar </v-btn>
        <v-btn text> Cancelar </v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">
        Confirmación de registro
      </v-stepper-step>

      <v-stepper-content step="3">
        <p>
          Confirma con una contraseña para la creación de tu cuenta y culminar
          con la reserva
        </p>
        <v-text-field
          placeholder="Contraseña"
          outlined
          label="Contraseña"
          :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show1 ? 'text' : 'password'"
          hint="Al menos 8 caracteres"
          counter
          @click:append="show1 = !show1"
          :rules="[rules.required, rules.min]"
          v-model="usuario.clave"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :label="`Acepto términos y condiciones`"
        ></v-checkbox>
        <v-btn color="primary" @click="registrarCita"> Continuar </v-btn>
        <v-btn text> Cancelar </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "Reservar",
  props: ["cupos"],
  data() {
    return {
      e6: 1,
      show1: false,
      rules: {
        required: (value) => !!value || "Requerido.",
        min: (v) => v.length >= 8 || "Min. 8 caracteres",
      },
      usuario: {
        datos: {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          tipo_documento: "",
          numero_documento: "",
          telefono: "",
          fecha_nacimiento: "",
          correo: "",
          sexo: "",
          foto: "",
        },
        usuario: "",
        clave: "",
        rol: "607f37c1cb41a8de70be1df3",
        fecha_creacion: new Date(),
        estado: "registrado",
      },
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
      paciente: {
        datos: {
          lugar_nacimiento: "",
          procedencia: "",
          grupo_instruccion: "",
          estado_civil: "",
          domicilio: "",
          ocupacion: "",
          grupo_sanguineo: "",
          tutores_legales: [],
        },
        antecedentes: {
          personales: [],
          familiares: [],
          psicosociales: {
            educacion: [],
            laborales: [],
            habitos_nocivos: [],
            habitos_generales: [],
            sociales: [],
          },
          sexuales: {
            espermarquia: {
              estado: null,
              observaciones: [],
            },
            inicio_actividad_sexual: {
              edad: null,
              estado: null,
              observaciones: [],
            },
            parejas_sexuales: {
              cantidad: null,
              parejas_simultaneas: null,
              estado: null,
              observaciones: [],
            },
            percepcion_libido: {
              estado_percepcion: "",
              estado: null,
              observaciones: [],
            },
            uso_metodos_anticonceptivos: {
              metodos: [],
              estado: null,
              observaciones: [],
            },
          },
          problemas_cronicos: [],
        },
        id_historia: "",
        id_usuario: "",
      },
      checkbox: false,
      selectSexo: [
        { value: "F", text: "Femenino" },
        { value: "M", text: "Masculino" },
        { value: "NA", text: "Prefiero no decirlo" },
      ],
      selectTipoDocumento: [
        { value: "DNI", text: "DNI" },
        { value: "CE", text: "Carnet de extranjería" },
        { value: "CD", text: "Cédula diplomática" },
        { value: "PA", text: "Pasaporte" },
      ],
    };
  },
  async created() {
    console.log(this.cupos);
  },
  methods: {
    async registrarCita() {
      this.usuario.usuario = this.usuario.datos.correo;
      this.usuario.datos.fecha_nacimiento = new Date();
      this.usuario.datos.sexo = this.usuario.datos.sexo.value;
      this.usuario.datos.tipo_documento =
        this.usuario.datos.tipo_documento.value;

      console.log(this.usuario);
      await axios
        .post("/Usuario", this.usuario)
        .then((res) => {
          this.usuario = res.data;
          this.paciente.id_usuario = this.usuario.id;
          axios
            .post("/Paciente", this.paciente)
            .then((x) => {
              this.paciente = x.data;
              var fechacita = Date.parse(this.cupos.hora_inicio);
              fechacita = new Date(fechacita);

              var fechaFormateadaInicio = new Date(
                fechacita.setMinutes(fechacita.getMinutes() - 300)
              );
              // var fechaFormateadaFin = new Date(
              //   this.cupos.hora_inicio.setMinutes(
              //     this.cupos.hora_inicio.getMinutes() - 300
              //   )
              // );

              var hoy = new Date();
              var fecha_reserva = new Date(
                hoy.setMinutes(hoy.getMinutes() - 300)
              );

              this.cita.fecha_cita = fechaFormateadaInicio;
              this.cita.id_paciente = this.paciente.id;
              this.cita.enlace_cita = `https://meet.jit.si/${this.paciente.id}`;
              this.cita.precio_neto = this.cupos.precio;
              this.cita.id_turno = this.cupos.id_turno;
              this.cita.fecha_cita_fin = fechaFormateadaInicio; //cambiar aquí
              this.cita.fecha_reserva = fecha_reserva;
              this.cita.id_medico = this.cupos.id_medico;
              axios
                .post("/Cita/cita", this.cita)
                .then((y) => {
                  this.cita = y.data;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },    
  },
};
</script>