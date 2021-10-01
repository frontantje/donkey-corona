<template
  ><div class="result-entry">
    {{ county.county }}
    <CustomButton variant="add" label="Landkreis hinzufügen" /></div
></template>
<script>
import CustomButton from "@/components/CustomButton.vue";
export default {
  name: "ResultEntry",
  components: { CustomButton },
  props: {
    county: {
      type: Object,
      required: true
    }
  }
};
</script>
<style scoped>
.result-entry {
  font-size: 1.5rem;
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 15px;
}
.result-entry:hover {
  border-color: black;
}

.custom-button {
  height: 2rem;
  width: 2rem;
}
@media (max-width: 500px) {
  .result-entry {
    font-size: 1rem;
  }
  .custom-button {
    height: 1.5rem;
    width: 1.5rem;
  }
}
</style>
