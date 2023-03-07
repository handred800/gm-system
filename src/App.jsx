import { useState } from "react";
import * as GM from "./gm";
import useInput from "./hooks/useInput";

export default function App() {
  const [player, setPlayer] = useState(null);
  const [palyerName, playerNameHandler] = useInput("");

  function init(e) {
    e.preventDefault();
    setPlayer(GM.playerInit({ name: palyerName }));
  }

  return (
    <>
      {player ? (
        <div>
          <textarea
            value={JSON.stringify(player, null, 2)}
            style={{ width: "100%" }}
            rows="10"
            readOnly
          ></textarea>
        </div>
      ) : (
        <form>
          <input
            value={palyerName}
            onChange={playerNameHandler}
            placeholder="輸入名字"
          ></input>
          <button onClick={init}>create</button>
        </form>
      )}
    </>
  );
}
