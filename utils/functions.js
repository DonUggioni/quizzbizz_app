// This function removes the word of the general category, for example: 'Entertainment: Comics' becomes 'Comics'
function removeGeneralCategory(str) {
  if (!str.includes(':')) return str;

  let formattedStr = str.split(':').slice(1);

  return formattedStr.join('').trim();
}

export { removeGeneralCategory };
