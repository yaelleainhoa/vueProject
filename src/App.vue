<template>
  <div id="app">
    <div v-if="!loaded" class="loading">
    </div>
    <div v-else-if="!results">
      <NoResults containerId="NoResults"/>
    </div>
    <div v-else class="loaded">
      <Header v-on:searchRecipe="seeSearchedRecipes" v-on:reload="reloadRecipes" :recipeName="nameRecipes"/>   
      <div class="mainRecipe" v-if="idMeal != null">
          <RecipePage :title_recipe="mainMeal.meal.strMeal" :picture_url="mainMeal.meal.strMealThumb" 
          :recipe="mainMeal.meal.strInstructions.split('\n')" :ingredients="mainMeal.ingredients"
          v-on:hideMainRecipe="seeRecipes"/>
      </div>

      <div class="page" v-else>
        <div class="first_column">
          <div v-for="meal in seeFilteredMeals.slice(0,nb_of_recipes/2)" :key="meal.id">
            <RecipeCard :title_recipe="meal.meal.strMeal" :picture_url="meal.meal.strMealThumb" 
            v-on:updateVisibility="seeMainRecipe" :ingredients="meal.ingredients" :id="meal.meal.idMeal"/>
          </div>
        </div>

        <div class="second_column">
          <div v-for="meal in seeFilteredMeals.slice(seeFilteredMeals.length/2, seeFilteredMeals.length/2 + nb_of_recipes/2-1)" :key="meal.id">
            <RecipeCard :title_recipe="meal.meal.strMeal" :picture_url="meal.meal.strMealThumb" 
            v-on:updateVisibility="seeMainRecipe" :ingredients="meal.ingredients" :id="meal.meal.idMeal"/>
          </div>
        </div>
        <div class="more_recipes">
          <button  :class="!more_recipes?'disallow':''" v-on:click="seeMoreRecipes">See more</button>
        </div>
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script>
import RecipeCard from './components/RecipeCard.vue'
import RecipePage from './components/RecipePage.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import {getAllDataMeals} from "@/services/api/mealAPI.js"
import NoResults from '@/components/NoResults.vue'


export default {
  name: 'App',
  components: {
    RecipeCard,
    Header,
    RecipePage,
    NoResults,
    Footer
    },
    watch: {
		nameRecipes: function(newSearch) {
			localStorage.setItem("search", newSearch)
		}},
  data() {
    return {
      mealsData: [],
      isVisible:false,
      idMeal:null,
      mainMealData:[],
      nameRecipes: localStorage.getItem("search") || "",
      loaded:false,
      results:true,
      nb_of_recipes: 20,
      more_recipes:true
    }
  },
  created: function(){
    this.retrieveMealsData(this.nameRecipes);
  },
  computed: {
    mainMeal: function(){
      let meal = this.mealsData.find(element => element.meal.idMeal == this.idMeal);
      return meal;
    },
    seeFilteredMeals: function(){
      let meals = this.mealsData;
      if(this.nameRecipes){
        meals = meals.filter(meal => (meal.meal.strMeal.toLowerCase().includes(this.nameRecipes.toLowerCase())) || (meal.ingredients.some(ingredient => ingredient.name.toLowerCase().includes(this.nameRecipes.toLowerCase()))));
      }
      this.doMealsExist(meals);
      return meals;
    },
  },
	methods: {
    async retrieveMealsData() {
        this.mealsData = await getAllDataMeals();
        this.updateNumberOfRecipes();
        this.areThereMoreRecipes();
        this.pageLoaded();
    },

    seeMainRecipe: function(id){
      console.log(id)
      this.idMeal = id;
      this.$route.params.id = this.idMeal;
    },

    seeRecipes: function(){
      this.idMeal = null;
    },

    seeSearchedRecipes: function(name){
      this.nameRecipes = name;
      this.updateNumberOfRecipes();
      this.areThereMoreRecipes();
      this.idMeal=null;
    },

    areThereMoreRecipes(){
      if(this.seeFilteredMeals.length>40){
        this.more_recipes=true;
      }
      else{
        this.more_recipes=false;
      }
    },

    updateNumberOfRecipes: function(){
      this.nb_of_recipes = Math.max(2,Math.min(40,this.seeFilteredMeals.length));
    },

    doMealsExist: function(meals){
      this.results=true;
      if(meals.length==0){
        this.results=null;
      }
    },

    reloadRecipes: function(){
      this.nameRecipes="";
    },

    pageLoaded: function(){
      this.loaded = true;
    },

    seeMoreRecipes: function(){
      let new_nb = this.nb_of_recipes+Math.min(20, this.seeFilteredMeals.length - this.nb_of_recipes);
      this.nb_of_recipes = new_nb;
      let next_nb = this.nb_of_recipes+Math.min(20, this.seeFilteredMeals.length - this.nb_of_recipes);
      if(new_nb==next_nb){
        this.more_recipes=false;
      }
    }

	}
}
</script>

<style>

:root{
  --button-color: #7ea822;
  --button-color-hovered: #5c7a19;
  --ingredient-color:#ebebeb;
  --shadow-color:rgb(231, 231, 231);
  --disable-color:#858585;
}

body{
  background-color: rgb(255, 255, 255);
  margin:0px;
  width: 100vw;
  box-sizing: border-box;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #ffffff;
  display:flex;
  flex-direction: column;
}

#app:first-child{
  align-items: center;
  width: 100vw;
}

.page{
  margin-top: 5vw;
  display: flex;
  flex-wrap: wrap;
  width: 100vw;
  margin-top: 60px;
}

.page > div{
  width: 50%;
}

img{
  margin-left: auto;
  margin-right: auto;
  display: block;
}

button{
  width: fit-content;
  padding:1%;
  background-color: var(--button-color);
  border: none;
  color: white;
  cursor:pointer;
  margin:1%;
  border-radius: 50px;
  padding: 2% 3%; 
}


.loading {
  position:absolute;
  left:50%;
  top:50%;
  width: 1rem; /* control the size */
  background: #91c326; /* control the color here */
}
.loading,
.loading::before,
.loading::after {
  content: "";
  display: grid;
  grid-area: 1/1;
  aspect-ratio: 1;
  border-radius: 50%;
  box-shadow: 0 0 0 0 #a4d931; /* and here, 3 is the transparency */
  animation: r 3s linear infinite var(--s, 0s);
}
.loading::before {
  --s: 1s;
}
.loading::after {
  --s: 2s;
}

@keyframes r {
  to {
    box-shadow: 0 0 0 6rem #0000;
  }
}

.more_recipes{
  display: flex;
  justify-content: center;
  margin: 5% auto;
}

.disallow{
  background-color: var(--disable-color);
  cursor:initial;
}

@media (max-width: 768px) {
  .page > div{
    width: 100%;
  }
}

</style>
