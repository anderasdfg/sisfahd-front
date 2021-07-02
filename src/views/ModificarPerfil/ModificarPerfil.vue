<template>
  <div>
    <div v-if="this.user">
      <div class="home" v-if="this.user.rol == '607f37c1cb41a8de70be1df3'">
        <ModificarPerfilPaciente :user="this.user" class="card-datitos" />
      </div>

      <div class="home" v-if="this.user.rol == '607f2beacb41a8de70be1dec'">
        <ModificarPerfilMedico :user="this.user" class="card-datitos" />
      </div>
    </div>
  </div>
</template>


<script>
import ModificarPerfilPaciente from "@/components/ModificarPerfil/ModificarPerfilPaciente.vue";
import ModificarPerfilMedico from "@/components/ModificarPerfil/ModificarPerfilMedico.vue";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  name: "ModificarPerfil",
  components: {
    ModificarPerfilPaciente,
    ModificarPerfilMedico,
  },
  data() {
    return {
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],
      //
    };
  },
    computed: {
      ...mapState(["drawer"]),
      ...mapGetters(["user"]),
    },
  //   created() {
  //     this.fetchUser();
  //   },
  //   methods: {
  //     ...mapActions(["fetchUser"]),
  //   },
};
</script>

<style lang="scss" scoped>
.perfil {
  width: 25%;
  height: 25%;
  border-radius: 20px;
}
.card {
  padding: 1%;
  border-radius: 20px;
}
.info-paciente {
  h2 {
    font-size: 24px;
  }
  p {
    margin-bottom: 1%;
  }
}
.top-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.info-adicional {
  margin-top: 3%;
  display: flex;
  justify-content: space-around;
  align-content: space-around;
}
.button-little {
  background: $sky-light;
  color: $blue;
  border-radius: 6px;
  height: 5vh;
  padding: 1.5%;
  text-align: center;
}

.home {
  margin: 1%;
  display: flex;
  justify-content: space-around;
}
.card-datitos {
  max-width: 60%;
  border-radius: 20px !important;
}
</style>
