'use client';
import { useTranslate } from '#/i18n/client';
import { useTheme } from 'next-themes';

const ThemeSwitcher = () => {
  const { translate } = useTranslate();
  const { setTheme } = useTheme();
  return (
    <div>
      <div>
        <button type="button" onClick={() => setTheme('light')}>
          {translate({
            de: 'Licht',
            en: 'Light',
          })}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setTheme('dark')}>
          {translate({
            de: 'Dunkelheit',
            en: 'Dark',
          })}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setTheme('system')}>
          {translate({
            de: 'System',
            en: 'System',
          })}
        </button>
      </div>
    </div>
  );
};

export { ThemeSwitcher };
