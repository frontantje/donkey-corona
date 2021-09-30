<template>
  <div id="input-area">
    <input v-model="searchInput" id="county-search-input" type="text" /><button
      @click="$emit('close-search')"
      class="grey-btn grow"
    >
      X
    </button>
  </div>
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
.grey-btn {
  width: 2rem;
  height: 2rem;
}
</style>
