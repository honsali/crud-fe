import { faFile, faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ConfigProvider, Tree } from 'antd';
import { type IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { type IModule } from 'modele/modelisation/module/DomaineModule';
import { useEffect, useState } from 'react';
import { Bloc } from 'waxant';
import useListerModule from '../useListerModule';
import ActionEntity from './ActionEntity';
import ActionModule from './ActionModule';
import DialogueModifierEntity from './DialogueModifierEntity';
import FormulaireEntity from './FormulaireEntity';
import FormulaireModule from './FormulaireModule';
export type NodeType = 'module' | 'entity';

export type DataNode = {
    key: string;
    title?: React.ReactNode;
    parentId?: string;
    nodeType: NodeType;
    isLeaf?: boolean;
    children?: DataNode[];
};

const buildTree = (modules: IModule[], entities: IEntity[]): DataNode[] => {
    const moduleMap = new Map<string, DataNode>();
    const roots: DataNode[] = [];

    for (const m of modules) {
        moduleMap.set(m.id!, { title: m.name, key: `module-${m.id}`, parentId: m.module?.id, nodeType: 'module', children: [] });
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
        const entityNode: DataNode = { title: e.name, key: `entity-${e.id}`, parentId: e.module?.id, nodeType: 'entity', isLeaf: true };
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

const TableauModule = () => {
    const { listerEntity, listeEntity, listeModule, listerModule } = useListerModule();
    const [treeData, setTreeData] = useState<DataNode[]>([]);
    const [treeVersion, setTreeVersion] = useState(0);
    const [editingKey, setEditingKey] = useState<React.Key | null>(null);
    const [hoveredKey, setHoveredKey] = useState<React.Key | null>(null);
    const [dialogueNode, setDialogueNode] = useState<DataNode | null>(null);
    const [dialogueVisible, setDialogueVisible] = useState(false);

    const endChange = () => {
        setEditingKey(null);
    };

    const titleRender = (node: DataNode) => {
        if (node.key === editingKey) {
            if (node.nodeType === 'module') {
                return <FormulaireModule node={node} endChange={endChange} />;
            }
            return <FormulaireEntity node={node} endChange={endChange} />;
        }
        const isHovered = hoveredKey === node.key;
        return (
            <span title="" style={{ padding: '5px', marginLeft: '-5px' }} onMouseEnter={() => setHoveredKey(node.key)} onMouseLeave={() => setHoveredKey(null)}>
                {nodeIcon(node.nodeType)}
                <span>{node.title as string}</span>
                {isHovered && node.nodeType === 'module' && node.parentId && <ActionModule node={node} endChange={endChange} onEdit={() => setEditingKey(node.key)} />}
                {isHovered && node.nodeType === 'entity' && <ActionEntity node={node} endChange={endChange} onEdit={() => { setDialogueNode(node); setDialogueVisible(true); }} />}
            </span>
        );
    };

    useEffect(() => {
        listerModule();
        listerEntity();
    }, []);

    useEffect(() => {
        setTreeData(buildTree(listeModule ?? [], listeEntity ?? []));
        setTreeVersion((v) => v + 1);
    }, [listeModule, listeEntity]);
    //
    return (
        <Bloc largeur="480px">
            <ConfigProvider theme={{ components: { Tree: { titleHeight: 30, nodeSelectedBg: '#52c41a33' } } }} >
                <Tree key={treeVersion} treeData={treeData} showLine defaultExpandAll titleRender={titleRender} />
            </ConfigProvider>
            <DialogueModifierEntity node={dialogueNode} visible={dialogueVisible} setVisible={setDialogueVisible} />
        </Bloc>
    );
};

export default TableauModule;
