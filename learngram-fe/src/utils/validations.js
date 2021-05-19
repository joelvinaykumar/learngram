export const passwordValidator = password => {
  let errors = [];

  const uppercaseRegex = new RegExp('[A-Z]');
  const lowercaseRegex = new RegExp('[a-z]');
  const numericRegex = new RegExp('[0-9]');

  errors.push({
    valid: password.length >= 8,
    message: 'Password should be min 8 chars'
  });

  errors.push({
    valid: uppercaseRegex.test(password),
    message: 'At least 1 uppercase letter [A-Z]'
  });

  errors.push({
    valid: lowercaseRegex.test(password),
    message: 'At least 1 lowercase letter [a-z]'
  });

  errors.push({
    valid: numericRegex.test(password),
    message: 'At least 1 numeric char[0-9]'
  });

  return errors;
}