export const formatDate = date => {
  // console.log("%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^", date);
  var date = new Date(date);
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();
  let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  hours = hours < 10 ? "0" + hours : hours;
  let minutes =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }
  return (date = dd + "/" + mm + "/" + yyyy + " " + hours + ":" + minutes);
};
