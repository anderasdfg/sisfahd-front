<template>
  <v-card>
    <v-card-title class="justify-center"
      >Datos del Usuario Medico
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
               
                label="Nombre"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.apellido_paterno"
                label="Apellido Paterno"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.apellido_materno"
                label="Apellido Materno"
                readonly
              ></v-text-field>

              <v-select
                v-model="usuario.datos.tipo_documento"
                :items="itemsTD"
                :item-text="itemsTD.text"
                 :item-value="itemsTD.value"
                
                label="Tipo de documento"
                readonly
              ></v-select>

              <v-text-field
                v-model="usuario.datos.numero_documento"
                
                label="Numero de documento"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos.telefono"
                
                label="Numero de celular"
                readonly
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
                    label="Fecha de nacimiento"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="usuario.datos.fecha_nacimiento"
                  @input="menu1 = false"
                  locale="es-es"
                  readonly
                ></v-date-picker>
              </v-menu>

              <v-text-field
                v-model="usuario.datos.correo"
                label="Correo electronico"
                readonly
              ></v-text-field>

              <v-select
                v-model="usuario.datos.sexo"
                :items="itemsS"
                :item-text="itemsS.text"
                :item-value="itemsS.value"
                label="Sexo"
                readonly
              ></v-select>

              <v-card style="margin:5px; padding:5px;border:1px solid #b3b3b3;">
            <v-row>
              <v-col >
               
              </v-col>
            </v-row>
            <v-row>
              <v-col
              >
                <v-img style="display:block"
                      height="170"
                    width="170"
                      :src="usuario.datos.foto"
                    ></v-img>
              </v-col>
            </v-row>
          </v-card>

              <div align="center" justify="space-around">
               
                <v-btn  text @click="cerrarDialogo">
                  Cancelar
                </v-btn>
                
                
                <v-btn  color="primary" @click="e1 = 2">
                  Continuar
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
                
               
                label="Lugar de trabajo"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.numero_colegiatura"
                
                
                label="Numero de colegiatura"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.idiomas"
                
               
                label="Idiomas"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.universidad"
                
                
                label="Universidad"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.experiencia"
                
                
                label="Experiencia"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.datos_basicos.cargos"
               
                
                label="Cargos"
                readonly
              ></v-text-field>
          </div>
          <v-row align="center" justify="space-around">
            <v-btn color="error" @click="e1 =1">
              Regresar
            </v-btn>
            <v-btn color="primary" @click="e1 = 3">
              Continuar
            </v-btn>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <div class="container-user">
              <v-text-field
                v-model="usuario.usuario"
                label="Usuario"
                readonly
              ></v-text-field>

              <v-text-field
                v-model="usuario.clave"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show1 ? 'text' : 'password'"
                name="input-10-1"
                label="Contraseña"
                hint="At least 8 characters"
                counter
                @click:append="show1 = !show1"
                readonly
              ></v-text-field>
          </div>

          <v-row align="center" justify="space-around">
            <v-btn color="error" @click="e1 =2">
              Regresar
            </v-btn>
            <v-btn  x-large color="success" @click="cerrarDialogo">
              Cerrar
            </v-btn>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  name: "VisualizarMedico",
  props: ["usuario"],
  data() {
    return {
     
      step: 1,
      e1:1,
      // itemsTD: ["DNI", "Pasaporte"],
      itemsTD: [
        { value: "DNI", text: "DNI" },
        { value: "CE", text: "Carnet de extranjería" },
        { value: "CD", text: "Cédula diplomática" },
        { value: "Pasaporte", text: "Pasaporte" },
      ],
      itemsS: [ {
          value:'M',
          text:'Masculino'
        },
        {
          value:'F',
          text:'Femenino'
        },],
     
      
    };
  },
  
  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
    cerrarDialogo() {
      
      this.$emit("close-dialog-detalleM");
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    async obtenerUsuarioMedico() {
      await axios
          .get("/MiUsuario/usuarioIdMedico/"+id)
          .then((x) => {
            this.Usuario = x.data;
            console.log(this.Usuario);
          })
          .catch((err) => console.log(err));
    },
    
        
   
  },
    /*async mensaje(icono, titulo, texto, footer) {
      await this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      });
    },*/
}
</script>