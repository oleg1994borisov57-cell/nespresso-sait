import { useState } from "react";
import { Answer, FaqItemWrapper, Question } from "./styles";
import replaceSpacesWithBr from "../../../../../utils/replaceSpacesWithBr";

export default function FaqItem({ question, answer }) {
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);

  const toggleQuestionOpen = () => {
    setIsQuestionOpen((isOpen) => !isOpen);
  };

  return (
    <FaqItemWrapper>
      <Question
        onClick={toggleQuestionOpen}
        className={isQuestionOpen ? "active" : null}
      >
        {question}
      </Question>
      {isQuestionOpen ? (
        <Answer
          dangerouslySetInnerHTML={{ __html: replaceSpacesWithBr(answer) }}
        ></Answer>
      ) : null}
    </FaqItemWrapper>
  );
}
