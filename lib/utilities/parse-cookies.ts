type ParsedCookie = {
  name: string;
  value: string;
  options: {
    path?: string;
    expires?: Date;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
  };
};

export function parseSetCookie(setCookieHeader: string): ParsedCookie | null {
  const parts = setCookieHeader.split(';').map(p => p.trim());

  const [nameValue, ...attributes] = parts;
  const [name, value] = nameValue.split('=');

  if (!name || !value) return null;

  const options: ParsedCookie['options'] = {};

  for (const attr of attributes) {
    const [key, rawVal] = attr.split('=');
    const lowerKey = key.toLowerCase();

    switch (lowerKey) {
      case 'expires':
        options.expires = new Date(rawVal);
        break;
      case 'path':
        options.path = rawVal;
        break;
      case 'httponly':
        options.httpOnly = true;
        break;
      case 'secure':
        options.secure = true;
        break;
      case 'samesite':
        options.sameSite = rawVal?.toLowerCase() as 'lax' | 'strict' | 'none';
        break;
    }
  }

  return { name, value, options };
}
