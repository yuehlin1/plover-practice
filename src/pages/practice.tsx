import React, { useState } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import words_ from "./70001.json";
import lookup from "./lookup.json";

const words = words_.sort((a, b) => 0.5 - Math.random());

interface StenoKeyProps {
  text: string;
  rounded: boolean;
  pressed?: boolean;
  style?: React.CSSProperties;
}

const StenoKey = ({
  text,
  rounded,
  pressed = false,
  style = {},
}: StenoKeyProps) => {
  return (
    <div
      style={{
        ...style,
        width: 30,
        height: 60,
        borderRadius: 3,
        backgroundColor: pressed ? "darkred" : "black",
        color: "white",
        borderBottomRightRadius: rounded ? 15 : 3,
        borderBottomLeftRadius: rounded ? 15 : 3,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background 0.2s",
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      <b>{text}</b>
    </div>
  );
};

const STENO_LAYOUT = ["STPH*FPLTD", "SKWR*RBGSZ", "AOEU"];

interface StenoKeyChord {
  chord: string;
}

interface StenoKeyboardProps {
  pressedInfo: string;
}
const STENO_KEY_IDS = "stph*FPLTDskwr*RBGSZAOEU";

const readablifyChord = (chord: string) => {
  const re = "['A', 'O', 'E', 'U', '*', '-']";
  const vowelPosition = chord.search(re);
  const newChord = Array.from(chord);
  for (let i = 0; i < newChord.length; i++) {
    if (i < vowelPosition) {
      newChord[i] = newChord[i].toLowerCase();
    } else {
      break;
    }
  }
  // return "THEURT";
  return newChord.join("");
};

const getPressedInfo = (str: string) =>
  Array.from(STENO_KEY_IDS)
    .map((x) => (str.includes(x) ? "1" : "0"))
    .join("");

const StenoKeyboard = ({ chord }: StenoKeyChord) => {
  const pressedInfo1 = getPressedInfo(chord);
  return (
    <div style={{ width: 400, margin: "0 auto" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          columnGap: 7,
          marginBottom: 5,
        }}
      >
        {Array.from(STENO_LAYOUT[0]).map((char, index) => (
          <StenoKey
            key={index}
            text={char}
            rounded={false}
            pressed={pressedInfo1[index] === "1"}
          />
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          columnGap: 7,
          marginBottom: 14,
        }}
      >
        {Array.from(STENO_LAYOUT[1]).map((char, index) => (
          <StenoKey
            key={index}
            text={char}
            rounded
            pressed={pressedInfo1[index + 10] === "1"}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          columnGap: 7,
        }}
      >
        {Array.from(STENO_LAYOUT[2]).map((char, index) => (
          <StenoKey
            key={index}
            text={char}
            rounded
            pressed={pressedInfo1[index + 20] === "1"}
            style={index === 1 ? { marginRight: 10 } : {}}
          />
        ))}
      </div>
    </div>
  );
};

const TEST_STRING = ["some", "words"];
const dict = { some: "sOPL", words: "wORDZ" };

const test_dash = () => {
  let also = "HR-S";
  let i;
  let rfy_also = readablifyChord(also);
  console.log(rfy_also);
};

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  const [text, setText] = useState("");
  const tackle_text = (text: string) => {
    if (text.toLowerCase().replaceAll(" ", "") === words[0].toLowerCase()) {
      setText("");
      words.shift();
    }
    return text;
  };
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        {test_dash()}
        {/* <h1 align="left">{words.slice(0, 10).join(" ")}</h1> */}
        <h1>{words[0]}</h1>
        {/* <h1> {TEST_STRING[0]} </h1> */}
        <h1> {lookup[words[0]][0]}</h1>
        <input
          style={{
            marginBottom: 20,
            background: "rgba(0,0,0,0.2)",
            padding: 10,
            border: "none",
            borderRadius: 10,
          }}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {tackle_text(text)}

        {/* <StenoKeyboard chord={text} /> */}
        <StenoKeyboard chord={readablifyChord(lookup[words[0]][0])} />
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
