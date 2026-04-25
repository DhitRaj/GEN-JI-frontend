// TODO: Replace this in-memory store with actual database queries
// This is a simple implementation to demonstrate the structure
let designRequests: any[] = [];

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    // TODO: Query database for specific request
    // const request = await db.designRequests.findById(params.id);
    
    const foundRequest = designRequests.find(r => r.id === params.id);
    
    if (!foundRequest) {
      return Response.json({
        success: false,
        message: 'Request not found',
      }, { status: 404 });
    }

    return Response.json({
      success: true,
      message: 'Request retrieved successfully',
      data: foundRequest,
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching request:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch request',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const { status } = body;

    // TODO: Update database with new status
    // const updated = await db.designRequests.findByIdAndUpdate(params.id, { status });
    
    const requestIndex = designRequests.findIndex(r => r.id === params.id);
    
    if (requestIndex === -1) {
      return Response.json({
        success: false,
        message: 'Request not found',
      }, { status: 404 });
    }

    if (status && ['pending', 'reviewed', 'approved', 'rejected'].includes(status)) {
      designRequests[requestIndex].status = status;
    }

    return Response.json({
      success: true,
      message: 'Request updated successfully',
      data: designRequests[requestIndex],
    }, { status: 200 });
  } catch (error) {
    console.error('Error updating request:', error);
    return Response.json({
      success: false,
      message: 'Failed to update request',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
