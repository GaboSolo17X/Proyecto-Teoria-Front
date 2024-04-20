<template>
  <div>
    <container class="cont">
      <div class="info">
        <div class="infoVac">
          <v-card variant="outlined" class="saved"  >
              
              <v-btn
              v-for="item in guardados":key="item.nombre"
                class="mt-2"
                rounded="xl"
                id="seleBoton"
                @click="showSimulacion(item.nombre)"
                >{{item.nombre}}</v-btn
              >
          </v-card>
        </div>
        <div class="calc">
          <v-card variant="outlined" class="pa-6">
            <v-row class="rowBTN">
              <v-col>
                <v-btn
                  class="mt-2"
                  type="submit"
                  rounded="xl"
                  block
                  @click="showCardCalc"
                  >Cálculos</v-btn>
              </v-col>
              <v-col>
                <v-btn
                  class="mt-2"
                  type="submit"
                  rounded="xl"
                  block
                  @click="showCardGraph"
                  >Gráfico</v-btn
                >
              </v-col>
              <v-col>
                <v-btn
                  class="mt-2"
                  type="submit"
                  rounded="xl"
                  block
                  @click="showCardTable"
                  >Tabla</v-btn
                >
              </v-col>
            </v-row>
            <div class="rowCal mt-5" v-show="isCalcVisible">
              <div
                class="calculos mt-5"
                v-for="item in resultados"
                :key="item.mes"
              >
                <p>{{ item.mes }}</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span>Tasa de incidencia: {{ item.ti / 1000 }} </span>
                    </v-col>
                    <v-col>
                      <span>Tasa de mortalidad: {{ item.tm * 100 }}% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad: {{ item.tl * 100 }}% </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas:{{ item.vivas }} </span>
                      <span>
                        Numero de vacas infectadas: {{ item.infectadas }}
                      </span>
                      <span>Numero de vacas muertas: {{ item.muertas }} </span>
                    </v-col>
                    <v-col class="d-flex flex-column">
                      <span>
                        Vacas infectadas para el siguiente mes: {{ item.inMes }}
                      </span>
                      <span>
                        Vacas muertas de las infectadas:{{ item.mueIn }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
            <div class="rowGra mt-5 pa-6" v-show="isGraphVisible">
              <canvas id="myChart2"></canvas>
            </div>

            <div class="rowTab mt-5" v-show="isTableVisible">
              <v-table height="450px" fixed-header>
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Vivas</th>
                    <th class="text-left">Muertas</th>
                    <th class="text-left">Cantidad de veces Infectadas</th>
                    <th class="text-left">Cantidad de veces Curadas</th>
                    
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultados" :key="item.mes">
                    <td>{{ item.mes }}</td>
                    <td>{{ item.vivas }}</td>
                    <td>{{ item.muertas  }}</td>
                    <td>{{ item.infectadas }}</td>
                    <td>{{ item.curadas }}</td>
     
                  </tr>
                </tbody>
              </v-table>
            </div>
          </v-card>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import Nav from "./navbar.vue";
import { ref, watchEffect, onMounted} from "vue";
import Chart from "chart.js/auto";

export default {
  components: {
    Nav,
  },
  props: {
    datos: { type: Array },
    name: String,
  },

  setup(props) {

    const resultados = ref([]);
    const labels = ref([]);
    const vivas = ref([]);
    const muertas = ref([]);
    const curadas = ref([]);
    const infectadas = ref([]);
    const guardados=ref([])
    
    onMounted(async () => {
      try {
        const res = await fetch('http://localhost:3000/api/simulaciones/get',{
          method:'GET',
          headers:{
            'Content-Type':'application/json'
          }
        });
        const rows = await res.json();
        console.log(rows)
        console.log(rows.data)

 
        const guardadosData = {};

        rows.data.forEach((dato) => {
          if (!guardadosData[dato.nombreSimulacion]) {
            guardadosData[dato.nombreSimulacion] = { nombre: dato.nombreSimulacion, data: [] };
          }
          guardadosData[dato.nombreSimulacion].data.push({ inMes: dato.inMes, infectadas: dato.infectadas, mes: dato.mes, mueIn: dato.mueMes, muertas: dato.muertas, ti: dato.ti, tl: dato.tl, tm: dato.tm, vivas: dato.vivas, curadas: dato.curadas });
        });

        guardados.value = Object.values(guardadosData);

        console.log(guardados.value);

      } catch (error) {
        console.error('Error al cargar los datos desde el archivo JSON:', error);
      }

  
    });
    
 

    function showSimulacion(valor) {
      console.log(valor)

      for (let i = 0; i < guardados.value.length; i++) {
        console.log("entro al for " + i);
        if (valor == guardados.value[i].nombre) {
            console.log(guardados.value[i].data);
            resultados.value = guardados.value[i].data;
            console.log('Resultados ' + resultados.value);
        }
    }
    }

    const isGraphVisible = ref(false);
    const isCalcVisible = ref(true);
    const isTableVisible = ref(false);

    let myChart = null;
    //CARGAMOS EL GRAFICO
    const cargarDataGraf = () => {
      labels.value = [];
      muertas.value = [];
      vivas.value = [];
      curadas.value = [];
      infectadas.value = [];
      for (let j = 0; j < resultados.value.length; j++) {
        labels.value.push(resultados.value[j].mes);
        vivas.value.push(resultados.value[j].vivas);
        muertas.value.push(resultados.value[j].muertas);
        curadas.value.push(resultados.value[j].curadas);
        infectadas.value.push(resultados.value[j].infectadas);
      }

      cargarGraf();
    };

    const cargarGraf = () => {
      const ctx = document.getElementById("myChart2");
      if (ctx) {
        const data2 = {
          labels: labels.value,
          datasets: [
            {
              label: "Vivas",
              data: vivas.value,
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
            },
            {
              label: "Muertas",
              data: muertas.value,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.5)",
            },
            {
              label: "Cantidad de veces Curadas",
              data: curadas.value,
              borderColor: "green",
              backgroundColor: "rgba(0, 255, 0, 0.5)",
            },
            {
              label: "Cantidad de veces Infectadas",
              data: infectadas.value,
              borderColor: "orange",
              backgroundColor: "rgba(255, 140, 0 , 0.5)",
            },
          ],
        };

        if (myChart != null) {
          myChart.destroy();
          myChart = null;
        }
        myChart = new Chart(ctx, {
          type: "line",
          data: data2,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Vacas vivas vs Vacas muertas",
              },
            },
          },
        });
      }
    };


   


    //Funciones para desplegar los elementos
    const showCardGraph = () => {
      cargarDataGraf();
      isGraphVisible.value = true;
      isTableVisible.value = false;
      isCalcVisible.value = false;
    };
    const showCardCalc = () => {
      isGraphVisible.value = false;
      isTableVisible.value = false;
      isCalcVisible.value = true;
    };
    const showCardTable = () => {
      isGraphVisible.value = false;
      isTableVisible.value = true;
      isCalcVisible.value = false;
    };

    return {
      showCardTable,
      showCardGraph,
      showCardCalc,
      showSimulacion,
      cargarGraf,
      guardados,
      isGraphVisible,
      isCalcVisible,
      isTableVisible,
      resultados,
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Days+One&display=swap");

.cont {
  display: flex;
  height: 120vh;
  margin-top: -20px;
  background-color: #e5ddcb;
  font-family: "Days One", sans-serif;
  margin-top: 10px;
}

.info {
  width: 100%;
}

.mess {
  margin-bottom: 20px;
  border-width: 4px;
  color: #524656;
  border-color: #524656;
}

.infoVac {
  height: 150px;
  padding: 10px;
}
.infoVac .v-card {
  border-width: 4px;
  border-color: #524656;
  background-color: #a9cba6;
  height: 100%;
}

.calc {
  height: 74%;
  padding: 10px;
  margin-top: 20px;
}

.calc .v-card {
  border-width: 4px;
  border-color: #524656;
  background-color: white;
  height: 100%;
}

.formu {
  height: 84%;
  padding: 10px;
  border-width: 4px;
  color: #524656;
  border-color: #524656;
}

.v-text-field >>> label {
  font-size: 0.7em;
  color: #524656;
}

.v-text-field :deep(.v-input__control) {
  height: 40px !important;
}

.v-text-field :deep(.v-field) {
  height: 40px;
  display: flex !important;
  align-items: center !important;
}

.cow {
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
}



.final .icon,
.final2 .icon,
.final3 .icon {
  margin-left: 0px;
  width: 170px;
}

.navbar {
  position: fixed;
  z-index: 1000;
}

.rowBTN {
  display: flex;
}

.rowTab,
.rowGra {
  height: 94%;
}

.rowCal {
  overflow-y: auto;
  scrollbar-width: thin;
  height: 90%;
}

.condi {
  color: #cf4647;
  font-size: 0.7rem;
  margin-bottom: 5px;
  margin-top: -10px;
}

.guardar {
  background-color: #2e97b7 !important;
}

.saved{
  display: flow;
  overflow-y: auto;
  scrollbar-width: thin;
}
.saved .v-btn{
  width: 100px !important;
  margin-right: 20px;
}
</style>