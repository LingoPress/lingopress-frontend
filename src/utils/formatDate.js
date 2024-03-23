export default function (date) {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
}