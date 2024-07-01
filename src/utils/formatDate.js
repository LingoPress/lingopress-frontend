export default function (date) {
  if (!date) return;
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
}
