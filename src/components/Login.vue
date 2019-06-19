<template>
  	<div class="login-page">
    	<div class="centered-container">
		    <md-content class="md-elevation-3">
		      	<div class="title">
			        <img src="https://vuematerial.io/assets/logo-color.png">
			        <div class="md-title">Vue Material</div>
			        <div class="md-body-1">Build beautiful apps with Material Design and Vue.js</div>
		      	</div>

		      	<div class="form">
			        <md-field>
			          	<label>E-mail</label>
			          	<md-input v-model="login.email" autofocus v-validate="'required|email'" name="email"></md-input>
			        </md-field>
			        <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>

		        	<md-field md-has-password>
		          		<label>Password</label>
		          		<md-input v-model="login.password" v-validate="'required'" name="password" type="password"></md-input>
		        	</md-field>
		        	<span class="error" v-show="errors.has('password')">{{ errors.first('password') }}</span>

		      	</div>

		      	<div class="actions md-layout md-alignment-center-space-between">
		        	<router-link to="/register">Register here</router-link>
		        	<md-button class="md-raised md-primary" @click="auth">Log in</md-button>
		      	</div>

		      	<div class="loading-overlay" v-if="loading">
		        	<md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
		      	</div>

		    </md-content>
		    <div class="background" /></div>
		</div>
  	</div>
</template>

<script>
	import axios from 'axios';
	import Swal from 'sweetalert2';

	export default {
	  	name: 'Login',
	  	data() {
	  		return {
	  			login: {},
	  			loading: false
	  		}
	  	},
	  	methods: {
	  		auth() {
	  			this.$validator.validate().then(result => {
			        if (result) {
			          	this.loading = true;
			          	axios.post(this.$API_URL+`/api/login`, this.login).then(response => {
		                  	console.log('login res', response);
		                  	this.loading = false;
		                  	this.$cookies.set('token', response.data.token);
		                  	this.$router.push('/players');
		              	}).catch(e => {
		                	console.log('login err', e.response)
		                	this.loading = false;
		                	Swal('Oops...', `${e.response.data.error ? e.response.data.error: 'Something went wrong!'}`, 'error');
		              	})
			        }else{
			        }
			    });
	  		}
	  	}
	}
</script>

<style lang="scss" src="../assets/styles/auth-screens.scss" scoped></style>

