<template>
<div>
  <h3>Voorraad</h3>
  <b-link to="/producten_nieuw">Nieuw product</b-link><br/>
  <b-link to="/bestel">Nieuwe bestelling</b-link><br/>
   <b-link to="/bestel/te_kort">Bestel alleen tekorten</b-link><br/>

    <!-- Uses the api to generate a PDF of the stock -->
    <button v-on:click="generateStockBon">Genereer pdf</button>
    <pulse-loader id="GeneratingLoader" class="pulse-loader" :color="color" :size="size" style="visibility: hidden;" ></pulse-loader>
    <a v-if="base64PDF" :href="base64PDF" download="VoorraadBon.pdf">download PDF</a>
    <!-- End -->

    <div v-if="products" class="products">
    <div  class="product" v-on:click="toggleedit(product)" v-for="product in products" :key="product.id" v-if="sorting()&&product.stock<=product.min_stock||!sorting()" >

        <div class="product-content"><div class="product-name">{{product.name}}</div>

        <div class="product-buy">
          <b-link to="/bestel/te_kort" class="green" v-if="product.stock<=product.min_stock">Bestel {{product.min_stock-product.stock}} {{product.name}} -></b-link>
           <b-link to="/bestel"  v-if="product.stock>product.min_stock">Bestel extra {{product.name}} -></b-link>
          </div>

          <div class="product-stock">
          <span class="red" v-if="product.stock<=product.min_stock">Voorraad: {{product.stock}}</span>
          <span class="green" v-if="product.stock>product.min_stock">Voorraad: {{product.stock}}</span>
          Minimaal: {{product.min_stock}}
          </div>
            <div class="change-stock">
            <a v-on:click="toggleedit(product)"><i class="material-icons" style="font-size:15px;">edit</i></a>
          </div>
         

    </div>
    <div v-if="currentProduct">
      <div :id="'newStock'+product.id" class="productEditor hidden">
        <label >Beschrijving</label>
        <input type="text" placeholder="Beschrijving" v-model="currentProduct.name" >
        <label >Voorraad</label>
        <input type="number" placeholder="Voorraad" v-model="currentProduct.stock" >
        <label >Minimum voorraad</label>
        <input type="number" placeholder="Minimum voorraad" v-model="currentProduct.min_stock" >
    <b-link v-on:click="saveStock(currentProduct)">Opslaan</b-link>
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
      currentProduct: null,
      base64PDF: null,
    };
  },
  methods: {
    //handles the loader
    showLoader(show) {
      if (show) {
        document.querySelector("#GeneratingLoader").style.visibility = "visible";
      } else {
        document.querySelector("#GeneratingLoader").style.visibility = "hidden";
      }
    },
    //calls the api that will generate the stock information as base64 and return it 
    generateStockBon() {
      var cmpnt = this;
      cmpnt.showLoader(true);
      var Headers = {
        accept: "application/json",
          "pdfType":"random"
      };
      var base64;
      fetch("http://localhost:52704/api/values/?pdftype=stock", {
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
          cmpnt.base64PDF = "data:application/octet-stream;base64,"+json.pdfEncoded;
        })
        .catch(error => {
          cmpnt.error = error;
        }).finally(()=>{
         cmpnt.showLoader(false);
        });
    },
    //gets the url param and sorts bij the minimum_stock or not
    sorting(){
      var param = this.$route.params.sorting;
      if(param=="te_kort"){
        return true;
      }
    },
    //hides the editors which can edit the stock
    hideAllEditors(){
       [].forEach.call(document.querySelectorAll(".productEditor"), function(
        el
      ) {
        el.classList.add("hidden");
      });
    },
    //toggles the edittors and places the product in the currentProduct STATE
    toggleedit(product) {
      this.currentProduct = product;
     this.hideAllEditors();
      var element = document.getElementById("newStock" + product.id);
      element.classList.toggle("hidden");
    },
    //PUT's the productToSave to the api that will save it in the database
    saveStock(productToSave) {
       var cmpnt = this;
      var element = document.getElementById("newStock" + productToSave.id);
      element.classList.toggle("hidden");
      var Headers = {
        accept: "application/json",
        "Content-Type": "application/json"
      };
      fetch("http://localhost:52704/api/product", {
        method: "PUT",
        headers: Headers,
        body: JSON.stringify( productToSave)
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
          cmpnt.products = null;
          cmpnt.error = error;
        });
    },
    //the function that loads the page also used for realoading the page after an update in the database
    load(){
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
  //called when the page is mounted
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

