const convertDate = (date: any) => {
  return (date as Date).toLocaleString().replace("/", ".").split(",")[0];
};

const compareDate = (a: Date, b: Date) => a.getTime() - b.getTime();

export { convertDate, compareDate };