import { getCharacters } from "@/lib/shopify/characters";

export async function GET() {
  try {
    const characters = await getCharacters();

    return Response.json({
      status: "ok",
      count: characters.length,
      characters,
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