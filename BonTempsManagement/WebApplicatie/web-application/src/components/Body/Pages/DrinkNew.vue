<template>
<div class="new_dish">
<h3>Nieuwe drank</h3>
Beschrijving:<br>
<input type="text" v-model="name"/><br/>
Prijs:<br/>
<input type="number" v-model="price"><br/>
<input v-on:click="saveDrink()" type="button" value="Opslaan"/>
<div v-if="result">{{result}}</div>
<div v-if="error">{{error}}</div>
<pulse-loader id="SaveLoader" class="pulse-loader" :color="color" :size="size" style="visibility: hidden;" ></pulse-loader>
  </div>
</template>

<script>
import Vue from "vue";
import { PulseLoader } from "vue-spinner/dist/vue-spinner.min.js";

export default {
  name: "app",
  components: { PulseLoader },
  data() {
    return {
      name: null,
      price: null,
      error: null,
      result: null,
      color: "#1a631a",
      size: "7px"
    };
  },
  methods: {
    //saves the drink in the database via the API
    saveDrink() {
      document.querySelector(".new_dish input").disabled = true;
      document.querySelector("#SaveLoader").style.visibility = "visible";
      var cmpnt = this;
      var name = cmpnt.name;
      var price = cmpnt.price;
      var Headers = {
        accept: "application/json",
        "Content-Type": "application/json"
      };
      if (name != null&& price != null) {
        console.log("form-valid");

        fetch("http://localhost:52704/api/drinks/", {
          method: "POST",
          headers: Headers,
          body: JSON.stringify({
            id: null,
            name: name,
            price: price
          })
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then(json => {
            cmpnt.result = cmpnt.name + " is opgeslagen";
          })
          .catch(error => {
            cmpnt.error = error;
          });
      } else {
        cmpnt.result = "Niet alle vereisten zijn ingevuld";
        console.log("form-non-valid");
      }
      document.querySelector(".new_dish input").disabled = false;
      document.querySelector("#SaveLoader").style.visibility = "hidden";
    }
  }
};
</script>
<style lang="scss">
</style>
