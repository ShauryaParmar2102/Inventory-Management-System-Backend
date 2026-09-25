import bcrypt from 'bcrypt'; // Import bcrypt for securely hashing passwords

// HASH PASSWORD
// Converts a plain-text password into a secure hashed password
const hashPassword = async (password: string) => {

    // Hash the password using 10 salt rounds
    // The hash is what gets stored in the database instead of the real password
  return bcrypt.hash(password, 10);
};

export default hashPassword; // Export the function so it can be used when saving user passwords