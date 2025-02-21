import bcrypt from "bcryptjs";

const passwordRules = [
  { name: "hasNumber", regex: /\d/, message: "Numbers are required" },
  {
    name: "hasLowerCase",
    regex: /[a-z]/,
    message: "Lowercase letters are required",
  },
  {
    name: "hasUpperCase",
    regex: /[A-Z]/,
    message: "Uppercase letters are required",
  },
  {
    name: "isBigLength",
    regex: /^.{10,}$/,
    message: "Must be at least 10 characters long",
  },
  {
    name: "specialChar",
    regex: /[^\w\*]/,
    message: "Must contain at least one special character",
  },
];

const validatePassword = (password: string) => {
  const errors = passwordRules
    .filter(({ regex }) => !regex.test(password))
    .map(({ message }) => message);
  return errors.length === 0 ? true : errors;
};

export const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

export const comparePassword = ({
  password,
  hash,
}: {
  password: string;
  hash: string;
}) => bcrypt.compare(password, hash);
