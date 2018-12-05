<template>
  <div id="app">
    <Branding/>
    <NavBar/>
      <div class="page">
        <router-view/>
      </div>
    <btmFooter/>
  </div>
</template>

<script>
import NavBar from "./components/Head/NavBar";
import Branding from "./components/Head/Branding";
import Pager from "./components/Body/Page";
import btmFooter from "./components/Footer/Footer";
export default {
  name: "app",
  components: { NavBar, Branding, Pager, btmFooter },
  data() {
    return {};
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "Quesha";
  src: url("./assets/fonts/Quesha.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;

}
/* * {
  font-family: "Quesha", Helvetica, Arial, sans-serif;
    font-size: 25px;
} */
.page{
  padding: 20px;
}


.dishes_drinks {
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";

  @media (max-width: 600px) {
      display: grid ;
      grid-template-columns: 100% ;
      grid-template-rows: max-content max-content ;
      grid-template-areas: "." ".";
  .drinks{
    margin-top:10px; 
  }
  }
}

.drinks {
}
.dishes {
}
.dish {
  padding-left: 10px;
  display: grid;
  grid-template-columns: 50px max-content;
  grid-template-rows: 1fr;
  grid-template-areas: ". .";
}
.dish-icon {
  display: inline-block;
  border: 2px solid #000;
  border-radius: 10px;
  height: 40px;
  width: 40px;
  margin: 5px;
}
.dish-name {
  display: inline;
}
.dish-price {
  display: block;
  font-size: 13px;
}
.dish-content {
  display: block;
}


//---
.products {
  
}

.product {
  padding-top:5px; 
}
.product-icon {
  display: inline-block;
  border: 2px solid #000;
  border-radius: 10px;
  height: 40px;
  width: 40px;
  margin: 5px;
}
.product-name {
  display: inline;
}
.product-content {
  padding-left: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill,minmax(50%,1fr));
  grid-template-rows: 1fr;
  grid-template-areas: "head ."
  "head . ";
}
.product-stock {
  display: block;
  font-size: 13px;
  width:100%;
}
.product-buy {
  display: block;
  padding-left:10px ;
  font-size: 13px;
  text-align: right;
}
.dish-content {
  display: block;
}
</style>
