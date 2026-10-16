import { getCharacterByHandle } from "@/lib/shopify/characters";

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

    const character = await getCharacterByHandle(handle);

    if (!character) {
      return Response.json(
        {
          status: "error",
          message: "Character not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      status: "ok",
      character,
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
      { status: 500 }
    );
  }
}