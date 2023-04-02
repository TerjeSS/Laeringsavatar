import React from "react";

const faqItem = ({ question }) => {
  return (
    <div>
      <ul>
        <li>
          <b>{question.question}</b>
        </li>
        <ul>
          <li>{question.answer}</li>
        </ul>
      </ul>
    </div>
  );
};

export default faqItem;
