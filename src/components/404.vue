<template>
	<div class="page-container notfound">
		<div class="cont_principal" v-bind:class="{'cont_principal cont_error_active': hasClass}">
			<div class="cont_error">
				<h1>Oops</h1>  
			  	<p>The Page you're looking for isn't here.</p>
			</div>
			<div class="cont_aura_1"></div>
			<div class="cont_aura_2"></div>
		</div>
	</div>
</template>

<script type="text/javascript">
	export default {
		name: 'NotFound',
		data() {
			return {
				hasClass: false
			}
		},
		beforeMount(){
			setTimeout(()=> {
				this.hasClass = true;
			}, 600)
			// console.log('document', document.getElementsByClassName('.cont_principal').className);
			// document.getElementsByClassName('.cont_principal').className = "cont_principal cont_error_active";
		}
	}
</script>

<style lang="scss" src="../assets/styles/404.scss" scoped></style>