import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, TreeSelect } from 'antd';
import { type IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { type IModule } from 'modele/modelisation/module/DomaineModule';
import { useEffect, useState } from 'react';
import useListerEntity from './useListerEntity';
export type NodeType = 'module' | 'entity';

export type DataNode = {
    key: string;
    value: string;
    title?: React.ReactNode;
    nodeType: NodeType;
    isLeaf?: boolean;
    selectable?: boolean;
    children?: DataNode[];
};

const buildTree = (modules: IModule[], entities: IEntity[]): DataNode[] => {
    const moduleMap = new Map<string, DataNode>();
    const roots: DataNode[] = [];

    for (const m of modules) {
        moduleMap.set(m.id!, { title: m.name, value: `${m.name}-module`, key: `module-${m.id}`, nodeType: 'module', selectable: false, children: [] });
    }

    for (const m of modules) {
        const node = moduleMap.get(m.id!)!;
        const parentId = m.module?.id;
        if (parentId && moduleMap.has(parentId)) {
            moduleMap.get(parentId)!.children!.push(node);
        } else {
            roots.push(node);
        }
    }

    for (const e of entities) {
        const entityNode: DataNode = { title: e.name, value: `${e.name}-entity`, key: `entity-${e.id}`, nodeType: 'entity', selectable: true, isLeaf: true };
        const parentId = e.module?.id;
        if (parentId && moduleMap.has(parentId)) {
            moduleMap.get(parentId)!.children!.push(entityNode);
        } else {
            roots.push(entityNode);
        }
    }

    return roots;
};

const nodeIcon = (nodeType: NodeType) => {
    if (nodeType === 'entity') {
        return <FontAwesomeIcon icon={faFile} style={{ marginRight: 6, color: '#52c41a' }} />;
    }
    return <FontAwesomeIcon icon={faFolder} style={{ marginRight: 6, color: '#faad14' }} />;
};

const ViewListerEntity = (props) => {
    const { listerModule, listeEntity, listeModule, listerEntity } = useListerEntity();
    const [treeData, setTreeData] = useState<DataNode[]>([]);
    const [treeVersion, setTreeVersion] = useState(0);

    const titleRender = (node: DataNode) => {
        return (
            <span title="" style={{ padding: '5px', marginLeft: '-5px' }}>
                {nodeIcon(node.nodeType)}
                <span>{node.title as string}</span>
            </span>
        );
    };

    useEffect(() => {
        listerEntity();
        listerModule();
    }, []);

    useEffect(() => {
        setTreeData(buildTree(listeModule ?? [], listeEntity ?? []));
        setTreeVersion((v) => v + 1);
    }, [listeModule, listeEntity]);
    //
    return (
        <Form.Item name="entity" label="Entité principale"  >
            <TreeSelect
                key={treeVersion}
                treeData={treeData}
                treeDefaultExpandAll
                showSearch
                allowClear
                placeholder={`Sélectionner Entité`}
                treeTitleRender={titleRender}
            />
        </Form.Item>
    );
};

export default ViewListerEntity;