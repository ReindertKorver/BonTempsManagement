<template>
  <div class="NavBar">
     <b-navbar-nav>
                <b-nav-item class="navitem" v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated"  to="/reserveringen" replace>Reserveringen</b-nav-item>
                <b-nav-item class="navitem" v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated" to="/menu" replace> Menu</b-nav-item>
                <b-nav-item class="navitem" v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated" to="/gerechten" replace> Gerechten</b-nav-item>
                 <b-nav-item class="navitem"  v-bind:class="{ active: Activated }" v-on:click="Activated = !Activated" to="/voorraad" replace> Voorraad</b-nav-item>
                 
            </b-navbar-nav>
             <div class="Notification" >
               <b-link class="NotificationLink" v-if="ShowStockNotifier"  to="/voorraad/te_kort" replace><i class="material-icons">error</i> <span class="hideNotif"><nav v-if="products&&products.length>0">{{products.length}} </nav>&nbsp;Producten overschrijden de minimum voorraad</span> </b-link>
             </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      Activated: false,
      ShowStockNotifier: true,
      products: null,
      error: null
    };
  },
  methods: {
    load() {
      //loads the amount of products that are low on stock
      //the api does all the processing
      var Headers = {
        accept: "application/json"
      };

      var cmpnt = this;
      try {
        fetch("http://localhost:52704/api/stock", {
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
            if (cmpnt.products != null) {
              cmpnt.ShowStockNotifier = true;
            }
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
  //this watches if the url changes if it does the Notification the shows the amount of product low on stock will be reloaded
  watch: {
    $route(to, from) {
      this.load();
    }
  },
  mounted() {
    this.load();
  }
};
</script>
<style lang="scss">
.navitem a:hover{
  color: #1a631a;
  border: 2px solid #348e34;
  border-radius: 25px;
}
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
.Notification {
  width: 100%;
  text-align: right;
}
.Notification {
  position: absolute;
  top: 0px;
  padding: 10px;
}
.Notification a {
  color: red;
  border: 1px solid gray;
  display: inline-flex !important;
  font-size: 1rem;
}
.Notification a:hover {
  transition: width 1s;
  text-decoration: none;
}
.Notification i {
  font-size: auto;
  height: 100%;
  display: inline-flex;
  padding-right: 2px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.Notification span {
  display: inline-flex;
  padding: 5px;

  border-left: 1px solid gray;
}
.NotificationLink:hover {
  transition: width 1s;
  .hideNotif {
    width: 100%;
    white-space: nowrap;
    font-size: 1rem;
  }
}
.hideNotif {
  width: 92px;
  white-space: nowrap;
  overflow: hidden;
}
.NotificationLink:active {
  color: #1a631a;
  border: 1px solid gray;
  border-radius: 25px;
}
</style>
