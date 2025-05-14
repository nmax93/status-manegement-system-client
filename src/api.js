import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export const uploadEmployee = async (file, name, status) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('name', name);
  formData.append('status', status);

  const res = await api.post('/employees/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};

export default api;
