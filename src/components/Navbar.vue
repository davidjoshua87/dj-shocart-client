<template>
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
        <a @click="home" class="navbar-brand"><a>Dj-Shocart</a></a>
      </div>
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav">
          <li class="dropdown">
            <a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Category
              <span class="caret"></span>
            </a>
            <ul class="dropdown-menu">
              <li>
                <a @click="safety" class="item">Safety Shoes</a>
              </li>
              <li>
                <a @click="sport" class="item">Sport Shoes</a>
              </li>
            </ul>
          </li>
        </ul>
         <form class="navbar-form navbar-left">
          <div class="form-group">
            <input v-model="search" type="text" class="form-control" placeholder="Search">
            <button @click="onSearch" type="submit" class="btn btn-default glyphicon glyphicon-search btn-search"></button>
          </div>
        </form>
        <ul v-if="buttonlogin==true" class="nav navbar-nav navbar-right">
          <li>
            <router-link to="/login">
              <span class="glyphicon glyphicon-user"></span> Login</router-link>
          </li>
          <form class="navbar-form navbar-right">
            <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#myModal">
              <span class="glyphicon glyphicon-shopping-cart"></span> Cart {{ total }}</button>
          </form>
        </ul>
        <ul v-else class="nav navbar-nav navbar-right">
          <li>
            <router-link to="/admin" v-if="role=='admin'">
              <span class="glyphicon glyphicon-bullhorn"></span> Admin</router-link>
          </li>
          <li>
            <router-link to="/history">
              <span class="glyphicon glyphicon-th-list"></span> History Transaction</router-link>
          </li>
          <li>
            <a @click="logout" style="cursor:pointer">
              <span class="glyphicon glyphicon-log-out"></span> Logout</a>
          </li>
          <form class="navbar-form navbar-right">
            <button type="button" class="btn btn-success btn-md" data-toggle="modal" data-target="#myModal">
              <span class="glyphicon glyphicon-shopping-cart"></span> Cart {{ total }}</button>
          </form>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  props: ['total'],
  data: function () {
    return {
      search: '',
      buttonlogin: true,
      role: localStorage.getItem('role')
    }
  },
  created: function () {
    if (localStorage.getItem('token')) {
      this.buttonlogin = false
    }
  },
  methods: {
    home: function () {
      this.$emit('showItem')
    },
    safety: function (event) {
      let category = `Safety Shoes`
      this.$emit('safety', category)
    },
    sport: function (event) {
      let category = `Sport Shoes`
      this.$emit('sport', category)
    },
    onSearch: function (event) {
      let search = this.search
      this.$emit('onSearch', search)
    },
    logout: function () {
      this.$emit('logout-page')
      this.buttonlogin = true
    }
  }
}
</script>
<style>
.btn-search {
  margin-left: 3px;
  margin-bottom: 2px;
  padding-left: 25px;
  padding-right: 25px;
}
</style>
