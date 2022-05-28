const convertDate = (date: Date | undefined) => {
  let year, month, day;
  if (date) {
    year = date.getFullYear();
    month = date.getMonth();
    day = date.getDay();
  }
  return date ? day + "." + month + "." + year : "unknown";
};

const compareDate = (a: Date, b: Date) => a.getTime() - b.getTime();

export { convertDate, compareDate };
