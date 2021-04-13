// axios , requst, postmanrequst, node fitch
const axios = require('axios');
const request = require('request');
const superagent = require('superagent');
const fetch = require('node-fetch');

const url = 'https://dog.ceo/api/breeds/image/random';

const getWithAxios = async () => {
    try {
        const response = await axios.get(url);
        console.log(response.data);
    } catch (err) {
        console.log(err);
    }
}

// getWithAxios();

// request(url, (err, respoonse) => {
//     console.log('error', err);
//     console.log('respoonse :', respoonse.body);
// })

// (async () => {
//     try {
//         const res = await superagent.get(url);
//         console.log('response : ',res.text);
//     } catch (err) {
//         console.error(err);
//     }
// })();

fetch(url)
    .then(res => res.json())
    .then(json => console.log(json));