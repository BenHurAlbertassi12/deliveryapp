import axios from 'axios';

const APIFetch = async (method, endpoint, payload, headers = '') => {
  const path = `http://localhost:3001/${endpoint}`;
  switch (method) {
  case 'post':
  {
    const data = await axios.post(path, payload, headers);
    return data;
  }
  case 'put':
  {
    const data = await axios.put(path, payload);
    return data;
  }

  default: {
    const data = await axios.get(path);
    return data;
  }
  }
};

export default APIFetch;
