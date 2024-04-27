import PressSection from "../../_components/lingopress/PressSection";
import { useAtomValue } from "jotai/index";
import { authAtom } from "../../atom/user";

export default function Lingopress() {
  const authStatus = useAtomValue(authAtom);

  return (
    <div
      style={{
        display: "flex",
        margin: "3rem",
        position: "relative",
      }}
    >
      <br />
      <PressSection authStatus={authStatus} />
    </div>
  );
}
