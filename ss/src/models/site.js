/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let configSchema = new Schema({
	config_plugin: String,
	config_period: {type: Number, default: 0},
	config_flow: Array,
	config_native: String
});

let quantitySchema = new Schema({
	site_status: {type: Number, default: 3},			//normal interrupted cease destroy
	content_count: {type: Number, default: 0},
	site_quantity: {type: Number, default: 0},
	growth_reate: {type: Number, default: 0},
	fetch_count: {type: Number, default: 0},
	fetch_error_count: {type: Number, default: 0},
	fetch_avetime: {type: Number, default: 0},
	flow_avetime: {type: Number, default: 0}
});

let siteSchema = new Schema({
	site_id: String,
	fetch_type: String,
    fetch_plugin: String,
    fetch_address: String,
 	fetch_adapter: String,
 	config: configSchema,
 	quantity: quantitySchema,
 	created: {type: Date, default: Date.now},
 	updated: {type: Date, default: Date.now}
});

mongoose.model('Site', siteSchema);