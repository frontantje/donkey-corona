<template>
  <div
    class="county-card grow-abit"
    :style="styleObject"
    @click="$emit('clicked', countyData.OBJECTID)"
  >
    <h3>{{ countyData.county }}: {{ countyData.cases7_per_100k_txt }}</h3>
    <div class="details-box" v-if="showDetails">
      <p>Fälle gesamt: {{ countyData.cases }}</p>
      <p>Neuinfektionen 7 T: {{ countyData.cases7_lk }}</p>
      <p>Fälle/100k EW: {{ Math.round(countyData.cases_per_100k) }}</p>
      <p>Todesfälle: {{ countyData.deaths }}</p>
    </div>
    <CustomButton
      label="Landkreis entfernen"
      variant="remove"
      @click="$emit('remove', countyData.OBJECTID)"
    ></CustomButton>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
export default {
  name: "CountyCard",
  components: { CustomButton },
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
    showDetails() {
      return this.showDetailsFor === this.countyData.OBJECTID;
    },
    gravityOfTheSituation() {
      let gravity = this.countyData.cases7_per_100k;
      if (!gravity) return 0;
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
  position: relative;
}

.county-card:hover .custom-button {
  display: block;
}

.details-box {
  background-color: white;
  border-radius: 15px;
  padding: 0.5rem;
  margin: 1rem 0 1rem 0;
}
.details-box p {
  color: black;
  margin: 0;
  font-size: 14px;
  text-align: left;
}
.custom-button {
  position: absolute;
  width: 2rem;
  height: 2rem;
  right: -1rem;
  top: -1rem;
  display: none;
  z-index: 5;
}

@media (max-width: 400px) {
  .county-card {
    padding: 0 0.5rem 0 0.5rem;
    flex-direction: column;
  }
  .details-box {
    margin-top: 0;
  }
}
</style>
