// 'use client';
// import { useChangeLocale } from '#/i18n/client';
// import { i18n } from '#/i18n/config';
// import { collections, languages } from '#/lib/constants';
// import { useLocalizationsStore } from '#/store/localizations';

// const LanguageSwitcher = () => {
//   const { localizations } = useLocalizationsStore();
//   const { isChangingLocale, changeLocale } = useChangeLocale();
//   return (
//     <div>
//       {i18n.locales.map((locale, key) => {
//         let pathname = undefined;
//         const localization = localizations.find(item => item.locale === locale);
//         if (localization) {
//           pathname = '';
//           const collection = collections.find(
//             item => item.name === localization.collectionName,
//           );
//           if (collection) {
//             pathname = `${collection.path ?? ''}${localization.uri ?? ''}`;
//           } else {
//             pathname = localization.uri ?? '';
//           }
//         }
//         return (
//           <div key={key}>
//             <button
//               type="button"
//               onClick={() => changeLocale({ locale, pathname })}
//               disabled={isChangingLocale}
//             >
//               {languages[locale]}
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export { LanguageSwitcher };
