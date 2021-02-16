import { ResolvedOptions } from './types';

export function generateLocales(filesPath: string[], options: ResolvedOptions) {
  const { localesDirPath } = options;

  const locales: any[] = [];

  for (const filePath of filesPath) {
    const defaultKey = filePath.split('.')[0];
    const name = defaultKey.replace(/-(\w)/g, function (_$0, $1) {
      return $1.toUpperCase();
    });

    locales.push({
      imports: `import ${name} from '${localesDirPath}/${filePath}'`,
      name,
      defaultKey,
    });
  }

  return locales;
}

export function generateClientCode(locales: any[], options: ResolvedOptions) {
  const defaultKeys = locales.map((n) => `'${n.defaultKey}'`);

  return `
    import { createI18n } from 'vue-i18n'
    ${locales.map((n) => n.imports).join('\n')}

    const i18n = createI18n({
      locale: '${options.defaultLocale || locales[0].defaultKey}',
      messages: {
        ${locales
          .map((locale) => {
            return `'${locale.defaultKey}': ${locale.name}`;
          })
          .join(',\n')}
      },
    })

    if (import.meta.hot) {
      import.meta.hot.accept(
        [${defaultKeys.join(',')}],
        (result) => {
          ${locales
            .map((locale, index) => {
              return `i18n.setLocaleMessage('${locale.defaultKey}', result[${index}])`;
            })
            .join(';\n')}
        }
      )
    }

    export default i18n;
  `;
}
