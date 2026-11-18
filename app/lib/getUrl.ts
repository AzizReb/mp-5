"use server";
import getCollection, { URLS_COLLECTION } from "@/db";

export async function getUrl(alias: string): Promise<string | null> {
    const collection = await getCollection(URLS_COLLECTION);
    const entry = await collection.findOne({ alias });
    return entry ? (entry.url as string) : null;
}