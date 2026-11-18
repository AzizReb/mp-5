"use server";
import getCollection, { URLS_COLLECTION } from "@/db";
import type { ShortUrl } from "../interfaces/ShortUrl";

function ValidUrl(value: string): boolean {
    try {
        const parsed = new URL(value);
        return (parsed.protocol === "http:" || parsed.protocol === "https:") && parsed.hostname.includes(".");
    } catch {
        return false;
    }
}

export async function createUrl(url: string, alias: string): Promise<{ alias: string | null; error: string | null }> {
    const cleanUrl = url.trim();
    const cleanAlias = alias.trim();

    if (!ValidUrl(cleanUrl)) {
        return { alias: null, error: "Invalid URL. Must start with http:// or https://" };
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(cleanAlias)) {
        return { alias: null, error: "Alias can only contain letters, numbers, - and _" };
    }

    try {
        const collection = await getCollection(URLS_COLLECTION);
        const existing = await collection.findOne({ alias: cleanAlias });
        if (existing) {
            return { alias: null, error: "Alias already taken. Try another one." };
        }

        const newEntry: ShortUrl = { alias: cleanAlias, url: cleanUrl };
        await collection.insertOne(newEntry);
        return { alias: cleanAlias, error: null };
    } catch {
        return { alias: null, error: "Couldn't reach database. Try again later." };
    }
}