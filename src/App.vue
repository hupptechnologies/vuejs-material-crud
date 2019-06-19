<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App',
    }
</script>

<style type="text/css">
	body{
		height: 100% !important;
	}
	#app{
		height: 100%;
	}
	.error{
		color: #c71111;
	}
	.loading-overlay {
	    z-index: 10;
	    top: 0;
	    left: 0;
	    right: 0;
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    background: rgba(255, 255, 255, 0.9);
	    display: flex;
	    align-items: center;
	    justify-content: center;
  	}
  	.page-container {
		height: 100%;
	}
</style>