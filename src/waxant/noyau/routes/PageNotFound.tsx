import { Button, Result } from 'antd';

const PageNotFound = () => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Page introuvable"
            extra={
                <Button type="primary">
                    <a href="/">Accueil</a>
                </Button>
            }
        />
    );
};

export default PageNotFound;