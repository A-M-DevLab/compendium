import {
  getReadingPathByHandle,
} from "@/lib/shopify/reading-paths";

type Params = {
  params: Promise<{
    handle: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: Params
) {
  try {
    const { handle } = await params;

    const readingPath =
      await getReadingPathByHandle(handle);

    if (!readingPath) {
      return Response.json(
        {
          status: "error",
          message: "Reading path not found",
        },
        {
          status: 404,
        }
      );
    }

    return Response.json({
      status: "ok",
      readingPath,
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