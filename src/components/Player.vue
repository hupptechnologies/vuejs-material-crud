<template>
	<div class="page-container">
		<Layout>
			<form novalidate class="md-layout player-form" @submit.prevent="savePlayer">
				<md-card class="md-layout-item md-size-50 md-small-size-100">
			        <md-card-header>
			          	<div class="md-title">{{ isEdit ? 'Update' : 'Create'}} Player</div>
			        </md-card-header>
			        <md-card-content>
			        	<div class="md-layout md-gutter">
			        		<div class="md-layout-item md-small-size-100">
					            <md-field>
					                <label for="firstname">First Name</label>
					                <md-input name="firstname" v-model="form.first_name" id="firstname" v-validate="'required'" />
					            </md-field>
					            <span class="error" v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
					       	</div>
					       	<div class="md-layout-item md-small-size-100">
					            <md-field>
					                <label for="lastname">Last Name</label>
					                <md-input name="lastname" v-model="form.last_name" id="lastname" v-validate="'required'" />
					            </md-field>
					            <span class="error" v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
					       	</div>
			        	</div>
			        	<div class="md-layout md-gutter">
			        		<div class="md-layout-item md-small-size-100">
					            <md-field>
					                <label for="email">Email</label>
					                <md-input name="email" v-model="form.email" id="email" v-validate="'required|email'" />
					            </md-field>
					            <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
					       	</div>
					       	<div class="md-layout-item md-small-size-100">
					            <md-field>
					                <label for="gender">Gender</label>
					                <md-select v-model="form.gender" v-validate="'required'" name="gender" id="gender">
								        <md-option value="male">Male</md-option>
								        <md-option value="female">Female</md-option>
								    </md-select>
					            </md-field>
					            <span class="error" v-show="errors.has('gender')">{{ errors.first('gender') }}</span>
					       	</div>
			        	</div>
			        </md-card-content>
			        <md-card-actions>
			        	<md-button to="/players"  class="md-accent">Cancel</md-button>
			          	<md-button type="submit" class="md-primary">{{ isEdit ? 'Update' : 'Create'}} user</md-button>
			        </md-card-actions>

			        <div class="loading-overlay" v-if="loading">
			        	<md-progress-spinner md-mode="indeterminate" :md-stroke="2"></md-progress-spinner>
			      	</div>
			    </md-card>
			</form>
		</Layout>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios';
	import Swal from 'sweetalert2';
	import Layout from './Partials/Layout'

	export default {
		name: 'Player',
		props: ['player'],
		data() {
			return {
				isEdit: false,
				form: {},
				loading: false
			}
		},
		components:{
	        Layout
    	},
		methods: {
			savePlayer(){
				this.$validator.validate().then(result => {
			        if (result) {
			        	this.loading = true;
			        	if (this.isEdit) {
			        		this.updatePlayer();
			        		return;
			        	}

			          	axios.post(this.$API_URL+`/player/store`, this.form, {
			          		"headers": {
			                    "Authorization": `Bearer ${this.$cookies.get('token')}`
			                }
			          	}).then(response => {
		                  	console.log('player res', response);
		                  	this.loading = false;
		                  	if (response.data.error == "false") {
		                  		Swal('Success', "Player created.", 'success').then(()=> {
		                  			this.$router.push('/players');
		                  		});
		                  	}else{
		                  		Swal('Oops...', 'Something went wrong!', 'error');
		                  	}
		              	}).catch(e => {
		                	console.log('player err', e.message)
		                	this.loading = false;
		                	Swal('Oops...', 'Something went wrong!', 'error');
		              	})
			        }
			    });
			},
			updatePlayer(){
				console.log(this.form);
				axios.post(this.$API_URL+`/player/update`, this.form, {
	          		"headers": {
	                    "Authorization": `Bearer ${this.$cookies.get('token')}`
	                }
	          	}).then(response => {
                  	// console.log('player update res', response);
                  	this.loading = false;
                  	if (response.data.error == "false") {
                  		Swal('Success', "Player updated.", 'success').then(()=> {
                  			this.$router.push('/players');
                  		});
                  	}else{
                  		Swal('Oops...', 'Something went wrong!', 'error');
                  	}
              	}).catch(e => {
                	console.log('player update err', e.message)
                	this.loading = false;
                	Swal('Oops...', 'Something went wrong!', 'error');
              	})
			}
		},
		beforeMount(){
			if (this.player !== undefined) {
				this.isEdit = true;
				this.form = {
					first_name: this.player.first_name,
					last_name: this.player.last_name,
					email: this.player.email,
					gender: this.player.gender,
					player_id: this.player.id
				}
			}
		}
	}
</script>

<style lang="scss" src="../assets/styles/players.scss" scoped></style>
