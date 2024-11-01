export const authenticateUser = async (req, res, next) => {
  console.log('authenticated user');
  next();
};
