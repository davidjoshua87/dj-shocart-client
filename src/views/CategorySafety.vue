<template>
  <div class="col-md-3 col-xs-6">
    <div class="thumbnail">
      <img :src="item.link" style="width:100%" height="250">
      <div class="caption">
        <h4>{{ item.name }}</h4>
        <p>{{ price }}</p>
        <p>Stock {{ item.stock }}</p>
        <button @click="addCart" type="button" class="btn btn-default btn-block">Add to cart</button>
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