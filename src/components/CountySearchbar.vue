<template>
  <div id="search-area">
    <div id="input-area">
      <input
        v-model="searchInput"
        placeholder="Suche nach Landkreisen/Regionen"
        id="county-search-input"
        type="text"
      /><CustomButton variant="remove" @click="$emit('close-search')" />
    </div>

    <div v-if="results && searchInput" id="results-field" class="container">
      <ResultEntry
        v-for="result in results"
        :key="result.OBJECTID"
        :county="result"
        @click="$emit('add-favorite', result.OBJECTID)"
      />
    </div>
  </div>
</template>
<script>
import ResultEntry from "@/components/ResultEntry.vue";
import CustomButton from "@/components/CustomButton.vue";
export default {
  name: "CountySearchbar",
  components: { ResultEntry, CustomButton },
  data() {
    return {
      searchInput: ""
    };
  },
  props: {
    allCounties: {
      type: Array,
      required: true
    }
  },
  computed: {
    results() {
      if (!this.searchInput) return [];
      return this.allCounties.filter(county => {
        return this.searchInput
          .toLowerCase()
          .split(" ")
          .every(v => county.county.toLowerCase().includes(v));
      });
    }
  }
};
</script>
<style scoped>
#search-area {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#input-area {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
}
#county-search-input {
  border-radius: 15px;
  height: 3rem;
  font-size: 1.8rem;
  width: 85%;
  margin-right: 1rem;
  box-sizing: border-box;
}
#results-field {
  max-height: 250px;
  min-height: 50px;
  margin-top: 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  padding-left: 5px;
  padding-right: 5px;
}
.custom-button {
  width: 2rem;
  height: 2rem;
}
@media (max-width: 500px) {
  #county-search-input {
    height: 2rem;
    font-size: 1rem;
  }
}
</style>
