export function setBody(obj){
		let str = '';
		for (let key in obj){
			 str += `${key}=${obj[key]}&`;
		}
		return str.substring(0, str.length - 1);
};