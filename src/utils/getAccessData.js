const getAccessData = () => {
  const verify = window.localStorage.getItem('verify');
  const accessToken = window.localStorage.getItem('accessToken');
  const refreshToken = window.localStorage.getItem('refreshToken');

  return { verify, accessToken, refreshToken };
};

export default getAccessData;
