import { Suspense } from 'react';
import Avancement from '../../composants/widget/Avancement';

const Page = ({ children }) => {
    return <Suspense fallback={<Avancement taux={1} />}>{children}</Suspense>;
};

export default Page;
