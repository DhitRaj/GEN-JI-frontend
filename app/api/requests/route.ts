import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

type BackendClient = {
  _id: string;
  name: string;
  email: string;
  requirement: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
  createdAt: string;
};

function mapStatusToDesign(status: BackendClient['status']) {
  if (status === 'new') return 'pending';
  if (status === 'completed') return 'approved';
  return 'reviewed';
}

function formatRequirement(payload: any) {
  const lines = [
    '[DESIGN_REQUEST]',
    `Design Slug: ${payload.designSlug}`,
    `Design Title: ${payload.designTitle || 'Unknown Design'}`,
    '',
    'Message:',
    `${payload.message || ''}`,
  ];

  if (payload.themeCustomization) {
    lines.push('', 'Theme Customization:', JSON.stringify(payload.themeCustomization));
  }

  return lines.join('\n');
}

function parseRequirement(requirement: string) {
  if (!requirement.startsWith('[DESIGN_REQUEST]')) {
    return {
      designSlug: 'general-contact',
      designTitle: 'General Contact',
      message: requirement,
      themeCustomization: null,
    };
  }

  const slugMatch = requirement.match(/Design Slug:\s*(.+)/);
  const titleMatch = requirement.match(/Design Title:\s*(.+)/);
  const messageMatch = requirement.match(/Message:\s*([\s\S]*?)(?:\nTheme Customization:|$)/);
  const themeMatch = requirement.match(/Theme Customization:\s*([\s\S]*)$/);

  let themeCustomization = null;
  if (themeMatch?.[1]) {
    try {
      themeCustomization = JSON.parse(themeMatch[1]);
    } catch {
      themeCustomization = null;
    }
  }

  return {
    designSlug: slugMatch?.[1]?.trim() || 'unknown',
    designTitle: titleMatch?.[1]?.trim() || 'Unknown Design',
    message: messageMatch?.[1]?.trim() || '',
    themeCustomization,
  };
}

function mapClientToRequest(client: BackendClient) {
  const details = parseRequirement(client.requirement);
  return {
    id: client._id,
    name: client.name,
    email: client.email,
    message: details.message,
    designSlug: details.designSlug,
    designTitle: details.designTitle,
    themeCustomization: details.themeCustomization,
    status: mapStatusToDesign(client.status),
    submittedAt: client.createdAt,
  };
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${BACKEND_URL}/api/clients`, {
      headers: { Authorization: authHeader },
      cache: 'no-store',
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data?.error || 'Failed to fetch requests' },
        { status: response.status }
      );
    }

    const mapped = (data.clients || []).map(mapClientToRequest);
    return NextResponse.json(
      { success: true, message: 'Requests retrieved successfully', data: mapped },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch requests', error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message, designSlug, designTitle, themeCustomization } = body;

    if (!name || !email || !message || !designSlug) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    const payload = {
      name,
      email,
      requirement: formatRequirement({ message, designSlug, designTitle, themeCustomization }),
    };

    const response = await fetch(`${BACKEND_URL}/api/clients/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data?.error || 'Failed to process request' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully',
        data: mapClientToRequest(data.client as BackendClient),
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to process request', error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
