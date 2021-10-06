<template>
  <v-card>
    <v-card-title class="justify-center">Eliminar Servicio</v-card-title>

    <div class="container-eliminarServicio">
      <form>
        <v-text-field
        label="monto"
        class="campos"
        v-model="Servicio4.monto" 
        readonly
      ></v-text-field>
         <v-text-field
        label="Impuesto"
        class="campos"
        v-model="Servicio4.impuesto" 
        readonly
      ></v-text-field>
         <v-text-field
        label="Subtotal"
        class="campos"
        v-model="Servicio4.subtotal" 
        readonly
      ></v-text-field>
          
         <!--Para archivos :3 -->
      
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="eliminarServicio">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Eliminar Servicio</span>
            </v-btn>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center">Eliminando el Servicio</v-card-title>
        <div>
          <v-progress-circular
            style="display: block; margin: 40px auto"
            :size="90"
            :width="9"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
        <v-card-subtitle
          class="justify-center"
          style="font-weight: bold; text-align: center"
          >En unos momentos finalizaremos...</v-card-subtitle
        >
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import axios from "axios";

import { mapMutations, mapState,mapGetters } from "vuex";
import { required, minLength, between } from "vuelidate/lib/validators";
export default {
  props: ["Servicio4"],
    data() {
    return {
      
      EspecialidadAux: [],
      cargaRegistro: false
    };
  },
  
  methods: {
    
    async eliminarServicio() {
      //let tarifas={monto:this.Servicio4.monto,subtotal:this.Servicio4.subtotal,impuesto:this.Servicio4.impuesto,id:this.Servicio4.id,precio_final:this.Servicio4.precio_final,id_Medico:this.Servicio4.id_Medico};
     
      this.$v.$touch();
      if (this.$v.$valid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",
         
          false
        );
      } else {
      //  this.cargaRegistro = true;
      this.Servicio4.id_Medico=this.user.id;
      
      /*console.log(this.user.id_Medico);
     console.log(this.Servicio4.id_Medico);*/
     console.log(this.user.id);
   
     
     
      await axios
          .delete("/Tarifa/tarifasmedico/Delete?id="+this.Servicio4.id)
          .then((res) => { 
            this.Especialidad = res.data;
            if (this.Servicio4.id !== "") {
              this.cargaRegistro = false;
              this.closeDialog();     
              this.$emit("emit-obtener-Servicio");
              this.mensaje(
                "success",
                "Listo",
                "Servicio eliminado satisfactoriamente",
                "<strong>Se redirigirá a la Interfaz de Gestión<strong>",
                true
              );
            }
          })
          .catch((err) => console.log(err));
     }
    },
   
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-Complete");
        }
      });
    },
    closeDialog() {
      this.$emit("close-dialog-eliminar");
    },
  },
  computed: {
     ...mapGetters(['user']),
   
    errortitulo() {
      const errors = [];
      if (!this.$v.Servicio4.titulo.$dirty) return errors;
      if (!this.$v.Servicio4.titulo) this.errors.push('El titulo es obligatorio.');
            !this.$v.Servicio4.titulo.minLength &&
        errors.push("El titulo del Servicio debe poseer al menos7 caracteres");
      return errors;
    },
    errordescripcion() {
      const errors = [];
      if (!this.$v.Servicio4.descripcion.$dirty) return errors;
            !this.$v.Servicio4.descripcion.minLength &&
        errors.push("La descripcion del Servicio debe poseer al menos 6 caracteres");
      return errors;
    },
    errormonto() {
      const errors = [];
      if (!this.$v.Servicio4.monto.$dirty) return errors;
           !this.$v.Servicio4.monto.minLength &&
        errors.push("El monto debe poseer al menos 7 caracteres");
      return errors;
    },

  },
  
  validations() {
    return {   
      Servicio4: {
        monto: {
          required,
          minLength: minLength(3),
        },
        titulo: {
          required,
          minLength: minLength(8),
        },
        descripcion: {
          required,
          minLength: minLength(7),
        },
      },
    };
  },
};
</script>

<style  scoped>
.container-eliminarServicio {
  margin: 15px;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}

.inputTextField {
  border-color: green;
}
</style>