import { useContext } from "react";
import SymbolContext from "../SymbolContext";

const Overview = () => {
  const {symbol} = useContext(SymbolContext)

  console.log(symbol)

  return <div>{symbol}</div>
}

export default Overview;