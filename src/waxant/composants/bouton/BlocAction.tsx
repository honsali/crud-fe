import type { ReactNode } from 'react';

const BlocAction = ({ children }: { children?: ReactNode }) => {
    return (
        <div style={{ display: 'flex', borderTop: '1px solid #eee', paddingTop: '20px', gap: '8px', alignItems: 'center', width: '100%' }}>
            {children}
        </div>
    );
};

export default BlocAction;
