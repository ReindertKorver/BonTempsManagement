<template>
<div>Reserveringen
  
<button v-on:click="generateRandomBon">Genereer pdf</button>
   <pulse-loader id="GeneratingLoader" class="pulse-loader" :color="color" :size="size" style="visibility: hidden;" ></pulse-loader>
<a v-if="base64PDF" :href="base64PDF" download="RandomlyGegenereerdePDF.pdf">download PDF</a>
</div>
  
  </template>

<script>

import { PulseLoader } from "vue-spinner/dist/vue-spinner.min.js";
export default {
  name: "app",
  components:{PulseLoader},
  data() {
    return {
      base64PDF: null,
      color: "#1a631a",
      size: "7px",
    };
  },
  methods: {
    //shows a loader when something is being processed
     showLoader(show) {
      if (show) {
        document.querySelector("#GeneratingLoader").style.visibility = "visible";
      } else {
        document.querySelector("#GeneratingLoader").style.visibility = "hidden";
      }
    },
    //this method askes the API for a randomly generated PDF bon 
    //It uses all the dishes and creates a random amount customers 
    generateRandomBon() {
      var cmpnt = this;
      cmpnt.showLoader(true);
      var Headers = {
        accept: "application/json",
          "pdfType":"random"
      };
      var base64;
      fetch("http://localhost:52704/api/values/?pdftype=random", {
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
    }
  }
};
</script>
