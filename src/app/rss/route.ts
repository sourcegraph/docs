import RSS from "rss";

export async function GET() {
    const siteUrl = 'https://sourcegraph.com/docs'

    const feedOptions = {
        title: 'Sourcegraph Releases',
        site_url: siteUrl,
        feed_url: `${siteUrl}/rss`,
        pubDate: new Date(),
    };
    const feed = new RSS(feedOptions);

    ['a', 'b'].forEach((post) => {
        feed.item({
            title: post,
            url: `${siteUrl}/rss/${post}`,
            date: new Date(),
            description: 'post?.description',
        });
    });

    return new Response(feed.xml({ indent: true }), {
        headers: {
            "Content-Type": "application/xml; charset=utf-8",
        },
    });
}
