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
    },
    gravityOfTheSituation() {
      let gravity = this.displayData.cases7_per_100k;
      if (gravity <= 5) {
        return 0;
      } else if (gravity > 5 && gravity <= 25) {
        return 1;
      } else if (gravity > 25 && gravity <= 50) {
        return 2;
      } else if (gravity > 50 && gravity <= 100) {
        return 3;
      } else if (gravity > 100 && gravity <= 250) {
        return 4;
      } else if (gravity > 250 && gravity <= 500) {
        return 5;
      } else if (gravity > 500) {
        return 6;
      } else {
        return "";
      }
    },
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
