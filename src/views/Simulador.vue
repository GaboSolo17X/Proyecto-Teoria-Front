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
                    <p>{{muertesTotales}}</p>
                  </v-row>
                </div>
              </v-col>
              <v-col>
                <div class="final2">
                  <img cover src="../assets/cow.png" class="icon" />
                  <v-row class="cow">
                    <font-awesome-icon icon="fa-solid fa-virus" />
                    <p>{{infectadasTotales}}</p>
                  </v-row>
                </div>
              </v-col>
              <v-col>
                <div class="final3">
                  <img cover src="../assets/cow.png" class="icon" />
                  <v-row class="cow">
                    <font-awesome-icon icon="fa-solid fa-heart-pulse" />
                    <p>{{vacasRestantes}}</p>
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
                v-for="item in resultados"
                :key="item.mes"
              >
                <p>{{ item.mes }}</p>
                <v-card>
                  <v-row>
                    <v-col>
                      <span>Tasa de incidencia: {{ item.ti/1000 }} </span>
                    </v-col>
                    <v-col>
                      <span>Tasa de mortalidad: {{ item.tm *100}}% </span>
                    </v-col>
                    <v-col>
                      <span> Tasa de letalidad: {{ item.tl *100 }}% </span>
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
              <canvas id="myChart"></canvas>
            </div>

            <div class="rowTab mt-5" v-show="isTableVisible">
              <v-table height="600px" fixed-header>
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
                    <td>{{ item.muertas  }}</td>
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
import Chart from "chart.js/auto";

export default {
  components: {
    Nav,
  },
  setup() {
  
    const taMoIni = ref();
    const taLeIni = ref();
    const taIncIni = ref();
    const resultados= ref([])
    const labels= ref([])
    const vivas= ref([])
    const muertas= ref([])
    const muertesTotales = ref()
    const infectadasTotales = ref()
    const vacasRestantes = ref()
    const vacasResMes=ref()

    const form = ref({
      meses: "",
      condicion: null,
      vacasIni: "",
      vacasInf: "",
      vacasMue: "",
    });

    console.log("Hola");

    const modelo = (vacasIni, infecIni, muerIni, meses) => {
      resultados.value=[];
      if (!isNaN(meses) && meses > 0) {

         // Inicializar el total de muertes con las muertes iniciales
          muertesTotales.value = muerIni; 

          // Inicializar el total de infectadas con las infectadas iniciales
          infectadasTotales.value = infecIni; 

     
          taLeIni.value = (muerIni / infecIni).toFixed(2);
          taMoIni.value = (muerIni / vacasIni).toFixed(2);
          taIncIni.value = Math.round((infecIni / vacasIni)*1000);
          console.log("Tasa de letalidad inicial:", taLeIni.value);
          console.log("Tasa de mortalidad inicial:", taMoIni.value);
          console.log("Tasa de incidencia inicial:", taIncIni.value);
      
          // Calcular el número de vacas restantes para el siguiente mes
          vacasRestantes.value = Math.round(vacasIni - muerIni);
          vacasResMes.value=vacasRestantes.value
          console.log("Número de vacas restantes:", vacasRestantes.value);
      
          // Calcular el número de vacas infectadas para el siguiente mes
          let infectadasMes = Math.round((taIncIni.value / 1000) * vacasRestantes.value);
          console.log("Número de vacas infectadas para el primer mes:", infectadasMes);
      
          // Calcular el número de vacas muertas para el siguiente mes
          let muertasMes = Math.round(infectadasMes * taLeIni.value);
          console.log("Número de vacas muertas para el primer mes:", muertasMes);

          //Guardamos los calculos del mes 1 con los cuales empezaremos los siguientes meses
          let datosMes1 = {
              mes: `Mes 1`,
              ti: taIncIni.value,
              tm: taMoIni.value,
              tl: taLeIni.value,
              vivas: parseInt(vacasIni),
              infectadas: parseInt(infecIni),
              muertas: parseInt(muerIni),
              inMes: infectadasMes,
              mueIn: muertasMes
            };

            resultados.value.push(datosMes1);

    
      
         //Comenzando desde el segundo mes en adelante
          for (let i = 1; i < meses; i++) {
              // Actualizar el total de muertes sumando las muertes esperadas para este mes
              muertesTotales.value = parseInt(muertesTotales.value) + muertasMes; 

              // Actualizar el total de infectadas sumando las muertes esperadas para este mes
              infectadasTotales.value = parseInt(infectadasTotales.value) + infectadasMes; 

            // Calcular el número de vacas restantes para el mes siguiente
            if(i>1){
              vacasRestantes.value = vacasRestantes.value - muertasMes;
            }else{
              vacasRestantes.value = vacasRestantes.value
            }


            //Calculando las tasas de ese mes
            taLeIni.value =(muertasMes / infectadasMes).toFixed(2);
            taMoIni.value = (muertesTotales.value  / vacasRestantes.value).toFixed(2);
            taIncIni.value = Math.round((infectadasMes / vacasRestantes.value)*1000);
      
 
            // Calcular el número de vacas infectadas para el mes siguiente
            infectadasMes = Math.round((taIncIni.value / 1000) * vacasRestantes.value);
        
      
            // Calcular el número de vacas muertas para el mes siguiente
            muertasMes = Math.round(infectadasMes * taLeIni.value);

          //Condicionales de 2 casos, 1:Cuando sea el ultimo mes se obtienen los valores de las muertes
          //e infectados correspondientes para que la sumatoria de muertas y vivas de el valor inicial
          //2: El caso donde tenemos mas infectadas que numero de vacas iniciales donde la mortalidad
          //ya da el 100% o cerca de el.
         if (i == meses - 1) {
              muertesTotales.value=muertesTotales.value - muertasMes
              infectadasTotales.value=infectadasTotales.value - infectadasMes
              console.log("Hola final")
         } 
           if(taMoIni.value *100 > 100 || infectadasTotales.value > vacasIni ){
              muertesTotales.value=vacasIni
              infectadasTotales.value=vacasIni
              vacasRestantes.value=0
              taMoIni.value = (muertesTotales.value  / vacasIni).toFixed(2);
              infectadasMes=0
              muertasMes=0
              console.log("Entro")
     
            }

                
            let datosMes = {
              mes: `Mes ${i+1}`,
              ti: taIncIni.value,
              tm: taMoIni.value,
              tl: taLeIni.value,
              vivas: vacasRestantes.value,
              infectadas: infectadasTotales.value,
              muertas: muertesTotales.value,
              inMes: infectadasMes,
              mueIn: muertasMes
            };

             // Agregar el objeto al array de resultados
             resultados.value.push(datosMes);

             //Condicional para terminar el bucle en el caso de que las vacas restantes sean 0 o la mortalidad es mayor a 100%
             if( vacasRestantes.value==0){
              break;
              // taMoIni.value *100 > 100 ||
            }
          }
            } else {
              console.error("El número de vacas inicial ingresado no es válido.");
            }

            console.log(resultados.value)
    };


   

  //Funcion para guardar los datos ingresados
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


    let myChart=null;
    //CARGAMOS EL GRAFICO
    const cargarDataGraf=()=>{
      labels.value=[]
      muertas.value=[]
      vivas.value=[]
      for(let j=0; j<resultados.value.length;j++){
        labels.value.push(resultados.value[j].mes)
        vivas.value.push(resultados.value[j].vivas)
        muertas.value.push(resultados.value[j].muertas)
      }

      cargarGraf()
    }
   
    const cargarGraf = () => {
      const ctx = document.getElementById("myChart");
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

        if(myChart != null){
          myChart.destroy();
          myChart=null;
        }
       myChart= new Chart(ctx, {
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
      form,
      showCardTable,
      showCardGraph,
      showCardCalc,
      cargarGraf,
      isGraphVisible,
      isCalcVisible,
      isTableVisible,
      onSubmit,
      resultados,
      muertesTotales,
      infectadasTotales,
      vacasRestantes,
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