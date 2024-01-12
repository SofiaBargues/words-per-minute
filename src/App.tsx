import React, { useEffect, useState } from "react";

const WORDS = [
  "whale",
  "goat",
  "dolphin",
  "elephant",
  "seal",
  "cat",
  "hyena",
  "iguana",
  "giraffe",
  "dog",
];

export default function WordsPerMinute() {
  const [word, setWord] = useState(() => {
    return WORDS[(Math.random() * WORDS.length) | 0];
  });
  const [characterCount, setCharacterCount] = useState(0);
  const [buffer, setBuffer] = useState("");
  const [time, setTime] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (buffer === word) {
      setWord(WORDS[(Math.random() * WORDS.length) | 0]);
      setCharacterCount((characterCount) => characterCount + word.length);
    }
    setBuffer("");
  }

  useEffect(() => {
    if (time !== 0) {
      const timeout = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timeout);
    }
  }, [time]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        textAlign: "center",
      }}
    >
      {Boolean(time) && <h1 style={{ fontSize: 60 }}>{word} </h1>}
      <h2>Typed {characterCount} characters </h2>
      {time !== 0 ? (
        <form onSubmit={handleSubmit}>
          <h3> Remainig time: {time}</h3>
          <input
            value={buffer}
            onChange={(e) => setBuffer(e.target.value)}
            type="text"
            autoFocus
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button
          onClick={() => {
            setTime(30);
            setCharacterCount(0);
          }}
        >
          Play
        </button>
      )}
    </div>
  );
}
