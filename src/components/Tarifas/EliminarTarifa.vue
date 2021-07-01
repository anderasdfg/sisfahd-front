<template>
  <v-card>
    <v-card-title class="justify-center">Eliminar Tarifa</v-card-title>

    <div class="container-EliminarTarifa">
      <form>
        <v-text-field
        label="descripcion"
        class="campos"
        v-model="Tarifa4.descripcion" 
        readonly
      ></v-text-field>
         <v-text-field
        label="Impuesto"
        class="campos"
        v-model="Tarifa4.impuesto" 
        readonly
      ></v-text-field>
         <v-text-field
        label="Subtotal"
        class="campos"
        v-model="Tarifa4.subtotal" 
        readonly
      ></v-text-field>
          
         <v-text-field
        label="Precio "
        class="campos"
        v-model.number="Tarifa4.precio_final" 
        readonly
      ></v-text-field>
         <!--Para archivos :3 -->
      

        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn block color="success" elevation="2" @click="eliminarTarifa">
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Eliminar Tarifa</span>
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
        <v-card-title class="justify-center">Eliminando la tarifa</v-card-title>
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
  props: ["Tarifa4"],
    data() {
    return {
      
      EspecialidadAux: [],
      cargaRegistro: false
    };
  },
  
  methods: {
    
    async eliminarTarifa() {
      //let tarifas={descripcion:this.Tarifa4.descripcion,subtotal:this.Tarifa4.subtotal,impuesto:this.Tarifa4.impuesto,id:this.Tarifa4.id,precio_final:this.Tarifa4.precio_final,id_Medico:this.Tarifa4.id_Medico};
     
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
      this.Tarifa4.id_Medico=this.user.id;
      
      /*console.log(this.user.id_Medico);
     console.log(this.Tarifa4.id_Medico);*/
     console.log(this.user.id);
   
     
     
      await axios
          .delete("/Tarifa/tarifasmedico/Delete?id="+this.Tarifa4.id)
          .then((res) => { 
            this.Especialidad = res.data;
            if (this.Tarifa4.id !== "") {
              this.cargaRegistro = false;
              this.closeDialog();     
              this.$emit("emit-obtener-tarifas");
              this.mensaje(
                "success",
                "Listo",
                "Especialidad actualizada satisfactoriamente",
                "<strong>Se redirigiá a la Interfaz de Gestión<strong>",
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
   
    errorNombre() {
      const errors = [];
      if (!this.$v.Tarifa4.nombre.$dirty) return errors;
      if (!this.$v.Tarifa4.nombre) this.errors.push('El nombre es obligatorio.');
            !this.$v.Tarifa4.nombre.minLength &&
        errors.push("El nombre de la especialidad debe poseer al menos7 caracteres");
      return errors;
    },
    errorCodigo() {
      const errors = [];
      if (!this.$v.Tarifa4.codigo.$dirty) return errors;
            !this.$v.Tarifa4.codigo.minLength &&
        errors.push("El codigo de la especialida debe poseer al menos 6 caracteres");
      return errors;
    },
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Tarifa4.descripcion.$dirty) return errors;
           !this.$v.Tarifa4.descripcion.minLength &&
        errors.push("La descripción debe poseer al menos 7 caracteres");
      return errors;
    },

  },
  
  validations() {
    return {
     /* residente: {
        id: {
          required,
        },
      },*/
      Tarifa4: {
        descripcion: {
          required,
          minLength: minLength(7),
        },
        nombre: {
          required,
          minLength: minLength(8),
        },
        codigo: {
          required,
          minLength: minLength(6),
        },
      },
      EspecialidadAux: {
        required,
      },
    };
  },
};
</script>

<style  scoped>
.container-EliminarTarifa {
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