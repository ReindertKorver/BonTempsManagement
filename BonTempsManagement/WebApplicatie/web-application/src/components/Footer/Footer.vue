
<template>
<div>
    Copyright Reindert Korver {{date.getFullYear()}}  

</div>
  
  </template>

<script>
export default {
  name: "app",
  data() {
    return {
        date: new Date(),
    };
  }
};
</script>
