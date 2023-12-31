export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  if (str.length === 1) return str.toUpperCase();

  return str[0].toUpperCase() + str.substring(1);
};
