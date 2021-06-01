<template>
  <v-app-bar id="app-bar" absolute app flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value"> mdi-view-quilt </v-icon>

      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>

    <div class="container-user">
        <div class="container-user__text">
            <span>Sábado, 06 de Marzo</span>
            <p>Hola, Luz Pereira</p>
        </div>
      

      <v-spacer />

      <div class="mx-3" />

      <v-menu
        bottom
        left
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="ml-2" min-width="0" text v-bind="attrs" v-on="on">
            <v-badge color="#4172F2" overlap bordered>
              <template v-slot:badge>
                <span>5</span>
              </template>

              <v-icon>mdi-bell</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list :tile="false" nav>
          <div>
            <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
              <v-list-item-title v-text="n" />
            </app-bar-item>
          </div>
        </v-list>
      </v-menu>

      <v-btn class="ml-2" min-width="0" text to="/pages/user">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-btn class="ml-2" min-width="0" text
        @click="openDialogInformacionMedica()">
        <v-icon>mdi-wrench</v-icon>
      </v-btn>
      <v-dialog persistent v-model="dialogInformacionMedica" max-width="46%">
        <RegistrarInformacionMedica
          @emit-close-dialog="closeDialogInformacionMedica()"
        ></RegistrarInformacionMedica>
      </v-dialog>
    </div>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";
import RegistrarInformacionMedica from "@/components/GestionarInformacionMedica/RegistrarInformacionMedica.vue";
// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    RegistrarInformacionMedica,
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    dialogInformacionMedica: false,
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one",
    ],
  }),

  computed: {
    ...mapState(["drawer"]),
  },

  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER",
    }),
    openDialogInformacionMedica(){
      this.dialogInformacionMedica = true;
    },
    closeDialogInformacionMedica(){
      this.dialogInformacionMedica = false;
    },
  },
};
</script>

<style lang="scss" scoped>
#app-bar {
  background-color: transparent;
}
.container-user {
  margin-top: 40px;
  border-radius: 20px;
  background-color: white;
  padding: 10px 0 0 10px;
  display: flex;
  width: 100%;
  padding-left: 15px;
 
}
.container-user__text {
  align-items: left;
  flex-direction: column;
  justify-content: center;
    span {
    color: $grey-text;
    font-size: 15px;
  }
  p {
    font-size: 24px;
  }
}
</style>