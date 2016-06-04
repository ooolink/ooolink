var nodejieba = require("nodejieba");

nodejieba.load();

export function getKeyWords (title){
    let topN = title.length/2 > 16 ? 16 : Math.floor(title.length/2);
    let rs = nodejieba.extract(title, topN),
        kArr = [],
        vArr = [];

    rs.forEach(item=>{
        let arr = item.split(':');
        kArr.push(arr[0]);
        vArr.push(arr[1]);
    });

    return {
        keys: kArr,
        values: vArr
    }
}

export function cutForSearch(title){
    return nodejieba.cutForSearch(title);
}