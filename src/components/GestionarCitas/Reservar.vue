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
            :error-messages="error_nombres"
            @input="$v.usuario.datos.nombre.$touch()"
            @blur="$v.usuario.datos.nombre.$touch()"
            :required="true"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                placeholder="Ingrese su apellido paterno"
                outlined
                label="Apellido Paterno"
                v-model="usuario.datos.apellido_paterno"
                :error-messages="error_apellido_paterno"
                @input="$v.usuario.datos.apellido_paterno.$touch()"
                @blur="$v.usuario.datos.apellido_paterno.$touch()"
                :required="true"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                placeholder="Ingrese su apellido materno"
                outlined
                label="Apellido Materno"
                v-model="usuario.datos.apellido_materno"
                :error-messages="error_apellido_materno"
                @input="$v.usuario.datos.apellido_materno.$touch()"
                @blur="$v.usuario.datos.apellido_materno.$touch()"
                :required="true"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-dialog
                ref="dialog"
                v-model="menu"
                :return-value.sync="usuario.datos.fecha_nacimiento"
                persistent
                width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    outlined
                    v-model="usuario.datos.fecha_nacimiento"
                    label="Fecha de Nacimiento"
                    append-icon="mdi-calendar"
                    readonly
                    class="autocomplete-search"
                    v-bind="attrs"
                    v-on="on"
                    :error-messages="error_fecha_nacimiento"
                    @input="$v.usuario.datos.fecha_nacimiento.$touch()"
                    @blur="$v.usuario.datos.fecha_nacimiento.$touch()"
                    :required="true"
                  ></v-text-field>
                </template>
                <v-date-picker
                  locale="es-es"
                  v-model="usuario.datos.fecha_nacimiento"
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.dialog.save(usuario.datos.fecha_nacimiento)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-dialog>
            </v-col>
            <v-col>
              <v-select
                :items="selectSexo"
                :item-text="selectSexo.text"
                :item-value="selectSexo.value"
                outlined
                label="Sexo"
                v-model="usuario.datos.sexo"
                :error-messages="error_sexo"
                @input="$v.usuario.datos.sexo.$touch()"
                @blur="$v.usuario.datos.sexo.$touch()"
                :required="true"
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
        <v-btn color="primary" @click="CambiarStep(2)"> Continuar </v-btn>
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
            :error-messages="error_motivo_consulta"
            @input="$v.cita.motivo_consulta.$touch()"
            @blur="$v.cita.motivo_consulta.$touch()"
            :required="true"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-combobox
                outlined
                label="Tipo de documento"
                :items="selectTipoDocumento"
                :item-text="selectTipoDocumento.text"
                :item-value="selectTipoDocumento.value"
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
        <v-btn color="primary" @click="CambiarStep(3)"> Continuar </v-btn>
        <v-btn text @click="e6 = 1"> Retroceder </v-btn>
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
          append-icon="password"
          placeholder="Ingrese una contraseña"
          outlined
          label="Contraseña"
          type="password"
          v-model="usuario.clave"
          :error-messages="error_clave"
          @input="$v.usuario.clave.$touch()"
          @blur="$v.usuario.clave.$touch()"
          :required="true"
        ></v-text-field>
        <v-text-field
          append-icon="password"
          placeholder="Confirme su contraseña"
          outlined
          label="Confirmacion de contraseña"
          type="password"
          v-model="contrasena_conf"
          :error-messages="error_clave_confir"
          @input="$v.contrasena_conf.$touch()"
          @blur="$v.contrasena_conf.$touch()"
          :required="true"
        ></v-text-field>
        <v-checkbox
          v-model="checkbox"
          :label="`Acepto términos y condiciones`"
        ></v-checkbox>
        <v-btn color="primary" @click="registrarCita"> Continuar </v-btn>
        <v-btn text> Cancelar </v-btn>
      </v-stepper-content>
    </v-stepper>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <Loader :titulo="this.tituloLoader" :mensaje="this.mensajeLoader" />
    </v-dialog>
  </v-card>
</template>

<script>
import axios from "axios";
import { required, numeric, email } from "vuelidate/lib/validators";
import Loader from "../Elementos/Loader.vue";

function esParrafo(value) {
  return /^[A-Za-z\d\s.,;°"“()áéíóúÁÉÍÓÚñÑ]+$/.test(value);
}
function esContrasena(value) {
  //Minimum eight characters, at least one letter and one number:
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,60}$/.test(value);
}
function esConfirmado(value) {
  if (this.usuario.clave == this.contrasena_conf) {
    return true;
  } else {
    return false;
  }
}

export default {
  name: "Reservar",
  props: ["cupos"],
  components: {
    Loader,
  },
  data() {
    return {
      e6: 1,
      show1: false,
      menu: false,
      tituloLoader: "Reservando cita",
      mensajeLoader: "En unos momentos terminamos...",
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
      contrasena_conf: "",
      cargaRegistro: false,
    };
  },
  validations: {
    model: {
      username: {
        required,
        email,
      },
      password: {
        required,
      },
    },
    contrasena_conf: {
      required,
      esConfirmado,
    },
    usuario: {
      datos: {
        nombre: {
          required,
          esParrafo,
        },
        apellido_paterno: {
          required,
          esParrafo,
        },
        apellido_materno: {
          required,
          esParrafo,
        },
        tipo_documento: {
          required,
        },
        numero_documento: {
          required,
          numeric,
        },
        telefono: {
          required,
          numeric,
        },
        fecha_nacimiento: {
          required,
        },
        correo: {
          required,
          email,
        },
        sexo: {
          required,
        },
      },
      clave: {
        required,
        esContrasena,
      },
    },
    cita: {
      motivo_consulta: {
        required,
        esParrafo,
      },
    },
  },
  async created() {
    console.log(this.cupos);
  },
  methods: {
    async registrarCita() {
      this.usuario.usuario = this.usuario.datos.correo;
      //this.usuario.datos.fecha_nacimiento = this.usuario.datos;
      // this.usuario.datos.sexo = this.usuario.datos.sexo.value;
      this.usuario.datos.tipo_documento =
        this.usuario.datos.tipo_documento.value;
      console.log("usuario");
      console.log(this.usuario);
      this.cargaRegistro = true;
      await axios
        .post("/Usuario", this.usuario)
        .then((res) => {
          this.usuario = res.data;
          this.paciente.id_usuario = this.usuario.id;
          console.log("paciente");
          console.log(this.paciente);
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
              console.log("cita");
              console.log(this.cita);
              axios
                .post("/Cita/cita", this.cita)
                .then((y) => {
                  this.cita = y.data;
                  this.cargaRegistro = false;
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
    esConfirmado() {
      if (this.usuario.clave == this.contrasena_conf) {
        return true;
      } else {
        return false;
      }
    },
    CambiarStep(step) {
      if (
        (this.$v.usuario.datos.nombre.$invalid ||
          this.$v.usuario.datos.apellido_paterno.$invalid ||
          this.$v.usuario.datos.apellido_materno.$invalid ||
          this.$v.usuario.datos.fecha_nacimiento.$invalid ||
          this.$v.usuario.datos.sexo.$invalid) &&
        this.e6 == 1
      ) {
        return;
      } else if (
        (this.$v.usuario.datos.tipo_documento.$invalid ||
          this.$v.usuario.datos.numero_documento.$invalid ||
          this.$v.usuario.datos.correo.$invalid ||
          this.$v.usuario.datos.telefono.$invalid ||
          this.$v.cita.motivo_consulta.$invalid) &&
        this.e6 == 2
      ) {
        return;
      } else if (
        (this.$v.usuario.clave.$invalid || this.$v.contrasena_conf.$invalid) &&
        this.e6 == 3
      ) {
        return;
      } else {
        this.e6 = step;
      }
    },
  },
  computed: {
    error_nombres() {
      const errors = [];
      if (!this.$v.usuario.datos.nombre.$dirty) return errors;
      !this.$v.usuario.datos.nombre.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.nombre.esParrafo &&
        errors.push("El campo no puede tener caracteres especiales");
      return errors;
    },
    error_apellido_paterno() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido_paterno.$dirty) return errors;
      !this.$v.usuario.datos.apellido_paterno.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.apellido_paterno.esParrafo &&
        errors.push("El campo no puede tener caracteres especiales");
      return errors;
    },
    error_apellido_materno() {
      const errors = [];
      if (!this.$v.usuario.datos.apellido_materno.$dirty) return errors;
      !this.$v.usuario.datos.apellido_materno.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.apellido_materno.esParrafo &&
        errors.push("El campo no puede tener caracteres especiales");
      return errors;
    },
    error_fecha_nacimiento() {
      const errors = [];
      if (!this.$v.usuario.datos.fecha_nacimiento.$dirty) return errors;
      !this.$v.usuario.datos.fecha_nacimiento.required &&
        errors.push("El campo no puede estar en blanco");
      return errors;
    },
    error_sexo() {
      const errors = [];
      if (!this.$v.usuario.datos.sexo.$dirty) return errors;
      !this.$v.usuario.datos.sexo.required &&
        errors.push("El campo no puede estar en blanco");
      return errors;
    },
    error_tipo_documento() {
      const errors = [];
      if (!this.$v.usuario.datos.tipo_documento.$dirty) return errors;
      !this.$v.usuario.datos.tipo_documento.required &&
        errors.push("El campo no puede estar en blanco");
      return errors;
    },
    error_numero_documento() {
      const errors = [];
      if (!this.$v.usuario.datos.numero_documento.$dirty) return errors;
      !this.$v.usuario.datos.numero_documento.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.numero_documento.numeric &&
        errors.push("Ingrese un número de documento válido");
      return errors;
    },
    error_correo() {
      const errors = [];
      if (!this.$v.usuario.datos.correo.$dirty) return errors;
      !this.$v.usuario.datos.correo.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.correo.email &&
        errors.push("Ingrese una dirección de correo válida");
      return errors;
    },
    error_telefono() {
      const errors = [];
      if (!this.$v.usuario.datos.telefono.$dirty) return errors;
      !this.$v.usuario.datos.telefono.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.usuario.datos.telefono.numeric &&
        errors.push("Ingrese un número de teléfono válido");
      return errors;
    },
    error_clave() {
      const errors = [];
      if (!this.$v.usuario.clave.$dirty) {
        return errors;
      }
      !this.$v.usuario.clave.required &&
        errors.push("El campo de contraseña no puede estar en blanco");
      !this.$v.usuario.clave.esContrasena &&
        errors.push(
          "Debe tener como mínimo 8 caracteres, con almenos una letra y un número"
        );
      return errors;
    },
    error_clave_confir() {
      const errors = [];
      if (!this.$v.contrasena_conf.$dirty) {
        return errors;
      }
      !this.$v.contrasena_conf.required &&
        errors.push("El campo de contraseña no puede estar en blanco");
      !this.$v.contrasena_conf.esConfirmado &&
        errors.push("Las contraseñas no concuerdan");
      return errors;
    },
    error_motivo_consulta() {
      const errors = [];
      if (!this.$v.cita.motivo_consulta.$dirty) return errors;
      !this.$v.cita.motivo_consulta.required &&
        errors.push("El campo no puede estar en blanco");
      !this.$v.cita.motivo_consulta.esParrafo &&
        errors.push("El campo no puede tener caracteres especiales");
      return errors;
    },
  },
};
</script>