<template>
  <tr>
    <td>{{ no+1 }}</td>
    <td>
      <img :src="history.item.link" width="136px" height="83px" />
    </td>
    <td>{{ history.customer.fullname }}</td>
    <td>{{ history.quantity }}</td>
    <td>{{ history.item.name }}</td>
    <td>{{ price }}</td>
    <td>{{ subtotal }}</td>
  </tr>
</template>

<script>
export default {
  props: ['history', 'no', 'price', 'subtotal']
}
</script>
