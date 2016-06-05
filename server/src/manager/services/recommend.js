import Recommend from '../models/recommend';

export const setContentArtificial = function *(mixed_id, recommend_type, recommend_title){
    let rs = yield Recommend.upsert({
        mixed_id,
        recommend_type,
        recommend_title,
        recommend_created: new Date()
    });
    return rs;
}


export const getContentArtificial = function *(limit=5){
    let contents = yield Recommend.findAll({
        where: {
            recommend_type: 'content'
        },
        limit,
        order: 'recommend_created DESC'
    });

    return contents;
}

export const delContentArtificial = function *(mixed_id){
    let rs = yield Recommend.destroy({
        where: {
            recommend_type: 'content',
            mixed_id
        }
    });

    return rs;
}