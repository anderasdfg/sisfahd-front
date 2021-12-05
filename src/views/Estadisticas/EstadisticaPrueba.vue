<template v-if="cargaDashboard==true">
  <div>
    <v-card>
        <br/>
        <h1 style="text-align:center">Mis estadisticas</h1>
        <div class="diseñodivp">
         <v-select
         id="Select1"
          class="diseñoletra"
          :items="itemsFaseInicial"
          label="Elije el  filtro que deseas utilizar"
           v-model="nombreValor"
           @change="verEstatus()"
           item-value="value"

        ></v-select>
        <h1 style="font-size:1px">{{nombreValor}}-{{pruebaValor}}</h1>
        </div >
       
            <div id ="grafico1" class="diseñodivp" style="display:inherit" v-if="nombreValor== 1">
            <h1 style="text-align:center;font-weight:500">{{nombreValor==1 ? 'Especialidades más solicitadas' :'xddddddd'}}</h1>
            <v-btn @click="crearGrafico2()">Generar Grafico</v-btn>
            <div  id="chartdiv2"></div>
            </div>
            <div  id ="grafico2" class="diseñodivp" style="display:inherit" v-if="nombreValor== 2">
              <h1 style="text-align:center;font-weight:500">{{nombreValor==2 ? 'Exámenes más solicitadas' :'xddddddd'}}</h1>
              <v-btn @click="crearGrafico()">Generar Grafico</v-btn>
               <div id="chartdiv"></div>
            </div>
            <div  id ="grafico3" class="diseñodivp" style="display:inherit" v-if="nombreValor== 3">
              <h1 style="text-align:center;font-weight:500">{{nombreValor==3 ? 'Cantidad de citas según medicos' :'xddddddd'}}</h1>
              <v-btn @click="crearGrafico3()">Generar Grafico</v-btn>
            <div id="chartdiv3"></div>
            </div>
       
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
     cargaDashboard:false,
     items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
     nombreValor:"",
     itemsFaseInicial: [
          { text: 'Especialidades más solicitadas', value: 1,multipleFields: false },
          { text: 'Exámenes más solicitadas', value: 2 ,multipleFields: false },
          { text: 'Cantidad de citas según medicos', value: 3 ,multipleFields: false}
      ],
      Opcion1:"inherit",
      pruebaValor:""

    }
  },
  async mounted(){
    
  this.obtenerEspecialidadesTotal();
  this.obtenerTodosExam();
  this.obtenerMedicoNombre();
 
 
  },
  methods:{
    //"setlistaEespecialidad","setlistaEcitapago","setlistaEcitanopago","setlistaAllExam,
    ...mapMutations(["setlistaEespecialidadTotal","setlistaAllExam","setlistaMedicoNombre"]),

  
/*  async obtenerEspecialidades() {
     let especialidad="Dermatología";
      await axios
        .get("Estadistica/EspecialidadyEstado?especialidad="+ especialidad)
        .then((x) => {
          this.setlistaEespecialidad(x.data);
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
*/
     async obtenerEspecialidadesTotal() {
    
      await axios
        .get("/Estadistica/Especialidad")
        .then((x) => {
          this.setlistaEespecialidadTotal(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
   
    async obtenerTodosExam(){   
      await axios
        .get("/Estadistica/AllExamenes")
        .then((x) => {
          this.setlistaAllExam(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));

    },
    async obtenerMedicoNombre(){   
      await axios
        .get("/Estadistica/Medico_Nombre")
        .then((x) => {
          this.setlistaMedicoNombre(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));

    },

    crearGrafico(){


        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);

        // Add data
        chart.data = this.listaAllExam;

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "cantidad";
        pieSeries.dataFields.category = "nombre";

    },
    crearGrafico2(){
      // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.PieChart);

        // Add data
        chart.data = this.listaEespecialidadTotal;

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "cantidad";
        pieSeries.dataFields.category = "nombre";

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
chart.data = this.listaMedicoNombre;

// Add and configure Series
var pieSeries = chart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "cantidad";
pieSeries.dataFields.category = "nombre_medico";

// Let's cut a hole in our Pie chart the size of 40% the radius
chart.innerRadius = am4core.percent(40);

// Disable ticks and labels
pieSeries.labels.template.disabled = true;
pieSeries.ticks.template.disabled = true;

// Disable tooltips
pieSeries.slices.template.tooltipText = "";

// Add a legend
chart.legend = new am4charts.Legend();
         

       },

  verEstatus(){
      console.log(this.pruebaValor);
    }   
  },


   computed: {
     //"listaEespecialidad""listaEcitapago","listaEcitanopago",
    ...mapState(["listaEespecialidadTotal","listaAllExam","listaMedicoNombre"]),
      ...mapGetters(["user"]),
  },

  


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
.diseñodivp{
  margin: 30px auto 0;width:65%;
}
.diseñoletra{
  font-size: 20px;
}

</style>