<template>
	<panel></panel>
	<div id="app">
		<sitepanel></sitepanel>	
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

