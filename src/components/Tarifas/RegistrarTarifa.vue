<template>
  <v-card>
    <v-card-title class="justify-center">Registrar Tarifa</v-card-title>
     <div class="container-Especialidad">
   
     <v-form>
      
       <v-text-field
          v-model.trim="tarifa.descripcion"
          label="descripcion"
          outlined
          @input="$v.tarifa.descripcion.$touch()"
          @blur="$v.tarifa.descripcion.$touch()"
          :error-messages="errordescripcion"
          color="#009900"
        ></v-text-field>
          
          <v-text-field
          v-model.number="tarifa.impuesto"
          label="impuesto"
          outlined
          @input="$v.tarifa.impuesto.$touch()"
          @blur="$v.tarifa.impuesto.$touch()"
          :error-messages="errorimpuesto"
          color="#009900"
        ></v-text-field>
        <v-text-field
          v-model.number="tarifa.subtotal"
          label="subtotal"
          @input="$v.tarifa.subtotal.$touch()"
          @blur="$v.tarifa.subtotal.$touch()"
          height="25"
          rows="2"
          :error-messages="errorsubtotal"
          outlined
          color="#009900"
        ></v-text-field>
         <v-text-field
          v-model.number="tarifa.precio_final"
          label="precio final"
          @input="$v.tarifa.precio_final.$touch()"
          @blur="$v.tarifa.precio_final.$touch()"
          height="25"
          rows="2"
          :error-messages="errorprecio_final"
          outlined
          color="#009900"
        ></v-text-field>
        
      
      
   



     
      
      <v-divider class="divider-custom"></v-divider>
       <v-card-actions>
          <v-spacer></v-spacer>
         <v-col cols="12" sm="6" md="6">
          <v-btn block color="success" elevation="2" @click.prevent="RegistrarTarifa">Registrar</v-btn>    
          </v-col>
           <v-col cols="12" sm="6" md="6">      
          <v-btn color="error" elevation="2" block @click="closeDialog">Volver</v-btn>
        </v-col>
        </v-card-actions>
       </v-form>    
      
    
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
       <v-card height="300px">
          <v-card-title class="justify-center">Registrando Tarifas</v-card-title>
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

import vue2Dropzone from "vue2-dropzone";
import "vue2-dropzone/dist/vue2Dropzone.min.css";
import { mapMutations, mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "RegistrarTarifa",
  props: ["Tarifa"],
   components:{
     vueDropzone:vue2Dropzone
     },
  data() {
    return {
          step: 1, 
      dropzoneOptions: {
        url: "https://httpbin.org/post",
        thumbnailWidth: 250,
        maxFilesize: 3.0,
        maxFiles: 1,
        acceptedFiles: ".jpg, .png, jpeg",
        headers: { "My-Awesome-Header": "header value" },
        addRemoveLinks: true,
        dictDefaultMessage:
          "Seleccione una Imagen de su Dispositivo o Arrastrela Aqui",
           
        }, 
                
      tarifa : {
        descripcion: "",
        impuesto: "",
        subtotal: "",
        precio_final: "",
         
      },
        

      cargaRegistro:false,
      
    };
  },
  

  watch: {
    dialog(val) {
      val || this.close();
    },
  },
  methods: {
     ...mapMutations(["setE"]),         
    
     mounteddropzone(){
      var file = { size: 123, name: "Imagen de tarifa", type: "image/jpg" };
      this.$refs.myVueDropzone.manuallyAddFile(file, this.tarifa.url,null,null,true);
    },
    afterSuccess(file, response) {
      console.log(file);
      this.tarifa.url = file.dataURL.split(",")[1];
      this.$v.tarifa.url.$model = file.dataURL.split(",")[1];
      //console.log(file.dataURL.split(",")[1]);
    },
    
     afterRemoved(file, error, xhr) {
      this.tarifa.url = "";
      this.$v.tarifa.url.$model = "";
    },
    mensaje(icono, titulo, texto, footer, valid) {
      this.$swal({
        icon: icono,
        title: titulo,
        text: texto,
        footer: footer,
      }).then((res) => {
        if (valid) {
          this.$emit("modifier-complete");
        }
      });
    },
  
    closeDialog() {
       this.tarifa = this.limpiarTarifa();
      this.step = 1;
      
      this.$emit("close-dialog-Registrar");
    },    
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    
    async RegistrarTarifa() {
     
      this.tarifa.descripcion = this.tarifa.descripcion;
      this.tarifa.impuesto = this.tarifa.impuesto;
      this.tarifa.subtotal = this.tarifa.subtotal;
      this.tarifa.precio_final = this.tarifa.precio_final;
     
      console.log(this.tarifa)
      this.$v.tarifa.$touch();
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
          //this.cargaRegistro = true;
          await axios
            .post("/Tarifa/tarifasmedico/Registrar", this.tarifa)
            .then((res) => {
              this.tarifa = res.data;
             // this.$emit("emit-obtener-Especialidad");
              this.cargaRegistro = false;
              this.closeDialog();
             
            })
            .catch((err) => console.log(err));
            
        /*await this.mensaje(
          "success",
          "Listo",
          "Turno registrado satisfactoriamente",
          "<strong>Se redirigira a la interfaz de gestionar turnos<strong>"
        );*/
      }     
    },
    
   
      limpiarTarifa() {
      return {
       
        tarifa: {
          descripcion: "",
          impuesto: "",
          subtotal: "",
          precio_final: "",
               
  },
 }; 
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
  computed:{
    
 errordescripcion() {
      const errors = [];
      if (!this.$v.tarifa.descripcion.$dirty) return errors;
      !this.$v.tarifa.descripcion.required &&
        errors.push("Debe ingresar la descripcion de la tarifa");
            !this.$v.tarifa.descripcion.minLength &&
        errors.push("La descripcion de la tarifa debe poseer al menos7 caracteres");
        
      return errors;
    },
    errorimpuesto() {
      const errors = [];
      if (!this.$v.tarifa.impuesto.$dirty) return errors;
      !this.$v.tarifa.impuesto.required &&
        errors.push("Debe ingresar el impuesto de la tarifa");
         !this.$v.tarifa.impuesto.minLength &&
        errors.push("El Impuesto de la tarifa debe poseer al menos 3 caracteres");
         
      return errors;
    },
    errorsubtotal() {
      const errors = [];
      if (!this.$v.tarifa.subtotal.$dirty) return errors;
      !this.$v.tarifa.subtotal.required &&
        errors.push("Debe ingresar el subtotal de la tarifa");
         !this.$v.tarifa.subtotal.minLength &&
        errors.push("El subtotal de la tarifa debe poseer al menos 3 caracteres");
        
      return errors;
    },
    errorprecio_final() {
      const errors = [];
      if (!this.$v.tarifa.precio_final.$dirty) return errors;
      !this.$v.tarifa.precio_final.required &&
        errors.push("Debe ingresar el precio final de la tarifa");
        !this.$v.tarifa.precio_final.minLength &&
        errors.push("El precio final de la tarifa debe poseer al menos 4 caracteres");
          
      return errors;
    },
    
  },
  validations() {    
    return{              
        tarifa:{
          descripcion:{
            required,
             minLength: minLength(7),
          },
          impuesto:{
            required,
             minLength: minLength(3),
          },
          subtotal:{
            required,
            minLength: minLength(3),
          },   
          precio_final:{
              required,
              minLength: minLength(4),
              
          }, 
         
         
          
        },    
        
    };
  },
};
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
.container-Especialidad {
  margin: 15px;
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