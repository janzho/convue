import { ResolvedOptions } from './types';

export function generateStores(filesPath: string[], options: ResolvedOptions) {
  const { storeDirPath } = options;

  const stores: any[] = [];

  for (const filePath of filesPath) {
    const filePaths = filePath.split('/');
    let name = filePaths[0].toLocaleLowerCase();

    for (const path of filePaths.slice(1)) {
      name += `-${path.toLocaleLowerCase()}`;
    }

    name = name.split('.')[0].replace(/-(\w)/g, function (_$0, $1) {
      return $1.toUpperCase();
    });

    stores.push({
      imports: `import ${name} from '${storeDirPath}/${filePath}'`,
      name,
    });
  }

  return stores;
}

export function generateClientCode(stores: any[]) {
  const names = stores.map((n) => n.name);

  let combineStores: any = {};

  names.forEach((name) => {
    if (name === 'index') {
      combineStores.name = name;
    } else {
      combineStores.modules = {
        ...combineStores.modules,
        [name]: name
      };
    }
  });

  return `
    import { createStore } from 'vuex'
    ${stores.map((n) => n.imports).join('\n')}

    const store = createStore(${JSON.stringify(combineStores, null, 2)
      .replace(/\"/g, '')
      .replace(/name\: /g, '...')})

    export default store;
  `;
}
