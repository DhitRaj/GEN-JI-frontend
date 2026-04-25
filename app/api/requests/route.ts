// Simple in-memory storage for demo
// TODO: Replace with database queries (MongoDB, Supabase, etc.)
let designRequests: any[] = [];

export async function GET() {
  try {
    // TODO: Replace with database query
    // const requests = await db.designRequests.find().sort({ submittedAt: -1 });
    
    return Response.json({
      success: true,
      message: 'Requests retrieved successfully',
      data: designRequests.sort((a, b) => 
        new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
      ),
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching requests:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch requests',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, designSlug, designTitle, themeCustomization, status = 'pending' } = body;

    // Validate required fields
    if (!name || !email || !message || !designSlug) {
      return Response.json({
        success: false,
        message: 'Missing required fields',
      }, { status: 400 });
    }

    // Create new request with all details
    const newRequest = {
      id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      message,
      designSlug,
      designTitle,
      themeCustomization: themeCustomization || null,
      status,
      submittedAt: new Date().toISOString(),
    };

    // Store in memory (TODO: save to database)
    designRequests.push(newRequest);
    console.log('New design request stored:', newRequest);

    return Response.json({
      success: true,
      message: 'Request submitted successfully',
      data: newRequest,
    }, { status: 201 });
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json({
      success: false,
      message: 'Failed to process request',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
