<template>
  <v-card>
    <v-card-title class="justify-center">Modificar Medicamento</v-card-title>

    <div class="container-Medicamento">
       <v-form>
        <v-text-field
          v-model.trim="Medicinas.descripcion"
          label="Descripción"
          outlined
          @input="$v.Medicinas.descripcion.$touch()"
          @blur="$v.Medicinas.descripcion.$touch()"
          :error-messages="errorDescripcion"
          color="#009900"
        ></v-text-field>

        <v-text-field
          v-model.trim="Medicinas.generico"
          label="Generico"
          outlined
          @input="$v.Medicinas.generico.$touch()"
          @blur="$v.Medicinas.generico.$touch()"
          :error-messages="errorGenerico"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.trim="Medicinas.precio"
          label="Precio"
          @input="$v.Medicinas.precio.$touch()"
          @blur="$v.Medicinas.precio.$touch()"
          height="25"
          rows="2"
          :error-messages="errorPrecio"
          outlined
          color="#009900"
        ></v-text-field>


        
        <v-divider class="divider-custom"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6" md="6">
            <v-btn
              block
              color="success"
              elevation="2"
              @click.prevent="modificarMedicamentos()"
            >
              <v-icon left>mdi-content-save-all-outline</v-icon>
              <span>Modificar Medicamentos</span>
            </v-btn>

          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-btn color="error" elevation="2" block @click="closeDialog">
              <v-icon left>mdi-close-outline</v-icon>
              Cerrar
            </v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
      <v-card height="300px">
        <v-card-title class="justify-center"
          >Modificando el medicamento</v-card-title
        >
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
import { mapMutations, mapState } from "vuex";
import { required, minLength} from "vuelidate/lib/validators";
export default {
  name: "ModificarMedicamento",
  props: ["Medicinas"],
  components: {},
  data() {
    return {
    //  medicina: {
     //   descripcion: "",
      //  generico: "",
     //  precio: "",
     // },

      cargaRegistro: false,
    };
  },
  methods: {
     ...mapMutations(["replaceListaMedicamento"]),



    async abrirDialogoModificarMedicamento(id) {
      this.med = await this.loadMedicamento(id);
      console.log("usuario consultado");
      console.log(this.med);
      this.modificarMedicamentos = true;
    },

    async loadMedicamento(id) {
      var med = {};
      await axios
        .get("/Medicinas/Id?id=" + id)
        .then((res) => {
          console.log(res);
          med = res.data;
          console.log(med)
        })
        .catch((err) => console.log(err));
      console.log(med);     
      return med;
    },
    
    
        async modificarMedicamentos() {
      
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.mensaje(
          "error",
          "..Oops",
          "Se encontraron errores en el formulario",

          false
        );
      } else {
        this.cargaRegistro = true;
        await axios
          .put("/Medicinas/Modificar",this.Medicinas)
          .then((res) => {
            
           this.Medicinas = res.data;
           console.log("modifica");
           if(this.Medicinas.id !== ""){
             this.cargaRegistro = false;
             this.closeDialog();
             this.$emit("emit-obtener-2medicamentos");
           }
           // console.log(this.medicina);
           // this.replaceListaMedicamento(this.Medicinas);
           // console.log(res.data);
            //this.limpiarMedicamento();
            //this.resetRegistrarMedicinaValidationState();
           // this.cargaRegistro = false;

            
           
          })
          .catch((err) => console.log(err));
          
      }
    },

    closeDialog() {
      //this.limpiarMedicamento();
      //this.resetRegistrarMedicinaValidationState();
      this.$emit("close-dialog-Modificar");
    },
     resetRegistrarMedicinaValidationState() {
      this.$v.Medicinas.$reset();
    },

    limpiarMedicamento() {
      this.Medicinas.descripcion = "";
      this.Medicinas.generico = "";
      this.Medicinas.precio = "";
    },
  },
computed: {
    errorDescripcion() {
      const errors = [];
      if (!this.$v.Medicinas.descripcion.$dirty) return errors;
      !this.$v.Medicinas.descripcion.required &&
        errors.push("Debe ingresar una descripcion de la medicina");
      !this.$v.Medicinas.descripcion.minLength &&
        errors.push(
          "La descripcion de la medicina debe poseer al menos 6 caracteres"
        );

      return errors;
    },
    errorGenerico() {
      const errors = [];
      if (!this.$v.Medicinas.generico.$dirty) return errors;
      !this.$v.Medicinas.generico.required &&
        errors.push("Debe ingresar el generico de la medicina");
      !this.$v.Medicinas.generico.minLength &&
        errors.push(
          "El generico de la medicina debe poseer al menos 6 caracteres"
        );
      return errors;
    },
    errorPrecio() {
      const errors = [];
      if (!this.$v.Medicinas.precio.$dirty) return errors;
      !this.$v.Medicinas.precio.required &&
        errors.push("Debe ingresar el precio de la medicina");
      !this.$v.Medicinas.precio.minLength &&
        errors.push("El precio debe poseer al menos 2 caracteres");

      return errors;
    },
  },
  validations() {
    return {
      Medicinas: {
        descripcion: {
          required,
          minLength: minLength(6),
        },
        generico: {
          required,
          minLength: minLength(6),
        },
        precio: {
          required,
          minLength: minLength(2),
        },
      },
    };
  },
};
</script>

<style scoped>
.container-Medicamento {
  margin: 15px;
}

.subtitle {
  color: #314b5f;
}
.divider-custom {
  margin-top: 7px;
  margin-bottom: 7px;
}
.dropzone-custom-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.dropzone-custom-title {
  margin-top: 0;
  color: #00b782;
}
.inputTextField {
  border-color: green;
}
</style>
