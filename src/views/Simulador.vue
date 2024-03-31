<template>
  <div>
    <Nav class="navbar"></Nav>
    <container class="cont">
      <div class="data">
        <v-card variant="outlined" class="mess">
          <v-card-text> Informacion sobre el ganado y el tiempo </v-card-text>
        </v-card>
        <v-card variant="outlined" class="formu">
          <v-form @submit.prevent="onSubmit">
            <v-text-field
              height="150"
              variant="solo"
              rounded="xl"
              v-model="form.meses"
              label="Cantidad de meses:"
            ></v-text-field>

            <v-select
              rounded="xl"
              v-model="form.condicion"
              label="Condicion del ganado:"
              :items="['Optimo', 'Deplorable']"
              variant="solo"
            ></v-select>

            <v-text-field
              variant="solo"
              rounded="xl"
              v-model="form.vacasIni"
              label="Números de vacas inicial:"
            ></v-text-field>

            <v-text-field
              height="37px"
              variant="solo"
              rounded="xl"
              v-model="form.vacasInf"
              label="Números de vacas infectadas:"
            ></v-text-field>

            <v-text-field
              variant="solo"
              rounded="xl"
              v-model="form.vacasMue"
              label="Números de vacas muertas:"
            ></v-text-field>

            <v-btn class="mt-2" type="submit" rounded="xl" block>Simular</v-btn>
          </v-form>
        </v-card>
      </div>
      <div class="info">
        <div class="infoVac">
          <v-card variant="outlined">
            <v-row>
              <v-col>
                <div class="final">
                  <img cover src="../assets/cow.png" class="icon" />
                  <v-row class="cow">
                    <font-awesome-icon icon="fa-solid fa-skull" />
                    <p>1000</p>
                  </v-row>
                </div>
              </v-col>
              <v-col>
                <div class="final2">
                  <img cover src="../assets/cow.png" class="icon" />
                  <v-row class="cow">
                    <font-awesome-icon icon="fa-solid fa-virus" />
                    <p>1000</p>
                  </v-row>
                </div>
              </v-col>
              <v-col>
                <div class="final3">
                  <img cover src="../assets/cow.png" class="icon" />
                  <v-row class="cow">
                    <font-awesome-icon icon="fa-solid fa-heart-pulse" />
                    <p>1000</p>
                  </v-row>
                </div>
              </v-col>
            </v-row>
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
                  >Calculos</v-btn
                >
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
                v-for="item in calculos"
                :key="item.mes"
              >
                <p>{{ item.mes }}</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span>Tasa de incidencia: {{ item.ti }}% </span>
                    </v-col>
                    <v-col>
                      <span>Tasa de mortalidad: {{ item.tm }}% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad: {{ item.tl }}% </span>
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
                        Numero de vacas infectadas en el mes: {{ item.inMes }}
                      </span>
                      <span>
                        vacas muertas de las infectads:{{ item.mueIn }}
                      </span>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>
            <div class="rowGra mt-5 pa-6" v-show="isGraphVisible">
              <canvas id="myChart"></canvas>
            </div>

            <div class="rowTab mt-5" v-show="isTableVisible">
              <v-table height="900px">
                <thead>
                  <tr>
                    <th class="text-left">Mes</th>
                    <th class="text-left">Vivas</th>
                    <th class="text-left">Infectadas</th>
                    <th class="text-left">Muertas</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in data" :key="item.meses">
                    <td>{{ item.meses }}</td>
                    <td>{{ item.vivas }}</td>
                    <td>{{ item.infec }}</td>
                    <td>{{ item.muert }}</td>
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
import Nav from "../components/navbar.vue";
import { ref, onMounted } from "vue";
import Chart from "chart.js/auto";

export default {
  components: {
    Nav,
  },
  setup() {
    const countInf = ref();
    const countMue = ref();
    const countVac = ref();
    const countTaMo = ref();
    const taMoIni = ref();
    const taLeIni = ref();
    const countTaLe = ref();
    const taIncIni = ref();
    const countTaInc = ref();
    const meses = ref();

    const form = ref({
      meses: "",
      condicion: null,
      vacasIni: "",
      vacasInf: "",
      vacasMue: "",
    });

    console.log("Hola");

    const modelo = (vacasIni, infecIni, muerIni, meses) => {
      if (!isNaN(meses) && meses > 0) {
     
          taLeIni.value = muerIni / infecIni;
          taMoIni.value = muerIni / vacasIni;
          taIncIni.value = (infecIni / vacasIni)*1000;
          console.log("Tasa de letalidad inicial:", taLeIni.value);
    console.log("Tasa de mortalidad inicial:", taMoIni.value);
    console.log("Tasa de incidencia inicial:", taIncIni.value);

    // Calcular el número de vacas restantes para el primer mes
    let vacasRestantes = vacasIni - muerIni;
    console.log("Número de vacas restantes:", vacasRestantes);

    // Calcular el número de vacas infectadas para el primer mes
    let infectadasMes = (taIncIni.value / 1000) * vacasRestantes;
    console.log("Número de vacas infectadas para el primer mes:", infectadasMes);

    // Calcular el número de vacas muertas para el primer mes
    let muertasMes = infectadasMes * taLeIni.value;
    console.log("Número de vacas muertas para el primer mes:", muertasMes);

    // Calcular las tasas de letalidad, mortalidad e incidencia para los meses siguientes
    for (let i = 1; i < meses; i++) {
      taLeIni.value = muertasMes / infectadasMes;
      taMoIni.value = muertasMes / vacasRestantes;
      taIncIni.value = (infectadasMes / vacasRestantes)*1000;

      console.log("Tasa de letalidad para el mes", i + 1, ":", taLeIni.value);
      console.log("Tasa de mortalidad para el mes", i + 1, ":", taMoIni.value);
      console.log("Tasa de incidencia para el mes", i + 1, ":", taIncIni.value);

      // Calcular el número de vacas restantes para el mes siguiente
      vacasRestantes -= muertasMes;
      console.log("Número de vacas restantes para el mes", i + 1, ":", vacasRestantes);

      // Calcular el número de vacas infectadas para el mes siguiente
      infectadasMes = (taIncIni.value / 1000) * vacasRestantes;
      console.log("Número de vacas infectadas para el mes", i + 1, ":", infectadasMes);

      // Calcular el número de vacas muertas para el mes siguiente
      muertasMes = infectadasMes * taLeIni.value;
      console.log("Número de vacas muertas para el mes", i + 1, ":", muertasMes);
    }
      } else {
        console.error("El número de vacas inicial ingresado no es válido.");
      }
    };

    const onSubmit = async () => {
      modelo(
        form.value.vacasIni,
        form.value.vacasInf,
        form.value.vacasMue,
        form.value.meses
      );
    };

    const isGraphVisible = ref(false);
    const isCalcVisible = ref(true);
    const isTableVisible = ref(false);

    //CARGAMOS EL GRAFICO
    const cargarGraf = () => {
      const ctx = document.getElementById("myChart");

      if (ctx) {
        const labels = ["Mes 1", "Mes 2", "Mes 3", "Mes 4", "Mes 5"];
        const lives = [800, 700, 530, 590, 290];
        const deaths = [700, 300, 530, 590, 990];

        const data2 = {
          labels: labels,
          datasets: [
            {
              label: "Vivas",
              data: lives,
              borderColor: "red",
              backgroundColor: "rgba(255, 0, 0, 0.5)",
            },
            {
              label: "Muertas",
              data: deaths,
              borderColor: "blue",
              backgroundColor: "rgba(0, 0, 255, 0.5)",
            },
          ],
        };

        new Chart(ctx, {
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

    onMounted(() => {
      cargarGraf();
    });
    const showCardGraph = () => {
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

    //CARGAMOS LA TABLA
    const data = [
      {
        meses: "Mes 1",
        vivas: 500,
        infec: 20,
        muert: 60,
      },
      {
        meses: "Mes 2",
        vivas: 400,
        infec: 20,
        muert: 60,
      },
      {
        meses: "Mes 3",
        vivas: 367,
        infec: 20,
        muert: 60,
      },
      {
        meses: "Mes 4",
        vivas: 500,
        infec: 20,
        muert: 60,
      },
    ];

    const calculos = [
      {
        mes: "Mes 1",
        ti: 97,
        tm: 92,
        tl: 23,
        vivas: 23,
        infectadas: 43,
        muertas: 54,
        inMes: 34,
        mueIn: 34,
      },
      {
        mes: "Mes 2",
        ti: 97,
        tm: 92,
        tl: 23,
        vivas: 23,
        infectadas: 43,
        muertas: 54,
        inMes: 34,
        mueIn: 34,
      },
      {
        mes: "Mes 3",
        ti: 97,
        tm: 92,
        tl: 23,
        vivas: 23,
        infectadas: 43,
        muertas: 54,
        inMes: 34,
        mueIn: 34,
      },
    ];

    return {
      form,
      showCardTable,
      showCardGraph,
      showCardCalc,
      cargarGraf,
      isGraphVisible,
      isCalcVisible,
      isTableVisible,
      data,
      calculos,
      onSubmit,
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
}

.data {
  width: 400px;
  /* background-color: aqua; */
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
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
</style>