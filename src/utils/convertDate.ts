const convertDate = (date: Date | undefined) => {
  let year, month, day;
  if (date) {
    year = date.getFullYear();
    month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  }
  return date ? day + "." + month + "." + year : "unknown";
};
const convertDateToComponent = (date: Date | undefined) => {
  let year, month, day;
  if (date) {
    year = date.getFullYear();
    month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  }
  return date ? year + "-" + month + "-" + day : "2022-06-15";
};
const compareDate = (a: Date, b: Date) => a.getTime() - b.getTime();

export { convertDate, compareDate, convertDateToComponent };
