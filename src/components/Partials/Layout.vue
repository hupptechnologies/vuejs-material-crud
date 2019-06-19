<template>
	<div class="layout">
		<md-app md-waterfall md-mode="fixed">
			<md-app-toolbar class="md-primary">
				<md-button class="md-icon-button md-primary toggle-button" @click="showNavigation = !showNavigation">
			        <md-icon>menu</md-icon>
			   	</md-button>
	        	<span class="md-title" style="flex: 1">Vue Material</span>
	        	<md-button class="md-icon-button" @click="logout">
        			<md-icon>power_settings_new</md-icon>
      			</md-button>
	      	</md-app-toolbar>
	      	
	      	<md-app-drawer md-permanent="clipped" :md-active.sync="showNavigation">
		        <md-toolbar class="md-transparent" md-elevation="0">
		          Navigation
		        </md-toolbar>

		        <md-list class="menu-list">
		        	<router-link to="/players">
		          		<md-list-item class="menu-item" >
		            		<md-icon>people_outline</md-icon>
		            		<span class="md-list-item-text">Players</span>
		          		</md-list-item>
	          		</router-link>

	          		<router-link to="/teams">
		          		<md-list-item class="menu-item">
		            		<md-icon>people</md-icon>
		           			<span class="md-list-item-text">Teams</span>
		          		</md-list-item>
		          	</router-link>
		        </md-list>
	      	</md-app-drawer>

	      	<md-app-content>
	      		<slot></slot>
	     	</md-app-content>
	    </md-app>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'Layout',
		data() {
			return {
				showNavigation: false
			}
		},
		methods: {
			logout(){
				this.$cookies.remove('token');
		        this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss" src="../../assets/styles/layout.scss" scoped></style>
