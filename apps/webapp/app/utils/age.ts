// utils/age.ts

/**
 * Calculate age from ISO date like "1990-05-15T00:00:00.000Z"
 */
export function calculateAge(dob?: string | Date): string {
  if (!dob) return "";

  const birth = new Date(dob);
  if (isNaN(birth.getTime())) return ""; // invalid date

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();

  const monthDiff = today.getMonth() - birth.getMonth();
  const dayDiff = today.getDate() - birth.getDate();

  // If birthday hasn't happened yet this year → subtract 1 year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    years--;
  }

  return `${years} years`;
}
