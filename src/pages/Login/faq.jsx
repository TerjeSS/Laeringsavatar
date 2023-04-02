import React from "react";
import FaqItem from "../../components/FaqItem";

const FAQ = () => {
  let questions = [
    {
      question:
        "Hvordan kan jeg flytte punktet jeg ser på figuren fra når jeg er på en Mac/PCmed touch-pad?",
      answer:
        "Trykk ned med to fingre og dra enten oppover, nedover eller sidelengs. Da skal du flytte deg horisontalt eller vertikalt i forhold til figuren.",
    },
    {
      question:
        "Hvordan kan jeg se figuren bedre ovenfra, nedenfra eller fra siden?",
      answer:
        'På mobil eller nettbrett: Bruk én finger på skjermen og skyv den lett opp/ned eller sideveis. Da vil du dreie på "scenen/rommet" som figuren er i ("tilte" rommet.") \nPå touch-pad må du bruke to fingre: Den ene fingertuppen skyves lett ned mens du lar den andre gli lett sideveis mot høyre eller venstre, eller opp- og nedover for å dreie på rommet.',
    },
    {
      question: "Hvordan kan jeg zoome inn og ut?",
      answer:
        "Bruk to fingre på skjermen eller touch-pad og skyv de lett fra hverandre = zoom inn, eller trekk de lett mot hverandre = zoom ut.",
    },
    {
      question: "Hvordan kan jeg se bevegelsene i langsommere fart?",
      answer:
        "Når du er inne i en animasjon. Gå til menylinjen over ruten med visualiseringen: Playback speed. Til høyre for den er det en rute med piler opp over og nedover. Her kan du velge hastighet på avspillingen av animasjonen.",
    },
    {
      question:
        "Hvordan kan jeg fikse at figuren ser så bred og strekt ut når jeg ser på den i liggende stilling på mobilen?",
      answer:
        "Det er lurt å laste inn siden på nytt når du snur til liggende format på mobilen, dette for at kamera skal resette seg til oppløsningen. Det samme gjelder når du bytter tilbake til å holde mobile 'stående', for å hindre at figuren blir strekt ut oppover.",
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
