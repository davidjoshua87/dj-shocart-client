<template>
  <tr class="text-center">
    <td>{{ no+1 }}</td>
    <td>
      <img :src="cart.link" class="img-responsive" width="136px" height="86px" />
    </td>
    <td>{{ cart.name }}</td>
    <td>
      <button :disabled="cart.stock==0" @click="minesQuantity" class="btn btn-primary" type="button">
        <span class="glyphicon glyphicon-minus"> </span>
      </button>
      <span style="width:50px;background-color:white;padding:10px;">{{ cart.quantity }}</span>
      <button :disabled="cart.stock==0" @click="addQuantity" class="btn btn-primary" type="button">
        <span class="glyphicon glyphicon-plus"> </span>
      </button>
    </td>
    <td>{{ price }}</td>
    <td>
      <button @click="deleteItem" type="button" class="btn btn-danger glyphicon glyphicon-trash"></button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['cart', 'no', 'price'],
  methods: {
    addQuantity: function () {
      this.$emit('add-quantity')
    },
    minesQuantity: function () {
      this.$emit('mines-quantity')
    },
    deleteItem: function () {
      this.$emit('delete-item')
    }
  }
}
</script>
