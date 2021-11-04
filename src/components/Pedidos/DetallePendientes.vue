<template>
    <v-card>
        <v-card-title>
            <h2 class="title-card"> Exámenes del pedido</h2>
        </v-card-title>
        <v-card-text>
            <template>
                <div>
                    <v-data-table
                    :headers="headerProductos"
                    :items="listaproductos"
                    :items-per-page="5"
                    :page.sync="page"
                    @page-count="pageCount = $event"
                    hide-default-footer
                    class="elevation-1"
                    >
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-btn :disabled="estado == 'pagado'" color="info"  @click="abrirDialogoSubir(item)">
                            <v-icon style= "color: white" left> mdi-plus </v-icon>
                            <span class = "text-white" >Subir resultado</span>
                        </v-btn>
                    </template>
                    </v-data-table>
                </div>
            </template>
            <v-pagination
                style="padding-top:15px; borders"
                v-model="page"
                :length="pageCount"
            ></v-pagination>
        </v-card-text>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="blue darken-1"
            text
            @click="cerrarDialogo()"
            >
                Cerrar
            </v-btn>
        </v-card-actions>
        <v-dialog
          v-model="dialogSubirResult"
          persistent
          max-width="600"
        >
          <SubirResultExamenAux
            :resultadoObjToAgregar="resultadoObjToAgregar"
            :userId="page"
            @emit-close-dialog="cerrarDialogoSubir(1)"
          ></SubirResultExamenAux>
        </v-dialog>
    </v-card>
</template>
<script>
import axios from "axios"
import SubirResultExamenAux from "@/components/Resultados/OperDialogs/ResultadosExamenAux/SubirResultExamenAux";
export default {
name: "DetallePendientes",
components: {
    SubirResultExamenAux,
},
props: ["listaproductos", "estado"],
data(){
    return{
        page: 1,
        pageCount: 0,
        dialogSubirResult: false,
        resultadoObjToAgregar:{

        },
        headerProductos: [
        {
          text: "Tipo de Examen",
          value: "nombre",
          sortable: false,
          align: "start",
        },
        {
          text: "Precio",
          sortable: false,
          value: "precio",
        },
        {
          text: "Cantidad",
          sortable: false,
          value: "cantidad",
        },
        {
          text: "Acciónes",
          value: "actions",
          sortable: false,
          align: "center",
        },
      ],
    };
},
async created(){
},
methods:{
 cerrarDialogo(){
     this.$emit("emit-cerrar-dialog");
 },
 abrirDialogoSubir(algo){
     this.dialogSubirResult = true
 },
 cerrarDialogoSubir(algo){
     this.dialogSubirResult = false
 },

},
computed:{
},
filters: {
    toFechaB(value) {
      return new Date(value).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit'}).replace(/\//gi,'-');
    },
},
}
</script>
<style lang="scss" scoped>
.title-card {
  font-size: 25px;
  color: $blue;
}
.text-white{
color: white;
}
</style>