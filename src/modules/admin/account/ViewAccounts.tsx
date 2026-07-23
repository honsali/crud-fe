import { KeyOutlined, PlusOutlined } from '@ant-design/icons';
import { App, Button, Card, Form, Input, Modal, Select, Space, Switch, Table, Tag, Tooltip, Typography } from 'antd';
import type { TableColumnsType } from 'antd';
import axios from 'axios';
import { ROLE_ADMIN, ROLE_GESTIONNAIRE_RH, type AppRole } from 'commun/securite/mapRole';
import type { IAccount, ICreateAccountRequest, IResetPasswordRequest, IUpdateAccountRequest } from 'modele/commun/account/DomaineAccount';
import ServiceAccount from 'modele/commun/account/ServiceAccount';
import { useCallback, useEffect, useState } from 'react';
import { useContexteAuth } from 'waxant';

interface ProblemDetails {
    title?: string;
    detail?: string;
    fields?: Array<{
        field?: string;
        message?: string;
    }>;
}

const ROLE_LABELS: Record<AppRole, string> = {
    [ROLE_ADMIN]: 'Administrateur',
    [ROLE_GESTIONNAIRE_RH]: 'Gestionnaire RH',
};

const ROLE_OPTIONS = Object.entries(ROLE_LABELS).map(([value, label]) => ({ value, label }));

const apiErrorMessage = (exception: unknown): string => {
    if (axios.isAxiosError<ProblemDetails>(exception)) {
        const problem = exception.response?.data;
        const fieldMessages = problem?.fields
            ?.map((field) => [field.field, field.message].filter(Boolean).join(' : '))
            .filter(Boolean);
        return [problem?.detail || problem?.title, ...(fieldMessages ?? [])].filter(Boolean).join(' — ')
            || 'La requête a échoué.';
    }
    return exception instanceof Error ? exception.message : 'La requête a échoué.';
};

const ViewAccounts = () => {
    const { message } = App.useApp();
    const { user, logout } = useContexteAuth();
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [loading, setLoading] = useState(false);
    const [creating, setCreating] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [resettingPassword, setResettingPassword] = useState(false);
    const [createOpen, setCreateOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [passwordOpen, setPasswordOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<IAccount | null>(null);
    const [createForm] = Form.useForm<ICreateAccountRequest>();
    const [editForm] = Form.useForm<IUpdateAccountRequest>();
    const [passwordForm] = Form.useForm<IResetPasswordRequest>();

    const loadAccounts = useCallback(async () => {
        setLoading(true);
        try {
            setAccounts(await ServiceAccount.lister());
        } catch (exception) {
            message.error(apiErrorMessage(exception));
        } finally {
            setLoading(false);
        }
    }, [message]);

    useEffect(() => {
        void loadAccounts();
    }, [loadAccounts]);

    const openCreate = () => {
        createForm.setFieldsValue({
            username: '',
            password: '',
            role: ROLE_GESTIONNAIRE_RH,
        });
        setCreateOpen(true);
    };

    const createAccount = async (request: ICreateAccountRequest) => {
        setCreating(true);
        try {
            await ServiceAccount.creer(request);
            setCreateOpen(false);
            createForm.resetFields();
            message.success('Compte créé.');
            await loadAccounts();
        } catch (exception) {
            message.error(apiErrorMessage(exception));
        } finally {
            setCreating(false);
        }
    };

    const openEdit = (account: IAccount) => {
        setSelectedAccount(account);
        editForm.setFieldsValue({
            role: account.role,
            activated: account.activated,
        });
        setEditOpen(true);
    };

    const updateAccount = async (request: IUpdateAccountRequest) => {
        if (!selectedAccount) {
            return;
        }

        setUpdating(true);
        try {
            await ServiceAccount.maj(selectedAccount.id, request);
            setEditOpen(false);
            setSelectedAccount(null);
            editForm.resetFields();
            message.success('Compte mis à jour.');
            await loadAccounts();
        } catch (exception) {
            message.error(apiErrorMessage(exception));
        } finally {
            setUpdating(false);
        }
    };

    const openPasswordReset = (account: IAccount) => {
        setSelectedAccount(account);
        passwordForm.resetFields();
        setPasswordOpen(true);
    };

    const resetPassword = async (request: IResetPasswordRequest) => {
        if (!selectedAccount) {
            return;
        }

        setResettingPassword(true);
        try {
            await ServiceAccount.reinitialiserMotDePasse(selectedAccount.id, request);
            setPasswordOpen(false);
            passwordForm.resetFields();
            message.success('Mot de passe réinitialisé.');

            if (selectedAccount.username.toLocaleLowerCase() === user?.toLocaleLowerCase()) {
                logout();
                return;
            }
            setSelectedAccount(null);
        } catch (exception) {
            message.error(apiErrorMessage(exception));
        } finally {
            setResettingPassword(false);
        }
    };

    const columns: TableColumnsType<IAccount> = [
        {
            title: "Nom d'utilisateur",
            dataIndex: 'username',
            sorter: (left, right) => left.username.localeCompare(right.username),
        },
        {
            title: 'Rôle',
            dataIndex: 'role',
            render: (role: AppRole) => ROLE_LABELS[role],
        },
        {
            title: 'État',
            dataIndex: 'activated',
            render: (activated: boolean) => activated
                ? <Tag color="green">Actif</Tag>
                : <Tag color="default">Inactif</Tag>,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, account) => {
                const currentAccount = account.username.toLocaleLowerCase() === user?.toLocaleLowerCase();
                return (
                    <Space wrap>
                        <Tooltip title={currentAccount ? 'Votre propre rôle et votre activation ne peuvent pas être modifiés.' : undefined}>
                            <Button disabled={currentAccount} onClick={() => openEdit(account)}>
                                Modifier
                            </Button>
                        </Tooltip>
                        <Button icon={<KeyOutlined />} onClick={() => openPasswordReset(account)}>
                            Mot de passe
                        </Button>
                    </Space>
                );
            },
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <Card>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            <Typography.Title level={2} style={{ margin: 0 }}>Comptes</Typography.Title>
                            <Typography.Text type="secondary">
                                Gérez séparément les comptes administrateurs et les comptes métier RH.
                            </Typography.Text>
                        </div>
                        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate}>
                            Nouveau compte
                        </Button>
                    </Space>
                    <Table<IAccount>
                        rowKey="id"
                        columns={columns}
                        dataSource={accounts}
                        loading={loading}
                        pagination={false}
                    />
                </Space>
            </Card>

            <Modal
                title="Créer un compte"
                open={createOpen}
                confirmLoading={creating}
                onOk={() => createForm.submit()}
                onCancel={() => setCreateOpen(false)}
                okText="Créer"
                cancelText="Annuler"
            >
                <Form form={createForm} layout="vertical" onFinish={createAccount}>
                    <Form.Item
                        name="username"
                        label="Nom d'utilisateur"
                        rules={[
                            { required: true, whitespace: true, message: "Le nom d'utilisateur est requis." },
                            { max: 50, message: '50 caractères maximum.' },
                        ]}
                    >
                        <Input autoComplete="off" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Mot de passe initial"
                        rules={[
                            { required: true, whitespace: true, message: 'Le mot de passe est requis.' },
                            { min: 8, message: '8 caractères minimum.' },
                            { max: 256, message: '256 caractères maximum.' },
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item name="role" label="Rôle" rules={[{ required: true }]}>
                        <Select options={ROLE_OPTIONS} />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={`Modifier ${selectedAccount?.username ?? ''}`}
                open={editOpen}
                confirmLoading={updating}
                onOk={() => editForm.submit()}
                onCancel={() => setEditOpen(false)}
                okText="Enregistrer"
                cancelText="Annuler"
            >
                <Form form={editForm} layout="vertical" onFinish={updateAccount}>
                    <Form.Item name="role" label="Rôle" rules={[{ required: true }]}>
                        <Select options={ROLE_OPTIONS} />
                    </Form.Item>
                    <Form.Item name="activated" label="Compte actif" valuePropName="checked">
                        <Switch checkedChildren="Oui" unCheckedChildren="Non" />
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={`Réinitialiser le mot de passe de ${selectedAccount?.username ?? ''}`}
                open={passwordOpen}
                confirmLoading={resettingPassword}
                onOk={() => passwordForm.submit()}
                onCancel={() => setPasswordOpen(false)}
                okText="Réinitialiser"
                cancelText="Annuler"
            >
                <Form form={passwordForm} layout="vertical" onFinish={resetPassword}>
                    <Form.Item
                        name="password"
                        label="Nouveau mot de passe"
                        rules={[
                            { required: true, whitespace: true, message: 'Le mot de passe est requis.' },
                            { min: 8, message: '8 caractères minimum.' },
                            { max: 256, message: '256 caractères maximum.' },
                        ]}
                    >
                        <Input.Password autoComplete="new-password" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ViewAccounts;
