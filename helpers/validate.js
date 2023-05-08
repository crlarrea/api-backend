const validator = require("validator");

const validateForm = (params) => {
    
    const validateEmail = !validator.isEmpty(params.email) || 
                            !validator.isEmail(params.email);

    if(!validateEmail){
        throw new Error("API: failed to validate form fields.");
    }
}

module.exports = {
    validateForm
}