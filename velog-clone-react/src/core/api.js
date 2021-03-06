import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000',
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
    const result = await api.get('/series');
    const { data } = result;

    return data;
  } catch (error) {
    throw new Error('Failed to get Series.');
  }
};

export const postArticle = async (articleData) => {
  const today = new Date().toLocaleDateString('ko-kr')
    .replace('.', '년')
    .replace('.', '월')
    .replace('.', '일');
  try {
    await api.post('/article', {
      ...articleData,
      date: today,
    });
  } catch (error) {
    throw new Error('Failed to Post Article.');
  }
};
