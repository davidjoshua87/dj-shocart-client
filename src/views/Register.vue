<template>
  <div class="container">
    <div class="col-md-3"></div>
    <div class="col-md-6">
      <h3 class="text-center">Register</h3>
      <hr>
      <div class="form-group">
        <label>Fullname</label>
        <input id="fullname" class="form-control" type="text" placeholder="Your Name" v-model="fullname">
      </div>
      <div class="form-group">
        <label>Email</label>
        <input id="email" class="form-control" type="text" placeholder="Your Email" v-model="email">
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" placeholder="Min 6 alphanumeric characters" v-model="password">
      </div>
      <br>
      <div class="form-group">
        <button v-on:click="register" type="submit" class="btn btn-default">
          <b>Register</b>
        </button>
      </div>
      <hr>
      <p class="text-foot">
        Have an account?
        <router-link to="/login" class="btn btn-link">Log in</router-link>
      </p>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert'

const baseURL = 'http://35.240.167.27'

export default {
  name: 'register',
  data () {
    return {
      fullname: '',
      email: '',
      password: '',
    }
  },
  methods: {
    loginAfterRegister: function (userData){
      axios.post(`${baseURL}/customers/login`, {
          email: userData.email,
          password: userData.password
        })
        .then(response => {
          swal("Welcome", response.data.message, "success")
            .then(() => {
              localStorage.setItem('id', response.data.id)
              localStorage.setItem('name', response.data.fullname)
              localStorage.setItem('token', response.data.access)
              localStorage.setItem('role', response.data.role)
              if (response.data.role == 'admin')
                this.$router.push({
                  name: "admin"
                })
              else {
                this.$router.push({
                  name: "home"
                })
              }
            })
        })
        .catch(err => {
          swal("Your error", err.response.data.message, "error")
        })
    },
    register: function () {
      let userData = {
        fullname: this.fullname,
        email: this.email,
        password: this.password
      }
      axios.post(`${baseURL}/customers/register`, {
          fullname: userData.fullname,
          email: userData.email,
          password: userData.password
        })
        .then(response => {
          swal("Welcome", response.data.message, "success")
            .then(() => {
              this.login = false
            })
          this.loginAfterRegister(userData)
        })
        .catch(err => {
          swal("Your error", err.response.data.data.message, "error")
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

label {
  text-align: left;
  display: block;
  margin-bottom: .5rem;
}

.col-md-2 {
  font-size: 16px;
  margin: 0 auto;
}

.col-md-6 {
  position: center;
  margin: 0 auto;
  background-color: azure;
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
