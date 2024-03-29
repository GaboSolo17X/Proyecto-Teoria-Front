<template>
    <div>
        <Nav></Nav>
        <container class="cont">
            <div class="data">
                <v-card variant="outlined" class="mess">
                    <v-card-text>
                        Informacion sobre el ganado y el tiempo
                    </v-card-text>
                </v-card>
                <v-card variant="outlined" class="formu">
                    <v-form @submit.prevent>
                        <v-text-field  height="150"  variant="solo" rounded="xl" v-model="firstName" :rules="firstNameRules"
                            label="Cantidad de meses:"></v-text-field>

                        <v-select rounded="xl" label="Condicion del ganado:"
                            :items="['Optimo', 'Deplorable']"
                            variant="solo"></v-select>

                        <v-text-field variant="solo" rounded="xl" v-model="vacasIni" :rules="rules" label="Números de vacas inicial:"></v-text-field>

                        <v-text-field  height="37px" variant="solo" rounded="xl" v-model="vacasInf" :rules="rules"
                            label="Números de vacas infectadas:"></v-text-field>

                        <v-text-field variant="solo" rounded="xl" v-model="vacasMue" :rules="rules" label="Números de vacas muertas:"></v-text-field>

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
                                <img cover src="../assets/cow.png" class="icon">
                                <v-row>
                                    <v-icon icon="fa-solid fa-skull"></v-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" ></svg>
                                <font-awesome-icon icon="fa-solid fa-skull" />
                                <p>Hola</p>
                                </v-row>
                                
                               
                            </div>
                        </v-col>
                        <v-col>
                            DOS
                        </v-col>
                        <v-col>
                            TRES
                        </v-col>
                    </v-row>
                   </v-card> 
                </div>
                <div class="calc">
                    <v-card variant="outlined">
                    Calculos y Grafica
                   </v-card> 
                </div>
            </div>
        </container>
    </div>

</template>

<script>
import Nav from '../components/navbar.vue'
import { ref } from 'vue'
export default {
    components: {
        Nav
    },
    setup() {
        const totalVacas = ref()
        const totalMuertas = ref()
        const totalInfectadas = ref()
        const vacasIni = ref()
        const infecIni = ref()
        const muerIni = ref()
        const countInf = ref()
        const countMue = ref()
        const countVac = ref()
        const countTaMo = ref()
        const countTaLe = ref()
        const countTaInc = ref()
        const meses = ref()



        const tasaLetal = (muerIni, infecIni) => {
            return countTaLe = muerIni / infecIni
        }

        const tasaIncidencia = (infecIni, vacasIni) => {
            return countTaInc = infecIni / vacasIni
        }

        const modelo = (vacasIni, infecIni, muerIni) => {


        }

        return {
            tasaLetal,
        }
    },

}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Days+One&display=swap');

.cont {
    display: flex;
    height: 90vh;
    margin-top: -20px;
    background-color: #E5DDCB;
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
    border-width:4px;
    color: #524656;
    border-color: #524656;

}

.infoVac {
    height: 150px;
    padding: 10px;
}
.infoVac .v-card{
    border-width:4px;
    border-color: #524656;
    background-color: #A9CBA6;
    height: 100%;
    
}

.calc {
    height: 74%;
    padding: 10px;
}

.calc .v-card{
    border-width:4px;
    border-color: #524656;
    background-color: white;
    height: 100%;
}

.formu {
    height: 80%;
    padding: 10px;
    border-width:4px;
    color: #524656;
    border-color: #524656;
}

.formu .v-btn{
    background-color: #CF4647;
    color: white;
}


.v-text-field >>> label {
    font-size: 0.7em;
    color: #524656;
}

.v-text-field :deep(.v-input__control)  {
    height: 40px !important;

  }

  .v-text-field :deep(.v-field){
    height: 40px;
    display: flex !important;
    align-items: center !important;
  }
  
  .final{

  }
</style>