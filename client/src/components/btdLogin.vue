<template>
  <div id="btd-login">
    <img src="../assets/logo.png" class="logo" />
    <div id="login-form">
      <transition-group name="formtrans">
        <div class="warning" v-if="showWarning" key="-1">
          <img src="../assets/warning.png" class="warning-icon" />
          <span>{{ warning }}</span>
        </div>
        <div class="form-row" key="1">
          <label for="username">Username:</label
          ><input
            @keydown.enter="goButton"
            id="username"
            ref="username"
            v-model.trim="username"
            tabindex="1"
            autocomplete="off"
            autocapitalize="none"
          />
        </div>
        <div class="form-row" key="2">
          <label for="pwd">Password:</label
          ><input
            @keydown.enter="goButton"
            id="pwd"
            type="password"
            v-model="pwd"
            tabindex="2"
          />
        </div>
        <div v-if="addingAccount" class="form-row" key="3">
          <label for="cpwd">Confirm password:</label
          ><input
            @keydown.enter="goButton"
            id="cpwd"
            type="password"
            v-model="cpwd"
            tabindex="3"
          />
        </div>
        <div class="form-row-check" key="5">
          <div class="spacer" />
          <label for="stayin">Keep me signed in</label
          ><input
            type="checkbox"
            @keydown.enter="goButton"
            id="stayin"
            v-model="stayin"
            tabindex="4"
          />
        </div>

        <div class="form-buttons" key="4">
          <button
            id="switchbutton"
            @click="addingAccount = !addingAccount"
            tabindex="6"
          >
            {{ addingAccount ? "Sign in" : "Create Account" }}
          </button>
          <button id="gobutton" @click="goButton" tabindex="5">
            {{ addingAccount ? "Create Account" : "Sign In" }}
          </button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import misc_util from '../utility/misc_util';

export default {
  name: "btdLogin",
  data() {
    return {
      username: "",
      pwd: "",
      cpwd: "",
      addingAccount: false,
      stayin: false,
    };
  },
  computed: {
    ...mapState(["showWarning", "warning"])
  },
  methods: {
      ...mapMutations(["setWarning"]),
      ...mapActions(["createUser", "login"]),
    goButton() {
      this.addingAccount ? this.localCreateAccount() : this.localLogin();
    },
    async localCreateAccount() {
      if (this.username.length === 0) {
          this.setWarning({
            warning = "missing username",
            showWarning = true,
          })
        return;
      }
      if (this.cpwd !== this.pwd) {
          this.setWarning({
            warning = "passwords don't match",
            showWarning = true,
          })
        return;
      }
      const hpw = await misc_util.getHash(this.pwd);
      //   console.log("creating account with ", this.username, hpw);
      const payload = {
          username: this.username.toLowerCase(),
          hpw,
        stayin: this.stayin
      }
    this.createUser(payload);
    },
    async localLogin() {
      if (this.username.length === 0) {
          this.setWarning({
            warning = "missing username",
            showWarning = true,
          })
        return;
      }
      const hpw = await misc_util.getHash(this.pwd);
      const payload = {
          username: this.username.toLowerCase(),
          hpw,
        stayin: this.stayin
      }
    this.login(payload);
    },
  },
  mounted() {
    this.$refs.username.focus();
  },
};
</script>

<style>
#btd-login {
  max-width: 600px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
#login-form {
  display: flex;
  flex-direction: column;
  max-width: 600px;
  margin: auto;
}
.form-row {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-bottom: 10px;
  min-width: 350px;
}
/* .form-row > input {
  flex-grow: 1;
} */
.form-row-check {
  display: flex;
  position: relative;
  margin-bottom: 10px;
  min-width: 350px;
}
.form-buttons {
  display: flex;
  justify-content: space-between;
}

.formtrans-enter-from {
  transform: translateY(-50%) scaleY(0);
}
.formtrans-leave-to {
  opacity: 0;
}
/* .formtrans-leave-active, */
.formtrans-enter-active {
  transition: all 0.5s ease;
}
.formtrans-leave-active {
  position: absolute;
}
.formtrans-move {
  transition: transform 0.5s ease, opacity 0.05s ease;
}

.warning {
  display: flex;
  justify-content: center;
  color: red;
  margin-bottom: 15px;
  align-items: center;
}
.warning-icon {
  height: 30px;
}

.logo {
  max-width: 300px;
  margin: auto;
  margin-bottom: 30px;
}

#switchbutton {
  background-color: inherit;
  color: rgb(60, 60, 211);
  border-width: 0px;
}
#gobutton {
  font-size: 1.3rem;
  background-color: inherit;
  color: rgb(60, 60, 211);
  border-width: 0px;
  font-weight: bold;
}

.spacer {
  flex-grow: 1;
}
</style>
