export const createPagination = (total: number, current: number) => {
  const maxVisiblePages = 4;
  const halfVisible = Math.floor(maxVisiblePages / 2);
  let startPage = Math.max(1, current - halfVisible);
  const endPage = Math.min(total, startPage + maxVisiblePages - 1);
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  const array: (number | string)[] = [];
  for (let i = startPage; i <= endPage; i++) {
    array.push(i);
  }
  if ((array[0] as number) > 1) {
    array.unshift(1);
  }
  if ((array[array.length - 1] as number) < total) {
    array.push(total);
  }
  // Add ellipsis if needed
  if ((array[1] as number) > 2) {
    array.splice(1, 0, "...");
  }
  if ((array[array.length - 2] as number) < total - 1) {
    array.splice(array.length - 1, 0, "...");
  }
  return array;
};
