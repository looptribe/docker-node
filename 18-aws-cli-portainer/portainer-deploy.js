#!/usr/bin/env node

const {promises: fs} = require('fs');
const process = require('process');

const API_KEY = process.env.PORTAINER_ACCESS_TOKEN;
const API_URL = process.env.PORTAINER_URL || 'https://portainer.looptribe.com/api';
const STACK_ID = Number(process.env.PORTAINER_STACK_ID) || 0;
const STACK_FILE = 'stack.yml';

const callApi = (url, options = {}) => {
    return fetch(API_URL + url, {...options, headers: {...options.headers, 'X-API-Key': API_KEY}}).then(async (x) => {
        if (x.ok) {
            return x.json();
        } else {
            console.error(`URL: ${url} - HTTP error ${x.status} ${x.statusText}`);
            const body = await x.text();
            throw new Error(body);
        }
    });
};

const portainerGet = callApi;
const portainerPut = (url, data, options = {}) => callApi(url, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'},
    ...options,
});

const deploy = async () => {
    if (!STACK_ID) {
        console.error('Environment variable PORTAINER_STACK_ID not set');
        process.exit(1);
    }
    if (!API_KEY) {
        console.error('Environment variable PORTAINER_ACCESS_TOKEN not set');
        process.exit(1);
    }

    const stackFile = (await fs.readFile(STACK_FILE)).toString('utf8');

    console.log('Retrieving stack info...');
    const stackInfo = await portainerGet(`/stacks/${STACK_ID}`);
    console.log('Publishing new stack...');
    const result = await portainerPut(`/stacks/${STACK_ID}?endpointId=${stackInfo.EndpointId}`, {
        env: stackInfo.Env,
        pullImage: true,
        stackFileContent: stackFile,
    });
    console.log(result);
};

deploy();
