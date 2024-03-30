<template>
  <div>
    <Nav class="navbar"></Nav>
    <container class="cont">
      <div class="data">
        <v-card variant="outlined" class="mess">
          <v-card-text> Informacion sobre el ganado y el tiempo </v-card-text>
        </v-card>
        <v-card variant="outlined" class="formu">
          <v-form @submit.prevent>
            <v-text-field
              height="150"
              variant="solo"
              rounded="xl"
              v-model="firstName"
              :rules="firstNameRules"
              label="Cantidad de meses:"
            ></v-text-field>

            <v-select
              rounded="xl"
              label="Condicion del ganado:"
              :items="['Optimo', 'Deplorable']"
              variant="solo"
            ></v-select>

            <v-text-field
              variant="solo"
              rounded="xl"
              v-model="vacasIni"
              :rules="rules"
              label="Números de vacas inicial:"
            ></v-text-field>

            <v-text-field
              height="37px"
              variant="solo"
              rounded="xl"
              v-model="vacasInf"
              :rules="rules"
              label="Números de vacas infectadas:"
            ></v-text-field>

            <v-text-field
              variant="solo"
              rounded="xl"
              v-model="vacasMue"
              :rules="rules"
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
              <div class="calculos mt-5">
                <p>Mes 1</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span> Tasa de incidencia:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de mortalidad:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad:90% </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas:900 </span>
                      <span> Numero de vacas infectadas:900 </span>
                      <span> Numero de vacas muertas:900 </span>
                    </v-col>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas infectadas en el mes:470% </span>
                      <span> vacas muertas de las infectads:18 </span>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
              <div class="calculos mt-10">
                <p>Mes 1</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span> Tasa de incidencia:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de mortalidad:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad:90% </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas:900 </span>
                      <span> Numero de vacas infectadas:900 </span>
                      <span> Numero de vacas muertas:900 </span>
                    </v-col>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas infectadas en el mes:470% </span>
                      <span> vacas muertas de las infectads:18 </span>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
              <div class="calculos mt-10">
                <p>Mes 1</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span> Tasa de incidencia:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de mortalidad:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad:90% </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas:900 </span>
                      <span> Numero de vacas infectadas:900 </span>
                      <span> Numero de vacas muertas:900 </span>
                    </v-col>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas infectadas en el mes:470% </span>
                      <span> vacas muertas de las infectads:18 </span>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
              <div class="calculos mt-10">
                <p>Mes 1</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span> Tasa de incidencia:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de mortalidad:10% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad:90% </span>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas:900 </span>
                      <span> Numero de vacas infectadas:900 </span>
                      <span> Numero de vacas muertas:900 </span>
                    </v-col>
                    <v-col class="d-flex flex-column">
                      <span> Numero de vacas infectadas en el mes:470% </span>
                      <span> vacas muertas de las infectads:18 </span>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </div>

            <div class="rowGra mt-5" v-show="isGraphVisible">
             grafica
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
import { ref } from "vue";

export default {
  components: {
    Nav,
  },
  setup() {
    const totalVacas = ref();
    const totalMuertas = ref();
    const totalInfectadas = ref();
    const vacasIni = ref();
    const infecIni = ref();
    const muerIni = ref();
    const countInf = ref();
    const countMue = ref();
    const countVac = ref();
    const countTaMo = ref();
    const countTaLe = ref();
    const countTaInc = ref();
    const meses = ref();

    const tasaLetal = (muerIni, infecIni) => {
      return (countTaLe = muerIni / infecIni);
    };

    const tasaIncidencia = (infecIni, vacasIni) => {
      return (countTaInc = infecIni / vacasIni);
    };

    const modelo = (vacasIni, infecIni, muerIni) => {};

    const isGraphVisible = ref(false);
    const isCalcVisible = ref(true);
    const isTableVisible = ref(false);
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

    const data= [
          {
            meses: 'Mes 1',
            vivas: 500,
            infec: 20,
            muert:60,
          },
          {
            meses: 'Mes 2',
            vivas: 400,
            infec: 20,
            muert:60,
          },
          {
            meses: 'Mes 3',
            vivas: 367,
            infec: 20,
            muert:60,
          },
          {
            meses: 'Mes 4',
            vivas: 500,
            infec: 20,
            muert:60,
          },
        ]

    return {
      tasaLetal,
      showCardTable,
      showCardGraph,
      showCardCalc,
      isGraphVisible,
      isCalcVisible,
      isTableVisible,
      data
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