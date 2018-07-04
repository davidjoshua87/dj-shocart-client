<template>
	<tr>
		<td>{{ no+1 }}</td>
		<td>
			<input type="text" class="form-control" v-model="itemName" />
		</td>
		<td>
			<input type="text" class="form-control" v-model="itemPrice" />
		</td>
		<td>
			<input type="text" class="form-control" v-model="itemStock" />
		</td>
		<td>
			<select class="form-control" v-model="itemCategory">
				<option disabled value="">-- Select Category --</option>
				<option>Safety Shoes</option>
				<option>Sport Shoes</option>
			</select>
		</td>
		<td>
			<input type="file" class="form-control" @change="updateimageHandler" />
		</td>
		<td>
			<button @click="updateItem" class="btn btn-primary">
				<span class="glyphicon glyphicon-floppy-disk"></span>
			</button>
			<button @click="deleteItem" class="btn btn-danger">
				<span class="glyphicon glyphicon-trash"></span>
			</button>
		</td>
	</tr>
</template>

<script>
export default {
	props: ['item', 'no'],
	data: function () {
		return {
			itemName: this.item.name,
			itemPrice: this.item.price,
			itemStock: this.item.stock,
			itemCategory: this.item.category,
			image: '',
			oldImage: this.item.link
		}
	},
	methods: {
		updateimageHandler: function (event) {
			this.image = event.target.files[0]
		},
		updateItem: function () {
			this.$emit('update-item', this.item._id, this.itemName, this.itemPrice, this.itemStock, this.itemCategory, this.image,
				this.oldImage)
		},
		deleteItem: function () {
			this.$emit('delete-item', this.item._id)
		}
	}
}
</script>