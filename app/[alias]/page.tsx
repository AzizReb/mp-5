import { redirect } from "next/navigation";
import { getUrl } from "../lib/getUrl";

export default async function AliasPage({ params }: { params: Promise<{ alias: string }> }) {
    const { alias } = await params;
    const url = await getUrl(alias);

    if (url) {
        redirect(url);
    }
    return (
        <main style={{ textAlign: "center", padding: "5%" }}>
            <h1>Alias “{alias}” not found</h1>
            <a href="/">Create a short link</a>
        </main>
    );
}