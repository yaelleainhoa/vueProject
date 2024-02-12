<template>
  <div id="ingredient_card">
      <p class="ingredient_title"><b>{{ingredient}} :</b> {{quantity}}</p>
  </div>
</template>

<script>
export default {
  name: 'Ingredient',
  props: {
    ingredient: String,
    quantity: String
  }
}
</script>

<style scoped>

.ingredient_title{
  margin:5px 0px 5px 0px;
}

</style>
