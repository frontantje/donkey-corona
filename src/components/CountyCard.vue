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
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
