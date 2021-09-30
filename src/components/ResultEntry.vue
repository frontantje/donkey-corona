<template
  ><div class="result-entry">
    {{ county.county }}
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
