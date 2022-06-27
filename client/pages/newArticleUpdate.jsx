import React, { useEffect, useState } from "react";

function ArticleUpdate({ news: { headline, message } }) {
  return (
    <div>
      <strong>{headline}: </strong>
      {message}
    </div>
  );
}

function ArticleUpdateApplication() {
  const [ws, setWs] = useState();
  useEffect(() => {
    const ws = new WebSocket(window.location.origin.replace(/^http/, "ws"));
    ws.onmessage = (event) => {
      const { headline, message } = JSON.parse(event.data);
      setNewsLog((oldState) => [...oldState, { headline, message }]);
    };
    setWs(ws);
  }, []);

  const [newsLog, setNewsLog] = useState([]);
  return (
    <div>
      <h1>Live nyheter</h1>
      <main>
        {newsLog.map((news, index) => (
          <ArticleUpdate key={index} news={news} />
        ))}
      </main>
      <h1>Siden er under påbygging!</h1>
    </div>
  );
}

export function NewArticleUpdate() {
  return <ArticleUpdateApplication />;
}
