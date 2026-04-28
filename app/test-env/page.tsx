'use client';

export default function TestEnv() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  
  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>Environment Variable Test</h1>
      <p><strong>NEXT_PUBLIC_API_URL:</strong> {apiUrl || 'NOT SET'}</p>
      <p><strong>Expected:</strong> https://gen-ji-backend.onrender.com</p>
      
      <hr style={{ margin: '20px 0' }} />
      
      <button
        onClick={async () => {
          try {
            const url = apiUrl || 'https://gen-ji-backend.onrender.com';
            console.log('Testing:', url);
            const response = await fetch(`${url}/api/health`);
            const data = await response.json();
            alert(`Backend is working! Response: ${JSON.stringify(data)}`);
          } catch (error: any) {
            alert(`Backend error: ${error.message}`);
          }
        }}
        style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
      >
        Test Backend Connection
      </button>
    </div>
  );
}
