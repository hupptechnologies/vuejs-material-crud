<template>
	<div class="page-container">
		<Layout>
			<form novalidate class="md-layout player-form" @submit.prevent="saveTeam">
				<md-card class="md-layout-item md-size-50 md-small-size-100">
			        <md-card-header>
			          	<div class="md-title">{{ isEdit ? 'Update' : 'Create'}} Team</div>
			        </md-card-header>
			        <md-card-content>
			        	<div class="md-layout md-gutter">
			        		<div class="md-layout-item md-small-size-100">
					            <md-field>
					                <label for="name">Team Name</label>
					                <md-input name="name" v-model="form.name" id="name" v-validate="'required'" />
					            </md-field>
					            <span class="error" v-show="errors.has('name')">{{ errors.first('name') }}</span>
					       	</div>
			        	</div>
			        </md-card-content>
			        <md-card-actions>
			        	<md-button to="/teams"  class="md-accent">Cancel</md-button>
			          	<md-button type="submit" class="md-primary">{{ isEdit ? 'Update' : 'Create'}} Team</md-button>
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
		name: 'Team',
		props: ['team'],
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
			saveTeam(){
				this.$validator.validate().then(result => {
			        if (result) {
			          	this.loading = true;
			          	if (this.isEdit) {
			          		this.updateTeam();
			          		return;
			          	}

			          	axios.post(this.$API_URL+`/team/store`, this.form, {
			          		"headers": {
			                    "Authorization": `Bearer ${this.$cookies.get('token')}`
			                }
			          	}).then(response => {
		                  	console.log('team res', response);
		                  	this.loading = false;
		                  	if (response.data.error == "false") {
		                  		Swal('Success', "Team created.", 'success').then(()=> {
		                  			this.$router.push('/teams');
		                  		});
		                  	}else{
		                  		Swal('Oops...', 'Something went wrong!', 'error');
		                  	}
		              	}).catch(e => {
		                	console.log('team err', e.message)
		                	this.loading = false;
		                	Swal('Oops...', 'Something went wrong!', 'error');
		              	})
			        }
			    });
			},
			updateTeam(){
				axios.post(this.$API_URL+`/team/update`, this.form, {
	          		"headers": {
	                    "Authorization": `Bearer ${this.$cookies.get('token')}`
	                }
	          	}).then(response => {
	              	console.log('team update res', response);
	              	this.loading = false;
	              	if (response.data.error == "false") {
	              		Swal('Success', "Team updated.", 'success').then(()=> {
	              			this.$router.push('/teams');
	              		});
	              	}else{
	              		Swal('Oops...', 'Something went wrong!', 'error');
	              	}
	          	}).catch(e => {
	            	console.log('team update err', e.message)
	            	this.loading = false;
	            	Swal('Oops...', 'Something went wrong!', 'error');
	          	})
			}
		},
		beforeMount(){
			console.log(this.team);
			if (this.team !== undefined) {
				this.isEdit = true;
				this.form = {
					name: this.team.name,
					team_id: this.team.id
				}
			}
		}
	}
</script>

<style lang="scss" src="../assets/styles/teams.scss" scoped></style>
