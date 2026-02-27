import { Button, Result } from 'antd';
import useI18n from '../i18n/useI18n';
import useContexteAuth from '../auth/ContexteAuth';

const PageNotAuthorized = () => {
    const { i18n } = useI18n();
    const { logout } = useContexteAuth();


    return (
        <Result
            status="403" //
            title="403"
            subTitle="Page Non Authorisée"
            extra={
                <Button type="primary" danger onClick={logout}>
                    {i18n('global.action.logout')}
                </Button>
            }
        />
    );
};

export default PageNotAuthorized;