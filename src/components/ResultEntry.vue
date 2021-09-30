<template
  ><div class="result-entry">
    {{ county.county }}
    <button class="grey-btn grow">
      +
    </button>
  </div></template
>
<script>
export default {
  name: "ResultEntry",
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

.grey-btn {
  font-size: 1.5rem;
}
</style>
