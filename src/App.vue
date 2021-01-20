<template>
  <h1>Donkey Corona Dashboard</h1>
  <span>Zuletzt upgedatet: {{ lastUpdate }}</span>
  <div id="cards-container" v-if="coronaFeatures">
    <CountyCard
      v-for="feature in coronaFeatures"
      :countyData="feature"
      :key="feature.attributes.OBJECTID"
    />
  </div>
</template>

<script>
import CountyCard from "./components/CountyCard.vue";
import * as rkiApi from "./API/rki.js";

export default {
  name: "App",
  components: {
    CountyCard
  },
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
  computed: {
    lastUpdate() {
      if (!this.coronaFeatures[0]) return;
      return this.coronaFeatures[0].attributes.last_update;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
#cards-container {
  width: 500px;
}
@media (max-width: 500px) {
  #cards-container {
    width: 100%;
  }
}
</style>
