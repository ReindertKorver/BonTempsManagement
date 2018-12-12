<template>
  <div class="dishlinker">
   <h3>Gerechten koppelen</h3>
    <div class="saveResult">{{saveResult}}</div>
    <div id="dish_selector" class="dish_selector">
      <b>Selecteer een gerecht</b>
      <div class="dishes" v-if="dishes">
        <b>Voorgerechten:</b>
        <div id='#dishV' v-for="dish in dishes" :key="dish.id" v-if="dish.type=='V'">
          <div class="dish" v-on:click="selectDish(dish)" ><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Hoofdgerechten:</b>
        <div id='#dishH'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='H'">
            <div class="dish" v-on:click="selectDish(dish)"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Nagerechten:</b>
        <div id='#dishN'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='N'">
            <div class="dish" v-on:click="selectDish(dish)"><div class="dish-icon"></div><div class="dish-content"> <div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
      </div>

      <div v-else-if="dishError">
        Er is een probleem opgetreden bij het ophalen van de gerechten.
      </div>
      <div v-else>
        De gerechten worden geladen...
        <pulse-loader class="pulse-loader" :color="color" :size="size" ></pulse-loader>
      </div>
    </div>
    <div id="dish_product_linker" class="menu_maker">
  <div class="existing_dishes">
 <div class="menu_dishes_drinks">
      <div class="dishes" v-if="products">
        <b>Producten:</b>
        <div id='#dishV' v-for="product in products" :key="product.id">
          <div :id="product.id" class="dish "  v-on:click="toggleProduct(product.id)">
            <div class="dish-content">
              <div class="dish-name">{{product.name}}</div>
              <div class="dish-price">{{product.stock}} 
               
              </div>
            </div>
          </div>
        </div>
       
      </div>
      <div v-else-if="error">
        Er is een probleem opgetreden bij het ophalen van de producten.
      </div>
      <div v-else>
        De producten wordt geladen...
        <pulse-loader class="pulse-loader" :color="color" :size="size" ></pulse-loader>
      </div>
  </div>
  </div>
  <div class="new_menu">
    <b>Koppel producten aan <span v-if="selectedDish" style="color:green;">{{selectedDish.name}}</span><b-link class="Otherchoice" v-on:click="back"> ander kiezen</b-link> :</b>
    <br/>
    Selecteer een product en klik de pijl om hem te verplaatsen
    <div class="control-panel">
      <div v-on:click="removeProductFromDish(-1)"><</div>
      <div v-on:click="addProductToDish" >></div>
    </div>
    <div id="new-menu-list">
      <div v-if="selectedElements">
        <div v-if="selectedElements.length>0">
        <b>Voorgerechten:</b><br/>
        <div class="menu-items" v-for="(item, index) in selectedElements" :key="index" >
          <div  v-on:click="removeProductFromDish(index)" class="removedish" title="Verwijderen uit lijst">X</div>
          <div class="dish-item"><div  class="dish "><div class="dish-content"> <div class="dish-name">{{item.name}}</div><div class="product-upkeep">Benodigd: <input type="number" v-model="selectedElements[index].upkeep"></div></div></div></div>
        </div>
        <hr>
        <button v-on:click="saveProductsToDish">Bevestigen</button>
       <pulse-loader id="SaveProductsToDishLoader" class="pulse-loader" :color="color" :size="size" style="visibility: hidden;" ></pulse-loader>
      </div>
    <div v-else>
      Er zijn nog geen items toegevoegd
    </div>
   <span v-if="productAlreadySelected">{{productAlreadySelected}}</span> 
    </div>
    </div>
  </div>
  </div>
  
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
      products: null,
      error: null,
      color: "#1a631a",
      size: "7px",
      selected: false,
      selectedElements: null,
      selectedElement: null,
      total: 0,
      dishes: null,
      dishError: null,
      selectedDish: null,
      productAlreadySelected: null,
      saveResult: null,
      saveError: null
    };
  },
  methods: {
    //uses the api to save the products to the dish in the database
    saveProductsToDish() {
       document.querySelector("#SaveProductsToDishLoader").style.visibility = "visible";
      var cmpnt = this;
      var Headers = {
        accept: "application/json",
        "Content-Type": "application/json"
      };
      var products = [];
      cmpnt.selectedElements.forEach(function(entry) {
        var product = {
          id: entry.id,
          name: entry.name,
          stock: entry.stock,
          min_stock: entry.min_stock
        };
        var productInDish = {
          product: product,
          product_amount: entry.upkeep
        };
        products.push(productInDish);
      });
      var dishToPut={
        "id": cmpnt.selectedDish.id,
        "name": cmpnt.selectedDish.name,
        "type": cmpnt.selectedDish.type,
        "price": cmpnt.selectedDish.price,
        "products":products,
      }
      console.log(products);
      fetch("http://localhost:52704/api/dish", {
        method: "PUT",
        headers: Headers,
        body: JSON.stringify(dishToPut)
      })
        .then(json => {
          cmpnt.saveResult = json.friendlyMessage;
        })
        .catch(error => {
          cmpnt.dishes = null;
          cmpnt.error = error;
        })
        .finally(() => {
          document.querySelector("#SaveProductsToDishLoader").style.visibility = "hidden";
          if (cmpnt.saveError != null) {
            document.querySelector(".saveResult").classList.add("error");
            back();
          } else {
            document.querySelector(".saveResult").classList.remove("error");
          }
        });
    },
    //sets the selectedDish in the STATE to the selected dish
    selectDish(dish) {
      document.querySelector("#dish_product_linker").style.visibility =
        "visible";
      document.querySelector("#dish_selector").style.visibility = "hidden";
      document.querySelector("#dish_selector").style.display = "none";
      document.querySelector("#dish_product_linker").style.display = "grid";
      var cmpnt = this;
      cmpnt.selectedDish = dish;
      if (cmpnt.selectedElements == null || cmpnt.selectedElements == 0) {
        cmpnt.selectedElements = [];
      }
      for (var i = 0; i < dish.products.length; i++) {
        var res = dish.products[i].product;
        res.upkeep = dish.products[i].product_amount;
        cmpnt.selectedElements.push(res);
      }
    },
    //selects the element that is clicked in the dishelements
    toggleProduct(e) {
      var cmpnt = this;
      var element = document.getElementsByClassName("dish");
      [].forEach.call(element, function(el) {
        el.classList.remove("selected");
      });

      var clickedElement = document.getElementById(e);
      cmpnt.selectedElement = clickedElement;
      clickedElement.classList.toggle("selected");
    },
    //removes a product out of the list of selectedElements
    removeProductFromDish(index) {
      var cmpnt = this;
      if (index == -1) {
        cmpnt.selectedElements = [];
      } else {
        cmpnt.selectedElements.splice(index, 1);
      }
    },
    //when a user has saved or wants to select a different dish this method leads the user back to the original state of the page
    back() {
      document.querySelector("#dish_selector").style.visibility = "visible";
      document.querySelector("#dish_selector").style.display = "block";
      document.querySelector("#dish_product_linker").style.visibility =
        "hidden";
      document.querySelector("#dish_product_linker").style.display = "none";
      var cmpnt = this;
      cmpnt.selectedElements = [];
    },
    //this method is the opposite of removeProductFromDish and adds a product to the list of selectedelements
    addProductToDish() {
      var cmpnt = this;
      //if selectedelements is empty it needs to be set
      if (cmpnt.selectedElements == null) {
        cmpnt.selectedElements = [];
      }
      //search in the existing products from api to the selected html product
      var selectedproduct = null;
      for (var i = 0; i < cmpnt.products.length; i++) {
        var res = cmpnt.products[i];
        if (res.id == cmpnt.selectedElement.id) {
          selectedproduct = res;
        }
      }

      if (selectedproduct != null) {
        //we have a selectedproduct
        //now see if it already exists in all de the selectedproducts
        if (cmpnt.selectedElements.length == 0) {
          //nothing exists in selectedproducts because selectedelements length is 0
          //so add it
          selectedproduct["upkeep"] = "1";
          console.log("set it");
          console.log(selectedproduct);
          var elems = cmpnt.selectedElements;
          elems.push(selectedproduct);
        } else {
          //check if the selectedproduct exists in the list of selectedproducts then return it
          var existingprd = null;
          for (var i = 0; i < cmpnt.selectedElements.length; i++) {
            var res = cmpnt.selectedElements[i];
            if (res.id == selectedproduct.id) {
              existingprd = res;
            }
          }
          if (existingprd == null || existingprd.length == 0) {
            //if existingprd is equal to null it means that the product isnt in the selectedproducts list
            //so the selected product can be added to the list
            selectedproduct["upkeep"] = "1";
            var elems = cmpnt.selectedElements;
            elems.push(selectedproduct);
          } else {
            //BELOW: Ensures the  raising of the product.upkeep when a user click multiple times on the same product

            //----------------------------------------------------------------------------------------------------
            //THIS IS COMMENTED OUT BECAUSE IT TOOK TOO MUCH TIME, AND ITS STILL NOT READY
            //----------------------------------------------------------------------------------------------------

            //the selected product is in the selectedproducts list because the filter returned the element where it is
            //so we will update the upkeep of it
            // if (existingprd.upkeep == null) {
            //   //if the upkeep is null set it to 1
            //   existingprd.upkeep = "1";
            //   var final = existingprd;
            //   for (var i = 0; i < cmpnt.selectedElements.length; i++) {
            //     var res = cmpnt.selectedElements[i];
            //     if (res.id == existingprd.id) {
            //       cmpnt.selectedElements.splice(i, 1, final);
            //     }
            //   }
            // } else {
            //   var valueToUpdate = parseInt(existingprd.upkeep) + 1;
            //   existingprd.upkeep = valueToUpdate;
            //   var finalUpdatedProduct = existingprd;
            //   //else increment it by 1
            //   for (var i = 0; i < cmpnt.selectedElements.length; i++) {
            //     var res = cmpnt.selectedElements[i];
            //     if (res.id == existingprd.id) {
            //       cmpnt.selectedElements.splice(i, 1, final);
            //     }
            //   }
            // }
            // console.log("update it");
            // console.log( cmpnt.selectedElements);
          }
        }
      }
    }
  },
  created() {
    console.log("created", this);
  },
  mounted() {
    document.querySelector("#dish_selector").style.visibility = "visible";
    document.querySelector("#dish_selector").style.display = "block";
    document.querySelector("#dish_product_linker").style.visibility = "hidden";
    document.querySelector("#dish_product_linker").style.display = "none";
    var Headers = {
      accept: "application/json"
    };

    var cmpnt = this;
    fetch("http://localhost:52704/api/dish", {
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
        cmpnt.dishes = json;
      })
      .catch(error => {
        cmpnt.dishes = null;
        cmpnt.error = error;
      });
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
.dishlinker{
.dish{
    cursor: pointer;

  border: 1px solid transparent;
  border-radius: 10px;
}}
.Otherchoice {
  font-size: 12px;
}
.saveResult {
  color: green;
}
.saveResult.error {
  color: red;
}
.removedish {
  border: 1px solid black;
  border-radius: 100%;
  width: 20px;
  height: 20px;
  text-align: center;
  font-size: 12px;
  color: black;
  display: inline-block;
  cursor: pointer;
}
.minusvalue {
  color: red;
}
.dish-item {
  display: inline-block;
}
.removedish:hover {
  border: 1px solid red;
  color: red;
}
.drag-end {
  border: 1px dashed #1a631a;
  border-radius: 25px;
  height: 80px;
}
#new-menu-list {
  padding: 5px;
}
.control-panel div {
  display: inline-block;
  height: 30px;
  width: 30px;
  border: 1px solid #1a631a;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
}
.control-panel div:hover {
  display: inline-block;
  height: 30px;
  width: 30px;
  border: 2px solid #1a631a;
  text-align: center;
}
.dish.selected {
  color: #1a631a;
  border: 2px solid #1a631a;
  border-radius: 25px;
}
.new_menu {
  padding-left: 5px;
}
#dish_product_linker {
  visibility: hidden;
}
</style>
