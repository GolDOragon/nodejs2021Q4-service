/**
 * Test a string to see if it is a valid UUID
 * @param str - string to validate
 * @returns true if string is a valid UUID, false otherwise
 */
export const validateUUID4 = (str: string): boolean =>
  /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i.test(
    str
  );
