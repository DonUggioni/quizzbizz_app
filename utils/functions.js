import axios from 'axios';

// This function removes the word of the general category, for example: 'Entertainment: Comics' becomes 'Comics'
function removeGeneralCategory(str) {
  if (!str?.includes(':')) return str;

  let formattedStr = str.split(':').slice(1);

  return formattedStr.join('').trim();
}

// This function shuffles the answers that come from the API
function shuffleArray(array) {
  // Using Fisher-Yates algorithm to shuffle the array in-place
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// This function gets the data from the open trivia Database
async function getData(endpoint, params) {
  try {
    const response = await axios.get(`https://opentdb.com/${endpoint}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Calculates the percentage of correct answers, takes in the number of correct answers and total number of questions.
function calculatePercentage(correctAnswers, totalNumOfQuestions) {
  const percentage = (correctAnswers / totalNumOfQuestions) * 100;
  return Math.floor(percentage);
}

///////////////////////////////////////
function capitalizeFirstChar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// This function is calculating the average percentage of correct answers
function calculateAveragePercentage(correctAnswers, wrongAnswers) {
  if (correctAnswers === 0 && wrongAnswers === 0) return 0;

  const totalQuestions = Number(correctAnswers) + Number(wrongAnswers);
  const averageCorrect = (Number(correctAnswers) / totalQuestions) * 100;

  return averageCorrect.toFixed(1);
}

// This function is being used to generate a random username upon sign up.
function generateRandomUsername() {
  const prefix = 'Quizer';
  const randomNumber = Math.floor(Math.random() * 1000000);
  const randomString = randomNumber.toString().padStart(6, '0');
  const result = prefix + randomString;
  return result;
}

// A funtion to 'translate' some of the error that might come from firebase during authentication
function translateFirebaseError(err) {
  switch (err) {
    case 'Firebase: Error (auth/invalid-email).':
      return 'Invalid email address.';
    case 'Firebase: Error (auth/wrong-password).':
      return 'Invalid password.';
    case 'Firebase: Error (auth/user-not-found).':
      return 'User not found.';
    case 'Firebase: Error (auth/email-already-exists).':
      return 'The provided email is already in use by an existing user.';
    case 'Firebase: Error (auth/missing-password).':
      return 'Password cannot be empty.';
    case 'Firebase: Error (auth/email-already-in-use).':
      return 'This email address is already in use.';
    default:
      return err ? err : 'Check your credentials and try again.';
  }
}

export {
  removeGeneralCategory,
  shuffleArray,
  getData,
  calculatePercentage,
  capitalizeFirstChar,
  calculateAveragePercentage,
  generateRandomUsername,
  translateFirebaseError,
};
