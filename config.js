const API_BASE_URL = 'https://0xpi7fggnh.execute-api.us-east-1.amazonaws.com/dev';

export const API_URLS = {
    getAllItems: () => `${API_BASE_URL}/items`,
    getItem: (id) => `${API_BASE_URL}/items/${id}`,
    updateItem: (id) => `${API_BASE_URL}/items/${id}`,
    deleteItem: (id) => `${API_BASE_URL}/items/${id}`,
    createItem: () => `${API_BASE_URL}/items`,
    subscribe: () => `${API_BASE_URL}/subscribe`
};

export default API_URLS;

// Deploy Amplify
// aws amplify start-job --app-id d2ev2ax99h35b --branch-name main --job-type RELEASE 