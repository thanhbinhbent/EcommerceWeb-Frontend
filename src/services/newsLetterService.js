import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://127.0.0.1:3100';

const errorHandler = (err) => {
    console.log(err);
};

const newsLetterService = {
    postEmail: async (email) => {
        const response = await axios
            .post(`${serverUrl}/newsletters`, email)
            .catch(errorHandler);
        return response;
    },
};

export default newsLetterService;