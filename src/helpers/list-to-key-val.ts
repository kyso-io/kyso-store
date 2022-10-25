export default (data: any) => {
  return data.reduce((prev: any, curr: any) => {
    prev[curr.id!] = curr;
    return prev;
  }, {} as object);
};
