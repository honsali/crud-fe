import { type Reducer } from 'redux';
import { type PageDefinition } from './PageDefinition';

export interface ModuleDefinition {
    key: string;
    mapI18n?: Record<string, string>;
    listePage?: PageDefinition[];
    listeSousModule?: ModuleDefinition[];
    reducer?: Record<string, Reducer>;
    index?: PageDefinition;
}
