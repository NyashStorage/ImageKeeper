declare global {
  interface String {
    capitalize: () => string;
  }
}

/**
 * Makes first letter of string capitalized.
 */
String.prototype.capitalize = function capitalize(): string {
  const instance = this as string;
  return instance.charAt(0).toUpperCase() + instance.slice(1);
};

export {};
