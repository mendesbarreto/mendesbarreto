export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const year = date.getFullYear();
  return `${month} ${year}`;
}

export function formatYear(isoString: string): string {
  return new Date(isoString).getFullYear().toString();
}

export function formatDateRange(startDate: string, endDate: string | null): string {
  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : 'Present';
  return `${start} – ${end}`;
}
