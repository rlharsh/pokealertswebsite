import { NextResponse } from "next/server";

export async function GET() {
    try {
        const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
        const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

        const QUERY = `
        {
            userTestimonialCollection {
                items {
                    userId
                    timestamp
                    messageContent {
                        json
                    }
                    userAvatar
                    userName
                }
            }
        }`;

        const response = await fetch(`https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({ query: QUERY }),
        });

        // Parse the JSON response from Contentful
        const { data, errors } = await response.json();

        if (errors) {
            console.error("Contentful errors:", errors);
            return NextResponse.json({ errors }, { status: 500 });
        }

        const testimonials = data?.userTestimonialCollection?.items || [];

        return NextResponse.json(
            {
                contentCount: testimonials.length,
                content: testimonials,
                status: 200,
            },
            { headers: { "Cache-Control": "s-maxage=60, stale-while-revalidate=120" } }
        );
    } catch (e) {
        console.error("An error occurred:", e);
        return NextResponse.json({ contentCount: 0, error: "Unknown error" }, { status: 500 });
    }
}
