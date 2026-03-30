import { NextResponse } from "next/server";
import { handleInquirySubmission } from "@/server/inquiry";

export const dynamic = "force-dynamic";

export async function OPTIONS() {
  return new NextResponse(null, { status: 204 });
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    body = {};
  }

  try {
    const result = await handleInquirySubmission({
      method: "POST",
      body,
    });

    return NextResponse.json(result.body ?? {}, { status: result.status });
  } catch (error) {
    console.error("[api/inquiry] Inquiry submission failed:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "We couldn't send your inquiry right now. Please try again later.",
      },
      { status: 500 },
    );
  }
}
