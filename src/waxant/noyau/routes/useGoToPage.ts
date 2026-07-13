import { useNavigate, useParams } from 'react-router';
import { PageDefinition } from './PageDefinition';

const useGoToPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    return (page: PageDefinition, args?: any) => {
        navigate(page.toPath({ ...params, ...args }));
    };
};

export default useGoToPage;
