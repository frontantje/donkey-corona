<template>
  <div id="content-wrapper">
    <h1>Donkey Corona Dashboard</h1>
    <h2>(denn wen interessieren schon die anderen Landkreise...?)</h2>
    <span>Zuletzt upgedatet: {{ lastUpdate }}</span>

    <div id="cards-container" v-if="shownCounties">
      <CountyCard
        v-for="county in shownCounties"
        :countyData="county"
        :key="county.OBJECTID"
        :showDetailsFor="showDetailsFor"
        @clicked="openDetails"
        @remove="removeFavorite"
      />
    </div>
    <span
      >Quelle:
      <a href="https://npgeo-corona-npgeo-de.hub.arcgis.com/">NPGEO-DE</a></span
    >
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
      showDetailsFor: null,
      allCounties: [],
      userFavorites: []
    };
  },
  created() {
    this.userFavorites = [41, 5, 38, 62];
  },

  mounted() {
    rkiApi
      .fetchAllData()
      .then(
        res =>
          (this.allCounties = res.data.features.map(item => item.attributes))
      )
      .catch(e => console.log(e));
  },
  methods: {
    openDetails(id) {
      if (id === this.showDetailsFor) {
        this.showDetailsFor = null;
      } else {
        this.showDetailsFor = id;
      }
    },
    removeFavorite(id) {
      let favoriteIndex = this.userFavorites.findIndex(fav => fav === id);
      this.userFavorites.splice(favoriteIndex, 1);
    }
  },
  computed: {
    lastUpdate() {
      if (!this.shownCounties[0]) return;
      return this.shownCounties[0].last_update;
    },

    shownCounties() {
      return this.allCounties
        .filter(county => this.userFavorites.indexOf(county.OBJECTID) > -1)
        .sort((a, b) => a.cases7_per_100k - b.cases7_per_100k);
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
#content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
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
