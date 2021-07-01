<template>
  <v-card  class="content">
    <CardInfoMedico :medico="medico"/>
    <CardCuposDia :cupos="cupos" :usuario="this.usuario"/>
  </v-card>
</template>

<script>
import CardInfoMedico from "@/components/GestionarCitas/ComponentesCupos/CardInfoMedico.vue";
import CardCuposDia from "@/components/GestionarCitas/ComponentesCupos/CardCuposDia.vue";

export default {
  name: "CardTurno",
  props: ["turno", "usuario"],
  components: {
    CardInfoMedico,
    CardCuposDia,
  },
  data() {
    return {
      cupos: [],      
      medico: []
    };
  },
  async created() {
    this.obtenerCupos();    
  },
  methods: {
    obtenerCupos() {              
        this.medico = {
            id_medico: this.turno.id_medico,
            nombre_medico: this.turno.nombre_medico,
        };
        
        for (var y = 0; y < this.turno.cupos.length; y++) {
          var cupo = {
            id_turno: this.turno.id,
            estado: this.turno.cupos[y].estado,
            hora_inicio: this.turno.cupos[y].hora_inicio,
            id_cita: this.turno.cupos[y].id_cita,
            ratio: this.turno.cupos[y].ratio,
            id_medico: this.turno.id_medico,
            nombre_medico: this.turno.nombre_medico,
            fecha_cupo: this.turno.fecha_inicio,
            especialidad: this.turno.especialidad.nombre,
            precio: this.turno.precio,
          };          

          var hoy = new Date();
          var fechaCupo = new Date(cupo.hora_inicio);
          fechaCupo = fechaCupo.setHours(fechaCupo.getHours() + 5);
          
          if (cupo.estado == "disponible" && fechaCupo > hoy.getTime()) {
            this.cupos.push(cupo);
          }        
      }      
    },
  },
};
</script>

<style lang="scss" scoped>
.content {  
  border-radius: 1.2rem;  
  max-width: 34rem;
  margin-top: 0;    
}
</style>