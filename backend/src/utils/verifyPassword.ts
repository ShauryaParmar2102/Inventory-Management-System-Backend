import bcrypt from 'bcrypt';
import CustomError from '../errors/customError.js';

// VERIFY PASSWORD
// Checks whether the password entered by the user matches the hashed password
const verifyPassword = async (password: string, hashedPassword: string) => {

     // Compare the plain-text password with the hashed password from the database
    // bcrypt.compare returns true if they match and false if they do not
  const matchedPassword = await bcrypt.compare(password, hashedPassword);

  // If the passwords do not match, stop the login process
  if (!matchedPassword) {
    throw new CustomError(400, 'Wrong Credentials!'); // Throw a 400 error because the login credentials are incorrect
  }
};

export default verifyPassword; // Export the function so it can be used by the user service during login