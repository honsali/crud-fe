import { ReactElement } from 'react';
import { Route } from 'react-router-dom';
import { ModuleDefinition } from './ModuleDefinition';
import Page from './Page';

export interface PageDefinition {
    key: string;
    toPath: (any?) => string;
    path: string;
    menu?: string;
    disabled?: () => boolean;
    open?: () => boolean;
    icone?: JSX.Element;
    view: JSX.Element;
}

const pageRoute = (page: PageDefinition, key: string): ReactElement => {
    return <Route key={key} path={page.path} element={<Page>{page.view}</Page>} />;
};

const moduleRoutes = (module: ModuleDefinition, keyPrefix: string): ReactElement[] => {
    const moduleKey = `${keyPrefix}${module.key}`;

        if (module.listeSousModule?.length) {
        const sousModuleRoutes = module.listeSousModule.flatMap((sousModule, index) => moduleRoutes(sousModule, `${moduleKey}.${index}.`));

        if (!module.index) {
            return sousModuleRoutes;
        }

        return [
            <Route key={`${moduleKey}.${module.index.key}`} path={module.index.path} element={<Page>{module.index.view}</Page>}>
                {sousModuleRoutes}
            </Route>,
        ];
        }

    return module.listePage?.map((page, index) => pageRoute(page, `${moduleKey}.${index}.${page.key}`)) || [];
};

export const listeRoutes = (listeModule: ModuleDefinition[] = []): ReactElement[] => {
    return listeModule.flatMap((module, index) => moduleRoutes(module, `${index}.`));
};

export const listeReducer = (acc = {}, listeModule: ModuleDefinition[] = []) => {
    return listeModule.reduce((acc, module) => {
        const moduleReducer = module.reducer || {};
        const sousModuleReducer = module.listeSousModule?.length ? listeReducer({}, module.listeSousModule) : {};
        return { ...acc, ...moduleReducer, ...sousModuleReducer};
    }, acc);
};
