import * as uuid from 'uuid';
export const generateRef = (length: number) => {
    let characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
  };
  
  export function sanitizeDateString(date: string) {
    const dateString = date.replace(/"/g, '');
    return dateString;
  }

  export function maskAccount(account: string): string {
    const visibleDigits = 4;  // Number of visible characters at the end (e.g., ".00")
    const maskedPart = '*'.repeat(account.length - visibleDigits);
    
    return maskedPart + account.slice(-visibleDigits);
  }
  
  
  export const generateHash = () => {
    const key = `RYPAY_TX_REF${generateRef(12)}`.toUpperCase();
    return key;
  };

  export const generateReferralCode = (userId: string) => {
    return `RYPAY_USER${userId}-${uuid.v4().slice(0, 8)}`;
  }