<template>
  <v-card>
    <h1 class="title-card">ELIMINAR TURNO</h1>
    <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center;font-size: 20px;margin-top:4%">¿SEGURO QUE DESEA ELIMINAR </v-card-subtitle>
    <v-card-subtitle class="justify-center" style="font-weight:bold;text-align:center;font-size: 20px;margin-top:2%"> EL TURNO?</v-card-subtitle>
    <div class="botonera">
      <button class="btn-volver" @click="ElimnarTurno()">Eliminar</button> 
      <button class="btn-registrar" @click="cerrarDialogo()">Volver</button>
    </div>
    <v-dialog width="450px" v-model="cargaRegistro" persistent>
        <v-card height="300px">
          <v-card-title class="justify-center">Eliminando Turno</v-card-title>
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
  name: "DeleteTurno",
  props: ["turno"],
  data() {
    return {
        cargaRegistro:false,
    };
  },
  async created(){
    
  },
  methods:{
    async ElimnarTurno() {
      this.cargaRegistro = true;
      await axios
          .delete("/Turno?id="+this.turno.id)
          .then((x) => {
            this.$emit("emit-cerrar");
            this.$emit("emit-obtener-turnos");
            this.cargaRegistro = false;
            this.cerrarDialogo()
          })
          .catch((err) => console.log(err));
    },
    cerrarDialogo() {
      this.$emit("emit-close-dialog");
    },
  }
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
.botonera {
  display: flex;
  justify-content: space-between;

  width: 100%;
}
.btn-volver{
  margin-left:30px;
  margin-bottom:30px;
  background: #E81717;
  color: white;
  border-radius: 10px;
  width: 40%;
  height: 60%;
  font-weight: bold;
  font-size: 20px;
}
.btn-registrar {  
  margin-right:30px;
  margin-bottom:30px;
  background: $blue;
  color: white;
  border-radius: 10px;
  width: 40%;
  height: 60%;
  font-weight: bold;
  font-size: 20px;
}
</style>