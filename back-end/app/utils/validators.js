exports.validateParams = (params) => {   //accept object or params
    if(params === null || params === undefined){
        return;
    }

    Object.entries(params).map((item) => {
        if(item[1] === null || item[1] === undefined){
            throw new Error(item[0] + " not found");
        }
    });
};

exports.notEmpty = (params) => {   //accept object or params
    if(params === null || params === undefined){
        return;
    }

    Object.entries(params).map((item) => {
        if(item[1] === null || item[1] === undefined || item[1] === ""){
            throw new Error(item[0] + " not found");
        }
    });
};

exports.validateBoolean = (param) => {   //accept object or params
    Object.entries(param).map((item) => {
        if(typeof item[1] !== "boolean"){
            throw new Error(item[0] + " = '"+item[1]+"' is an invalid boolean.");
        }
    });
};

exports.validateNumber = (param) => {   //accept object or params
    Object.entries(param).map((item) => {
        if(typeof item[1] !== "number" || !(!isNaN(parseFloat(item[1])) && isFinite(item[1]))){
            throw new Error(item[0] + " = '"+item[1]+"' is not a number.");
        }
    });
};

exports.validateEmail = (param) => {   //accept object or params
    Object.entries(param).map((item) => {
        if(!dataUtils.getEmailRegex().test(item[1])){
            throw new Error(item[0] + " = '"+item[1]+"' não é um email válido.");
        }
    });
};

exports.validateDate = (param) => {   //accept object or params
    Object.entries(param).map((item) => {
        if(isNaN(new Date(item[1]).getTime())){
            throw new Error(item[0] + " = '"+item[1]+"' não é uma data válida.");
        }
    });
};

exports.applyValidators = (validators) => {   //accept object or params
    if(validators === null || validators === undefined){
        return;
    }

    validators.map(item => {
        if(Object.keys(item)[0] === "params"){
            exports.validateParams(item.params);
        }else if(Object.keys(item)[0] === "boolean"){
            exports.validateBoolean(item.boolean);
        }else if(Object.keys(item)[0] === "number"){
            exports.validateNumber(item.number);
        }else if(Object.keys(item)[0] === "email"){
            exports.validateEmail(item.email);
        }else if(Object.keys(item)[0] === "date"){
            exports.validateDate(item.date);
        }
    });
};
