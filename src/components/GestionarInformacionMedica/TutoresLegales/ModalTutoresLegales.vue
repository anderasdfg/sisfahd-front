<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="editedItem.parentesco"
              label="Parentesco"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="editedItem.nombres"
              label="Nombres"
            ></v-text-field>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
          >
            <v-text-field
              v-model="editedItem.apellidos"
              label="Apellidos"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="close()"
      >
        <v-icon dark>
          mdi-cancel
        </v-icon>
        <span style="margin-left:2%">Cancelar</span>
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="save()"
      >
        <v-icon dark>
          mdi-checkbox-marked-circle
        </v-icon>
        <span style="margin-left:2%">Guardar</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default { 
}
</script>

<style>

</style>