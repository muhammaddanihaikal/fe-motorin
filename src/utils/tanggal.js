export const formatTanggal = (tanggal) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Date(tanggal).toLocaleDateString("id-ID", options);
};
