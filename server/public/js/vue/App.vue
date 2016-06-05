<template>
	<div id="app">
        <panel></panel>
        <div id="container">
		    <component :is="currentComponent"></component>
        </div>
	</div>
</template>

<script>
import panel from './panel.vue';
import sitepanel from './sitePanel.vue';
import recommendpanel from './recommendPanel.vue';

module.exports = {
	components: {
		panel,
		sitepanel,
        recommendpanel
	},
    data(){
        return {
            currentComponent: 'sitepanel'
        }
    },
    events: {
        'panel_choose_type': function(type){
            this.$set('currentComponent', `${type}panel`);
        }
    }
}
</script>

