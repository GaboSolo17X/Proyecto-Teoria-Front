<template>
  <body>
    <div>
      <Nav class="navbar"></Nav>
      <v-container class="cont">
        <v-row>
          <v-col cols="12">
            <v-card class="cajita">
              <v-card-title>¿Qué es epidemiología?</v-card-title>
              <v-card-text>
                La epidemiologia: Es el estudio de la distribución, los factores
                de riesgo y las consecuencias de las enfermedades de las
                poblaciones.
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="cajita">
              <v-card-title>Modelo</v-card-title>
              <v-card-text>
                El modelo utiliza las tasas de letalidad y de incidencia para
                poder calcular en un determinado tiempo el total de vacas que
                quedan, el total de vacas muertas, el total de vacas infectadas
                y sus respectivas tasas.
                <v-row>
                  <img
                    src="../assets/modelo.png"
                    max-width="100"
                    class="image"
                  />
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-card class="cajituso">
              <v-card-title><h2>Uso</h2></v-card-title>
              <br />
              <v-card-text>
                <v-row align="center" justify="space-between">
                  <v-col cols="4">
                    <img src="../assets/ejemplo.png" class="simulador" />
                  </v-col>
                  <v-col cols="6">
                    <div class="text-left">
                      <h3>
                        1.- Cuadro de variables: Puede colocar diferentes
                        valores para probar.
                      </h3>
                      <br />
                      En el caso de seleccionar la condicion del ganado existen
                      2 condiciones: Optimo: Significa una buena base
                      alimenticia, buena higiene, buena gestion del ganado y
                      existe vacunación. Deplorable: Significa mala
                      alimentacion, mal higiene, y no se vacuna a las vacas.
                      <p class="red">
                        En el caso de deplorable no puede colocar un valor menor
                        al 40% del total de las vacas en los infectados y en las
                        muertes debe ser mayor al 80% de las infectadas
                      </p>
                      <br />
                      <h3>2.- Cuadro de Estado de las Vacas.</h3>
                      <br />
                      En este apartado se presentan iconos de vacas como una
                      ayuda visual del estado actual de los cálculos, cada una
                      representando una categoría: "Vacas muertas", "Vacas
                      infectadas" y "Vacas vivas". En ese orden.

                      <br />

                      <h3>3.- Botón de cálculos.</h3>
                      <br />
                      Al hacer clic en él, se activa el proceso de cálculo y se
                      presentan los resultados numéricos basados en los datos
                      ingresados.

                      <br />

                      <h3>4.- Botón de gráficos.</h3>
                      <br />
                      Al hacer clic en él, se generan gráficos que muestran la
                      evolución de las vacas vivas, enfermas y muertas a lo
                      largo del tiempo en un período de meses.

                      <br />

                      <h3>
                        5.- Cuadro de Visualización de Gráficos/Resultados.
                      </h3>
                      <br />
                      Este cuadro proporciona un espacio donde se muestran los
                      gráficos generados o los resultados numéricos de los
                      cálculos, según la selección del usuario.

                      <br />

                      <h3>6.- Botón de Simular.</h3>
                      <br />
                      Este botón activa el proceso de simulación en el simulador
                      epidemiológico de vacas.
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </body>
</template>

<script>
import Nav from "../components/guianav.vue";
export default {
  components: {
    Nav,
  },
};
</script>

<style>
body {
  background-color: #e5ddcb;
  font-family: "Days One", sans-serif;
}

.navbar {
  position: fixed;
  z-index: 1000;
}

.cajita {
  margin-top: 15px;
  border-width: 4px;
  border-color: #524656;
  background-color: #e5ddcb;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  width: 100%;
}

.cajituso {
  margin-top: 20px;
  border-width: 4px;
  border-color: #524656;
  background-color: #e5ddcb;
  padding-left: 5px;
  padding-right: 40px;
  padding-top: 15px;
  width: 100%;
}

.image {
  margin-bottom: 10px;
  margin-top: 15px;
  width: 100%;
}

.simulador {
  width: 155%;
  margin-top: 10px;
  height: 40rem;
}

.number {
  text-align: center;
}

.red {
  color: red;
}
</style>
