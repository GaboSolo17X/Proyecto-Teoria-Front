<template>
    <v-card>
        <v-layout>
            <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->
            <v-app-bar class="nav">
                <img cover src="../assets/icon.png" class="icon">
                <!-- <v-toolbar-title class="title">Simulador Epidemiológico</v-toolbar-title> -->
                <div class="title">Simulador Epidemiológico</div>

            </v-app-bar>

        </v-layout>
    </v-card>

</template>

<script>
export default {

}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Days+One&display=swap');

.nav {
    background-color: #524656 !important;
    color: #E5DDCB !important;
    font-family: "Days One", sans-serif;
    display: flex;
    justify-content: center;
}

.title {
    font-size: 3rem;
}

.v-toolbar__content{
    display: flex;
    justify-content: center;
}

.icon {
    width: 100px;
    height: 100px;
    margin-left: 40px;
}
</style>