<template v-if="cargaDashboard==true">
  <div>
    <v-card>
      <br />
      <div class="diseñodivp">
        <v-select
          id="Select1"
          class="diseñoletra"
          :items="itemsFaseInicial"
          label="Elije el  filtro que deseas utilizar"
          v-model="nombreValor"
          @change="verEstatus()"
        ></v-select>
        <h1 style="font-size: 1px">{{ nombreValor }}</h1>
      </div>

      <div
        id="grafico1"
        class="diseñodivp"
        style="display: inherit"
        v-if="nombreValor == 1"
      >
        <h1 style="text-align: center; font-weight: 500">
          {{ nombreValor == 1 ? "Especialidades más solicitadas" : "xddddddd" }}
        </h1>
        <v-btn @click="crearGrafico2()">Generar Grafico</v-btn>
        <div id="chartdiv2"></div>
      </div>
      <div
        id="grafico2"
        class="diseñodivp"
        style="display: inherit"
        v-if="nombreValor == 2"
      >
        <h1 style="text-align: center; font-weight: 500">
          {{ nombreValor == 2 ? "Exámenes más solicitadas" : "xddddddd" }}
        </h1>
        <v-btn @click="crearGrafico()">Generar Grafico</v-btn>
        <div id="chartdiv"></div>
      </div>
      <div
        id="grafico3"
        class="diseñodivp"
        style="display: inherit"
        v-if="nombreValor == 3"
      >
        <h1 style="text-align: center; font-weight: 500">
          {{
            nombreValor == 3 ? "Cantidad de citas según medicos" : "xddddddd"
          }}
        </h1>
        <v-btn @click="crearGrafico3()">Generar Grafico</v-btn>
        <div id="chartdiv3"></div>
      </div>
      <div
        id="grafico4"
        class="diseñodivp"
        style="display: inherit"
        v-if="nombreValor == 4"
      >
        <h1 style="text-align: center; font-weight: 500">
          {{
            nombreValor == 4 ? "Citas atendidas por medicos Hoy " : "xddddddd"
          }}
        </h1>
        <v-btn @click="crearGrafico4()">Generar Grafico</v-btn>
        <div id="chartdiv4"></div>
      </div>
      <div
        id="grafico5"
        class="diseñodivp"
        style="display: inherit"
        v-if="nombreValor == 5"
      >
        <h1 style="text-align: center; font-weight: 500">
          {{
            nombreValor == 5
              ? "Exámenes solicitados vs Exámenes reservados "
              : "xddddddd"
          }}
        </h1>
        <v-btn @click="crearGrafico5()">Generar Grafico</v-btn>
        <div id="chartdiv5"></div>
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
import { mapMutations, mapState, mapGetters } from "vuex";

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_kelly);
am4core.useTheme(am4themes_animated);
export default {
  data() {
    return {
      cargaDashboard: false,
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      nombreValor: "",
      itemsFaseInicial: [
        {
          text: "Especialidades más solicitadas",
          value: 1,
          multipleFields: false,
        },
        { text: "Exámenes más solicitadas", value: 2, multipleFields: false },
        {
          text: "Cantidad de citas según medicos",
          value: 3,
          multipleFields: false,
        },
        {
          text: "Citas atendidas por medicos Hoy",
          value: 4,
          multipleFields: false,
        },
        {
          text: "Exámenes solicitados vs Exámenes reservados",
          value: 5,
          multipleFields: false,
        },
      ],
      Opcion1: "inherit",
      listPagados: [],
      listNoPagados: [],
    };
  },
  async mounted() {
    this.obtenerEspecialidadesTotal();
    this.obtenerTodosExam();
    this.obtenerMedicoNombre();
    this.obtenerMedicoHoy();
    this.obtenerExamenesPagodos();
    this.obtenerExamenesNoPagados();
  },
  methods: {
    //"setlistaEespecialidad","setlistaEcitapago","setlistaEcitanopago","setlistaAllExam,
    ...mapMutations([
      "setlistaEespecialidadTotal",
      "setlistaAllExam",
      "setlistaMedicoNombre",
      "setlistaMedicosHoy",
    ]),

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
          //console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
    async obtenerExamenesPagodos() {
      await axios
        .get("/Estadistica/ExamenesPagados")
        .then((x) => {
          this.listPagados = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerExamenesNoPagados() {
      await axios
        .get("/Estadistica/ExamenesNOPagados")
        .then((x) => {
          this.listNoPagados = x.data;
        })
        .catch((err) => console.log(err));
    },
    async obtenerTodosExam() {
      await axios
        .get("/Estadistica/AllExamenes")
        .then((x) => {
          this.setlistaAllExam(x.data);
          //console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
    async obtenerMedicoNombre() {
      await axios
        .get("/Estadistica/Medico_Nombre")
        .then((x) => {
          this.setlistaMedicoNombre(x.data);
          //console.log(x.data);
        })
        .catch((err) => console.log(err));
    },
    async obtenerMedicoHoy() {
      await axios
        .get("/Estadistica/MedicosHoy")
        .then((x) => {
          this.setlistaMedicosHoy(x.data);
          //console.log(x.data);
        })
        .catch((err) => console.log(err));
    },

    crearGrafico() {
      // Create chart instance
      var chart = am4core.create("chartdiv", am4charts.PieChart);

      // Add data
      chart.data = this.listaAllExam;

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "cantidad";
      pieSeries.dataFields.category = "nombre";
    },
    crearGrafico2() {
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

    crearGrafico3() {
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
    crearGrafico4() {
      // Create chart instance
      var chart = am4core.create("chartdiv4", am4charts.PieChart);

      // Add data
      chart.data = this.listaMedicoHoy;

      // Add and configure Series
      var pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "cantidad";
      pieSeries.dataFields.category = "nombre_medico";

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40);

      // Put a thick white border around each Slice
      pieSeries.slices.template.stroke = am4core.color("#4a2abb");
      pieSeries.slices.template.strokeWidth = 2;
      pieSeries.slices.template.strokeOpacity = 1;

      // Add a legend
      chart.legend = new am4charts.Legend();
    },
    crearGrafico5() {
      var chart = am4core.create("chartdiv5", am4charts.XYChart);
      chart.marginRight = 400;

      let listaGeneral = [];

      let itemListGeneral = {
        codigo_producto: "",
        nombre_producto: "",
        cantidad_pedidos: 0,
        cantidad_pagados: 0,
      };
      
      for (var i = 0; i < this.listNoPagados.length; i++) {
        itemListGeneral = {};
        itemListGeneral.codigo_producto = this.listNoPagados[i].codigo_producto;
        itemListGeneral.nombre_producto = this.listNoPagados[i].nombre_producto;
        itemListGeneral.cantidad_pedidos = this.listNoPagados[i].cantidad;
        itemListGeneral.cantidad_pagados = 0;
        listaGeneral.push(itemListGeneral);
      }
      for (var i = 0; i < this.listPagados.length; i++) {
        
        var index = listaGeneral.findIndex(
          (j) => j.codigo_producto === this.listPagados[i].codigo_producto
        );
        console.log(index);
        if (index >= 0) {
          //Si uno de los no pagados ha sido pagado
          listaGeneral[index].cantidad_pagados = this.listPagados[i].cantidad;
        } else {
          itemListGeneral = {};
          itemListGeneral.codigo_producto = this.listPagados[i].codigo_producto;
          itemListGeneral.nombre_producto = this.listPagados[i].nombre_producto;
          itemListGeneral.cantidad_pedidos = 0;
          itemListGeneral.cantidad_pagados = this.listPagados[i].cantidad;
          listaGeneral.push(itemListGeneral);
        }
      }

     chart.data = listaGeneral;

      var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "nombre_producto";
      categoryAxis.title.text = "Exámenes";
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 20;

      var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Cantidad";

      var series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "cantidad_pagados";
      series.dataFields.categoryX = "nombre_producto";
      series.name = "Reservados";
      series.tooltipText = "{name}: [bold]{valueY}[/]";
      series.stacked = true;

      var series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.dataFields.valueY = "cantidad_pedidos";
      series2.dataFields.categoryX = "nombre_producto";
      series2.name = "No reservados";
      series2.tooltipText = "{name}: [bold]{valueY}[/]";
      series2.stacked = true;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.lineX.strokeOpacity = 0;
      chart.cursor.lineY.strokeOpacity = 0;
    },
    verEstatus() {
      
    },
  },

  computed: {
    //"listaEespecialidad""listaEcitapago","listaEcitanopago",
    ...mapState([
      "listaEespecialidadTotal",
      "listaAllExam",
      "listaMedicoNombre",
      "listaMedicoHoy",
    ]),
    ...mapGetters(["user"]),
  },
};
</script>

<style>
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

#chartdiv {
  width: 100%;
  height: 400px;
}

#chartdiv4 {
  width: 100%;
  height: 400px;
}
#chartdiv5 {
  width: 100%;
  height: 400px;
  padding-top: 20px;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
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
.diseñodivp {
  margin: 30px auto 0;
  width: 65%;
}
.diseñoletra {
  font-size: 20px;
}
</style>