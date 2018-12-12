<template>
<div class="new_product">
<b>Nieuw product</b><br/>
Beschrijving:<br>
<input type="text" v-model="name"/><br/>
   Type:<br>
<input placeholder="(V,H,N)" v-model="type"   style="text-transform:uppercase" type="text" maxlength="1"/><br/>  
Prijs:<br/>
<input type="number" v-model="price"><br/>
Voorraad:<br/>
<input type="number" v-model="stock"><br/>
Minimum voorraad:<br/>
<input type="number" v-model="min_stock"><br/>
<input type="button" value="Opslaan" v-on:click="saveProduct"/>
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
      type: null,
      price: null,
      stock: null,
      min_stock: null,
      error: null,
      result: null,
      color: "#1a631a",
      size: "7px"
    };
  },
  methods: {
    //saves the product to the database via the api
    saveProduct(id) {
      document.querySelector(".new_product input").disabled = true;
      document.querySelector("#SaveLoader").style.visibility = "visible";
      var cmpnt = this;
      var name = cmpnt.name;
      var type = cmpnt.type;
      var price = cmpnt.price;
      var stock = cmpnt.stock;
      var min_stock = cmpnt.min_stock;
      var Headers = {
      accept: "application/json",
      'Content-Type': 'application/json',
    };
      if (
        name != null &&
        type != null &&
        price != null &&
        stock != null &&
        min_stock != null
      ) {
        console.log("form-valid");
        
        fetch("http://localhost:52704/api/product/", {
          method: "POST",
          headers: Headers,
          body: JSON.stringify({
            id: null,
        name: name,
        stock: stock,
        min_stock: min_stock
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
            cmpnt.result=cmpnt.name+" is opgeslagen";
          })
          .catch(error => {
            cmpnt.error = error;
          });
      } else {
        cmpnt.result="Niet alle vereisten zijn ingevuld";
        console.log("form-non-valid");
      }
      document.querySelector(".new_product input").disabled = false;
            document.querySelector("#SaveLoader").style.visibility = "hidden";
    }
  }
};
</script>
<style lang="scss">
</style>
