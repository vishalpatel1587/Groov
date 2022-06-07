export const validateName = (name: string): boolean => {
  return name !== "" && name.length >= 1;
};

export const validateEmail = (email: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};
