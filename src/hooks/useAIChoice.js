import { useState } from 'react';
import { random } from 'lodash';

export default function useAI(actions = []) {
  const [choiceList, setChoiceList] = useState(actions);
  const [currentChoice, setCurrentChoice] = useState(null);

  const makeChoice = () => {
    const c = choiceList[random(choiceList.length - 1)];
    setCurrentChoice(c);
  };

  return [setChoiceList, makeChoice, currentChoice];
}
