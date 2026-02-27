import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type ErrorBoundaryProps = {
    children: ReactNode;
};

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
    const [error, setError] = useState<Error | null>(null);
    const [errorInfo, setErrorInfo] = useState<ErrorEvent | null>(null);

    useEffect(() => {
        const errorHandler = (errorEvent: ErrorEvent) => {
            setError((errorEvent.error as Error) ?? null);
            setErrorInfo(errorEvent);
        };
        window.addEventListener('error', errorHandler);

        return () => window.removeEventListener('error', errorHandler);
    }, []);

    if (errorInfo) {
        return (
            <div>
                <h2 className="error">An unexpected error has occurred.</h2>
                {process.env.NODE_ENV === 'development' && (
                    <details className="preserve-space">
                        {error?.toString()}
                        <br />
                        {error?.stack}
                    </details>
                )}
            </div>
        );
    }

    return children;
};

export default ErrorBoundary;
