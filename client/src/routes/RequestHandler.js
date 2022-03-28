function getRequest (endpoint, params) {
    let endpointQuery = endpoint;
    if (params) {
        endpointQuery = endpointQuery + '?';
        Object.entries(params).forEach(([params,value]) => {
            endpointQuery += params + '=' + value + '&';
        });
    };
    console.log('ENDPOINT: ', endpointQuery);

    return new Promise((resolve,reject) => {
        return fetch(endpointQuery, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            if (!response.ok){
                reject(response);
            } else {
                return response;
            }
        })
        .then(response => response.json())
        .then(response => {
            resolve(response);
        })
        .catch(error => reject(error));
    });
};

const RequestHandler = {getRequest};

export default RequestHandler;