import type { ReactNode } from 'react';

const BlocAction = ({ marge = '20px 0 0 0 ', children }: { marge?: string, children?: ReactNode }) => {
    return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', width: '100%', padding: marge }}>
            {children}
        </div>
    );
};

export default BlocAction;
