import { useEffect, useState } from 'react';

const ErrorBoundary = ({ children }) => {
    const [error, setError] = useState(null);
    const [errorInfo, setErrorInfo] = useState(null);

    useEffect(() => {
        const errorHandler = (errorEvent) => {
            setError(errorEvent.error);
            setErrorInfo(errorEvent.errorInfo);
        };
        window.addEventListener('error', errorHandler);

        return () => window.removeEventListener('error', errorHandler);
    }, []);

    if (errorInfo) {
        return (
            <div>
                <h2 className="error">An unexpected error has occurred.</h2>
                process.env.NODE_ENV === 'development' && (
                <details className="preserve-space">
                    {error?.toString()}
                    <br />
                    {errorInfo.componentStack}
                </details>
                )
            </div>
        );
    }

    return children;
};

export default ErrorBoundary;
