import { Suspense } from 'react';

const Page = ({ children }) => {
    return <Suspense fallback="">{children}</Suspense>;
};

export default Page;
