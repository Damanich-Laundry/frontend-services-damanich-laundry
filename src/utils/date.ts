/**
 * Parse date string with various formats including Indonesian month names
 * Supports formats like "15 Jan 2025", "2025-01-15", etc.
 * @param dateStr - Date string to parse
 * @returns ISO date string (YYYY-MM-DD) or current date if parsing fails
 */
export function parseDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // Try parsing with Indonesian month names
      const months: { [key: string]: string } = {
        'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04',
        'Mei': '05', 'May': '05', 'Jun': '06', 'Jul': '07',
        'Agu': '08', 'Aug': '08', 'Sep': '09', 'Okt': '10',
        'Oct': '10', 'Nov': '11', 'Des': '12', 'Dec': '12'
      };
      const parts = dateStr.split(' ');
      if (parts.length === 3) {
        const day = parts[0].padStart(2, '0');
        const month = months[parts[1]] || '01';
        const year = parts[2];
        return `${year}-${month}-${day}`;
      }
      return new Date().toISOString().split('T')[0];
    }
    return date.toISOString().split('T')[0];
  } catch {
    return new Date().toISOString().split('T')[0];
  }
}

/**
 * Format date string to Indonesian format (e.g., "18 Nov 2025")
 * @param dateString - ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('id-ID', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

