"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { createUrl } from "../lib/createUrl";

const PageDiv = styled.main`
    width: 70vw;
    max-width: 60vw;
    margin: 4% auto;
    text-align: center;
`;

const Card = styled.div`
    padding: 4%;
    background-color: #ffffff;
    border: 1px #dfe7e0 solid;
    text-align: left;
`;

const Input = styled.input`
    width: 90%;
    padding: 2%;
    margin: 1% 0% 3%;
    font: calc(2px + 1vw) ui-monospace, Menlo, monospace;
    border: 1px #cfd9d1 solid;
`;

const AliasDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const Button = styled.button`
    width: 100%;
    padding: 2%;
    margin: 2% 0%;
    font: calc(2px + 1vw) ui-monospace, Menlo, monospace;
    background-color: #2e7d32;
    color: #ffffff;
    border: 1px #2e7d32 solid;
`;

const MsgDiv = styled.div<{ status: string }>`
    padding: 3%;
    margin: 3% 0% 0%;
    background-color: ${(props) => (props.status === "error" ? "#fdecea" : "#eef6ef")};
    color: ${(props) => (props.status === "error" ? "#c62828" : "#1f2a22")};
    border: 1px ${(props) => (props.status === "error" ? "#f5c2bd" : "#b9d6bc")} solid;
`;

export default function ShortenForm() {
    const [origin, setOrigin] = useState("");
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [shortUrl, setShortUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setShortUrl(null);
        setCopied(false);

        const result = await createUrl(url, alias);
        if (result.error) {
            setError(result.error);
        } else {
            setError(null);
            setShortUrl(`${origin}/${result.alias}`);
            setUrl("");
            setAlias("");
        }
    }

    async function handleCopy() {
        if (!shortUrl) return;
        await navigator.clipboard.writeText(shortUrl);
        setCopied(true);
    }

    return (
        <PageDiv>
            <h1>URL Shortener</h1>
            <p>Shorten your long URLs into compact, shareable links</p>

            <Card>
                <h2>Shorten a URL</h2>
                <p>Enter a long URL to create a shorter, shareable link</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="url">URL</label>
                    <Input
                        id="url"
                        type="url"
                        placeholder="https://example.com/very/long/url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        required
                    />

                    <label htmlFor="alias">Custom Alias</label>
                    <AliasDiv>
                        <span>{origin}/</span>
                        <Input
                            id="alias"
                            type="text"
                            placeholder="your-custom-alias"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            title="Letters, numbers, - and _ only"
                            required
                        />
                    </AliasDiv>

                    <Button type="submit">Shorten</Button>
                </form>

                {error && <MsgDiv status="error">{error}</MsgDiv>}

                {shortUrl && (
                    <MsgDiv status="success">
                        <p>Your shortened URL:</p>
                        <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
                        <Button type="button" onClick={handleCopy}>
                            {copied ? "Copied!" : "Copy"}
                        </Button>
                    </MsgDiv>
                )}
            </Card>
        </PageDiv>
    );
}