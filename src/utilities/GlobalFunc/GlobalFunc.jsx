export const classnames = (classes) => {
  return Object.keys(classes)
    .filter((className) => classes[className])
    .join(" ");
};
