export const validateName = (name) => {
  if (name !== '' && name.length >= 1) {
    return true;
  }
  return false;
};

export const validateEmail = (email) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (regex.test(email)) {
    return true;
  }
  return false;
};
