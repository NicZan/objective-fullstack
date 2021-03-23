import apiConfig from '../config/api.js';
import axios from 'axios';

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    start() {
        return axios({
            method: 'GET',
            url: apiConfig.API_URL + 'api/v1/start',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods',
            }
        });
    },
    nextQuestion(body) {
        return axios({
            method: 'POST',
            url: apiConfig.API_URL + 'api/v1/next/question',
            data: body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods',
            }
        });
    },
    addQuestion(body) {
        return axios({
            method: 'POST',
            url: apiConfig.API_URL + 'api/v1/question',
            data: body,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, Access-Control-Allow-Methods',
            }
        });
    },
}