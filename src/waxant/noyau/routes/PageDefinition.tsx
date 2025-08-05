import { Route } from 'react-router-dom';
import { ModuleDefinition } from './ModuleDefinition';
import Page from './Page';
import { JSX } from 'react';

export interface PageDefinition {
    key: string;
    toPath: (any?) => string;
    path: string;
    menu?: string;
    disabled?: () => false;
    open?: () => false;
    icone?: JSX.Element;
    view: JSX.Element;
}

export const listeRoutes = (listeModule: ModuleDefinition[]) => {
    return listeModule?.map((module) => {
        if (module.listeSousModule?.length) {
            return (
                <Route key={module.index.key} path={module.index.path} element={<Page>{module.index.view}</Page>}>
                    {listeRoutes(module.listeSousModule)}
                </Route>
            );
        }
        return module.listePage.map((page) => {
            return <Route key={page.key} path={page.path} element={<Page>{page.view}</Page>} />;
        });
    });
};

export const listeReducer = (acc, listeModule: ModuleDefinition[]) => {
    return listeModule?.reduce((acc, module) => {
        if (module.listeSousModule?.length) {
            return { ...acc, ...module.reducer, ...listeReducer(acc, module.listeSousModule) };
        }
        return { ...acc, ...module.reducer };
    }, acc);
};
