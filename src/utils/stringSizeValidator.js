export const stringSizeValidator = (text = '') => {
  if (text.split(' ').length > 100 || text.length > 1000) {
    return false;
  }
  return true;
};
