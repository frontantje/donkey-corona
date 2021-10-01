<template>
  <div id="content-wrapper">
    <h1>Donkey Corona Dashboard</h1>
    <h2>(jetzt auch mit anderen Landkreisen)</h2>
    <span>Zuletzt upgedatet: {{ lastUpdate }}</span>
    <div class="container">
      <CustomButton
        @click="showSearchbar = true"
        v-if="!showSearchbar"
        variant="add"
      />
      <CountySearchbar
        v-else
        @close-search="showSearchbar = false"
        @add-favorite="addFavorite"
        :all-counties="allCountiesMinusFavorites"
      />
    </div>

    <div class="container" v-if="shownCounties">
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
import CountySearchbar from "./components/CountySearchbar.vue";
import CustomButton from "@/components/CustomButton.vue";
import * as rkiApi from "./API/rki.js";

export default {
  name: "App",
  components: {
    CountyCard,
    CountySearchbar,
    CustomButton
  },
  data() {
    return {
      showDetailsFor: null,
      allCounties: [],
      userFavorites: [],
      showSearchbar: false
    };
  },
  created() {
    if (!localStorage.favorites) {
      this.userFavorites = [41, 5, 38, 62];
    } else {
      this.userFavorites = JSON.parse(localStorage.favorites);
    }
  },

  mounted() {
    rkiApi
      .fetchAllData()
      .then(res => {
        this.allCounties = res.data.features.map(item => item.attributes);
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
    },
    removeFavorite(id) {
      let favoriteIndex = this.userFavorites.findIndex(fav => fav === id);
      this.userFavorites.splice(favoriteIndex, 1);
      this.updateStorage();
    },
    addFavorite(id) {
      if (this.userFavorites.includes(id)) return;
      this.userFavorites.push(id);
      this.updateStorage();
    },
    updateStorage() {
      localStorage.setItem("favorites", JSON.stringify(this.userFavorites));
    }
  },
  computed: {
    lastUpdate() {
      if (!this.shownCounties[0]) return;
      return this.shownCounties[0].last_update;
    },

    shownCounties() {
      return this.allCounties
        .filter(county => this.userFavorites.includes(county.OBJECTID))
        .sort((a, b) => a.cases7_per_100k - b.cases7_per_100k);
    },
    allCountiesMinusFavorites() {
      return this.allCounties.filter(
        county => !this.userFavorites.includes(county.OBJECTID)
      );
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
  justify-content: center;
}

.custom-button {
  width: 3rem;
  height: 3rem;
}

h1 {
  margin: 0 0 1rem 0;
}
h2 {
  margin: 0 0 0.5rem 0;
}

@media (max-width: 500px) {
  #content-wrapper {
    padding-left: 1rem;
    padding-right: 1rem;
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
