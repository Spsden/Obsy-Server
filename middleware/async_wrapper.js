const asyncWrapper = (callBack) => {
  return async (req, res, next) => {
    try {
      await callBack(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

module.exports = asyncWrapper;
