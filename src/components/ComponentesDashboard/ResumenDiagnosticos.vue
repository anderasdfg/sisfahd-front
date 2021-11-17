<template v-if="cargaDashboard==true">
  <div>
    <v-card>
    <h2 class="esp">Exámenes más ordenados</h2>
    <div id="chartdiv2"></div>
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
  name: "Diagnosticos",
  components: {    
   
  },
  data: () => ({
   /* hoy: moment().format("L").replaceAll("/", "-"),
    fecha: "",    
    medicamentos: [],
    examenes: [],
    pacientes: {
        titulo: "Pacientes nuevos",
        cantidad: "1",
        imagen: "https://image.flaticon.com/icons/png/64/2750/2750657.png",
        color: "#A2DBFA"
    },
    */
    cargaDashboard:false,

  }),

   async mounted(){
   
    this.cargaDashboard=false;
    this.obtenerExamenTotal();
   
    this.cargaDashboard=true;
    this.crearGrafico2();
  },
  methods: {
    ...mapMutations(["setlistaEexamenTotalDash"]),
    /*
    async obtenerMedicamentosPedidos(fecha) {        
      await axios
        .get(`/Estadistica/medicamentospedidos?fecha=${fecha}`)
        .then(async (res) => {          
          this.medicamentos = res.data;      
        })
        .catch((err) => console.log(err));
    },
    async obtenerExamenesPedidos(fecha) {        
      await axios
        .get(`/Estadistica/laboratoriopedidos?fecha=${fecha}`)
        .then(async (res) => {          
          this.examenes = res.data;      
        })
        .catch((err) => console.log(err));
    },
    */
   async obtenerExamenTotal() {
    
      await axios
        .get("/Estadistica/ExamenesHoy")
        .then((x) => {
          this.setlistaEexamenTotalDash(x.data);
          console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
     crearGrafico2(){
      // Create chart instance
        var chart = am4core.create("chartdiv2", am4charts.PieChart);

        // Add data
        chart.data = this.listaEexamenTotalDash;

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
    ...mapState(["listaEexamenTotalDash"]),
      ...mapGetters(["user"]),
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  margin-top: 1%;
  //margin-left: 40px;
}
.esp {
  //margin-left: 40px;
  margin-bottom: 3%;
}
.esp2 {
  margin-top: 2%;
  margin-bottom: 3%;
  //margin-left: 40px;
}
.content-item {
  width: 450px;
  //margin-left: 40px;
}
.carcito {
  width: 450px;
  padding: 4%;
  //@include flex-center;
  margin-bottom: 1%;
}
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