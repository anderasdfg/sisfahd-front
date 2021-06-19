<template>
  <v-card>
    <v-card-title class="justify-center">
      <h2>visualizar usuario paciente</h2>
    </v-card-title>
    <v-divider></v-divider>
    <v-divider></v-divider>

    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Informacion del usuario
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="2">
          Informacion de inicio de sesion
        </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="container-user">
            
              <v-text-field
                v-model="nombre"
                required
              ></v-text-field>

              <v-text-field
                v-model="apellido_paterno"
                required
              ></v-text-field>

              <v-text-field
                v-model="apellido_materno"
                required
              ></v-text-field>


              <v-text-field
                v-model="tipo_documento"
                required
              ></v-text-field>

              <v-text-field
                v-model="numero_documento"
                required
              ></v-text-field>

              <v-text-field
                v-model="telefono"
                required
              ></v-text-field>

              <v-text-field
                v-model="fecha_nacimiento"
                required
              ></v-text-field>
              
              <v-text-field
                v-model="correo"
                required
              ></v-text-field>

              <v-text-field
                v-model="sexo"
                required
              ></v-text-field>

              <v-text-field
                v-model="foto"
                required
              ></v-text-field>

              <v-btn color="error">
                Cancelar
              </v-btn>

              <v-btn color="primary" @click="e1 = 2">
                Continuar
              </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
              <v-text-field
                v-model="usuario"
                required
              ></v-text-field>

              <v-text-field
                v-model="clave"
                required
              ></v-text-field>
          </div>

          <v-btn text>
            Cancelar
          </v-btn>

        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

  </v-card>
</template>

<script>
import axios from "axios";
import { mapMutations } from 'vuex';
export default {
  data() {
    return {
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
          foto: "www.google.com",
        },
        usuario: "",
        clave: "",
        rol: "607f37c1cb41a8de70be1df3",
        estado:"activo",
        id_especialidad:"",
        id_usuario:"",
      },
      dialog: false,
      date: null,
      modal: false,
      itemsTD: ["DNI", "Pasaporte"],
      itemsS: ["M", "F"],
      fecha_nacimiento: "",
      datemenuR: false,
      //Esto sera reemplazado luego
      cargaRegistroUsuarioPaciente: false,
      e1: 1,
       show1: false,
    };
  },
  // methods: {
  //   ...mapMutations(["addListUsuarios"]),
  //   async registrarPaciente(){
  //     console.log(this.usuario)
  //     //this.$v.informe.$touch();
  //     //if (this.$v.informe.$invalid) {
       
  //         console.log("no hay errores");
  //         this.cargaRegistroUsuarioPaciente = true;
  //         await axios
  //           .post("/MiUsuario/Registrar", this.usuario)
  //           .then((res) => {

  //             let usuarioPacienteAlterado ={
  //               urol:{
  //                 nombre:"Paciente"
  //               },
  //               datos:{
  //                 nombresyapellidos:this.usuario.datos.nombre+" "+this.usuario.datos.apellido_paterno+" "+this.usuario.datos.apellido_materno,
  //                 tipo_documento:this.usuario.datos.tipo_documento,
  //                 numero_documento:this.usuario.datos.numero_documento
  //               }

                
  //             }
  //             //this.usuario = res.data;
  //             // console.log(res.data);
  //             // this.$emit("cerrar-modal-registro-usuario");
  //             this.addListUsuarios(usuarioPacienteAlterado);
  //             console.log(res.data);
  //             this.$emit("cerrar-modal-registro-usuario");
  //             this.cargaRegistroUsuarioPaciente = false;
  //           })
  //           .catch((err) => console.log(err));
 
  //   },

  // },
};
</script>
