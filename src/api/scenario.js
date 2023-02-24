import axios from "axios";

// Change the API endpoint to current target.
// NOTE: This API and resource is mapped to local_server
const LOCAL_API = 'http://localhost:4000';
const RESOURCE = '/scenario';

// catch block is handled by useMutation's onError
const registerScenario = async (scenario) => {
    return await axios
        .post(LOCAL_API + RESOURCE, scenario)
        .then(res => res.data)
}

export { registerScenario }