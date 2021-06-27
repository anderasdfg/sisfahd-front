<template>
  <div class="home">
    <CardPaciente :user="this.user" class="card-paciente" />
    <CardCitas />
  </div>
</template>

<style lang="scss" scoped>
.perfil {
  width: 20%;
  height: 20%;
  border-radius: 20px;
}
</style>

<script>
import CardPaciente from "@/components/CardPaciente.vue";
import CardCitas from "@/components/CardCitas.vue";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "Dashboard",
  components: {
    CardPaciente,
    CardCitas,
  },
  data(){ 
    return {
      //
    }
  },
  computed: {
    ...mapState(["drawer"]),
    ...mapGetters(["user"]),
  },
  created() {
    this.fetchUser();    
  },
  methods: {
    ...mapActions(["fetchUser"]),    
  },
};
</script>

<style lang="scss">
.home {
  margin: 1%;
  display: flex;
  justify-content: space-around;
}
.card-paciente {
  max-width: 60%;
  border-radius: 20px !important;
}
</style>