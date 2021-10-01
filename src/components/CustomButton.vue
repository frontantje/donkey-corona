<template>
  <button class="custom-button grow" :aria-label="label">
    <svg
      v-if="variant === 'add'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-5v5h-4v-5h-5v-4h5v-5h4v5h5v4z"
      /></svg
    ><svg
      v-else-if="variant === 'remove'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.151 17.943l-4.143-4.102-4.117 4.159-1.833-1.833 4.104-4.157-4.162-4.119 1.833-1.833 4.155 4.102 4.106-4.16 1.849 1.849-4.1 4.141 4.157 4.104-1.849 1.849z"
      />
    </svg></button
></template>
<script>
export default {
  name: "CustomButton",
  props: {
    variant: {
      type: String,
      default: "add"
    },
    label: {
      type: String,
      default: "add"
    }
  }
};
</script>
<style scoped>
.custom-button {
  border: none;
  padding: 0;
  background: none;
}
svg {
  fill: grey;
}
</style>
