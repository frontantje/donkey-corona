<template>
  <div class="county-card">
    <h3>{{ displayData.county }}: {{ displayData.cases7_per_100k_txt }}</h3>
  </div>
</template>

<script>
export default {
  name: "CountyCard",
  props: {
    countyData: {
      type: Object
    }
  },
  computed: {
    displayData() {
      return this.countyData.attributes;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.county-card {
  max-width: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
