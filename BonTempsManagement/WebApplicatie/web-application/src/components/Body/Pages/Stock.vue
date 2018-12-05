<template>
<div>
  <b>Voorraad</b>
    <div class="products">
    <div  class="product" v-for="product in products" :key="product.id" >
      
        <div class="product-content"><div class="product-name">{{product.name}}</div>
       
      <div class="product-buy">
          <div class="green" v-if="product.stock<=product.min_stock">Bestel {{product.min_stock-product.stock}} {{product.name}} -></div>
           <div  v-if="product.stock>product.min_stock">Bestel extra {{product.name}} -></div>
        </div>
         <div class="product-stock">
          <span class="red" v-if="product.stock<=product.min_stock">Voorraad: {{product.stock}}</span>
          <span class="green" v-if="product.stock>product.min_stock">Voorraad: {{product.stock}}</span>
          Minimaal: {{product.min_stock}}
        </div>
      </div>
    </div>
    </div>
</div>
  
  </template>

<script>

import Vue from "vue";
export default {
  name: "stock",
  data() {
    return {
      products: null,
      error: null
    };
  },
  mounted() {
    var Headers = {
      accept: "application/json"
    };

    var cmpnt = this;
    try {
      fetch("http://localhost:52704/api/product", {
        method: "GET",
        headers: Headers
      })
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Something went wrong");
          }
        })

        .then(json => {
          cmpnt.products = json;
        })
        .catch(error => {
          cmpnt.products = null;
          cmpnt.error = error;
        });
    } catch (error) {
      cmpnt.products = null;
      cmpnt.error = error;
    }
  }
};
</script>
<style lang="scss">
.red{
  color:red;
}
.green{
color:#1a631a;
}
</style>
