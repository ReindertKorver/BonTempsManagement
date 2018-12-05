<template>
  <div class="NavBar">
     <b-navbar-nav>
                <b-nav-item v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated"  to="/reserveringen" replace>Reserveringen</b-nav-item>
                <b-nav-item v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated" to="/menu" replace> Menu</b-nav-item>
                <b-nav-item v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated" to="/gerechten" replace> Gerechten</b-nav-item>
                 <b-nav-item v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated" to="/voorraad" replace> Voorraad</b-nav-item>
            </b-navbar-nav>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      Activated: false
    };
  }
};
</script>
<style lang="scss">
.NavBar,
.navbar-nav {
  display: inline-block;
  width: 100%;
}
.NavBar a,
.NavBar li {
  display: inline-block !important;
  padding: 0px;
  margin: 0px;
  padding-left: 20px !important;
  padding-right: 20px !important;
  border: 2px solid transparent;
  border-radius: 25px;
  color: #000;
}
.NavBar a:hover {
  color: #1a631a;
}
.NavBar a:active {
  color: #1a631a;
  border: 2px solid #1a631a;
  border-radius: 25px;
}
.NavBar a.active {
  color: #1a631a;
  border: 2px solid #1a631a;
  border-radius: 25px;
}
</style>
