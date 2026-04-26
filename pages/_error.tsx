import type { NextPageContext } from 'next';

type ErrorProps = {
  statusCode?: number;
};

function ErrorPage({ statusCode }: ErrorProps) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        background: '#f8fafc',
        color: '#0f172a',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <div>
        <h1 style={{ fontSize: '28px', marginBottom: '10px' }}>
          {statusCode ? `Error ${statusCode}` : 'Unexpected Error'}
        </h1>
        <p style={{ color: '#475569' }}>
          Something went wrong while loading this page.
        </p>
      </div>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
