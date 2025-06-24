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
            vi: 'Licht',
            en: 'Light',
          })}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setTheme('dark')}>
          {translate({
            vi: 'Dunkelheit',
            en: 'Dark',
          })}
        </button>
      </div>
      <div>
        <button type="button" onClick={() => setTheme('system')}>
          {translate({
            vi: 'System',
            en: 'System',
          })}
        </button>
      </div>
    </div>
  );
};

export { ThemeSwitcher };
