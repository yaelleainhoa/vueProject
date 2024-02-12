<template>
  <div id="ingredients">
    <div v-for="ingredient in this.ingredients" :key="ingredient.id">
      <Ingredient :ingredient="ingredient.name" :quantity="ingredient.measure"/>
    </div>
  </div>
</template>

<script>

import Ingredient from './Ingredient.vue'

export default {
  name: 'Ingredients',
  props: {
    ingredients:{}
  },
  components: {
    Ingredient
      },
   data() {
    return {
      ingredientsData: [],
      ingredientNumber: null
          }
  }
}

</script>

<style scoped>

#ingredients{
    background-color: var(--ingredient-color);
    margin:5%;
    padding: 5%;
    width: 80%;
    display: flex;
    flex-wrap:wrap;
    border-radius: 10px;
}

#ingredients > div{
  width: 50%;
}

</style>
