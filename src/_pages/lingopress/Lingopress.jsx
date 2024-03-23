import PressSection from "../../_components/lingopress/PressSection";
import Vocabulary from "../../_components/lingopress/Vocabulary";
import {useAtomValue} from "jotai/index";
import {authAtom} from "../../atom/user";

export default function Lingopress() {
  const authStatus = useAtomValue(authAtom);

  return (
    <div style={{
      display: "flex",
    }}>
      <br/>
      <PressSection authStatus={authStatus}/>
      {authStatus ? <Vocabulary/> : null}
    </div>
  );
}
