<template>
  <div>
    Menu<br/>
    <b-link to="/menu_maker">Maak een Menu</b-link>
    </div>
</template>

<script>
import Vue from "vue";
import { PulseLoader } from "vue-spinner/dist/vue-spinner.min.js";

export default {
  name: "app",
  components: { PulseLoader },
}
</script>
<style lang="scss">
</style>
