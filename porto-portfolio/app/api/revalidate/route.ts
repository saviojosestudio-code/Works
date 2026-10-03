import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type SanityWebhookPayload = {
  _id?: string;
  _type?: string;
  slug?: { current?: string } | string;
  tags?: string[];
  paths?: string[];
  [key: string]: unknown;
};

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;

    if (!secret) {
      console.error("[Sanity Revalidate]: Missing SANITY_REVALIDATE_SECRET environment variable");
      return NextResponse.json(
        { message: "SANITY_REVALIDATE_SECRET is not configured on the server" },
        { status: 500 }
      );
    }

    const { isValidSignature, body } = await parseBody<SanityWebhookPayload>(
      req,
      secret,
      true // waitForContentLakeEventualConsistency (adds brief delay so Sanity CDN is ready)
    );

    if (!isValidSignature) {
      console.warn("[Sanity Revalidate]: Invalid webhook signature rejected");
      return NextResponse.json(
        { message: "Invalid signature" },
        { status: 401 }
      );
    }

    if (!body) {
      return NextResponse.json(
        { message: "Bad request - no body found in webhook payload" },
        { status: 400 }
      );
    }

    const revalidatedTags: string[] = ["sanity"];
    const revalidatedPaths: string[] = ["/"];

    // 1. Revalidate global 'sanity' tag (expire: 0 for immediate purge)
    revalidateTag("sanity", { expire: 0 });

    // 2. Revalidate document-specific tag if _type is present
    if (body._type) {
      revalidateTag(body._type, { expire: 0 });
      revalidatedTags.push(body._type);

      const slugValue =
        typeof body.slug === "object" && body.slug !== null
          ? body.slug.current
          : typeof body.slug === "string"
          ? body.slug
          : undefined;

      if (slugValue) {
        const slugTag = `${body._type}:${slugValue}`;
        revalidateTag(slugTag, { expire: 0 });
        revalidatedTags.push(slugTag);
      }

      // Revalidate targeted paths based on content type
      if (body._type === "siteSettings") {
        revalidatePath("/");
        revalidatePath("/about");
        revalidatedPaths.push("/about");
      } else if (body._type === "category") {
        revalidatePath("/");
        revalidatePath("/work");
        revalidatedPaths.push("/work");
        if (slugValue) {
          const catPath = `/work/${slugValue}`;
          revalidatePath(catPath);
          revalidatedPaths.push(catPath);
        }
      } else if (body._type === "project") {
        revalidatePath("/");
        revalidatePath("/work");
        revalidatedPaths.push("/work");
      } else if (body._type === "testimonial") {
        revalidatePath("/");
      }
    }

    // 3. Revalidate any explicit tags passed in payload
    if (Array.isArray(body.tags) && body.tags.length > 0) {
      for (const tag of body.tags) {
        if (typeof tag === "string" && tag.trim()) {
          revalidateTag(tag, { expire: 0 });
          revalidatedTags.push(tag);
        }
      }
    }

    // 4. Revalidate any explicit paths passed in payload
    if (Array.isArray(body.paths) && body.paths.length > 0) {
      for (const path of body.paths) {
        if (typeof path === "string" && path.trim()) {
          revalidatePath(path);
          revalidatedPaths.push(path);
        }
      }
    }

    // 5. Revalidate entire site layout cache to ensure freshness across static pages
    revalidatePath("/", "layout");

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      revalidatedTags: Array.from(new Set(revalidatedTags)),
      revalidatedPaths: Array.from(new Set(revalidatedPaths)),
      docType: body._type,
      docId: body._id,
    });
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Sanity Revalidate Error]:", error);
    return NextResponse.json(
      { message: error.message || "An error occurred during revalidation" },
      { status: 500 }
    );
  }
}
