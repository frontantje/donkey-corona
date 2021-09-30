<template>
  <input v-model="searchInput" id="county-search-input" type="text" />
</template>
<script>
export default {
  name: "CountySearchbar",
  data() {
    return {
      searchInput: ""
    };
  }
};
</script>
<style>
#county-search-input {
  width: 100%;
  border-radius: 15px;
  height: 40px;
  font-size: 1.8rem;
}
</style>
