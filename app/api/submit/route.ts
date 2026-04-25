import { NextRequest, NextResponse } from 'next/server';
import { DesignRequest, APIResponse } from '../../../src/types/design';

/**
 * POST /api/submit
 * Handles design request submissions
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
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

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
          error: 'Please provide a valid email address',
        } as APIResponse,
        { status: 400 }
      );
    }

    // Create design request object
    const designRequest: DesignRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: body.name.trim(),
      email: body.email.trim(),
      message: body.message.trim(),
      designSlug: body.designSlug,
      designTitle: body.designTitle || 'Unknown Design',
      status: 'pending',
      submittedAt: new Date().toISOString(),
    };

    // TODO: Save to database (e.g., MongoDB, Supabase, etc.)
    console.log('Design request submitted:', designRequest);

    // For now, return success response
    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Notify admin

    return NextResponse.json(
      {
        success: true,
        message: 'Request submitted successfully! We will review it soon.',
        data: designRequest,
      } as APIResponse<DesignRequest>,
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing design request:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request',
        error: error instanceof Error ? error.message : 'Unknown error',
      } as APIResponse,
      { status: 500 }
    );
  }
}

/**
 * GET /api/submit
 * Returns allowed methods
 */
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
      error: 'Use POST to submit a design request',
    } as APIResponse,
    { status: 405 }
  );
}
