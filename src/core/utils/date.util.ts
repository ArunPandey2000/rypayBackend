export function formatDateToIST(date: Date, includeTime = true) {
    const options = {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      ...(includeTime ? {hour: '2-digit',
        minute: '2-digit'} : {}),
      hour12: false // 24-hour format
    } as any;
  
    const formatter = new Intl.DateTimeFormat('en-In', options);
  
    return formatter.format(date);
  }

export function formatAmountToINR(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}