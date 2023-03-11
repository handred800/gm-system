import { useEffect, useState } from 'react';
import { useAI } from './hooks/useAIChoice';
import * as GM from './gm';

export default function App() {
  const [player, setPlayer] = useState(null);
  const [opposition, setOpposition] = useState(null);
  const [turnCount, setTurnCount] = useState(0);
  const [isPlayerTurn, setPlayerTurn] = useState(true);
  const [makeChoice, currentChoice] = useAI(['attack']);

  useEffect(() => {
    setPlayer(GM.playerInit({ name: 'Vivan' }));
    setOpposition(GM.oppositionInit({ id: 1 }));
  }, []);

  useEffect(() => {
    console.log(`current turn: ${turnCount}, ${isPlayerTurn ? 'player' : 'opposition'} turn`);
    if (!isPlayerTurn) {
      makeChoice();
      console.log(`opposition choose ${currentChoice}`);
    }
  }, [turnCount]);

  function attack({ sender, receiver }) {
    setTurnCount((prev) => (prev += 1));
    setPlayerTurn(!isPlayerTurn);
    console.log(`${sender} attack ${receiver}`);
  }

  return (
    <div>
      <textarea value={JSON.stringify(player, null, 2)} style={{ width: '100%' }} rows="10" readOnly></textarea>
      <textarea value={JSON.stringify(opposition, null, 2)} style={{ width: '100%' }} rows="10" readOnly></textarea>
      <button onClick={attack}>attack</button>
    </div>
  );
}
