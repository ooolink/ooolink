<template>
	<div id="app">
        <panel></panel>
        <div id="container">
		    <sitepanel></sitepanel>	
        </div>
	</div>
</template>

<script>
import panel from './panel.vue';
import sitepanel from './sitePanel.vue';

module.exports = {
	components: {
		panel,
		sitepanel
	}
}
</script>

