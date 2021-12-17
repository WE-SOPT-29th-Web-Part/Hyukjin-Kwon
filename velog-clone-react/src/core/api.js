import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const imageApi = axios.create({
  baseURL: 'http://localhost:5000/api/image',
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

export const getArticle = async () => {
  try {
    const result = await api.get('/article');
    const { data } = result;

    return data;
  } catch (error) {
    throw new Error('Failed to get Article.');
  }
};

export const getSeries = async () => {
  try {
    const result = await api.get('/article');
    const { data } = result;

    return data;
  } catch (error) {
    throw new Error('Failed to get Series.');
  }
};

export const postArticle = async (articleData) => {
  try {
    await api.post('/article', {
      ...articleData,
    });
  } catch (error) {
    throw new Error('Failed to Post Article.');
  }
};
