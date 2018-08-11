<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <h3 class="text-center">Log In</h3>
      <hr>
      <div class="form-group">
        <input v-model="email" type="text" class="form-control" placeholder="Email">
      </div>
      <div class="form-group">
        <input v-model="password" type="password" class="form-control" placeholder="Password">
      </div>
      <div class="form-group">
        <button @click="login" type="submit" class="btn btn-default">
          <b>Log In</b>
        </button>
      </div>
      <hr>
      <p class="text-foot">
        <router-link to="/" class="btn btn-link">Back</router-link>
        Have an login?
        <router-link to="register" class="btn btn-link">Register</router-link>
      </p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

// const baseURL = 'http://e-commerce-server.unguhiu.com'
const baseURL = 'http://localhost:3000'

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login: function () {
      axios.post(`${baseURL}/customers/login`, {
        email: this.email,
        password: this.password
      })
        .then(response => {
          swal('Welcome', response.data.message, 'success')
            .then(() => {
              localStorage.setItem('id', response.data.id)
              localStorage.setItem('name', response.data.fullname)
              localStorage.setItem('token', response.data.access)
              localStorage.setItem('role', response.data.role)
              if (response.data.role === 'admin') {
                this.$router.push({
                  name: 'admin'
                })
              } else {
                this.$router.push({
                  name: 'home'
                })
              }
            })
        })
        .catch(err => {
          swal('Your error', err.response.data.message, 'error')
        })
    }
  }
}
</script>

<style scoped>
.container {
  margin: 70px auto;
}

.text-center {
  font-family: 'Bungee Inline', cursive;
  font-size: 40px;
  margin-top: 0;
}

.col-md-2 {
  font-size: 16px;
  margin: 0 auto;
}

.col-md-6 {
  position: center;
  margin: 0 auto;
  background-color:azure;
  padding: 60px;
  border: 1px solid #e6e6e6;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.btn-default {
  width: 100%;
  background-color: #4267b2;
  color: white;
}

.btn-default:hover {
  background-color: #00008b;
}

.btn-default:active {
  background-color: #e0eeee;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.btn-primary {
  background-color: #4267b2;
}

.btn-primary:hover {
  background-color: #00008b;
}

.btn-primary:active {
  background-color: #e0eeee;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

.form-group {
  text-align: center;
}

@media (min-width: 1200px) {
  .container {
    width: 970px;
  }
}

.swal-text {
  text-align: center;
}

.top {
  margin-top: 70px;
}

.navbar-default {
  background-color: gold;
}

#footer {
  bottom: 0;
  width: 100%;
  position: fixed;
  height: 60px;
  background-color: gold;
}

.footer-block {
  margin: 20px 0;
}
</style>
