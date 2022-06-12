const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: results } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, results, totalPages, currentPage };
  };

const getPagination = (page, size) => {
  const limit = size ? parseInt(size) : 5;
  const offset = page ? (+page - 1) * limit : 0;
  return { limit, offset };
  };

  module.exports = {getPagingData, getPagination}