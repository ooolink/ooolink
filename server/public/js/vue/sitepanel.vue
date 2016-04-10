<template>
	<div id="site-panel">
		<ul class="mod-show-list"></ul>
		<div class="biz-site-operate">
			<input class="lang-input-text" type="text" placeholder="站点名" v-model="siteName"/>
			<input class="lang-input-text" type="text" placeholder="站点英文名" v-model="siteEnName"/>
			<select v-model="siteType">
				<option value="blog">博客</option>
				<option value="bbs">论坛</option>
			</select>
			<select v-model="sitePluginType" v-on:change="changePluginType">
				<option value="plugin">插件</option>
				<option value="rss">rss</option>
				<option value="template">oooLink模板</option>
			</select>
			<div v-bind:style="pluginConfigDisplay">
				<input class="lang-input-test" type="text" placeholder="插件名(英文)" v-model="sitePluginName">
			</div>
			<div v-bind:style="rssConfigDisplay">
				<input class="lang-input-test" type="text" placeholder="rss源地址" v-model="siteRssURL">
			</div>
			<div v-bind:style="templateConfigDisplay">
				<input class="lang-input-test" type="text" placeholder="域名" v-model="siteDomain">
			</div>
			<input class="lang-input-text" type="text" placeholder="描述" v-model="siteDesc"/>
			<input class="lang-input-text" type="text" placeholder="图片URL" v-model="siteImage"/>
			<input class="lang-input-text" type="text" placeholder="主题(以逗号分隔)" v-model="siteThemes	"/>
			<div class="unit-checkbox-group">
				<label for="bsoi1">发布</label>
				<input id="bsoi1" type="checkbox" value="publish" v-model="siteFn"/>
				<label for="bsoi2">消息</label>
				<input id="bsoi2" type="checkbox" value="message" v-model="siteFn"/>
				<label for="bsoi3">用户系统</label>
				<input id="bsoi3" type="checkbox" value="user" v-model="siteFn"/>
			</div>
			<div class="lang-input-submit" type="submit" v-on:click="submit">添加</div>
		</div>
	</div>
</template>

<script>
import {setBody} from '../common/tool';
module.exports = {
	data() {
		return {	
			pluginConfigDisplay: {
				display: 'none'
			},
			rssConfigDisplay: {
				display: 'none'
			},
			templateConfigDisplay: {
				display: 'none'
			},
			siteName: '',
			siteDesc: '',
			siteImage: '',
			siteType: '',
			siteEnName: '',
			siteThemes: '',
			sitePluginType: '',
			siteFn: [],
			sitePluginName: '',
			siteDomain: '',
			siteRssURL: ''
		}
	},
	methods:{
		changePluginType(){
			['rss', 'template', 'plugin'].forEach(item=>this.$set(`${item}ConfigDisplay.display`, 'none'));
			this.$set(`${this.sitePluginType}ConfigDisplay.display`, 'block');
		},
		submit(){
			let body = {
				name: this.siteName,
				desc: this.siteDesc,
				image: this.siteImage,
				type: this.siteType,
				enname: this.siteEnName,
				themes: this.siteThemes,
				fn: this.siteFn.join(','),
				plugintype: this.sitePluginType,
				pluginname: this.sitePluginName,
				rssurl: this.siteRssURL,
				domain: this.siteDomain
			};

			fetch('/manager/site', {
				method: "POST",
       			headers: {
            		"Content-Type": "application/x-www-form-urlencoded"
        		},
        		body: setBody(body)	
        	});
		}
	}
}
</script>