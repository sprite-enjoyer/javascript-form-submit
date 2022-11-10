const firstAndLastNameValidator = (text) => {
    let charcode;
    for(let i = 0; i < text.length; i++){
        charcode = text.charCodeAt(i);
        if(!(charcode >= 97 && charcode <= 122 || charcode >= 65 && charcode <= 90)){ 
            return false;
        }
    }
    return true;
}

const addressValidator = (text) => (text.length <= 35);