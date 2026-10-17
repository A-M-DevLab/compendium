import {
    getReadingPaths,
  } from "@/lib/shopify/reading-paths";
  
  export async function GET() {
    try {
      const readingPaths =
        await getReadingPaths();
  
      return Response.json({
        status: "ok",
        count: readingPaths.length,
        readingPaths,
      });
    } catch (error) {
      return Response.json(
        {
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Unknown error",
        },
        {
          status: 500,
        }
      );
    }
  }