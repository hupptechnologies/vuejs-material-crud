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
			          	<label>Name</label>
			          	<md-input v-model="register.name" autofocus v-validate="'required'" name="name"></md-input>
			        </md-field>
			        <span class="error" v-show="errors.has('name')">{{ errors.first('name') }}</span>

			        <md-field>
			          	<label>E-mail</label>
			          	<md-input v-model="register.email" v-validate="'required|email'" name="email"></md-input>
			        </md-field>
			        <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>

		        	<md-field md-has-password>
		          		<label>Password</label>
		          		<md-input v-model="register.password" type="password" v-validate="'required'" name="password" ref="password"></md-input>
		        	</md-field>
		        	<span class="error" v-show="errors.has('password')">{{ errors.first('password') }}</span>

		        	<md-field md-has-password>
		          		<label>Confirm Password</label>
		          		<md-input v-model="register.c_password" v-validate="'required|confirmed:password'" type="password" name="confirm-password"></md-input>
		        	</md-field>
		        	<span class="error" v-show="errors.has('confirm-password')">{{ errors.first('confirm-password') }}</span>
		      	</div>

		      	<div class="actions md-layout md-alignment-center-space-between">
		        	<router-link to="/">Already have an account.</router-link>
		        	<md-button class="md-raised md-primary" @click="auth">Register</md-button>
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
	  	name: 'Register',
	  	data() {
	  		return {
	  			register: {},
	  			loading: false
	  		}
	  	},
	  	methods: {
	  		auth() {
	  			this.$validator.validate().then(result => {
			        if (result) {
			          	this.loading = true;
			          	axios.post(this.$API_URL+`/register`, this.register).then(response => {
		                  	console.log('register res', response);
		                  	this.loading = false;
		                  	if (response.data.error == "false") {
		                  		this.$cookies.set('token', response.data.data.token);
		                  		this.$router.push('/players');
		                  	}else{
		                  		Swal('Oops...', 'Something went wrong!', 'error');
		                  	}
		              	}).catch(e => {
		                	console.log('login err', e.message)
		                	this.loading = false;
		                	Swal('Oops...', 'Something went wrong!', 'error');
		              	})
			        }else{
			        }
			    });
	  		}
	  	}
	}
</script>

<style lang="scss" src="../assets/styles/auth-screens.scss" scoped></style>