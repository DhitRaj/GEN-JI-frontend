import { NextRequest, NextResponse } from 'next/server';
import { APIResponse, DesignRequest } from '../../../src/types/design';

const BACKEND_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000').replace(/\/$/, '');

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.message || !body.designSlug) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
          error: 'name, email, message, and designSlug are required',
        } as APIResponse,
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/clients/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        requirement: formatRequirement(body),
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return NextResponse.json(
        {
          success: false,
          message: data?.error || 'Failed to submit request',
          error: data?.error || 'Unknown backend error',
        } as APIResponse,
        { status: response.status }
      );
    }

    const designRequest: DesignRequest = {
      id: data.client?._id,
      name: body.name,
      email: body.email,
      message: body.message,
      designSlug: body.designSlug,
      designTitle: body.designTitle || 'Unknown Design',
      status: 'pending',
      submittedAt: data.client?.createdAt || new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully! We will review it soon.',
        data: designRequest,
      } as APIResponse<DesignRequest>,
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request',
        error: error?.message || 'Unknown error',
      } as APIResponse,
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      error: 'Use POST to submit a design request',
    } as APIResponse,
    { status: 405 }
  );
}
