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
  
  export const generateHash = () => {
    const key = `RYPAY_TX_REF${generateRef(12)}`.toUpperCase();
    return key;
  };