<template>
<v-card>
    <v-card-title class="justify-center">Registro de datos del Usuario Paciente</v-card-title>
    
<v-stepper v-model="e1">

     <v-stepper-header>

       <!--<v-stepper-step  class="justify-center" editabled step="1" :complete="e1>1" step="1"> Informacion del Usuario </v-stepper-step>
       <v-divider></v-divider>
       <v-stepper-step class="justify-center" editable step="2" :complete="step>2"> Informacion de inicio de sesion </v-stepper-step> -->


<v-stepper-step class="justify-center" 
        :complete="e1 > 1"
        step="1"
      >
        Informacion del Usuario
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step class="justify-center" step="2">
        Informacion de inicio de sesion
      </v-stepper-step>
     </v-stepper-header>


<v-stepper-items>
  <v-stepper-content step="1">
 <div class="container-user">
 <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="nombre"
      :counter="10"
      :rules="nameRules"
      label="Escribe tu nombre"
      required
    ></v-text-field>

    <v-text-field
      v-model="apellido_paterno"
      :rules="emailRules"
      label="Escribe tu Apellido Paterno"
      required
    ></v-text-field>

    <v-text-field
      v-model="apellido_materno"
      :rules="emailRules"
      label="Escribe tu Apellido Materno"
      required
    ></v-text-field>

    <v-select
      v-model="tipo_documento"
      :items="itemsTD"
      :rules="[v => !!v || 'El tipo de documento es requerido']"
      label="Selecciona un tipo de documento"
      required
    ></v-select>

    <v-text-field
      v-model="numero_documento"
      :counter="8"
      :rules="emailRules"
      label="Ingresa tu numero de documento"
      required
    ></v-text-field>

    <v-text-field
          v-model="telefono"
          :counter="9"
          :error-messages="errors"
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
                          v-model="fecha_nacimiento"
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
                          v-model="fecha_nacimiento"
                          @input="menu1 = false"
                          locale="es-es"
                      ></v-date-picker>
                    </v-menu>

                    <v-text-field
          v-model="correo"

          label="Ingresa tu correo electronico"
          required
        ></v-text-field>

        



 <v-select
      v-model="sexo"
      :items="itemsS"
      :rules="[v => !!v || 'Selecciona tu sexo']"
      label="Selecciona tu sexo"
      required
    ></v-select>

    <v-text-field
          v-model="foto"
          label="Ingresa tu hermosa cara"
          required
        ></v-text-field>

    <v-row align="center" justify="space-around">
                <v-btn text>
                  Cancel
                </v-btn>
                <v-btn color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
    </v-row>



  </v-form>
  </div>
  </v-stepper-content>
  <v-stepper-content step="2">
        <v-text-field
      v-model="usuario"
      label="Escribe tu usuario"
      required
    ></v-text-field>

     <v-text-field
            v-model="password"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            name="input-10-1"
            label="Escribe tu contraseña"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
          ></v-text-field>

         <v-row align="center" justify="space-around">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn color="primary" @click="e1 = 1">
              Continue
            </v-btn>
          </v-row>

  </v-stepper-content>
        

</v-stepper-items>

</v-stepper>

<v-dialog width="450px" v-model="cargaRegistro" persistent>
       <v-card height="300px">
          <v-card-title class="justify-center">Registrando Usuario Paciente</v-card-title>
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

export default {
  name: "RegistrarUsuario",
  props: ["idusuario"],
  data() {
    return {
      usuarios: {
        datos: {
          nombre: "",
          apellido_paterno: "",
          apellido_materno: "",
          tipo_documento: "",
          numero_de_documento: "",
          telefono: "",
          fecha_nacimiento: "",
          correo: "",
          sexo: "",
        },
        usuario: "",
        clave: "",
      },
      step: 1,
      dialog: false,
      date: null,      
      modal: false,
      itemsTD: ['DNI', 'Pasaporte'],
      itemsS: ['M','F'],
      fecha_nacimiento: "",
      datemenuR:false,
      //Esto sera reemplazado luego
      
      
      cargaRegistro:false,
      
    };
  },
  async created(){
    
  },
  watch: {
  
  },
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("emit-close-dialog");
    },

    async registrarPaciente() {
     
      this.Usuario.nombre = this.Usuario.nombre;
      this.Usuario.apellido_paterno = this.Usuario.apellido_paterno;
      this.Usuario.apellido_materno = this.Usuario.apellido_materno;
      this.Usuario.tipo_documento = this.Usuario.tipo_documento;
      this.Usuario.numero_documento = this.Usuario.numero_documento;
      // this.Usuario.nombre = this.Usuario.nombre;
      this.Usuario.sexo = this.Usuario.sexo;
      this.Usuario.telefono = this.Usuario.telefono;
      
      console.log(this.Usuario)
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {
       if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
        );
     
      } else {
          console.log("no hay errores");
          this.cargaRegistro = true;
          await axios
            .post("/Usuario/Registrar", this.Usuario)
            .then((res) => {
              this.Usuarios = res.data;
              this.$emit("emit-obtener-Usuario");
              this.cargaRegistro = false;
              this.cerrarDialogo();
            })
            .catch((err) => console.log(err));
      }     
    },

    },
  
  computed:{
    
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