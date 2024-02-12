<template>
  <div id="card">
      <div class = "view">
        <div class="image_recipe"><img v-bind:src="picture_url">
        </div>
        <div class="content">
          <div class = "header">
            <router-link to="/">
              <img src="@/assets/return.png" class="seeRecipes"  v-on:click="udpate()">
            </router-link>
            <h1 class="title">{{title_recipe }}</h1>
          </div>
          <Ingredients :ingredients="ingredients"/>
          <div class="recipe">
            <div v-for="recipe_line in recipe" v-bind:key="recipe_line.id"><p>{{recipe_line}}</p>
            </div>
          </div>
      </div>
  </div>
     
  </div>
</template>

<script>
import Ingredients from "./Ingredients.vue"

export default {
  name: 'RecipeCard',
  props: {
    title_recipe: {type: String, default : "No title"},
    recipe: {type: Array},
    picture_url:{type: String, default:''},
    ingredients:{type: Array}
  },
  components: {
      Ingredients
  },
  created: function()
  {
    if (!this.picture_url) {
      this.picture_url = require("../assets/logo.png");
    }
  },
  methods: {
    udpate: function () {
      this.$emit("hideMainRecipe")
    }
  }
}
</script>

<style scoped>
h1{
    color:var(--button-color);
    text-align: center;
}
#card{
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
  margin:3% 0%;
  padding: 1%;
}

.view{
  display: flex;
}

.header{
  display: flex;
  align-items: center; /* align vertical */
  margin: 0% 5%;
}

.content{
  display: flex;
  flex-direction: column;
  flex:1;
}

.title{
  margin: 0% 5%;
}

.seeRecipes{
  width: 40px;
  height: 40px;
  margin:2%;
  cursor: pointer;
}

.recipe{
  margin: 2% 5%;
}

.image_recipe{
  flex: 0%;
}

.image_recipe > img{
  width: 100%;
  box-shadow: 0px 0px 20px var(--shadow-color);
  border-radius: 20px;
}

@media (max-width: 768px) {
  .view{
    flex-direction: column;
  }
  .image_recipe > img{
    margin-top:10%;
    width: 60%;
  }
  
  .seeRecipes{
    width: 25px;
    height: 25px;
  }

  .header{
    margin-top:5%;
    justify-content: center;
  }
}
</style>
