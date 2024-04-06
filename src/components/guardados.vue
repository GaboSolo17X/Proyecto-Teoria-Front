<template>
  <div>
    <container class="cont">
      <div class="info">
        <div class="infoVac">
          <v-card variant="outlined" class="saved"  >
              
              <v-btn
              v-for="item in guardados":key="item.numeroSimu"
                class="mt-2"
                rounded="xl"
                id="seleBoton"
                @click="showSimulacion(item.numeroSimu)"
                >Simu {{item.numeroSimu}}</v-btn
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
                    <th class="text-left">Infectadas</th>
                    <th class="text-left">Muertas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in resultados" :key="item.mes">
                    <td>{{ item.mes }}</td>
                    <td>{{ item.vivas }}</td>
                    <td>{{ item.infectadas }}</td>
                    <td>{{ item.muertas }}</td>
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
import { ref, watchEffect} from "vue";
import Chart from "chart.js/auto";

export default {
  components: {
    Nav,
  },
  props: {
    datos: { type: Array },
  },

  setup(props) {

    const resultados = ref([]);
    const labels = ref([]);
    const vivas = ref([]);
    const muertas = ref([]);
    const guardados=ref([])
    
    console.log(props.datos)
  //   if(props.datos!=null || props.datos!=''||props.datos!=[]){
  //     console.log('Hay datos aqui')
  //     const guardadoSimu={
  //     numeroSimu:guardados.value.length +1,
  //     data:props.datos
  //   }
    
  //   guardados.value.push(guardadoSimu)

  // }

  watchEffect(() => {
      if (props.datos && props.datos.length > 0) {
        console.log('Hay datos aquí');
        const guardadoSimu = {
          numeroSimu: guardados.value.length + 1,
          data: props.datos
        };

        guardados.value.push(guardadoSimu);
      }
    });

   



    guardados.value=[
      {
        numeroSimu: 1,
        data: [
          {
            inMes: 4,
            infectadas: 5,
            mes: "Mes 1",
            mueIn: 2,
            muertas: 2,
            ti: 278,
            tl: "0.40",
            tm: "0.11",
            vivas: 18
          },
          {
            inMes: 4,
            infectadas: 9,
            mes: "Mes 2",
            mueIn: 2,
            muertas: 4,
            ti: 250,
            tl: "0.50",
            tm: "0.25",
            vivas: 16,
          },
          {
            inMes: 4,
            infectadas: 13,
            mes: "Mes 3",
            mueIn: 2,
            muertas: 6,
            ti: 286,
            tl: "0.50",
            tm: "0.43",
            vivas: 14,
          }
          
        ],

      },
     
    ]
  
    
    function showSimulacion(valor) {
      console.log(valor)

      for (let i=0; i<guardados.value.length;i++)
      if(valor == guardados.value[i].numeroSimu){
        console.log(guardados.value[i].data)
        resultados.value = guardados.value[i].data;
        console.log( 'Resultados '+ resultados.value)
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
      for (let j = 0; j < resultados.value.length; j++) {
        labels.value.push(resultados.value[j].mes);
        vivas.value.push(resultados.value[j].vivas);
        muertas.value.push(resultados.value[j].muertas);
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
  height: 80%;
  padding: 10px;
  border-width: 4px;
  color: #524656;
  border-color: #524656;
}

.formu .v-btn {
  background-color: #cf4647;
  color: white;
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

.final {
  color: #cf4647;
}
.cow {
  display: flex;
  justify-content: center;
  font-size: 1.3rem;
}

.final2 {
  color: #fdf4b0;
}

.final3 {
  color: #2e97b7;
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