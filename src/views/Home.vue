<template>
  <div class="home">
    <Navbar :total="countCart()" @onSearch="onSearchName" @safety="safetyPage" @sport="sportPage" @logout-page="logout" />
    <div id="myModal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Cart</h4>
          </div>
          <div v-if="cartItem.length==0" class="modal-body">
            Cart Empty
          </div>
          <div v-else class="modal-body">
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th class="text-center">No</th>
                    <th class="text-center">Image</th>
                    <th class="text-center">Name Product</th>
                    <th class="text-center">Quantity</th>
                    <th class="text-center">Price</th>
                    <th class="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr is="Cart" v-for="( listCart, index ) in cartItem" :cart="listCart" :no="index" :price="formatPrice(listCart.price*listCart.quantity)"
                    :key="listCart.name" @add-quantity="addQuantity(listCart._id,listCart.stock,listCart.price)" @mines-quantity="minesQuantity(listCart._id,listCart.price)"
                    @delete-item="deleteItem(index,listCart.price*listCart.quantity, listCart.quantity)" />
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="5">
                      <b>Total Price</b>
                    </td>
                    <td>
                      <b>{{ formatPrice(totalPrice) }}</b>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="checkout()" type="button" class="btn btn-danger" data-dismiss="modal" v-show="cartItem.length!==0">Checkout</button>
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <Carousel />
    <div class="container" style="margin-top:80px; margin-bottom:60px">
      <div class="row text-center">
        <Product v-for="list in listItem" :item="list" :price="formatPrice(list.price)" :key="list._id" @add-cart="addCart(list)"
        />
      </div>
    </div>
    <div class="footer">
      <div class="brands">
        <h5>Brands</h5>
        <div class="logos">
          <a href="#">
            <img src="../assets/img/logo1.gif" alt="logo-brand" />
          </a>
          <a href="#">
            <img src="../assets/img/logo2.gif" alt="logo-brand" />
          </a>
          <a href="#">
            <img src="../assets/img/logo3.gif" alt="logo-brand" />
          </a>
          <a href="#">
            <img src="../assets/img/logo4.gif" alt="logo-brand" />
          </a>
          <a href="#">
            <img src="../assets/img/logo5.gif" alt="logo-brand" />
          </a>
        </div>
      </div>
      <div class="container text-center">
        <p class="footer-block">© 2018 Dj-Shocart. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import Navbar from '@/components/Navbar.vue'
import Cart from '@/components/Cart.vue'
import Carousel from '@/components/Carousel.vue'
import Product from '@/components/Product.vue'

const baseURL = 'http://e-commerce-server.unguhiu.com'
// const baseURL = 'http://localhost:3000'

export default {
  name: 'home',
  components: {
    Navbar,
    Cart,
    Carousel,
    Product
  },
  data: function () {
    return {
      listItem: [],
      cartItem: [],
      checkoutItem: [],
      totalPrice: 0,
    }
  },
  methods: {
    countCart: function () {
      let total = 0;
      for (let i in this.cartItem) {
        total += this.cartItem[i].quantity
      }
      return total
    },
    formatPrice: function (price) {
      return `Rp. ${price.toLocaleString()}`
    },
    safetyPage: function (value) {
      axios.get(`${baseURL}/items/category?category=${value}`)
        .then(response => {
          this.listItem = response.data.data
        })
        .catch(function (err) {
          swal('Your error', err.response.data.data.message, 'error')
        })
    },
    sportPage: function (value) {
      axios.get(`${baseURL}/items/category?category=${value}`)
        .then(response => {
          this.listItem = response.data.data
        })
        .catch(function (err) {
          swal('Your error', err.response.data.data.message, 'error')
        })
    },
    onSearchName: function (value) {
      axios.get(`${baseURL}/items/search?name=${value}`)
        .then(response => {
          this.listItem = response.data.data
        })
        .catch(function (err) {
          swal('Your error', err.response.data.data.message, 'error')
        })
    },
    showItem: function () {
      axios.get(`${baseURL}/items/view`)
        .then(response => {
          this.listItem = response.data.data
        })
        .catch(function (err) {
          swal('Your error', err.response.data.data.message, 'error')
        })
    },
    deleteItem: function (index, price) {
      this.listItem.forEach(item => {
        this.cartItem.forEach(cart => {
          if (item.name === cart.name) {
            item.stock += cart.quantity
          }
        })
      })
      swal({
          title: 'Are you sure?',
          icon: 'warning',
          buttons: true,
          dangerMode: true,
        })
        .then((delResponse) => {
          if (delResponse) {
            swal('success delete item', {
              icon: 'success',
            })
            this.cartItem.splice(index, 1)
            this.totalPrice -= price

            localStorage.setItem('cart', JSON.stringify(this.cartItem))
          } else {
            swal('Failed delete item')
          }
        })
    },
    addCart: function (list) {
      if (this.cartItem.length == 0) {
        swal('Success!', 'Success add item', 'success')
        list.stock -= 1
        list.quantity = 1
        this.totalPrice += list.price
        this.cartItem.push(list)
      } else {
        let check = true
        for (let i = 0; i < this.cartItem.length; i++) {
          if (list.name == this.cartItem[i].name) {
            swal('Success!', 'Success add item', 'success')
            list.stock -= 1
            this.cartItem[i].quantity += 1
            this.totalPrice += list.price
            check = false
          }
        }
        if (check) {
          swal('Success!', 'Success add item', 'success')
          list.stock -= 1
          list.quantity = 1
          this.totalPrice += list.price
          this.cartItem.push(list)
        }
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItem))
    },
    addQuantity: function (id, stock, price) {
      let index = this.cartItem.findIndex(cart => cart._id == id)
      let currentStock = stock + 1
      if (this.cartItem[index].quantity >= currentStock) {
        this.cartItem[index].quantity = currentStock
      } else {
        this.cartItem[index].quantity += 1
        this.totalPrice += price
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItem))
    },
    minesQuantity: function (id, price) {
      let index = this.cartItem.findIndex(cart => cart._id == id)
      if (this.cartItem[index].quantity == 1) {
        this.cartItem[index].quantity = 1
      } else {
        this.cartItem[index].quantity -= 1
        this.totalPrice -= price
      }
      localStorage.setItem('cart', JSON.stringify(this.cartItem))
    },
    checkout: function () {
      if (localStorage.getItem('token')) {
        let cart = localStorage.getItem('cart')
        let apptoken = localStorage.getItem('token')
        let iduser = localStorage.getItem('id')
        this.listItem.forEach(item => {
          this.cartItem.forEach(cart => {
            if (item.name === cart.name && item.category === cart.category) {
              item.stock === cart.quantity
              axios.put(`${baseURL}/items/update/${item._id}`, {
                  name: item.name,
                  price: item.price,
                  stock: item.stock,
                  category: item.category
                }, {
                  headers: {
                    apptoken,
                    id: iduser
                  }
                })
                .then(response => {
                  let index = this.listItem.findIndex(item => item._id == response.data.data._id)
                  this.listItem[index].name = name
                  this.listItem[index].price = price
                  this.listItem[index].stock = stock
                  this.listItem[index].category = category

                })
                .catch(err => {
                  swal("Your error", err.response.data.data.message, "error")
                })
            }

          })
        })
        let parseJ = JSON.parse(cart)
        parseJ.forEach(itemCart => {
          this.checkoutItem.push({
            customer: iduser,
            item: itemCart._id,
            quantity: itemCart.quantity
          })
        })
        axios.post(`${baseURL}/transactions/`, {
            item: this.checkoutItem
          }, {
            headers: {
              apptoken,
              id: iduser
            },
          })
          .then(response => {
            swal('Success', response.data.message, 'success')
            this.$router.push({
              name: "history"
            })
          })
          .catch(err => {
            swal('Your error', err.response.statusText, 'error')
          })
        this.cartItem = []
        localStorage.setItem('cart', '')
      } else {
        swal('You must log-in!', 'You must log-in', 'warning')
      }
    },
    logout: function () {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      localStorage.removeItem('cart')
      localStorage.removeItem('role')
      swal('Success', 'Log-out', 'success')
    }
  },
  mounted: function () {
    this.showItem()
    if (localStorage.getItem('cart')) {
      let cart = localStorage.getItem('cart')
      this.cartItem = JSON.parse(cart)
      this.cartItem.forEach(cart => {
        this.totalPrice += cart.price * cart.quantity
      })
    }
  }
}
</script>

<style scoped>
.home {
  background-color: black;
}

.top {
  margin-top: 50px;
}

.navbar-default {
  background-color: azure;
}

.footer {
  bottom: 0;
  width: 100%;
  height: 10%;
  background-color: azure;
}

.footer-block {
  margin: 10px 0;
}

h5 {
  padding-top: 10px;
  font-size: 18px;
  font-weight: 500;

}
</style>