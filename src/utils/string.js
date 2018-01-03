export const capitalize = (s) => (s.slice(0, 1).toUpperCase() + s.slice(1));

export const titleize = (s) => (
  s.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  })
);
