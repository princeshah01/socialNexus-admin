import validator from "validator";

export const validateEmail = (email) => {
    if (!email) return 'Email is required';
    if (!validator.isEmail(email)) return 'Please enter a valid email address';
    return null;
};
export const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (!validator.isStrongPassword(password)) return "Password must be 8+ characters with letters, numbers, symbols"
    return null;
}