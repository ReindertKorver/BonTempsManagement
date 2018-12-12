<template>
<div class="allDishes"
><h3>Gerechten</h3>
<div class="removeRes" v-if="removeResult"><b>{{removeResult}}</b></div>
<b-link to="/gerechten_nieuw">Nieuw gerecht</b-link><br>
  <b-link to="/drinken_nieuw">Nieuwe drank</b-link><br/>
  <b-link to="/gerechten_producten">Klik hier om producten te koppelen aan een gerecht.</b-link>
    <div class="dishes_drinks">
      <div class="dishes" v-if="dishes">
        <b>Voorgerechten:</b>
        <div id='#dishV' v-for="dish in dishes" :key="dish.id" v-if="dish.type=='V'">
           <div  v-on:click="remove(true,dish)" class="removedish" title="Verwijderen uit lijst">X</div>
          <div class="dish"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Hoofdgerechten:</b>
        <div id='#dishH'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='H'">
           <div  v-on:click="remove(true,dish)" class="removedish" title="Verwijderen uit lijst">X</div>
            <div class="dish"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{dish.name}}</div><div class="dish-price">€{{dish.price}}</div></div></div>
        </div>
        <b>Nagerechten:</b>
        <div id='#dishN'  v-for="dish in dishes" :key="dish.id" v-if="dish.type=='N'">
           <div  v-on:click="remove(true,dish)" class="removedish" title="Verwijderen uit lijst">X</div>
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
           <div  v-on:click="remove(false,drink)" class="removedish" title="Verwijderen uit lijst">X</div>
          <div class="dish"><div class="dish-icon"></div><div class="dish-content"><div class="dish-name">{{drink.name}}</div><div class="dish-price">€{{drink.price}}</div></div></div>
        </div>
      </div>
       <pulse-loader class="pulse-loader" id="SaveLoader" :color="color" :size="size" ></pulse-loader>
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
      removeResult: null
    };
  },
  methods: {
    //removes DISH or DRINK from database via the API
    remove(isDish, itemToDelete) {
      var Headers = {
        accept: "application/json",
        "Content-Type": "application/json"
      };

      var cmpnt = this;
      cmpnt.error = null;
      try {
        var url;
        if (isDish) {
          url = "http://localhost:52704/api/dish";
        } else {
          url = "http://localhost:52704/api/drinks";
        }
        if (itemToDelete.id == null) {
          cmpnt.error =
            "Er is iets fout gegaan bij het verwijderen probeer een andere keer opnieuw";
        } else {
          fetch(url, {
            method: "DELETE",
            headers: Headers,
            body: JSON.stringify(itemToDelete)
          })
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error(
                  "Er is iets fout gegaan bij het verwijderen probeer een andere keer opnieuw"
                );
              }
            })
            .then(json => {
              cmpnt.removeResult = json.friendlyMessage;
              cmpnt.dishes = null;
              cmpnt.drinks = null;
              cmpnt.load();
            })
            .catch(error => {
              cmpnt.error = error;
            });
        }
      } catch (error) {
        cmpnt.error = error.message;
      }
    },
    //Shows the loader if something is being processed
    showLoader(show) {
      if (show) {
        document.querySelector("#SaveLoader").style.visibility = "visible";
      } else {
        document.querySelector("#SaveLoader").style.visibility = "hidden";
      }
    },
    //load functionallity for when the page needs to go back to the original STATE
    load() {
      this.showLoader(true);
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
          }).finally(()=>{
            cmpnt.showLoader(false);
          });
      } catch (error) {
        cmpnt.dishes = null;
        cmpnt.error = error;
      }
    }
  },
  created() {
    console.log("created", this);
  },

  mounted() {
    var cmpnt = this;
    cmpnt.load();
  }
};
</script>
<style lang="scss">
.removeRes {
  color: red;
}
</style>
