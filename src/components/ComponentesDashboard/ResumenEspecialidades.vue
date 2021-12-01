<template v-if="cargaDashboard==true">
  <div>
    <v-card style="border-radius:20px;width:90%">
    <h2 class="esp" style="text-align:center">Especialidades más solicitadas</h2>
    <div  id="chartdiv1"></div>
    
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
  name: "Especialidades",
  components: {
    datoVal:[{cantidad:100,
    nombre:"Sin resultados"

    }]
    
  },
  data: () => ({
   // hoy: moment().format("L").replaceAll("/", "-"),
   // fecha: "",    
   // especialidades: [],
    cargaDashboard:false,
  }),
   async mounted(){
   // this.fecha = moment(this.hoy, "DD-MM-YYYY").format();
   // await this.obtenerEspecialidadesDelDia(this.fecha);
    this.cargaDashboard=false;
    this.obtenerEspecialidadesTotal();
    
    this.cargaDashboard=true;
    this.crearGrafico2();
  },
 



  methods: {
     ...mapMutations(["setlistaEespecialidadTotalDash"]),
   /* async obtenerEspecialidadesDelDia(fecha) {
        console.log("especialidaes");
        console.log(fecha);
      await axios
        .get(`/Estadistica/especialidadespedidas?fecha=${fecha}`)
        .then(async (res) => {          
          this.especialidades = res.data;      
        })
        .catch((err) => console.log(err));
    },
    */
   async obtenerEspecialidadesTotal() {
    let obj=[];
      await axios
        .get("/Estadistica/CitasEspecialidadHoy")
        .then((x) => {
        obj=x.data;
          // Verificar datos de arreglo
        if(obj.length==0){
         let dat = {cantidad:100,
          nombre:"Sin resultados"
        };
          obj.push(dat);
        }
          this.setlistaEespecialidadTotalDash(obj);
          console.log(obj);
        })
        .catch((err) => console.log(err));
    },
     crearGrafico2(){
      // Create chart instance
        var chart = am4core.create("chartdiv1", am4charts.PieChart);

        
        chart.data = this.listaEespecialidadTotalDash;

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

  },
  computed: {
     //"listaEespecialidad""listaEcitapago","listaEcitanopago",
    ...mapState(["listaEespecialidadTotalDash"]),
      ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>

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
#chartdiv1 {
  width: 100%;
  height: 400px;
  border-radius:20px!important;
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