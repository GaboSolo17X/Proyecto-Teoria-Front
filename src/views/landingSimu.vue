<template>
    <div>
        <Nav></Nav>

        <v-card class="cont">
            <v-card class="simu">
                <v-card-item>
                    <div class="text-caption">Podrá realizar una proyección para un determinado
                        tiempo de como quedará su ganado en base a ciertas condiciones salubres del mismo.</div>
                </v-card-item>

                <v-card-actions>

                    <router-link to="/simulador"> <v-btn rounded="xl">Simular</v-btn></router-link>
                </v-card-actions>
            </v-card>
            <v-card class="info">
                <v-card-item>
                    <div class="text-caption">Las enfermedades en vacas suele ser un punto de
                        prioridad para las granjas lecheras, en este espacio puedes saber mas sobre el modelo y su uso.
                    </div>
                </v-card-item>

                <v-card-actions>
                    <router-link to="/guia"> <v-btn rounded="xl">Leer más</v-btn></router-link>

                </v-card-actions>
            </v-card>

        </v-card>
    </div>

</template>

<script>
import Nav from '../components/navbar.vue'
export default {
    components: {
        Nav
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Days+One&display=swap');

.cont {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 90vh;
    margin-top: -20px;
    background-image: url('../assets/bg.png');
    width: 100%;
    background-size: cover;
    background-position: center;
    font-family: "Days One", sans-serif;
}

.simu,
.info {
    background-color: transparent;
    position: relative;
    /* Agrega posición relativa para que los elementos absolutos se posicionen en relación con las tarjetas */
    pointer-events: auto;
    /* Permite que los elementos dentro de las tarjetas sean clicables */
    width: 100%;
    margin-top: 120px;


}

.simu .v-btn {
    background-color: #CF4647;
    font-size: 1.5rem;
    color: #E5DDCB;
}

.info .v-btn {
    background-color: #A7C5BD;
    font-size: 1.5rem;
    color: #524656;
}

.text-caption {
    color: #E5DDCB;
    font-size: 1.5rem !important;
    font-family: "Days One", sans-serif;
}

.v-card-actions {
    display: flex;
    justify-content: center;
}

.v-card-item {
    padding: 100px !important;

}
</style>