import { useLocale } from '../../hooks';
import { getConfig } from '../../config';

const LocaleToggle = () => {
  const {
    admin: { locale: locales },
  } = getConfig();
  const { locale, onChange } = useLocale();

  // TODO

  return (
    <div>
      {locales.active.map((loc) => (
        <button key={loc} onClick={() => onChange(loc)}>
          {loc}
          {locale === loc ? ' *' : ''}
        </button>
      ))}
    </div>
  );
};

export default LocaleToggle;
