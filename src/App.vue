<template>
  <h1>Donkey Corona Dashboard</h1>
  <h2>(denn wen interessieren schon die anderen Landkreise...?)</h2>
  <span>Zuletzt upgedatet: {{ lastUpdate }}</span>

  <div id="cards-container" v-if="coronaFeatures">
    <CountyCard
      v-for="feature in coronaFeatures"
      :countyData="feature"
      :key="feature.attributes.OBJECTID"
      :showDetailsFor="showDetailsFor"
      @clicked="openDetails"
    />
  </div>
  <span
    >Quelle:
    <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/">NPGEO-DE</a></span
  >
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
      coronaFeatures: [],
      showDetailsFor: null
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
  methods: {
    openDetails(id) {
      if (id === this.showDetailsFor) {
        this.showDetailsFor = null;
      } else {
        this.showDetailsFor = id;
      }
    }
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
  text-align: center;
}
#cards-container {
  width: 500px;
  margin: 2rem 0 2rem 0;
}
@media (max-width: 500px) {
  #cards-container {
    width: 100%;
  }
}
h1 {
  margin: 0 0 1rem 0;
}
h2 {
  margin: 0 0 0.5rem 0;
}
#cards-container {
  width: 500px;
}
@media (max-width: 500px) {
  #cards-container {
    width: 100%;
  }
  #app {
    margin-top: 0;
  }
  h2,
  h3 {
    font-size: 18px;
  }
}
</style>
