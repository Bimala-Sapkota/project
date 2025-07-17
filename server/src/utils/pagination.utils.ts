export const getPagination = (
  totalData: number,
  perPage: number,
  currentPage: number
) => {
  // total data is 12 and per page is 10 while calculating it  using floor .2 value will be missing
  //   so we use ceil becoz ceil round up the data so that data loss cannot be occure while using it

  //floor xa vane 1.2 ->1
  // ceil xa vane 1.2 change to 2

  const totalPages = Math.ceil(totalData / perPage);
  const nextPage = totalPages > currentPage ? currentPage + 1 : currentPage;
  const previousPage = currentPage > 1 ? currentPage - 1 : 1;

  return {
    totalData,
    totalPages,
    nextPage,
    previousPage,
    hasNextPage: totalPages > currentPage,
    hasPreviousPage: currentPage > 1,
  };
};
