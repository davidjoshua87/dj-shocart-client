<template>
  <div class="col-md-3 col-xs-6">
    <div class="thumbnail">
      <img :src="item.link" style="width:100%" height="250">
      <div class="caption">
        <h4>{{ item.name }}</h4>
        <h5>{{ price }}</h5>
        <h6>Stock: {{ item.stock }} item</h6>
        <button @click="addCart" type="button" class="btn btn-default btn-block" v-if="item.stock">Add to cart</button>
        <button type="button" class="btn btn-danger btn-block" :disabled="addCart" v-else>Sold Out</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'price'],
  methods: {
    addCart: function () {
      this.$emit('add-cart')
    }
  }
}
</script>
<style scoped>
h4 {
  font-size: 20px;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 800;
}

h5 {
  font-size: 18px;
  font-family: 'Righteous', cursive;
}

h6 {
  font-size: 15px;
  font-family: 'Aldrich', sans-serif;
}

.thumbnail {
  position: center;
  margin-top: 5px;
  background-color:azure;
  padding: 5px;
  border: 1px solid #e6e6e6;
  border-radius: 8px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.btn-default:hover {
  background-color:burlywood;
  color: black;
}

.btn-default:active {
  background-color: burlywood;
  color: black;
  box-shadow: 0 5px black;
  transform: translateY(4px);
}
.btn-danger:hover {
  background-color:red;
  color: white;
}

.btn-danger:active {
  background-color: red;
  color: white;
  box-shadow: 0 5px red;
  transform: translateY(4px);
}
</style>
