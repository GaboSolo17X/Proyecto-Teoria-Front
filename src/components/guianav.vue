<template>
  <v-card>
    <v-layout>
      <router-link to="/">
        <v-app-bar class="nav">
          <img cover src="../assets/icon.png" class="icon" />
          <div class="title">Guía del Simulador</div>
        </v-app-bar>
      </router-link>
    </v-layout>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Days+One&display=swap");

.nav {
  background-color: #524656 !important;
  color: #e5ddcb !important;
  font-family: "Days One", sans-serif;
  display: flex;
  justify-content: center;
  position: fixed;
}

.title {
  font-size: 3rem;
}

.v-toolbar__content {
  display: flex;
  justify-content: center;
}

.icon {
  width: 100px;
  height: 100px;
  margin-left: 40px;
}
</style>
