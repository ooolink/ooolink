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

export const siteAdd = function *(name, desc, image, themes, fn, type, site_id, site_plugin, site_config){
		let sites = yield Sites.create({
				site_name: name,
				site_desc: desc,
				site_image: image,
				site_themes: themes,
				site_fn: fn,
				site_type: type,
				site_id,
				site_plugin,
				site_config
		});
		return sites;
};

export const siteFindAll = function *(){
		let sites = Sites.findAll();
		return sites;
}















