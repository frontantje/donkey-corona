<template>
  <div
    class="county-card"
    :style="styleObject"
    @click="$emit('clicked', displayData.OBJECTID)"
  >
    <h3>{{ displayData.county }}: {{ displayData.cases7_per_100k_txt }}</h3>
  </div>
</template>

<script>
export default {
  name: "CountyCard",
  props: {
    countyData: {
      type: Object
    },
    showDetailsFor: {
      type: Number,
      required: false,
      default: null
    }
  },
  computed: {
    displayData() {
      return this.countyData.attributes;
    },
    showDetails() {
      return this.showDetailsFor === this.displayData.OBJECTID;
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
    styleObject() {
      switch (this.gravityOfTheSituation) {
        case 0:
          return { "background-color": "rgb(255, 252, 205)" };
        case 1:
          return { "background-color": "rgb(255, 243, 128)" };
        case 2:
          return { "background-color": "rgb(255, 181, 52" };
        case 3:
          return { "background-color": "rgb(212, 54, 36)" };
        case 4:
          return { "background-color": "rgb(149, 18, 20)", color: "white" };
        case 5:
          return { "background-color": "rgb(103, 18, 18)", color: "white" };
        case 6:
          return { "background-color": "rgb(221, 0, 133)", color: "white" };
        default:
          return {};
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.county-card {
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  padding: 0 2rem 0 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
}
.county-card:hover {
  transform: scale(1.01);
}
</style>
