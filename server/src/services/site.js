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

export const siteGet = function *(){
		let site = this.params.site;
		let sites = yield Sites.findOne({
				where: {
						site_id: site
				}
		});
		this.body = {
				themes: String(sites.site_themes).split(','),
				conf: {
						fn: String(sites.site_fn).split(',')
				},
				desc: sites.site_desc,
				title: sites.site_name,
				image: sites.site_image
		}
};

export const siteThemesGet = function *(){
		let site = this.params.site;
		let sites = yield Sites.findOne({
				attributes: ['site_themes'],
				where: {
						site_id: site
				}
		});
		this.body = String(sites.site_themes).split(',');
};