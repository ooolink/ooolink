//请求形式校验 delete/put
export const methodAuth = method => {
    return function*(next) {
        if (this.request.body.fields._method === method) {
            if (next){
                yield next;
            } else {
                return true;
            }
        } else {
            throw new Error('methodAuth checkError 500');
        }
    }
};

//参数空校验
export const blankAuth = (query, body, params) => {
    return function*(next) {
        if ((query && query.filter(p => !!this.query[p]).length !== query.length) ||
            (body && body.filter(b => !!this.request.body.fields[b]).length !== body.length) ||
            (params && params.filter(p => !!this.params[p]).length !== params.length)) {
            throw new Error('blankAuth checkError 500');
        }
        if (next){
            yield next;
        } else {
            return true;
        }
    }
}