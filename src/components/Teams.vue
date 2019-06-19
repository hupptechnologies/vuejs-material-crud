<template>
	<div class="page-container">
		<Layout>
			<div>
				<md-button class="md-primary" to="/team">
			    	<md-icon>add</md-icon> Add
				</md-button>
			</div>
			<md-table v-model="teams" md-sort="name" md-sort-order="asc" md-card>
	        	<md-table-toolbar>
    				<h1 class="md-title">Teams</h1>
  				</md-table-toolbar>

  				<md-table-row slot="md-table-row" slot-scope="{ item }">
			        <md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
			        <md-table-cell md-label="Name" md-sort-by="name">{{ item.name }}</md-table-cell>
			        <md-table-cell md-label="Created At" md-sort-by="email">{{ item.created_at }}</md-table-cell>
			        <md-table-cell md-label="Action">
			        	<md-button class="md-fab md-mini md-plain" @click="toTeam(item)">
				        	<md-icon>edit</md-icon>
				      	</md-button>
			        </md-table-cell>
			    </md-table-row>
	        </md-table>
		</Layout>
	</div>
</template>

<script type="text/javascript">
	import axios from 'axios';
	import Layout from './Partials/Layout';

	export default {
		name: "Teams",
		data() {
			return {
				teams: []
			}
		},
		components: {
			Layout
		},
		methods: {
			toTeam(team){
				this.$router.push({ name: 'Team', params: { team }});
			},
			getTeams(){
				this.loading = true;
				axios.get(this.$API_URL+`/team/list`, {
					"headers": {
	                    "Authorization": `Bearer ${this.$cookies.get('token')}`
	                }
				}).then(response => {
                  	// console.log('team list res', response);
                  	this.loading = false;
                  	if (response.data.error == "false") {
                  		this.teams = response.data.data;
                  	}
              	}).catch(e => {
                	console.log('team list err', e.message)
                	this.loading = false;
              	})
			}
		},
		beforeMount(){
			this.getTeams();
		}
	}
</script>

<style lang="scss" src="../assets/styles/teams.scss" scoped></style>