import axios from 'axios';

// export const fetchPost = async (endpoint, payload) => {
//   const data = await axios.post(`http://localhost:3001/${endpoint}`, payload);
//   console.log(`http://localhost:3001/${endpoint}`);
//   return data;
// };

// export const fetchGet = async (endpoint) => {
//   const data = await axios.get(`localhost:3001/${endpoint}`);
//   return data;
// };

// export const fetchPut = async (endpoint, payload) => {
//   const data = await axios.put(`localhost:3001/${endpoint}`, payload);
//   return data;
// };

const APIFetch = async (method, endpoint, payload) => {
  const path = `http://localhost:3001/${endpoint}`;
  switch (method) {
  case 'post':
  {
    const data = await axios.post(path, payload);
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
