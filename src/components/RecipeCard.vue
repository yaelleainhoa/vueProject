<template>
  <div id="card">
    <h1>{{title_recipe }}</h1>
    <div class="image_recipe"><img v-bind:src="picture_url"></div>
    <div class="text_recipe">
      <Ingredients v-bind:idMeal = "id" :ingredients="ingredients"/>
      <router-link :to="{ name: 'recipe' , params: { id: id } }">
        <button class="seeRecipe"  v-on:click="udpate()">See recipe</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Ingredients from "./Ingredients.vue"

export default {
  name: 'RecipeCard',
  props: {
    title_recipe: {type: String, default : "No title"},
    picture_url:{type: String, default:''},
    id:{},
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
      window.scroll(0,0);
      this.$route.params.id = this.id;
      this.$emit("updateVisibility", this.id)
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
    margin:5%;
    align-items: center;
    padding-top:2%;
    box-shadow: 0px 0px 20px var(--shadow-color);
    border-radius: 20px;
}

.text_recipe{
    margin:0%;
    width: fit-content;
    height:auto;
    padding:5%;
    font-size: 0.9em;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.seeRecipe{
  white-space: nowrap;
  padding: 15%;
}

.seeRecipe:hover {
  background-color: var(--button-color-hovered);
}

.image_recipe{
  margin:1%;
  width: 100%;
  height:200px;
  overflow: hidden;
}

.image_recipe > img{
  object-position: center -100px;
  width: 100%;
}

@media (max-width: 768px) {
  #card{
    margin: 20% 3%;
  }
}

</style>
