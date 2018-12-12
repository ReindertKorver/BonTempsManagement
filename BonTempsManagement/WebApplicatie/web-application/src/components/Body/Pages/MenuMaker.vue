<template>
  <div>
    Menu maker
    <div class="menu_maker">
        
  <div class="existing_dishes">
 <div class="menu_dishes_drinks">
     
      <div class="dishes" v-if="dishes">
        <b>Voorgerechten:</b>
        <div id='#dishV' v-for="dish in dishes" :key="dish.id" v-if="dish.type=='V'">
          <div :id="dish.id" class="dish "  v-on:click="toggledish(dish.id)"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Hoofdgerechten:</b>
        <div id='#dishH'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='H'">
            <div :id="dish.id" class="dish "  v-on:click="toggledish(dish.id)" ><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Nagerechten:</b>
        <div id='#dishN'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='N'">
            <div :id="dish.id" class="dish "  v-on:click="toggledish(dish.id)"><div class="dish-icon"></div><div class="dish-content"> <div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
      </div>
      <div v-else-if="error">
        Er is een probleem opgetreden bij het ophalen van het menu.
      </div>
      <div v-else>
        Het menu wordt geladen...
        <pulse-loader class="pulse-loader" :color="color" :size="size" ></pulse-loader>
      </div>
      <div class="drinks" v-if="drinks">
        
         <b>Dranken:</b>
        <div  v-for="drink in drinks" :key="drink.id" >
          <div :id="'d'+drink.id" class="dish "  v-on:click="toggledrink(drink.id)" ><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{drink.name}}</div><div class="dish-price">€{{drink.price}}</div></div></div>
        </div>
      </div>
  </div>
  </div>
  <div class="new_menu">
<b>Nieuw menu:</b>
<br/>
Selecteer een gerecht en klik de pijl om hem te verplaatsen<br/>
<input type="text" placeholder="Beschrijving" v-model="menuDescription"><br/><br/> 
<div class="control-panel">
  <div v-on:click="removeDishFromMenu"><</div>
  <div v-on:click="addDishToMenu" >></div>
</div>
<div id="new-menu-list">
  <div v-if="selectedElements||selectedDrinks">
     <div v-if="selectedElements.length>0||selectedDrinks.length>0">
    <b>Voorgerechten:</b><br/>
    <div class="menu-items" v-for="(item, index) in selectedElements" :key="index" v-if="item[0].type=='V'">
      <div  v-on:click="removeDishFromMenu(index)" class="removedish" title="Verwijderen uit lijst">X</div>
       <div class="dish-item"><div  class="dish "><div class="dish-icon"></div><div class="dish-content"> <div class="dish-name">{{item[0].name}}</div><div class="dish-price">€{{item[0].price}}</div></div></div></div>
    </div>
     <b>Hoofdgerechten:</b><br/>
    <div class="menu-items" v-for="(item, index) in selectedElements" :key="index" v-if="item[0].type=='H'">
      <div  v-on:click="removeDishFromMenu(index)" class="removedish" title="Verwijderen uit lijst">X</div>
       <div class="dish-item"><div  class="dish "><div class="dish-icon"></div><div class="dish-content"> <div class="dish-name">{{item[0].name}}</div><div class="dish-price">€{{item[0].price}}</div></div></div></div>
    </div>
    <b>Nagerechten:</b><br/>
    <div class="menu-items" v-for="(item, index) in selectedElements" :key="index" v-if="item[0].type=='N'">
      <div  v-on:click="removeDishFromMenu(index)" class="removedish" title="Verwijderen uit lijst">X</div>
       <div class="dish-item"><div  class="dish "><div class="dish-icon"></div><div class="dish-content"> <div class="dish-name">{{item[0].name}}</div><div class="dish-price">€{{item[0].price}}</div></div></div></div>
    </div>
    <div class="drinks" v-if="selectedDrinks&&selectedDrinks.length>0">
        
         <b>Dranken:</b>
        <div  v-for="(selectedDrink, index) in selectedDrinks" :key="selectedDrink.id" >
            <div  v-on:click="removeDrinkFromMenu(index)" class="removedish" title="Verwijderen uit lijst">X</div>
          <div :id="'dm'+selectedDrink.id" class="dish "><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{selectedDrink.name}}</div><div class="dish-price">€{{selectedDrink.price}}</div></div></div>
        </div>
      </div>
    <hr>
    <button>Bevestig nieuw menu</button>
  </div>
<div v-else>
  Er zijn nog geen items toegevoegd
</div>
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
      dishes: null,
      drinks: null,
      error: null,
      color: "#1a631a",
      size: "7px",
      selected: false,
      selectedElements: null,
      selectedElement: null,
      total: 0,
      menuDescription: null,
      selectedDrinks: null
    };
  },
  methods: {
    //selects the dish
    toggledish(e) {
      var cmpnt = this;
      var element = document.getElementsByClassName("dish");
      [].forEach.call(element, function(el) {
        el.classList.remove("selected");
      });

      var clickedElement = document.getElementById(e);
      cmpnt.selectedElement = clickedElement;
      clickedElement.classList.toggle("selected");
    },
    //selects the drink
    toggledrink(e) {
      var cmpnt = this;
      var element = document.getElementsByClassName("dish");
      [].forEach.call(element, function(el) {
        el.classList.remove("selected");
      });

      var clickedElement = document.getElementById("d" + e);
      cmpnt.selectedElement = clickedElement;
      clickedElement.classList.toggle("selected");
    },
    //removes a dish from the menu
    removeDishFromMenu(index) {
      var cmpnt = this;
      cmpnt.selectedElements.splice(index, 1);
    },
    //removes the drink from the menu
    removeDrinkFromMenu(index) {
      var cmpnt = this;
      cmpnt.selectedDrinks.splice(index, 1);
    },
    //adds a dish to the menu
    addDishToMenu() {
      var cmpnt = this;
      if (cmpnt.selectedElements == null) {
        cmpnt.selectedElements = [];
      }
      if (cmpnt.selectedDrinks == null) {
        cmpnt.selectedDrinks = [];
      }
      if (cmpnt.selectedElement.id.startsWith("d")) {
        var drink1 = cmpnt.drinks.filter(function(drink) {
          //hier verder
          if ("d" + drink.id == cmpnt.selectedElement.id) {
            return drink;
          }
        });
        cmpnt.selectedDrinks.push(drink1[0]);
        console.log(cmpnt.selectedDrinks);
      } else {
        console.log(cmpnt.selectedElement);

        var dish = cmpnt.dishes.filter(function(dish) {
          //hier verder
          if (dish.id == cmpnt.selectedElement.id) {
            return dish;
          }
        });
        cmpnt.selectedElements.push(dish);
      }
    }
  },
  created() {
    console.log("created", this);
  },
  mounted() {
    var Headers = {
      accept: "application/json"
    };

    var cmpnt = this;
    try {
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
      fetch("http://localhost:52704/api/drinks", {
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
          cmpnt.drinks = json;
        })
        .catch(error => {
          cmpnt.drinks = null;
          cmpnt.error = error;
        });
    } catch (error) {
      cmpnt.dishes = null;
      cmpnt.error = error;
    }
  }
};
</script>
<style lang="scss">
</style>
