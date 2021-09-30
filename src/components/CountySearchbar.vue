<template>
  <div id="search-area">
    <div id="input-area">
      <input
        v-model="searchInput"
        id="county-search-input"
        type="text"
      /><button @click="$emit('close-search')" class="grey-btn grow">
        X
      </button>
    </div>

    <div id="results-field">
      <ul>
        <li v-for="result in results" :key="result.OBJECTID">
          {{ result.county }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "CountySearchbar",
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
<style>
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
  width: 100%;
  margin-right: 1rem;
  box-sizing: border-box;
}
#results-field {
  max-height: 300px;
  overflow: scroll;
}
.grey-btn {
  width: 2rem;
  height: 2rem;
}
</style>
