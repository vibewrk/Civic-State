const ZIP_CODE_PATTERN = /\b\d{5}(?:-\d{4})?\b/g;

export function redactZipCodesForLog(value: string): string {
  return value.replace(ZIP_CODE_PATTERN, '[ZIP]');
}

function stringifyLogValue(value: unknown): string {
  try {
    return String(value);
  } catch {
    return '[unformattable official lookup error]';
  }
}

function readLogProperty(value: unknown, key: 'name' | 'message'): string | null {
  if ((typeof value !== 'object' && typeof value !== 'function') || value === null) {
    return null;
  }

  try {
    const property = (value as Record<'name' | 'message', unknown>)[key];
    return typeof property === 'string' ? property : null;
  } catch {
    return `[unreadable error ${key}]`;
  }
}

export function formatOfficialLookupErrorForLog(err: unknown): string {
  const name = readLogProperty(err, 'name');
  const message = readLogProperty(err, 'message');

  if (name !== null || message !== null) {
    return redactZipCodesForLog(
      `${name ?? '[unknown error]'}: ${message ?? '[no error message]'}`,
    );
  }

  return redactZipCodesForLog(stringifyLogValue(err));
}
