<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import * as rkiApi from "./API/rki.js";

export default {
  name: 'App',
  components: {
    HelloWorld
  data() {
    return {
      coronaFeatures: []
    };
  },
  mounted() {
    rkiApi
      .fetchRelevantData()
      .then(res => {
        console.log(res);
        this.coronaFeatures = res.data.features.sort(
          (a, b) => a.attributes.cases7_per_100k - b.attributes.cases7_per_100k
        );
      })
      .catch(e => console.log(e));
  },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
