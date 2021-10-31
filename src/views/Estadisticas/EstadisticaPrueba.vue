<template>
  <div>
    <v-card>
      <h1 style="text-align:center;font-weight:500">Bienvenido a mis graficos</h1>
      <div id="chartdiv"></div>
       <v-btn block @click="crearGrafico()" color="success">
              <v-icon left>mdi-page-next-outline</v-icon>
              <span>Prueba1</span>
        </v-btn>
        <div id="chartdiv2"></div>
         <v-btn block @click="crearGrafico2()" color="success">
              <v-icon left>mdi-page-next-outline</v-icon>
              <span>prueba2</span>
        </v-btn>
        <div id="chartdiv3"></div>
        <div id="legend"></div>
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
import { mapMutations, mapState } from "vuex";
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
export default {
  data(){
    return{

    }
  },
    async created() {
    this.obtenerEspecialidades();
    this.obtenerEspecialidadesTotal();
  
  },
 
  methods:{
    ...mapMutations(["setlistaEespecialidad","setlistaEespecialidadTotal"]),

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
        am4core.useTheme(am4themes_animated);

        // Create chart instance
        var chart = am4core.create("chartdiv3", am4charts.PieChart);

        // Add data
        chart.data = [{
          "country": "Lithuania",
          "litres": 501.9
        }, {
          "country": "Czechia",
          "litres": 301.9
        }, {
          "country": "Ireland",
          "litres": 201.1
        }, {
          "country": "Germany",
          "litres": 165.8
        }, {
          "country": "Australia",
          "litres": 139.9
        }, {
          "country": "Austria",
          "litres": 128.3
        }, {
          "country": "UK",
          "litres": 99
        }, {
          "country": "Belgium",
          "litres": 60
        }, {
          "country": "The Netherlands",
          "litres": 50
        }];

        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
        pieSeries.dataFields.category = "country";
        pieSeries.labels.template.disabled = true;

        chart.radius = am4core.percent(95);

        // Create custom legend
        chart.events.on("ready", function(event) {
          // populate our custom legend when chart renders
          chart.customLegend = document.getElementById('legend');
          pieSeries.dataItems.each(function(row, i) {
            var color = chart.colors.getIndex(i);
            var percent = Math.round(row.values.value.percent * 100) / 100;
            var value = row.value;
            legend.innerHTML += '<div class="legend-item" id="legend-item-' + i + '" onclick="toggleSlice(' + i + ');" onmouseover="hoverSlice(' + i + ');" onmouseout="blurSlice(' + i + ');" style="color: ' + color + ';"><div class="legend-marker" style="background: ' + color + '"></div>' + row.category + '<div class="legend-value">' + value + ' | ' + percent + '%</div></div>';
          });
      });

 
  },
        toggleSlice(item) {
        var slice = pieSeries.dataItems.getIndex(item);
        if (slice.visible) {
          slice.hide();
        }
        else {
          slice.show();
        }
      },

      hoverSlice(item) {
        var slice = pieSeries.slices.getIndex(item);
        slice.isHover = true;
      },

      blurSlice(item) {
        var slice = pieSeries.slices.getIndex(item);
        slice.isHover = false;
      }
     
  },
   computed: {
    ...mapState(["listaEespecialidad","listaEespecialidadTotal"]),
  },
  //async created(){
 // this.obtenerMedico;
 // }


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

#chartdiv3 {
  width: 530px;
  height: 450px;
  font-size: 11px;
  border: 1px solid #eee;
  float: left;
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