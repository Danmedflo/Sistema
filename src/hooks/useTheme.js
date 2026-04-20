import { useContext } from "react";
import { UIContext } from "../context/UIContext";

function useTheme() {
  return useContext(UIContext);
}

export default useTheme;