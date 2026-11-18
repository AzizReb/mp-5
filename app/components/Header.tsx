"use client";
import styled from "styled-components";

const HeaderBar = styled.header`
    padding: 2% 2%;
    background-color: #ffffff;
    border: 1px #dfe7e0 solid;
    font: bold calc(2px + 4vw) ui-monospace, Menlo, monospace;
`;

export default function Header() {
    return <HeaderBar>Aziz URL Shortener</HeaderBar>;
}