import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

type BackendClientStatus = 'new' | 'contacted' | 'in-progress' | 'completed';

function mapStatusToDesign(status: BackendClientStatus) {
  if (status === 'new') return 'pending';
  if (status === 'completed') return 'approved';
  return 'reviewed';
}

function mapStatusToBackend(status: string): BackendClientStatus {
  if (status === 'approved') return 'completed';
  if (status === 'reviewed') return 'in-progress';
  if (status === 'rejected') return 'contacted';
  return 'new';
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

function mapClient(client: any) {
  const details = parseRequirement(client.requirement || '');
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const response = await fetch(`${BACKEND_URL}/api/clients/${params.id}`, {
      headers: { Authorization: authHeader },
      cache: 'no-store',
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data?.error || 'Request not found' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Request retrieved successfully', data: mapClient(data.client) },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch request', error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body?.status) {
      return NextResponse.json(
        { success: false, message: 'Status is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/clients/${params.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      body: JSON.stringify({ status: mapStatusToBackend(body.status) }),
    });
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { success: false, message: data?.error || 'Failed to update request' },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Request updated successfully', data: mapClient(data.client) },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Failed to update request', error: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
