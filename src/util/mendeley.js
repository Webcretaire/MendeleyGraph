let sdk = require('@mendeley/api');
let api;

export const isLoggedIn = () => typeof api !== 'undefined' && api !== null;

export const login = () => {
    api = sdk({
        authFlow: sdk.Auth.implicitGrantFlow({
            clientId: process.env.VUE_APP_MENDELEY_APP_ID
        })
    });
};

export const listDocuments = () => api.documents.list({limit: 500});

export default {isLoggedIn, login, listDocuments};