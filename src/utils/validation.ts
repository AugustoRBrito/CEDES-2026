/**
 * Utilitários para validação de dados
 */

/**
 * Valida se uma string é um email válido
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valida se uma string é um CNPJ válido
 */
export function isValidCNPJ(cnpj: string): boolean {
  const cleanCNPJ = cnpj.replace(/[^\d]/g, '');

  if (cleanCNPJ.length !== 14) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{13}$/.test(cleanCNPJ)) return false;

  // Validação dos dígitos verificadores
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

  const checkDigit = (digits: string, weights: number[]) => {
    const sum = digits.split('').reduce((acc, digit, index) => {
      const weight = weights[index];
      return weight ? acc + parseInt(digit) * weight : acc;
    }, 0);
    const remainder = sum % 11;
    return remainder < 2 ? 0 : 11 - remainder;
  };

  const firstDigit = checkDigit(cleanCNPJ.slice(0, 12), weights1);
  const secondDigit = checkDigit(cleanCNPJ.slice(0, 13), weights2);

  const digit12 = cleanCNPJ[12];
  const digit13 = cleanCNPJ[13];

  if (!digit12 || !digit13) return false;

  return parseInt(digit12) === firstDigit && parseInt(digit13) === secondDigit;
}

/**
 * Valida se uma string é um CEP válido
 */
export function isValidCEP(cep: string): boolean {
  const cleanCEP = cep.replace(/[^\d]/g, '');
  return cleanCEP.length === 8;
}

/**
 * Valida se uma URL é válida
 */
export function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
