<template>
<v-card>
    <v-card-title class="justify-center">Registro de datos del medico</v-card-title>

    <v-stepper v-model="step">

      <v-stepper-header>

         <v-stepper-step editable step="1" :complete="step>1" > General </v-stepper-step>
         <v-divider></v-divider>
         <v-stepper-step editable step="2" :complete="step>2"> Informacion de inicio de sesion </v-stepper-step>

      </v-stepper-header>

      <v-stepper-items>

        <!--CONTIENE EL STEPPERS 1 -->
        <v-stepper-content step="1">

          <div class="container-user">
            <form>

            <v-text-field
            label="Escribe tu nombre"
            class="container-Usuarios"
            @input="$v.usuarios.datos.nombre.$touch()"
            @blur="$v.usuarios.datos.nombre.$touch()"
            v-model="usuarios.datos.nombre"
            outlined
            ></v-text-field> 

            <v-text-field
            label="Escribe tu apellido paterno"
            class="container-Usuarios"
            @input="$v.usuarios.datos.apellido_paterno.$touch()"
            @blur="$v.usuarios.datos.apellido_paterno.$touch()"
            v-model="usuarios.datos.apellido_paterno" 
            outlined
            >
            </v-text-field>

            <v-text-field
            label="Escribe tu apellido materno"
            class="container-Usuarios"
            @input="$v.usuarios.datos.apellido_materno.$touch()"
            @blur="$v.usuarios.datos.apellido_materno.$touch()"
            v-model="usuarios.datos.apellido_materno" 
            outlined
            >
            </v-text-field>

            <v-autocomplete
             v-model="tdocumentos"
             :items="tdocumento"
             cache-items
             class="campos"                            
             label="Seleccione tipo de documento"  
            ></v-autocomplete>

            <v-text-field
            label="Numero de documento"
            class="container-Usuarios"
            @input="$v.usuarios.datos.apellido_materno.$touch()"
            @blur="$v.usuarios.datos.apellido_materno.$touch()"
            v-model="usuarios.datos.apellido_materno" 
            outlined
            ></v-text-field>



            

  
              <!-- Botones de cada step-->
              
            <v-row class="filas">

              <v-col cols="12" sm="6" md="6">
            <button class="btn-volver" block center @click="cerrarDialogo()">Volver</button>    
            </v-col>
       
            <v-col cols="12" sm="6" md="6">
            <button class="btn-registrar" block center @click=" step=2 ">Continuar</button>    
            </v-col>
   
            </v-row>   

            </form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">

          <div class="container-user">
            <form>

            <v-text-field
            label="Escribe tu correo electronico"
            class="container-Usuarios"
            @input="$v.usuarios.usuario.$touch()"
            @blur="$v.usuarios.usuario.$touch()"
            v-model="usuarios.correo"
            outlined
            ></v-text-field> 

            <v-text-field
            label="Escribe tu contraseña"
            class="container-Usuarios"
            @input="$v.usuarios.clave.$touch()"
            @blur="$v.usuarios.clave.$touch()"
            v-model="usuarios.clave"
            outlined
            ></v-text-field> 

            <!--Botones -->
           <v-row class="filas">

              <v-col cols="12" sm="6" md="6">
            <button class="btn-volver" block center @click=" step=1 ">Volver</button>    
            </v-col>
       
            <v-col cols="12" sm="6" md="6">
            <button class="btn-registrar" block center @click="RegistrarUsuarioMedico">Registrar</button>    
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
// import axios from "axios";
export default {
  name: "RegistrarMedico",
  data() {
    return {
      search:"",
      step: 1,
      dialog: false,
      usuarios : {
        datos:{
        nombre: "",
        apellido_paterno: "",
        apellido_materno: "",
        tipo_de_documento: "",
        // numero_de_documento:"",
        // telefono:"",
        // fecha_de_nacimiento:"",
        // correo:"",
        // sexo:"",
        },
        usuario:"",
        clave:"",
      },  
      tdocumentos:null,
      tdocumento:['DNI', 'Pasaporte'],
      modal: false,
      cargaRegistro:false,
      
    };
  },

  watch: {
  
  },
  methods: {
    cerrarDialogo() {
      this.step = 1;
      this.$emit("emit-close-dialog");
    },

    closeDialog() {
      
      this.$emit("close-dialog-Registrar");
    },    

    // async RegistrarUsuarioMedico() {
     
    //   this.UsuarioRM.nombre = this.UsuarioRM.nombre;
    //   this.UsuarioRM.apellido_paterno = this.UsuarioRM.apellido_paterno;
    //   this.UsuarioRM.apellido_materno = this.UsuarioRM.apellido_materno;
    //   this.UsuarioRM.correo = this.UsuarioRM.correo;
           
     
    //   console.log(this.UsuarioRM)
    //   //this.$v.informe.$touch();
    //   //if (this.$v.informe.$invalid) {
    //    if (this.$v.$invalid) {
    //     this.mensaje(
    //       "error",
    //       "..Oops",
    //       "Se encontraron errores en el formulario",

    //       false
    //     );
     
    //   } else {
    //       console.log("no hay errores");
    //       this.cargaRegistro = true;
    //       await axios
    //         .post("/UsuarioRM/Registrar", this.UsuarioRM)
    //         .then((res) => {
    //           this.Usuarios = res.data;
    //           this.$emit("emit-obtener-Especialidad");
    //           this.cargaRegistro = false;
    //           this.cerrarDialogo();
    //         })
    //         .catch((err) => console.log(err));
    //   }     
    // },
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