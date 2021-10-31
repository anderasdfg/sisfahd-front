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
    </v-card>
  </div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_kelly from "@amcharts/amcharts4/themes/kelly";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
export default {
  data(){
    return{

    }
  },methods:{
    crearGrafico(){


        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);

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

    },
    crearGrafico2(){
      // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.PieChart);

        // Add data
        chart.data = [{
          "country": "Lithuania",
          "litres": 501.9
        }, {
          "country": "Czech Republic",
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

        // Let's cut a hole in our Pie chart the size of 40% the radius
        chart.innerRadius = am4core.percent(40);

        // Put a thick white border around each Slice
        pieSeries.slices.template.stroke = am4core.color("#4a2abb");
        pieSeries.slices.template.strokeWidth = 2;
        pieSeries.slices.template.strokeOpacity = 1;


        // Add a legend
        chart.legend = new am4charts.Legend();
            }
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

</style>