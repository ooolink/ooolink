export function shieldWord(word){
    let shieldsList = [
        'div'
    ];

    if (shieldsList.indexOf(word) === -1){
        return false;
    } else {
        return true;
    }
}