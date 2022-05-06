const convertDate = (date: any) => {
  return (date as Date).toLocaleString().replace("/", ".").split(",")[0];
};
export { convertDate };
