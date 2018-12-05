<template>
  <div>
    Menu
  
    <div class="dishes_drinks">
      <div class="dishes" v-if="dishes">
        <b>Voorgerechten:</b>
        <div id='#dishV' v-for="dish in dishes" :key="dish.id" v-if="dish.type=='V'">
          <div class="dish"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Hoofdgerechten:</b>
        <div id='#dishH'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='H'">
            <div class="dish"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Nagerechten:</b>
        <div id='#dishN'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='N'">
            <div class="dish"><div class="dish-icon"></div><div class="dish-content"> <div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
      </div>
      <div v-else-if="error">
        Er is een probleem opgetreden bij het ophalen van het menu.
      </div>
      <div v-else>
        Het menu wordt geladen...
      </div>
      <div class="drinks" v-if="drinks">
         <b>Dranken:</b>
        <div  v-for="drink in drinks" :key="drink.id" >
          <div class="dish"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{drink.name}}</div><div class="dish-price">€{{drink.price}}</div></div></div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "app",

  data() {
    return {
      dishes: null,
      drinks: null,
      error: null
    };
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
