<template>
  <v-app>
    <div class="body-login">
      <div class="contenido-login">
        <div class="contenido-izq">
          <div class="contenido-margen">
            <img src="../../assets/img_login.png" alt="login image">
          </div>
        </div>
        <div class="contenido-der">
          <div class="contenido-margen formulario">
            <v-window v-model="ventana" >
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
                      <v-btn block color="primary"
                        :dark="!$v.$invalid"
                        @click.prevent="logIn(model)" 
                        :loading="loading"
                        :disabled="$v.$invalid"
                        type="submit"
                      >Iniciar Sesión</v-btn>
                      <div class="formulario">
                        <p style="margin-top:3%">¿No tienes una cuenta? <a @click="cambiarRegistrar()">Registrate</a></p>
                      </div>
                    </v-form>
                  </v-card-text>
                  
                </v-card>
              </v-window-item>
              <v-window-item :value="2" style="padding:1px !important;" class="stepper-login">
                <v-card elevation="0" width="80%" class="card-principal">
                  <v-card-text style="padding:0px !important;">
                    <h1 class="h1-login">Ingrese sus datos</h1>
                    <p style="margin-top:1px"><a @click="cambiarIniciarSesion()">Inicia sesión </a>si ya tienes una cuenta </p>
                    <v-stepper v-model="e1" vertical elevation="0" width="100%" style="padding-bottom:0px !important">
                      <v-stepper-step
                        :complete="e1 > 1"
                        step="1"
                      >
                        Datos del paciente
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
                              <v-text-field
                                placeholder="Seleccione su sexo"
                                outlined
                                label="Sexo"
                                v-model="usuario.datos.sexo"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          
                          
                        </v-form>

                        <v-btn
                          dark
                          color="primary"
                          @click="e1 = 2"
                        >
                          Continuar
                        </v-btn>
                      </v-stepper-content>
                      <v-stepper-step
                        :complete="e1 > 2"
                        step="2"
                      >
                        Datos de contacto
                      </v-stepper-step>
                      <v-stepper-content step="2">
                        <v-form>
                          <v-row >
                            <v-col cols="12" md="6">
                              <v-text-field
                                hide-detail
                                placeholder="Seleccione su tipo de documento"
                                outlined
                                label="Tipo de documento"
                                v-model="usuario.datos.tipo_documento"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6">
                              <v-text-field
                                hide-detail
                                placeholder="Ingrese su número de documento"
                                outlined
                                label="Nº Documento"
                                v-model="usuario.datos.numero_documento"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                          <v-text-field
                            placeholder="Ingrese su correo"
                            outlined
                            label="Correo"
                            v-model="usuario.datos.correo"
                          ></v-text-field>
                          <v-text-field
                            placeholder="Ingrese su telefono"
                            outlined
                            label="Telefono"
                            v-model="usuario.datos.telefono"
                          ></v-text-field>
                        </v-form>

                        <v-btn
                          dark
                          color="primary"
                          @click="e1 = 3"
                        >
                          Continuar
                        </v-btn>

                        <v-btn text @click="e1 = 1">
                          Retroceder
                        </v-btn>
                      </v-stepper-content>
                      <v-stepper-step step="3">
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
                        ></v-text-field>
                        <v-text-field
                          append-icon="password"
                          placeholder="Confirme su contraseña"
                          outlined
                          label="Confirmacion de contraseña"
                          type="password"
                          v-model="usuario.clave"
                        ></v-text-field>

                        <v-btn
                          dark
                          color="primary"
                          @click="e1 = 1"
                        >
                          Continuar
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
    </div>
  </v-app>
</template>

<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  name: 'login',
  data() {
    return {
      e1: 1,
      ventana:1,
      model: {
          username: '',
          password: ''
      },
      usuario: {
          datos:{
            nombre:'',
            apellido_paterno:'',
            apellido_materno:'',
            tipo_documento:'',
            numero_documento:'',
            telefono:'',
            fecha_nacimiento:'',
            correo:'',
            sexo:'',
            foto:''
          },
          usuario: '',
          clave: ''
      },
      typePassword: 'password',
    }
  },
  
  validations:{
      model:{
        username:{
          required
        },
        password:{
          required
        }
      }
  },

  methods: {
      ...mapActions(['logIn']),
      cambiarRegistrar(){
        console.log("aaaaaa0");
        this.ventana=2;
      },
      cambiarIniciarSesion(){
        console.log("aaaaaa1");
        this.ventana=1;
      },
  },
  computed: {
    ...mapGetters(['loading']),
    usernameErrors(){
        const errors = []
        if (!this.$v.model.username.$dirty) {
          return errors
        }
        !this.$v.model.username.required && errors.push('El campo de usuario no puede estar en blanco')
        return errors
    },
    passwordErrors(){
        const errors = []
        if (!this.$v.model.password.$dirty) {
          return errors
        }
        !this.$v.model.password.required && errors.push('El campo de contrasena no puede estar en blanco')
        return errors
    },
    //submit: function() {
    //if (this.$v.$invalid) return;
    //alert('Gracias!');
  //}
  }
}
</script>

<style lang="scss">
@import "../../styles/main.scss";
.toolbar-login{
  background-color: black;
  min-width: 10%;
  height: 10%;
}
.body-login{
  
  width: 100%;
  height: 100%;
  @include flex-center;
  
  // display: flex;
  // align-items: center;
  // justify-content: center;

  .body-izq {
    background-color: #A0B9F9;
    width: 100%;   
    min-height: 100%;
  } 
  .body-der{
    background-color:#F2F7FD;
    width: 100%;
    min-height: 100%;
  }
  .contenido-login{
    position:absolute;  
    background-color: #ffffff;
    border-radius: 20px;
    box-shadow:5px 5px 15px rgba($color: #8b8b8b, $alpha: 1.0);
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
    .contenido-der{
      border-radius: 0px 20px 20px 0px;
      background: #ffffff;
      width: 100%;
      min-height: 100%;
      @include flex-center;
    }
    


  }
}

//Consultar con anderley sobre como afectar unicamente al padre
.blur-div{
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  background-color: #ccc;
  
} 
.contenido-margen{
  background: #ffffff;
  height: 70vh;
  width: 100%;
  max-height: 100% ;
  display: flex;
  flex-wrap: wrap;  
  
}
.formulario{
  @include flex-center;
  
} 
img{
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
.card-principal{
  margin-top:0px!important;
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