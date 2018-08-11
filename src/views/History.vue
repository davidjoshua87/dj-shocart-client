<template>
  <div class="history">
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
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr>
              <th class="text-center">No</th>
              <th class="text-center">Image</th>
              <th class="text-center">Name</th>
              <th class="text-center">Quantity</th>
              <th class="text-center">Item</th>
              <th class="text-center">Price</th>
              <th class="text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>

            <tr is="HistoryList" v-for="(list,index) in listHistory" :history="list" :no="index" :price="formatPrice(list.item.price)"
              :subtotal="formatPrice(list.quantity*list.item.price)" :key="list._id" />

          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'
import HistoryList from '@/components/HistoryList.vue'

// const baseURL = 'http://e-commerce-server.unguhiu.com'
const baseURL = 'http://localhost:3000'

export default {
  name: 'history',
  components: {
    HistoryList
  },
  data: function () {
    return {
      listHistory: []
    }
  },
  created: function () {
    if (!localStorage.getItem('token')) {
      swal('Error', 'you must login first', 'warning')
      this.$router.push({
        name: 'home'
      })
    }
  },
  methods: {
    formatPrice: function (price) {
      return `Rp. ${price.toLocaleString()}`
    },
    showTransaction: function () {
      let id = localStorage.getItem('id')
      let apptoken = localStorage.getItem('token')
      axios.get(`${baseURL}/transactions/`, {
        headers: {
          apptoken,
          id
        }
      })
        .then(response => {
          this.listHistory = response.data.data
        })
        .catch(function (err) {
          swal('Your error', err.response.status, 'error')
        })
    },
    logout: function () {
      localStorage.removeItem('id')
      localStorage.removeItem('name')
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      this.$router.push({
        name: 'login'
      })
    }
  },
  mounted: function () {
    this.showTransaction()
  }
}
</script>

<style scoped>
.history {
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
