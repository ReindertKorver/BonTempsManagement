<template>
<div>Pager<br/>Laad pagina's zien op basis van wat in navbar gekozen is
<dishes/>
<reserves/>
<stock/>
<Menu/>
</div>
  
  </template>

<script>
import Menu from "./Pages/Menu";
import Reserves from "./Pages/Reserves";
import Dishes from "./Pages/Dishes";
import Stock from "./Pages/Stock";
//---------------
//NOT USED ANYMORE
//---------------
export default {
  name: 'app',
  components:{Reserves,Menu,Dishes,Stock},
  data () {
    return {
     
    }
  }
  
}
</script>
