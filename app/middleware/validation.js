const Validator = require('validator')
const database=require('../../config/database');
const common = require('../../config/common');

var bypassMethod = new Array("signup", "login","userList","productAdd");

var validation = {

    /* API Validation */
    cheakValidation: (reqest, res, rules, message) => {
        const v = Validator.make(reqest, rules, message);
        if (v.fails()) {
            const errors = v.getErrors();
            var error = "";
            for (const element in errors) {
                error = errors[element][0];
                break;
            }
            response_data = {
                code: '0',
                message: error
            };
            res.status(200);
            res.json(response_data);
            return false;
        }
        else {
            return true;
        }
    },

    /* API Response */
    response: (req, res, code, message, data) => {
        var responsedata = {};
        if (data == null) {
            responsedata = {
                code: code,
                message: message,
            }
            res.status(200).send(responsedata);
        }
        else {
            responsedata = {
                code: code,
                message: message,
                data: data
            }
            res.status(200).send(responsedata);
        }
    },

    /* API Key */
    validateApiKey: (req, res, callback) => {
        var uniqendpoint = req.path.split('/');
        var bypass = new Array();

        if (bypass.includes(uniqendpoint[3])) {
            callback();
        } else {
            var api_key = (req.headers['api-key'] != undefined && req.headers['api-key'] != "") ? req.headers['api-key'] : '';
            if (api_key != "" && api_key == process.env.API_KEY) {
                callback();
            } else {
                responsedata = {
                    code: 401,
                    message: 'Invalid Api Key'
                }

                res.status(401).send(responsedata);
            }
        }
    },

    /* User Token */
    validateHeaderToken: async function (req, res, callback) {
        try {
            var path_data = req.path.split("/");
            if (bypassMethod.indexOf(path_data[3]) === -1) {
                if (req.headers['token'] && req.headers['token'] != '') {
                    let result = await common.jwtValidate(req?.headers?.['token']);
                    req.user_id = result?.data?.user_id;
                    req.user_type = result?.data?.user_type;
                    callback();
                } else {
                    response_data = { code: 401, message: 'Invalid Token' };
                    res.status(401);
                    res.json(response_data);
                }
            } else {
                callback();
            }
        } catch (e) {
            response_data = { code: 401, message: 'Invalid Token' };
            res.status(401);
            res.json(response_data);
        }
    },
}

module.exports = validation;