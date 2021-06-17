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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="Usuario.datos.nombre"
                :counter="10"
                label="Escribe tu nombre"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos.apellido_paterno"
                label="Escribe tu Apellido Paterno"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos.apellido_materno"
                label="Escribe tu Apellido Materno"
                required
              ></v-text-field>

              <v-select
                v-model="Usuario.datos.tipo_documento"
                :items="itemsTD"
                
                label="Selecciona un tipo de documento"
                required
              ></v-select>

              <v-text-field
                v-model="Usuario.datos.numero_documento"
                :counter="8"
                label="Ingresa tu numero de documento"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos.telefono"
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
                    v-model="Usuario.datos.fecha_nacimiento"
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
                  v-model="Usuario.datos.fecha_nacimiento"
                  @input="menu1 = false"
                  locale="es-es"
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="Usuario.datos.correo"
                label="Ingresa tu correo electronico"
                required
              ></v-text-field>

              <v-select
                v-model="Usuario.datos.sexo"
                :items="itemsS"
                
                label="Selecciona tu sexo"
                required
              ></v-select>

              <!-- <v-text-field
                v-model="foto"
                label="Ingresa tu hermosa cara"
                required
              ></v-text-field> -->

              <v-file-input
                v-model="Usuario.datos.foto"
               
                accept="image/png, image/jpeg, image/bmp"
                placeholder="Subir foto"
                prepend-icon="mdi-camera"
                label="Foto"
              ></v-file-input>

              <v-div align="center" justify="space-around">
               
                <v-btn  text @click="RegistrarMedico = false">
                  Cancel
                </v-btn>
                
                
                <v-btn  color="primary" @click="e1 = 2">
                  Continue
                </v-btn>
                
              </v-div>

              <v-divider></v-divider>
              <v-divider></v-divider>
            </v-form>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div class="container-user">
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="Usuario.datos_basicos.lugar_trabajo"
                :counter="10"
               
                label="Lugar de trabajo"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos_basicos.numero_colegiatura"
                :counter="10"
                
                label="Numero de colegiatura"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos_basicos.idiomas"
                :counter="10"
               
                label="Idiomas que manejas"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos_basicos.universidad"
                :counter="10"
                
                label="Universidad en donde estudiaste"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos_basicos.experiencia"
                :counter="10"
                
                label="Describe la experiencia con la que cuentas"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.datos_basicos.cargos"
                :counter="10"
                
                label="Escribe los cargos que haz ejercido"
                required
              ></v-text-field>
            </v-form>
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
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="Usuario.usuario"
                label="Escribe tu usuario"
                required
              ></v-text-field>

              <v-text-field
                v-model="Usuario.password"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Escribe tu contraseña"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
              ></v-text-field>
            </v-form>
          </div>

          <v-row align="center" justify="space-around">
            <v-btn text>
              Cancel
            </v-btn>
            <v-btn  x-large color="success" @click="registrarMedico()">
              Registrar
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

    <v-dialog width="450px" v-model="cargaRegistroUsuarioMedico" persistent>
       <v-card height="300px">
          <v-card-title class="justify-center">Registrando Usuario Medico</v-card-title>
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
  name: "RegistrarMedico",
  props: ["GestionarUsuario"],
  data() {
    return {


      e1: 1,
      Usuario: {
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
        fecha_creacion: "",
        rol: "607f37c1cb41a8de70be1df3",
        estado: "activo",
        datos_basicos: {
          lugar_trabajo: "",
          numero_colegiatura: "",
          idiomas: "",
          universidad: "",
          experiencia: "",
          cargos: "",
          id_especialidad: "",
          id_usuario: "",
        },
        
      },
      datemenuR:false,
      cargaRegistroUsuarioMedico:false,
      itemsTD: ["DNI", "Pasaporte"],
      itemsS: ["M", "F"],
    };
  },

  methods: {

    async registrarMedico() {
     
      this.Usuario.datos.nombre = this.Usuario.datos.nombre;
      this.Usuario.datos.apellido_paterno = this.Usuario.datos.apellido_paterno;
      this.Usuario.datos.apellido_materno = this.Usuario.datos.apellido_materno;
      this.Usuario.datos.tipo_documento = this.Usuario.datos.tipo_documento;
      this.Usuario.datos.numero_documento = this.Usuario.datos.numero_documento;
      this.Usuario.datos.telefono = this.Usuario.datos.telefono;
      this.Usuario.datos.fecha_nacimiento = this.Usuario.datos.fecha_nacimiento;
      this.Usuario.datos.correo = this.Usuario.datos.correo;
      this.Usuario.datos.sexo = this.Usuario.datos.sexo;
      this.Usuario.datos.foto = this.Usuario.datos.foto;
      this.Usuario.usuario = this.Usuario.usuario;
      this.Usuario.clave = this.Usuario.clave;
      this.Usuario.fecha_creacion = this.Usuario.fecha_creacion;
      this.Usuario.rol = this.Usuario.rol;
      this.Usuario.estado = this.Usuario.estado;

      this.Usuario.datos_basicos.lugar_trabajo=this.Usuario.datos_basicos.lugar_trabajo;
      this.Usuario.datos_basicos.numero_colegiatura = this.Usuario.datos_basicos.numero_colegiatura;
      this.Usuario.datos_basicos.idiomas=this.Usuario.datos_basicos.idiomas;
      this.Usuario.datos_basicos.universidad=this.Usuario.datos_basicos.universidad;
      this.Usuario.datos_basicos.experiencia=this.Usuario.datos_basicos.experiencia;
      this.Usuario.datos_basicos.cargos=this.Usuario.datos_basicos.cargos;
      this.Usuario.datos_basicos.id_especialidad=this.Usuario.datos_basicos.id_especialidad;
      this.Usuario.datos_basicos.id_usuario=this.Usuario.datos_basicos.id_usuario;
         
      console.log(this.Usuario)
      //this.$v.informe.$touch();
      //if (this.$v.informe.$invalid) {
       
          console.log("no hay errores");
          this.cargaRegistroUsuarioMedico = true;
          await axios
            .post("/MiUsuario/RegistrarUsuarioMedico", this.Usuario)
            .then((res) => {
              this.Usuario = res.data;
              this.$emit("emit-obtener-Usuario");
              this.cargaRegistroUsuarioMedico = false;
              this.cerrarDialogo();
            })
            .catch((err) => console.log(err));
          
    },

    },
};
</script>
