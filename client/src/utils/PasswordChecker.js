const passwordVerify = (password) => {
  return !!String(password).match(
    "S*(S*([a-zA-Z]S*[0-9])|([0-9]S*[a-zA-Z]))S*"
  );
};

export { passwordVerify };
