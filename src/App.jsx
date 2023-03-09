import { useEffect, useState } from 'react';
import * as GM from './gm';

export default function App() {
  const [player, setPlayer] = useState(null);
  const [opposition, setOpposition] = useState(null);
  const [turnCount, setTurnCount] = useState(0);

  useEffect(() => {
    setPlayer(GM.playerInit({ name: 'Vivan' }));
    setOpposition(GM.oppositionInit({ id: 1 }));
  }, []);

  useEffect(() => {
    console.log(`now turn: ${turnCount}`);
  }, [turnCount]);

  function attack({sender, receiver}) {
    setTurnCount((prev) => (prev += 1));
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
