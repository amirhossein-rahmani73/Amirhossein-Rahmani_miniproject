const setCookie = (token) => {
  document.cookie = `token=${token.token}`;
};

const getCookie = () => {
  return document.cookie.split("=")[1];
};

export { setCookie, getCookie };
