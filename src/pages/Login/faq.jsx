import React from "react";
import FaqItem from "../../components/FaqItem";

const FAQ = () => {
  let questions = [
    {
      question:
        "Hvordan kan jeg flytte punktet jeg ser på figuren fra?",
      answer:
        "Trykk på figuren. Hvis en rød markering visualiseres, vil dette være punktet kamera beveger seg rundt."
    },
    {
      question:
        "Hvordan kan jeg se figuren bedre ovenfra, nedenfra eller fra siden?",
      answer:
        'På mobil eller nettbrett: Bruk én finger på skjermen og skyv den lett opp/ned eller sideveis. Da vil du dreie på "scenen/rommet" som figuren er i.',
    },
    {
      question: "Hvordan kan jeg zoome inn og ut?",
      answer:
        "Bruk to fingre på skjermen eller touch-pad og skyv de lett fra hverandre = zoom inn, eller trekk de lett mot hverandre = zoom ut.",
    },
    {
      question: "Hvordan kan jeg se bevegelsene i langsommere fart?",
      answer:
        "Juster hastighet under avspilling i instillinger (tannhjulknappen).",
    },
    {
      question:
        "Når jeg ser på animasjonene på mobil blir navigasjonen og menyen er borte",
      answer:
        "Ja, det stemmer - i prototypen er det ikke mulig å se navigasjonen og menyen på mobil. Du kan kun se på en animasjon sendt til deg på en lenke (der du har klikket på lenken) eller hvis du skriver inn lenke-teksten. Hvis du trenger meny/navigasjon for å laste opp fil til appen må du gjøre det fra en PC eller et nettbrett.",
    },
  ];

  return (
    <div className="faq-container">
      <h2>Spørsmål og svar</h2>

      {questions.map((question) => {
        return <FaqItem question={question} />;
      })}
    </div>
  );
};

export default FAQ;
