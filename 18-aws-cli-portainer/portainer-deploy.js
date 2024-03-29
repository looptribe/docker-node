#!/usr/bin/env node

const {promises: fs} = require('fs');
const process = require('process');

const PORTAINER_ACCESS_TOKEN = process.env.PORTAINER_ACCESS_TOKEN;
const PORTAINER_API_URL = process.env.PORTAINER_API_URL;
const PORTAINER_STACK_NAME = process.env.PORTAINER_STACK_NAME || '';
const PORTAINER_STACK_FILE = process.env.PORTAINER_STACK_FILE || 'stack.yml';

const callApi = (url, options = {}) => {
    return fetch(PORTAINER_API_URL + url, {...options, headers: {...options.headers, 'X-API-Key': PORTAINER_ACCESS_TOKEN}}).then(async (x) => {
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
    if (!PORTAINER_STACK_NAME) {
        console.error('Environment variable PORTAINER_STACK_NAME not set');
        process.exit(1);
    }
    if (!PORTAINER_API_URL) {
        console.error('Environment variable PORTAINER_API_URL not set');
        process.exit(1);
    }
    if (!PORTAINER_ACCESS_TOKEN) {
        console.error('Environment variable PORTAINER_ACCESS_TOKEN not set');
        process.exit(1);
    }

    const stackFile = (await fs.readFile(PORTAINER_STACK_FILE)).toString('utf8');

    console.log('Finding stack...');
    const stacks = await portainerGet(`/stacks`);
    const PORTAINER_STACK_ID = stacks.find((s) => s.Name === PORTAINER_STACK_NAME)?.Id;
    if (!PORTAINER_STACK_ID) {
        console.error(`Cannot find stack with name "${PORTAINER_STACK_NAME}"`);
        process.exit(1);
    }
    console.log(`Found stack_id=${PORTAINER_STACK_ID}`)
    console.log('Retrieving stack info...');
    const stackInfo = await portainerGet(`/stacks/${PORTAINER_STACK_ID}`);
    console.log('Publishing new stack...');
    const result = await portainerPut(`/stacks/${PORTAINER_STACK_ID}?endpointId=${stackInfo.EndpointId}`, {
        env: stackInfo.Env,
        prune: true,
        pullImage: true,
        stackFileContent: stackFile,
    });
    console.log(result);
};

deploy();
