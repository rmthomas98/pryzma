import { useContext } from "react";
import SymbolContext from "../SymbolContext";

const News = () => {

  const {symbol} = useContext(SymbolContext)

  return <div>{symbol}</div>
}

export default News;