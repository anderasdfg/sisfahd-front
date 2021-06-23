<template>
  <v-card>
    <v-card-title class="justify-center"
      >Registro de los datos del Usuario Medico
    </v-card-title>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Informacion general del usuario
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Datos basicos del medico
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3">
          Inicio de sesion
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
              <v-text-field
                v-model="usuario.datos.nombre"
                :counter="10"
                label="Escribe tu nombre"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.apellido_paterno"
                label="Escribe tu Apellido Paterno"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.apellido_materno"
                label="Escribe tu Apellido Materno"
                required
              ></v-text-field>

              <v-select
                v-model="usuario.datos.tipo_documento"
                :items="itemsTD"
                
                label="Selecciona un tipo de documento"
                required
              ></v-select>

              <v-text-field
                v-model="usuario.datos.numero_documento"
                :counter="8"
                label="Ingresa tu numero de documento"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.telefono"
                :counter="9"
                label="Ingresa tu numero de celular"
                required
              ></v-text-field>

              <v-menu
                v-model="datemenuR"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="usuario.datos.fecha_nacimiento"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                    color="#009900"
                    outlined
                    label="Fecha de tu nacimiento"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="usuario.datos.fecha_nacimiento"
                  @input="menu1 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="usuario.datos.correo"
                label="Ingresa tu correo electronico"
                required
              ></v-text-field>

              <v-select
                v-model="usuario.datos.sexo"
                :items="itemsS"
                
                label="Selecciona tu sexo"
                required
              ></v-select>

              <!-- <v-text-field
                v-model="foto"
                label="Ingresa tu hermosa cara"
                required
              ></v-text-field> -->

              <div align="center" justify="space-around">
               
                <v-btn  text @click="RegistrarMedico = false">
                  Cancel
                </v-btn>
                
                
                <v-btn  color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
                
              </div>

              <v-divider></v-divider>
              <v-divider></v-divider>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
              <v-text-field
                v-model="usuario.datos_basicos.lugar_trabajo"
                :counter="10"
               
                label="Lugar de trabajo"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.numero_colegiatura"
                :counter="10"
                
                label="Numero de colegiatura"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.idiomas"
                :counter="10"
               
                label="Idiomas que manejas"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.universidad"
                :counter="10"
                
                label="Universidad en donde estudiaste"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.experiencia"
                :counter="10"
                
                label="Describe la experiencia con la que cuentas"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.cargos"
                :counter="10"
                
                label="Escribe los cargos que haz ejercido"
                required
              ></v-text-field>
          </div>
          <v-row align="center" justify="space-around">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn color="primary" @click="e1 = 3">
              Continue
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="container-user">
              <v-text-field
                v-model="usuario.usuario"
                label="Escribe tu usuario"
                required
              ></v-text-field>

              <v-text-field
                v-model="usuario.clave"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Escribe tu contraseña"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
          </div>

          <v-row align="center" justify="space-around">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn  x-large color="success" @click="modificarMedico()">
              Modificar
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog width="450px" v-model="cargaRegistroUsuarioMedico" persistent>
       <v-card height="300px">
          <v-card-title class="justify-center">Modificando </v-card-title>
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
  </v-card>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex';
export default {
  props: ["usuario"],
  data() {
    return {
      usuarioAux:[],
      dialog: false,
      date: null,
      modal: false,
      itemsTD: ["DNI", "Pasaporte"],
      itemsS: ["M", "F"],
      fecha_nacimiento: "",
      datemenuR: false,
      //Esto sera reemplazado luego
      cargaRegistroUsuarioMedico: false,
      e1: 1,
       show1: false,
    };
  },
   methods: {
   ...mapMutations(["addListUsuarios","setListUsuarios"]),
        async modificarMedico(){
      console.log(this.usuario)
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {
       
          console.log("no hay errores");
          this.cargaModificarUsuarioMedico = true;
        //   for (let index = 0; index < this.usuarioAux.length; index++) {
        //   if (this.UsuarioAux[index].url !== undefined) {
        //     this.Usuario.id.push({
        //       link: this.usuarioAux[index].url,
        //       descripcion: "id " + (index + 1),
        //     });
           
        //   } 
        // }
          await axios
            .put("/MiUsuario/ModificarUsuarioMedico", this.usuario)
            .then((res) => {

              let usuarioPacienteAlterado ={
                urol:{
                  nombre:"Medico"
                },
                datos:{
                  nombresyapellidos:this.usuario.datos.nombre+" "+this.usuario.datos.apellido_paterno+" "+this.usuario.datos.apellido_materno,
                  tipo_documento:this.usuario.datos.tipo_documento,
                  numero_documento:this.usuario.datos.numero_documento
                }

                
              }
              // //this.usuario = res.data;
              // // console.log(res.data);
              // // this.$emit("cerrar-modal-registro-usuario");
              this.addListUsuarios(usuarioPacienteAlterado);
              console.log(res.data);
              this.$emit("cerrar-modal-registro-usuario");
              this.cargaModificarUsuarioMedico = false;
            })
            .catch((err) => console.log(err));
 
    },

   },
};
</script>