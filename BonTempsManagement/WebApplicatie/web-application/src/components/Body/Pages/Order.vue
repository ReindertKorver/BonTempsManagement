<template>
<div>
  <h3>Nieuwe bestelling</h3>
  <div v-if="sorting()"> <b-link to="/bestel">Toon alle gerechten</b-link></div>
  <div v-if="!sorting()"> <b-link to="/bestel/te_kort">Toon alleen tekorten</b-link></div>
    <div v-if="products" class="products">
    <div  class="product" v-on:click="toggleedit(product)" v-for="product in products" :key="product.id" v-if="sorting()&&product.stock<=product.min_stock||!sorting()" >

        <div class="product-content"><div class="product-name">{{product.name}}</div>
         
        <div>
          <!-- so the border is still there -->
        </div>
          <div class="product-stock">
          <span class="red" v-if="product.stock<=product.min_stock">Voorraad: {{product.stock}}</span>
          <span class="green" v-if="product.stock>product.min_stock">Voorraad: {{product.stock}}</span>
          </div>
          <div class="change-stock">
          </div>
    </div>
    <div v-if="currentProduct">
      <div :id="'newStock'+product.id" class="productEditor hidden">
        <label >Aantal</label>
        <input type="number" placeholder="0" v-model="currentProduct.new" >
    <b-link v-on:click="newOrder(currentProduct)">Bestellen</b-link>
    </div>
    </div>
    
  </div>
  
  </div>
   <div v-else-if="error">
    Er is een probleem opgetreden bij het ophalen van de voorraad.
  </div>
  <div v-else>
  De voorraad wordt geladen...
  <pulse-loader class="pulse-loader" :color="color" :size="size" ></pulse-loader>
  </div> 
</div>
  
  </template>

<script>
import Vue from "vue";

import { PulseLoader } from "vue-spinner/dist/vue-spinner.min.js";
export default {
  name: "stock",
  components: { PulseLoader },
  data() {
    return {
      products: null,
      error: null,
      color: "#1a631a",
      size: "7px",
      newStock: null,
      currentProduct: null
    };
  },
  methods: {
    //handles the sorting by minimum stock or not
    sorting() {
      var param = this.$route.params.sorting;
      if (param == "te_kort") {
        return true;
      }
    },
    //hides all the editors for the amount to order
    hideAllEditors() {
      [].forEach.call(document.querySelectorAll(".productEditor"), function(
        el
      ) {
        el.classList.add("hidden");
      });
    },
    //toggles the editor to change the amount to order
    toggleedit(product) {
      this.currentProduct = product;
      this.hideAllEditors();
      var element = document.getElementById("newStock" + product.id);
      element.classList.toggle("hidden");
    },
    //saves the new order to the database via the API
    newOrder(productToSave) {
      var cmpnt = this;
      var element = document.getElementById("newStock" + productToSave.id);
      element.classList.toggle("hidden");
      var Headers = {
        accept: "application/json",
        "Content-Type": "application/json"
      };

      if (productToSave.new != null) {
        //update the current product to have the updated value
        var newValue = parseInt(productToSave.new);
        var oldValue = parseInt(productToSave.stock);
        console.log(newValue);

        console.log(productToSave.stock);
        var newStock = oldValue + newValue;
        productToSave.stock = newStock;
        console.log(productToSave.stock);
        fetch("http://localhost:52704/api/product", {
          method: "PUT",
          headers: Headers,
          body: JSON.stringify(productToSave)
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Something went wrong");
            }
          })
          .then(json => {
            cmpnt.load();
          })
          .catch(error => {
            cmpnt.error = error;
          });
      }
    },
    //load functionallity for when the page needs to go back to the original STATE
    load() {
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
            cmpnt.currentProduct = cmpnt.products[0];
            this.hideAllEditors();
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
  },

  mounted() {
    this.load();
  }
};
</script>
<style lang="scss">
.red {
  color: red;
}
.green {
  color: #1a631a;
}
.change-stock {
  text-align: right;
}
.change-stock a {
  cursor: pointer;
}
.hidden {
  display: none;
  visibility: hidden;
}
.productEditor {
  font-size: 12px;
  margin-left: 25px;
  border-left: 1px solid #1a631a;
  border-bottom: 1px solid #1a631a;
  border-bottom-left-radius: 10px;
  padding-left: 5px;
  padding-top: 2px;
}
.product {
  margin-bottom: 5px;
}
.product-stock {
  border-bottom: 1px solid lightgray;
}
.product:hover {
  cursor: pointer;
  .product-stock {
    border-bottom: 1px solid #1a631a;
  }
  .change-stock {
    border-bottom: 1px solid #1a631a;
  }
}
.change-stock {
  border-bottom: 1px solid lightgray;
}
</style>

