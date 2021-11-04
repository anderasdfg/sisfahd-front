<template>
  <div>
    <v-card>
      <h1 style="text-align:center;font-weight:500">Bienvenido a mis graficos</h1>
      <div id="chartdiv"></div>
       <v-btn block @click="crearGrafico()" color="success">
              <v-icon left>mdi-page-next-outline</v-icon>
              <span>Prueba1</span>
        </v-btn>
         <h1 style="text-align:center;font-weight:500">Citas segun estados totales</h1>
        <div id="chartdiv2"></div>
         <v-btn block @click="crearGrafico2()" color="success">
              <v-icon left>mdi-page-next-outline</v-icon>
              <span>prueba2</span>
        </v-btn>
         <h1 style="text-align:center;font-weight:500">Citas según este medico : {{this.user.id}}</h1>
        <div id="chartdiv3"></div>
        
         <v-btn block @click="crearGrafico3()" color="success">
              <v-icon left>mdi-page-next-outline</v-icon>
              <span>prueba3</span>
        </v-btn>
    </v-card>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import axios from "axios";
import { mapMutations, mapState ,mapGetters} from "vuex";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
export default {
  data(){
    return{

    }
  },
    async mounted() {
    this.obtenerEspecialidades();
    this.obtenerEspecialidadesTotal();
    this.obtenerCitasPago();
  },

 
  methods:{
    ...mapMutations(["setlistaEespecialidad","setlistaEespecialidadTotal","setlistaEcitapago","setlistaEcitanopago"]),

   async obtenerEspecialidades() {
     let especialidad="Dermatología";
      await axios
        .get("Estadistica/EspecialidadyEstado?especialidad="+ especialidad)
        .then((x) => {
          this.setlistaEespecialidad(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
     async obtenerEspecialidadesTotal() {
    
      await axios
        .get("/Estadistica/Especialidad")
        .then((x) => {
          this.setlistaEespecialidadTotal(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
    async obtenerCitasPago() {
     let id = this.user.id;
      await axios
        .get("/Estadistica/xMedico_y_EstadoPago?idUser="+ id +"&estadoPago=pagado")
        .then((x) => {
          this.setlistaEcitapago(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },

     async obtenerCitasNoPago() {
     let id = this.user.id;
      await axios
        .get("/Estadistica/xMedico_y_EstadoPago?idUser="+ id +"&estadoPago=no%20pago")
        .then((x) => {
          this.setlistaEcitanopago(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },

    crearGrafico(){


        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = this.listaEespecialidadTotal;

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "cantidad";
        pieSeries.dataFields.category = "nombre";

    },
    crearGrafico2(){
      // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.PieChart);

        // Add data
        chart.data = this.listaEespecialidad;

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "cantidad";
        pieSeries.dataFields.category = "estado_atencion";

        // Let's cut a hole in our Pie chart the size of 40% the radius
        chart.innerRadius = am4core.percent(40);

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;


        // Add a legend
        chart.legend = new am4charts.Legend();
    
    },

  crearGrafico3(){
            // Create chart instance
    var chart = am4core.create("chartdiv3", am4charts.PieChart);

// Add data
chart.data = this.listaEcitapago;

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "cantidad";
pieSeries.dataFields.category = "estado_atencion";

// Let's cut a hole in our Pie chart the size of 40% the radius
chart.innerRadius = am4core.percent(40);

// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Disable tooltips
pieSeries.slices.template.tooltipText = "";

// Add a legend
chart.legend = new am4charts.Legend();
         

       }

     
  },
   computed: {
    ...mapState(["listaEespecialidad","listaEespecialidadTotal","listaEcitapago","listaEcitanopago"]),
      ...mapGetters(["user"]),
  },

  created(){

    this.crearGrafico();

 }


}
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
#chartdiv2 {
  width: 100%;
  height: 400px;

}

#chartdiv3 {
  width: 100%;
  height: 400px;

}

#legend {
  width: 200px;
  height: 450px;
  border: 1px solid #eee;
  margin-left: 10px;
  float: left;
}

#legend .legend-item {
  margin: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}

#legend .legend-item .legend-value {
  font-size: 12px;
  font-weight: normal;
  margin-left: 22px;
}

#legend .legend-item .legend-marker {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

#legend .legend-item.disabled .legend-marker {
  opacity: 0.5;
  background: #ddd;
}

</style>