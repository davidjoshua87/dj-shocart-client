<template>
  <div class="admin">
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand">Dj-Shocart</a>
        </div>
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/">
                <span class="glyphicon glyphicon-home"></span> Home</router-link>
            </li>
            <li>
              <a @click="logout" style="cursor:pointer">
                <span class="glyphicon glyphicon-log-out"></span> Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container" style="margin-top:100px">
      <a data-toggle="modal" data-target="#addItem" style="cursor:pointer">
        <button class="btn btn-primary" style="margin-bottom:15px">
          <span class="glyphicon glyphicon-plus"> </span> Add Item</button>
      </a>
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="text-center">No</th>
              <th class="text-center">Name</th>
              <th class="text-center">Price</th>
              <th class="text-center">Stock</th>
              <th class="text-center">Category</th>
              <th class="text-center">Image</th>
              <th class="text-center">Action</th>
            </tr>
          </thead>
          <tbody>

            <tr is="AdminManage" v-for="(list,index) in listItem" :item="list" :no="index" :key="list._id" @update-item="updateItem"
              @delete-item="deleteItem" />

          </tbody>
        </table>
      </div>
    </div>

    <div id="addItem" class="modal fade" role="dialog">
      <div class="modal-dialog modal-lg">

        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add item</h4>
          </div>
          <div class="modal-body">
            <div class="progress">
              <div class="progress-bar progress-bar-striped active" role="progressbar" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"
                :style="{width: progress + '%'}">
                {{ progress }}%
              </div>
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="name" placeholder="Add Name">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="price" placeholder="Add Price">
            </div>
            <div class="form-group">
              <input type="text" class="form-control" v-model="stock" placeholder="Add Stock">
            </div>
            <div class="form-group">
              <select class="form-control" v-model="category">
                <option disabled value="">-- Select Category --</option>
                <option>Safety Shoes</option>
                <option>Sport Shoes</option>
              </select>
            </div>
            <div class="form-group">
              <input type="file" class="form-control" @change="postimageHandler">
            </div>
            <div class="form-group">
              <button @click="postimage()" type="submit" class="btn btn-default" style="width:100%;background-color:#3897f0;color:white;">
                <b>Add item</b>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import swal from 'sweetalert'
  import AdminManage from '@/components/AdminManage.vue'

  const baseURL = 'http://e-commerce-server.unguhiu.com'
  // const baseURL = 'http://localhost:3000'

  export default {
    name: 'admin',
    components: {
      AdminManage
    },
    data: function () {
      return {
        name: '',
        price: '',
        stock: '',
        category: '',
        image: '',
        progress: 0,
        listItem: []
      }
    },
    created: function () {
      if (localStorage.getItem('role') != 'admin') {
        swal('Error', 'you role cant get access', 'warning')
        this.$router.push({
          name: "home"
        })
      }
    },
    methods: {
      showItem: function () {
        axios.get(`${baseURL}/items/view`)
          .then(response => {
            this.listItem = response.data.data
          })
          .catch(function (err) {
            swal('Your error', err.response.data.data.message, 'error')
          })
      },
      postimage: function () {
        let apptoken = localStorage.getItem('token')
        let iduser = localStorage.getItem('id')
        let formData = new FormData()
        formData.append('name', this.name)
        formData.append('price', this.price)
        formData.append('stock', this.stock)
        formData.append('category', this.category)
        formData.append('image', this.image)
        let self = this
        axios.post(`${baseURL}/items/`, formData, {
            headers: {
              apptoken,
              id: iduser
            },
            'Content-Type': 'multipart/form-data',
            onUploadProgress: function (progressEvent) {
              let percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
              self.progress = percent
            },
          })
          .then(response => {
            swal('Success', 'Item success added', 'success')
            self.progress = 0
            this.name = ''
            this.price = ''
            this.stock = ''
            this.category = ''
            this.image = ''
            this.listItem.push(response.data.data)
          })
          .catch(err => {
            swal('Your error', err.response.statusText, 'error')
            self.progress = 0
          })
      },
      postimageHandler: function (event) {
        this.image = event.target.files[0]
      },
      updateItem: function (id, name, price, stock, category, image, old) {
        let apptoken = localStorage.getItem('token')
        let iduser = localStorage.getItem('id')
        let formData = new FormData()
        formData.append('image', image)
        axios.post(`${baseURL}/items/upload`, formData, {
            headers: {
              apptoken,
              id: iduser
            }
          })
          .then(response => {
            axios.put(`${baseURL}/items/${id}`, {
                name,
                price,
                stock,
                category,
                link: response.data.link
              }, {
                headers: {
                  apptoken,
                  id: iduser
                }
              })
              .then(response => {
                swal("Success update!", response.data.message, "success");
                let index = this.listItem.findIndex(item => item._id == response.data.data._id)
                this.listItem[index].name = name
                this.listItem[index].price = price
                this.listItem[index].stock = stock
                this.listItem[index].category = category
              })
              .catch(err => {
                swal("Your error", err.response.data.data.message, "error")
              })
          })
          .catch(err => {
            if (err.response.status == 500) {
              axios.put(`${baseURL}/items/${id}`, {
                  name,
                  price,
                  stock,
                  category,
                  link: old
                }, {
                  headers: {
                    apptoken,
                    id: iduser
                  }
                })
                .then(response => {
                  swal("Successful updates! without changing the old image", response.data.message, "success");
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
      },
      deleteItem: function (id) {
        let apptoken = localStorage.getItem('token')
        let iduser = localStorage.getItem('id')
        swal({
            title: "Are you sure?",
            text: "After delete, you can't get this item again!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              axios.delete(`${baseURL}/items/${id}`, {
                  headers: {
                    apptoken,
                    id: iduser
                  }
                })
                .then(response => {
                  swal(response.data.message, {
                    icon: "success",
                  })
                  let index = this.listItem.findIndex(item => item._id == response.data.data._id)
                  this.listItem.splice(index, 1)
                })
                .catch(err => {
                  swal("Your error", err.response.data.data.message, "error")
                })
            } else {
              swal("Failed remove item")
            }
          })
      },
      logout: function () {
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        this.$router.push({
          name: "login"
        })
      }
    },
    mounted: function () {
      this.showItem()
    }
  }
</script>

<style scoped>
  .admin {
    background-color: white;
  }

  th.text-center {
    color: blue;
  }

  .top {
    margin-top: 50px;
  }

  .navbar-default {
    background-color: azure;
  }

  #footer {
    bottom: 0;
    width: 100%;
    position: fixed;
    height: 60px;
    background-color: azure;
  }

  .footer-block {
    margin: 20px 0;
  }
</style>