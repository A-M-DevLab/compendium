import {
    getReadingPathByHandle,
  } from "@/lib/shopify/reading-paths";
  
  import type {
    ReadingTierLevel,
  } from "@/types/reading-path";
  
  type Params = {
    params: Promise<{
      handle: string;
      tier: string;
    }>;
  };
  
  const tierMap: Record<
    string,
    ReadingTierLevel
  > = {
    "start-here": "start_here",
    "go-deeper": "go_deeper",
    "full-lore": "full_lore",
  };
  
  export async function GET(
    _request: Request,
    { params }: Params
  ) {
    try {
      const { handle, tier } = await params;
  
      const tierLevel = tierMap[tier];
  
      if (!tierLevel) {
        return Response.json(
          {
            status: "error",
            message: "Invalid reading tier",
          },
          {
            status: 400,
          }
        );
      }
  
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
  
      const readingTier =
        readingPath.tiers.find(
          (item) =>
            item.tier === tierLevel
        );
  
      if (!readingTier) {
        return Response.json(
          {
            status: "error",
            message: "Reading tier not found",
          },
          {
            status: 404,
          }
        );
      }
  
      return Response.json({
        status: "ok",
  
        readingPath: {
          id: readingPath.id,
          handle: readingPath.handle,
          title: readingPath.title,
          pathType: readingPath.pathType,
        },
  
        tier: readingTier,
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