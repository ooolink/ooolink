/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
"use strict";
import Sites from '../models/sites';

export const siteAdd = function *(){
		let {name, desc, image, themes, fn, type, plugintype, enname} = this.request.body.fields;
		let site_id, site_plugin;
		switch (plugintype){
				case "plugin": 
						site_id = enname + '-' + this.request.body.fields.pluginname;
						site_plugin = JSON.stringify({
								type: 'plugin',
								name: site_id
						});
						site_config = JSON.stringify({
								pluginname: this.request.body.fields.pluginname
						});
						break;
				case "rss": 
					  site_id = enname + '-' + type;
					  site_plugin = JSON.stringify({
					  		type: 'rss',
					  		name: site_id
					  });  
					  site_config = JSON.stringify({
					  		rssURL: this.request.body.fields.rssurl
					  });
					  break;
				case "template": 
						site_id = enname + '-' + type;
						site_plugin = JSON.stringify({
								type: 'template',
								name: site_id + '-' + 'cnode' 
						});
						site_config = JSON.stringify({
								domain: this.request.body.fields.domain
						});
						break;
		}
		yield Sites.create({
				site_name: name,
				site_desc: desc,
				site_image: image,
				site_themes: themes,
				site_fn: fn,
				site_type: type,
				site_id,
				site_plugin,
				site_config
		}).then(site=> {
				this.body = {result: 1};
		}, error=> {
				console.error('Error   ' + error)
				this.status = 500;
				this.body = {result: 0};
		});
};

export const siteFindAll = function *(){
		let sites = Sites.findAll();
		this.body = {
				result: 1,
				sites
		};
}