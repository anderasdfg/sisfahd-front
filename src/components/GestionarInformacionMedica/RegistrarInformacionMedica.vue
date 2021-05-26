<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Información Medica</v-card-title>
    <v-card-text>
      <v-stepper v-model="step">
        <v-stepper-header>
          <v-stepper-step editable step="1">General</v-stepper-step>
          <v-divider></v-divider>
          <v-stepper-step editable step="2">Antecedentes<b>(opcional)</v-stepper-step>
        </v-stepper-header>
        <v-stepper-items>
          <v-stepper-content step="1">
            
          </v-stepper-content>
          <v-stepper-content step="2">
            <div class="container-user">
              <form style="margin-top: 15px">
                <v-text-field
                  v-model.trim="datos.lugar_nacimiento"
                  label="Ingrese el lugar de nacimiento"
                  outlined
                  color="#009900"
                  @input="$v.datos.lugar_nacimiento.$touch()"
                  @blur="$v.datos.lugar_nacimiento.$touch()"
                  :error-messages="error_lugar_nacimiento"
                ></v-text-field>
                <v-text-field
                  v-model.trim="datos.procedencia"
                  label="Ingrese la procedencia"
                  outlined
                  color="#009900"
                  @input="$v.datos.procedencia.$touch()"
                  @blur="$v.datos.procedencia.$touch()"
                  :error-messages="error_procedencia"
                ></v-text-field>
                <v-text-field
                  v-model.trim="datos.grupo_instruccion"
                  label="Ingrese el grupo de instruccion"
                  outlined
                  color="#009900"
                  @input="$v.datos.grupo_instruccion.$touch()"
                  @blur="$v.datos.grupo_instruccion.$touch()"
                  :error-messages="error_grupo_instruccion"
                ></v-text-field>
                <v-select
                  :items="['Casado','Soltero','Viudo','Divorciado']"
                  label="Ingrese el Sexo"
                  outlined
                  v-model="residente.sexo"
                  @input="$v.residente.sexo.$touch()"
                  @blur="$v.residente.sexo.$touch()"
                  :error-messages="errorTipoSexo"
                  color="#009900"       
                ></v-select>
                <v-row>
                  <v-col>
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="residente.fechaNacimiento"
                          label="Fecha de Nacimiento"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          @input="$v.residente.fechaNacimiento.$touch()"
                          @blur="$v.residente.fechaNacimiento.$touch()"
                          :error-messages="errorFechaNacimiento"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="residente.fechaNacimiento"
                        @input="menu2 = false"
                        locale="es-es"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :items="['DNI', 'Pasaporte', 'Carnet Extranjeria']"
                      label="Ingrese el Tipo de Documento"
                      outlined
                      v-model="residente.tipoDocumento"
                      @input="$v.residente.tipoDocumento.$touch()"
                      @blur="$v.residente.tipoDocumento.$touch()"
                      :error-messages="errorTipoDocumento"
                      color="#009900"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="residente.numeroDocumento"
                      outlined
                      @input="$v.residente.numeroDocumento.$touch()"
                      @blur="$v.residente.numeroDocumento.$touch()"
                      :error-messages="errorNumeroDocumento"
                      label="Ingrese el n°documento"
                      color="#009900"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="residente.lugarNacimiento"
                  outlined
                  label="Ingrese el Lugar de Nacimiento"
                  color="#009900"
                  @input="$v.residente.lugarNacimiento.$touch()"
                  @blur="$v.residente.lugarNacimiento.$touch()"
                  :error-messages="errorLugarNacimiento"
                ></v-text-field>

                <v-card style="padding:5px;margin:40px 0 18px 0;background-color:#EAEAEA">
                  <v-card-title>
                    <v-row>
                      <v-col :cols="8">Telefono de referencia</v-col>
                      <v-col :cols="4" align="right">
                        <v-btn
                          fab
                          small
                          dark
                          color="green"
                          @click="dialogTelefonoReferencial = true"
                        >
                          <v-icon dark>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card-title>
                  <template v-if="residente.telefonosReferencia.length <= 0">
                    <v-alert
                      text
                      outlined
                      border="left"
                      color="deep-orange"
                      width="97%"
                      class="ml-3"
                      icon="info"
                    >No ha registrado ningún telefono de referencia</v-alert>
                  </template>
                  <v-card
                    tile
                    elevation="0"
                    color="#FAFAFA"
                    style="margin-top:5px"
                    height="60"
                    v-for="(item,
                                  index) in residente.telefonosReferencia"
                    :key="index"
                  >
                    <v-row style="margin-left:10px;heigh:100%" align="center">
                      <v-col :cols="5">
                        <article>
                          <img
                            style="margin-right:5px;width:6% "
                            src="https://www.flaticon.es/svg/static/icons/svg/996/996443.svg"
                            alt="imagen usuario"
                          />
                          <span style="font-size:18px">
                            {{ item.referentefamiliar }} -
                            {{ item.parentesco }}
                          </span>
                        </article>
                      </v-col>
                      <v-col :cols="3">
                        <article>
                          <img
                            style="margin-right:10px;width:8%"
                            src="https://www.flaticon.es/svg/static/icons/svg/633/633544.svg"
                            alt="imagen telefono"
                          />
                          <span style="font-size:18px">
                            {{
                            item.numero
                            }}
                          </span>
                        </article>
                      </v-col>
                      <v-col :cols="4" align="right">
                        <div style="margin-right:20px">
                          <v-btn fab x-small dark color="red" @click="eliminarTelefono(item.index)">
                            <v-icon dark>mdi-minus</v-icon>
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                  <v-card v-if="errorTelefonosReferenciales" color="red">
                    <v-card-text class="text-center" style="color: white">
                      Debe Ingresar un Telefono de referencia
                      Obligatoriamente
                    </v-card-text>
                  </v-card>
                </v-card>
                <v-row justify="center">
                  <v-dialog v-model="dialogTelefonoReferencial" persistent max-width="600px">
                    <v-card>
                      <v-card-title>
                        <span class="headline">Registrar Telefono</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="telefonos.referenteFamiliar"
                                label="Referente Familiar"
                                color="#009900"
                                @input="$v.telefonos.referenteFamiliar.$touch()"
                                @blur="$v.telefonos.referenteFamiliar.$touch()"
                                :error-messages="errorReferenteFamiliar"
                              ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-combobox
                                v-model="telefonos.parentesco"
                                :items="itemParentesco"
                                label="Parentesco"
                                @input="$v.telefonos.parentesco.$touch()"
                                @blur="$v.telefonos.parentesco.$touch()"
                                :error-messages="errorParentesco"
                              ></v-combobox>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                              <v-text-field
                                v-model="telefonos.numero"
                                label="Número Telefonico"
                                color="#009900"
                                @input="$v.telefonos.numero.$touch()"
                                @blur="$v.telefonos.numero.$touch()"
                                :error-messages="errorTelefono"
                              ></v-text-field>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red" @click="cerrarTelefonosReferencia()">Cerrar</v-btn>
                        <v-btn color="success" @click="guardarTelefono">Añadir</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-row>
                <v-row>
                  <v-col>
                    <v-btn block @click="cerrarDialogo()" color="primary">
                      <v-icon left>mdi-close-outline</v-icon>
                      <span>Cerrar</span>
                    </v-btn>
                  </v-col>

                  <v-col>
                    <v-btn block @click="step = 2" color="success">
                      <v-icon left>mdi-page-next-outline</v-icon>
                      <span>Continuar</span>
                    </v-btn>
                  </v-col>
                </v-row>
              </form>
            </div>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>  
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";
import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength, email, helpers } from "vuelidate/lib/validators";
export default {

}
//jum pruebita aaaaaaaaaaaa
//background-color: rgba(0,0,0,0.7);
</script>

<style>

</style>