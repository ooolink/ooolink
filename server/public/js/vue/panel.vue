<template>
	<div id="panel">
		<ul class="mod-select-list">
            <li id='lang-logo'>oooLink Admin</li>
			<li>root管理</li>
			<li v-on:click="choose('recommend')">推荐管理</li>
            <li v-on:click="choose('site')">站点管理</li>
			<li v-on:click="choose('message')">消息管理</li>
		</ul>
	</div>
</template>

<script>

module.exports={
    methods:{
        choose: function(type){
            this.$dispatch('panel_choose_type', type);
        }
    }
}
</script>