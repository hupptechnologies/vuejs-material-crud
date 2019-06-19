<template>
	<div class="page-container">
		<Layout>
			<div>
				<md-button class="md-primary" to="/player">
					<md-icon>add</md-icon> Add
				</md-button>
			</div>
			<md-table v-model="players" md-sort="name" md-sort-order="asc" md-card>
				<md-table-toolbar>
					<h1 class="md-title">Players</h1>
				</md-table-toolbar>

				<md-table-row slot="md-table-row" slot-scope="{ item }">
					<md-table-cell md-label="ID">{{ item.id }}</md-table-cell>
					<md-table-cell md-label="Avtar">
						<md-avatar>
							<img v-bind:src="item.avatar" alt="People">
						</md-avatar>
					</md-table-cell>
					<md-table-cell md-label="Name" md-sort-by="name">{{ item.first_name+' '+item.last_name }}</md-table-cell>
					<md-table-cell md-label="Email" md-sort-by="email">{{ item.email }}</md-table-cell>
					<md-table-cell md-label="Action">
						<md-button class="md-fab md-mini md-plain" @click="toPlayer(item)">
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
		name: 'Players',
		data() {
			return {
				players: []
			}
		},
		components:{
			Layout
		},
		methods: {
			toPlayer(player){
				this.$router.push({ name: 'Player', params: { player }});
			},
			getPlayers(){
				axios.get(this.$API_URL+`/api/users`, {
					"headers": {
						"Authorization": `Bearer ${this.$cookies.get('token')}`
					}
				}).then(response => {
					console.log('players list res', response);
					if (response.data.data) {
						this.players = response.data.data;
					}
				}).catch(e => {
					console.log('players list err', e.message)
				})
			}
		},
		beforeMount(){
			this.getPlayers();
		}
	}
</script>

<style lang="scss" src="../assets/styles/players.scss" scoped></style>
