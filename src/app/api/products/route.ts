const BASE_URL = "https://drm.devsinntechnologies.com";
const CATALOG_ID = "5707b450-9723-4794-9ba4-ee03890cf504";

export async function GET(request: Request) {
  const incomingUrl = new URL(request.url);
  const page = incomingUrl.searchParams.get("page") ?? "1";
  const limit = incomingUrl.searchParams.get("limit") ?? "100";
  const category = incomingUrl.searchParams.get("category");
  const search = incomingUrl.searchParams.get("search");

  const upstreamUrl = new URL(
    `${BASE_URL}/api/public-catalog/${CATALOG_ID}/products`
  );
  upstreamUrl.searchParams.set("page", page);
  upstreamUrl.searchParams.set("limit", limit);

  if (category) {
    upstreamUrl.searchParams.set("category", category);
  }

  if (search) {
    upstreamUrl.searchParams.set("search", search);
  }

  try {
    const response = await fetch(upstreamUrl, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return Response.json(
        {
          success: false,
          data: [],
          message: `Products API error: ${response.status} ${response.statusText}`,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return Response.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Failed to fetch products:", error);

    return Response.json(
      {
        success: false,
        data: [],
        message: "Failed to fetch products",
      },
      { status: 502 }
    );
  }
}
