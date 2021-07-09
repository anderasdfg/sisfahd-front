<template>
  <v-app>
    <div class="body-login">
      <div class="contenido-login">
        <div class="contenido-izq">
          <div class="contenido-margen">
            <img src="../../assets/img_login.png" alt="login image" />
          </div>
        </div>
        <div class="contenido-der">
          <div class="contenido-margen formulario">
            <v-window v-model="ventana">
              <v-window-item :value="1" style="padding:0px !important;">
                <v-card elevation="0" width="80%" class="card-principal">
                  <v-card-text style="padding:1px !important;">
                    <h1 class="h1-login">Inicie sesión para continuar</h1>
                    <v-form>
                      <v-text-field
                        append-icon="person"
                        placeholder="Ingrese el correo con el cual se registró"
                        outlined
                        label="Usuario"
                        type="text"
                        v-model="model.username"
                        :error-messages="usernameErrors"
                        @input="$v.model.username.$touch()"
                        @blur="$v.model.username.$touch()"
                        :required="true"
                      ></v-text-field>
                      <v-text-field
                        append-icon="lock"
                        placeholder="Ingrese su contraseña"
                        outlined
                        label="Contraseña"
                        id="password"
                        type="password"
                        v-model="model.password"
                        :error-messages="passwordErrors"
                        @input="$v.model.password.$touch()"
                        @blur="$v.model.password.$touch()"
                        :required="true"
                      ></v-text-field>
                      <div class="formulario">
                        <p style="margin-top:3%">
                          ¿Te olvidaste tu contraseña?
                          <a @click="CambiarContraseña()">Recuperar</a>
                        </p>
                      </div>
                      <v-btn
                        block
                        color="primary"
                        :dark="!$v.model.$invalid"
                        @click.prevent="logIn(model)"
                        :loading="loading"
                        :disabled="$v.model.$invalid"
                        type="submit"
                        >Iniciar Sesión</v-btn
                      >

                      <div class="formulario">
                        <p style="margin-top:3%">
                          ¿No tienes una cuenta?
                          <a @click="CambiarRegistrar()">Registrate</a>
                        </p>
                      </div>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-window-item>
              <v-window-item
                :value="2"
                style="padding:1px !important;"
                class="stepper-login"
              >
                <v-card elevation="0" width="80%" class="card-principal">
                  <v-card-text style="padding:0px !important;">
                    <h1 class="h1-login">Ingrese sus datos</h1>
                    <p style="margin-top:1px">
                      <a @click="cambiarIniciarSesion()">Inicia sesión </a>si ya
                      tienes una cuenta
                    </p>
                    <v-stepper
                      v-model="e1"
                      vertical
                      elevation="0"
                      width="100%"
                      style="padding-bottom:0px !important"
                    >
                      <v-stepper-step :complete="Completado1()" step="1">
                        Datos del paciente
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
                            <v-col style="padding-bottom:0px !important">
                              <v-text-field
                                placeholder="Ingrese su apellido paterno"
                                outlined
                                label="Apellido Paterno"
                                v-model="usuario.datos.apellido_paterno"
                                :error-messages="error_apellido_paterno"
                                @input="
                                  $v.usuario.datos.apellido_paterno.$touch()
                                "
                                @blur="
                                  $v.usuario.datos.apellido_paterno.$touch()
                                "
                                :required="true"
                              ></v-text-field>
                            </v-col>
                            <v-col style="padding-bottom:0px !important">
                              <v-text-field
                                placeholder="Ingrese su apellido materno"
                                outlined
                                label="Apellido Materno"
                                v-model="usuario.datos.apellido_materno"
                                :error-messages="error_apellido_materno"
                                @input="
                                  $v.usuario.datos.apellido_materno.$touch()
                                "
                                @blur="
                                  $v.usuario.datos.apellido_materno.$touch()
                                "
                                :required="true"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row style="margin-top:0px !important;">
                            <v-col>
                              <v-dialog
                                ref="dialog"
                                v-model="menu"
                                :return-value.sync="
                                  usuario.datos.fecha_nacimiento
                                "
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
                                    @input="
                                      $v.usuario.datos.fecha_nacimiento.$touch()
                                    "
                                    @blur="
                                      $v.usuario.datos.fecha_nacimiento.$touch()
                                    "
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
                                    @click="
                                      $refs.dialog.save(
                                        usuario.datos.fecha_nacimiento
                                      )
                                    "
                                  >
                                    OK
                                  </v-btn>
                                </v-date-picker>
                              </v-dialog>
                            </v-col>
                            <v-col>
                              <v-select
                                :items="itemsSexo"
                                :item-text="itemsSexo.text"
                                :item-value="itemsSexo.value"
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

                        <v-btn dark color="primary" @click="CambiarStep(2)">
                          Continuar
                        </v-btn>
                      </v-stepper-content>
                      <v-stepper-step  step="2">
                        Datos de contacto
                      </v-stepper-step>
                      <v-stepper-content step="2">
                        <v-form>
                          <v-row>
                            <v-col cols="12" md="6">
                              <v-select
                                :items="itemsTipoDocumento"
                                :item-text="itemsTipoDocumento.text"
                                :item-value="itemsTipoDocumento.value"
                                outlined
                                label="Tipo de documento"
                                v-model="usuario.datos.tipo_documento"
                                :error-messages="error_tipo_documento"
                                @input="
                                  $v.usuario.datos.tipo_documento.$touch()
                                "
                                @blur="$v.usuario.datos.tipo_documento.$touch()"
                                :required="true"
                              ></v-select>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-text-field
                                hide-detail
                                placeholder="Ingrese su número de documento"
                                outlined
                                label="Nº Documento"
                                v-model="usuario.datos.numero_documento"
                                :error-messages="error_numero_documento"
                                @input="
                                  $v.usuario.datos.numero_documento.$touch()
                                "
                                @blur="
                                  $v.usuario.datos.numero_documento.$touch()
                                "
                                :required="true"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-text-field
                            placeholder="Ingrese su correo"
                            outlined
                            label="Correo"
                            v-model="usuario.datos.correo"
                            :error-messages="error_correo"
                            @input="$v.usuario.datos.correo.$touch()"
                            @blur="$v.usuario.datos.correo.$touch()"
                            :required="true"
                          ></v-text-field>
                          <v-text-field
                            placeholder="Ingrese su telefono"
                            outlined
                            label="Telefono"
                            v-model="usuario.datos.telefono"
                            :error-messages="error_telefono"
                            @input="$v.usuario.datos.telefono.$touch()"
                            @blur="$v.usuario.datos.telefono.$touch()"
                            :required="true"
                          ></v-text-field>
                        </v-form>

                        <v-btn dark color="primary" @click="CambiarStep(3)">
                          Continuar
                        </v-btn>

                        <v-btn text @click="e1 = 1">
                          Retroceder
                        </v-btn>
                      </v-stepper-content>
                      <v-stepper-step step="3" :complete="Completado3()">
                        Contraseña
                      </v-stepper-step>
                      <v-stepper-content step="3">
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
                        <v-btn dark color="primary" @click="GuardarUsuario()">
                          Registrar
                        </v-btn>
                        <v-btn text @click="e1 = 2">
                          Retroceder
                        </v-btn>
                      </v-stepper-content>
                    </v-stepper>
                  </v-card-text>
                  
                </v-card>
              </v-window-item>
              <v-window-item
                :value="3"
                style="padding:1px !important;"
                class="stepper-login"
              >
                <v-card elevation="0" width="80%" class="card-principal">
                  <v-card-text style="padding:0px !important;">
                    <h1 class="h1-login">Ingrese sus datos</h1>
                    <p style="margin-top:1px">
                      <a @click="cambiarIniciarSesion()">Inicia sesión </a>si ya
                      tienes una cuenta
                    </p>
                    <v-stepper
                      v-model="e1"
                      vertical
                      elevation="0"
                      width="100%"
                      style="padding-bottom:0px !important"
                    >
                      <v-stepper-step :complete="CompletadoC1()" step="1">
                        Recuperar Contraseña
                      </v-stepper-step>
                      <v-stepper-content step="1">
                        <v-form>
                          <v-text-field
                            placeholder="Ingrese sus nombres"
                            outlined
                            label="Nombres"
                            v-model="model.username"
                            :error-messages="usernameErrors"
                            @input="$v.model.username.$touch()"
                            @blur="$v.model.username.$touch()"
                            :required="true"
                          ></v-text-field>
                          
                        </v-form>

                        <v-btn dark color="primary" @click="CambiarStepC(2)">
                          Continuar
                        </v-btn>
                      </v-stepper-content>
                      <v-stepper-step :complete="CompletadoC2()" step="2">
                        Confirmación
                      </v-stepper-step>
                      <v-stepper-content   step="2">
                        <v-form>
                           <h1 >Se le enviara un codigo de verificacion al correo ********@gmail.com</h1> 
                          
                        
                        </v-form>

                        <v-btn dark color="primary" @click="CambiarStepC(3)">
                          Aceptar
                        </v-btn>

                       
                      </v-stepper-content>
                      <v-stepper-step step="3" :complete="CompletadoC3()">
                        Introduzca Codigo
                      </v-stepper-step>
                      <v-stepper-content step="3">
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
                        <v-btn dark color="primary" @click="GuardarUsuario()">
                          Registrar
                        </v-btn>
                        <v-btn text @click="e1 = 2">
                          Retroceder
                        </v-btn>
                      </v-stepper-content>
                    </v-stepper>
                  </v-card-text>
                  
                </v-card>
              </v-window-item>
            </v-window>
          </div>
        </div>
      </div>
      <div class="body-izq"></div>
      <div class="body-der"></div>
      <v-dialog
                    persistent
                    v-model="dialogodetalle"
                    max-width="880px"
                  >
                    <ReestablecerC
                      v-if="dialogodetalle"
                      :Especialidad2="Especialidad2"
                      @close-dialog-detalle="closeDialogDetalle()"
                    >
                    </ReestablecerC>
                  </v-dialog>
    </div>
  </v-app>
</template>

<script>
import axios from "axios";
import { mapActions, mapGetters } from "vuex";
import { required, numeric, email } from "vuelidate/lib/validators";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ReestablecerC from "@/components/RestContraseña/RContraseña.vue";
import "sweetalert2/src/sweetalert2.scss";

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
  name: "login",
  components: {
    
   
   ReestablecerC
   
  },
  data() {
    return {
      Especialidad2:{},
      dialogodetalle: false,
      e1: 1,
      ventana: 1,
      menu: false,
      itemsSexo: [
        {
          value: "M",
          text: "Masculino",
        },
        {
          value: "F",
          text: "Femenino",
        },
      ],
      itemsTipoDocumento: [
        { value: "DNI", text: "DNI" },
        { value: "CE", text: "Carnet de extranjería" },
        { value: "CD", text: "Cédula diplomática" },
        { value: "PA", text: "Pasaporte" },
      ],
      model: {
        username: "",
        password: "",
      },
      contrasena_conf: "",
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
        fecha_creacion: null,
        rol: "607f37c1cb41a8de70be1df3",
        estado: "registrado",
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
  },

  methods: {
    ...mapActions(["logIn"]),
    async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },
    closeDialogDetalle() {
      this.dialogodetalle= false;
    },
    Completado1() {
      if (
        this.$v.usuario.datos.nombre.$invalid ||
        this.$v.usuario.datos.apellido_paterno.$invalid ||
        this.$v.usuario.datos.apellido_materno.$invalid ||
        this.$v.usuario.datos.fecha_nacimiento.$invalid ||
        this.$v.usuario.datos.sexo.$invalid
      ) {
        return false;
      } else {
        return true;
      }
    },
    CompletadoC1() {
      if (
        this.$v.usuario.datos.nombre.$invalid
      ) {
        return false;
      } else {
        return true;
      }
    },
    CompletadoC2() {
    
        return true;
      
    },
    Completado2() {
      if (
        this.$v.usuario.datos.tipo_documento.$invalid ||
        this.$v.usuario.datos.numero_documento.$invalid ||
        this.$v.usuario.datos.correo.$invalid ||
        this.$v.usuario.datos.telefono.$invalid
      ) {
        return false;
      } else {
        return true;
      }
    },
    
    Completado3() {
      if (this.$v.usuario.clave.$invalid || this.$v.contrasena_conf.$invalid) {
        return false;
      } else {
        return true;
      }
    },
    CompletadoC3() {
      
        return true;
      
    },
    esConfirmado() {
      if (this.usuario.clave == this.contrasena_conf) {
        return true;
      } else {
        return false;
      }
    },
    CambiarRegistrar() {
      console.log("aaaaaa0");
      this.limpiar_model();
      this.$v.model.$reset();
      this.ventana = 2;
    },
    CambiarContraseña() {
      console.log("aaaaaa0");
      this.limpiar_model();
      this.$v.model.$reset();
      this.ventana = 3;
    },
    cambiarIniciarSesion() {
      console.log("aaaaaa1");
      this.limpiar_usuario();
      this.$v.usuario.$reset();
      this.ventana = 1;
    },
    CambiarStep(step) {
      if (
        (this.$v.usuario.datos.nombre.$invalid ||
          this.$v.usuario.datos.apellido_paterno.$invalid ||
          this.$v.usuario.datos.apellido_materno.$invalid ||
          this.$v.usuario.datos.fecha_nacimiento.$invalid ||
          this.$v.usuario.datos.sexo.$invalid) &&
        this.e1 == 1
      ) {
        return;
      } else if (
        (this.$v.usuario.datos.tipo_documento.$invalid ||
          this.$v.usuario.datos.numero_documento.$invalid ||
          this.$v.usuario.datos.correo.$invalid ||
          this.$v.usuario.datos.telefono.$invalid) &&
        this.e1 == 2
      ) {
        return;
      } else if (
        (this.$v.usuario.clave.$invalid || this.$v.contrasena_conf.$invalid) &&
        this.e1 == 3
      ) {
        return;
      } else {
        console.log("asdasdasd");
        this.e1 = step;
      }
    },
    CambiarStepC(step) {
      if (
        (this.$v.model.username.$invalid) &&
        this.e1 == 1
      ) {
        return;
      } else if (
        
        this.e1 == 2
      ) {
        return;
      } else if (
        this.e1 == 3
      ) {
        return;
      } else {
        console.log("asdasdasd");
        this.e1 = step;
      }
    },
    limpiar_model() {
      var default_model = {
        username: "",
        password: "",
      };
      this.model = default_model;
    },
    limpiar_usuario() {
      var default_usuario = {
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
        fecha_creacion: null,
        rol: "",
        estado: "registrado",
      };
      this.usuario = default_usuario;
      var default_paciente = {
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
      };
      this.paciente = default_paciente;
    },
    async GuardarUsuario() {
      this.$v.usuario.$touch();
      if (this.$v.usuario.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
          "<strong>Verifique los campos Ingresados<strong>"
        );
      } else {
        this.usuario.usuario = this.usuario.datos.correo;
        console.log(this.usuario);
        await axios
          .post("/Usuario", this.usuario)
          .then(async (res) => {
            this.usuario = res.data;
            this.paciente.id_usuario = this.usuario.id;
            console.log("paciente");
            console.log(this.paciente);
            await axios
              .post("/Paciente", this.paciente)
              .then(async (x) => {
                console.log(x);
              })
              .catch((err) => {
                console.log(err);
              });
            console.log(res);
            this.mensaje(
              "success",
              "listo",
              "Información registrada satisfactoriamente",
              "<strong>Inicie sesión para continuar<strong>"
            );
            this.limpiar_usuario();
            this.ventana = 1;
            this.e1 = 1;
            this.$v.usuario.$reset();
          })
          .catch((err) => {
            console.error(err);
            this.mensaje(
              "error",
              "..Oops",
              "Se encontraron errores con su petición",
              `<strong>Contacte al administrador<br>${err}<strong>`
            );
          });
      }
    },
    /*async CambiarContraseña(id) {
     // this.Especialidad2 = await this.loadUsuarioEspecialidad(id);
      this.dialogodetalle = !this.dialogodetalle;
    },*/
  },
  computed: {
    ...mapGetters(["loading"]),
    usernameErrors() {
      const errors = [];
      if (!this.$v.model.username.$dirty) {
        return errors;
      }
      !this.$v.model.username.email &&
        errors.push("Ingrese una dirección de correo válida");
      !this.$v.model.username.required &&
        errors.push("El campo de usuario no puede estar en blanco");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.model.password.$dirty) {
        return errors;
      }
      !this.$v.model.password.required &&
        errors.push("El campo de contrasena no puede estar en blanco");
      return errors;
    },
    //Errores al registrar
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
        errors.push("Ingrese un número de documento válido");
      return errors;
    },
    error_clave() {
      const errors = [];
      if (!this.$v.usuario.clave.$dirty) {
        return errors;
      }
      !this.$v.usuario.clave.required &&
        errors.push("El campo de contrasena no puede estar en blanco");
      !this.$v.usuario.clave.esContrasena &&
        errors.push(
          "Debe tener como mínimo 8 caracteres, con almenos una letra y un numero"
        );
      return errors;
    },
    error_clave_confir() {
      const errors = [];
      if (!this.$v.contrasena_conf.$dirty) {
        return errors;
      }
      !this.$v.contrasena_conf.required &&
        errors.push("El campo de contrasena no puede estar en blanco");
      !this.$v.contrasena_conf.esConfirmado &&
        errors.push("Las contraseñas no concuerdan");
      return errors;
    },
    //submit: function() {
    //if (this.$v.$invalid) return;
    //alert('Gracias!');
    //}
  },
};
</script>

<style lang="scss">
@import "../../styles/main.scss";
.toolbar-login {
  background-color: black;
  min-width: 10%;
  height: 10%;
}
.body-login {
  width: 100%;
  height: 100%;
  @include flex-center;

  // display: flex;
  // align-items: center;
  // justify-content: center;

  .body-izq {
    background-color: #a0b9f9;
    width: 100%;
    min-height: 100%;
  }
  .body-der {
    background-color: #f2f7fd;
    width: 100%;
    min-height: 100%;
  }
  .contenido-login {
    position: absolute;
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow: 5px 5px 15px rgba($color: #8b8b8b, $alpha: 1);
    width: 70%;
    min-width: 750px;
    height: 90vh;
    @include flex-center;
    .contenido-izq {
      border-radius: 20px 0px 0px 20px;
      background: #ffffff;
      width: 100%;
      min-height: 100%;
      @include flex-center;
    }
    .contenido-der {
      border-radius: 0px 20px 20px 0px;
      background: #ffffff;
      width: 100%;
      min-height: 100%;
      @include flex-center;
    }
  }
}

//Consultar con anderley sobre como afectar unicamente al padre
.blur-div {
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  background-color: #ccc;
}
.contenido-margen {
  background: #ffffff;
  height: 70vh;
  width: 100%;
  max-height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.formulario {
  @include flex-center;
}
img {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
}
.h1-login {
  line-height: 1.2;
  font-weight: 400;
  font-weight: bold;
  font-family: "Nunito", sans-serif;
  color: #1976d2;
  margin-bottom: 10%;
}
.card-principal {
  margin-top: 0px !important;
  display: flex !important;
  flex-wrap: wrap !important;
  min-width: 450px;
  max-width: 450px !important;
  width: 100% !important;
}
// .stepper-login{
//   display: flex ;
//   flex-wrap: wrap;
// }
</style>
