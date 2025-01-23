
import StyleSpiner from "./styleCarregamento.module.css"

export function Spiner(){
  return (
    <div className={StyleSpiner.spinnerContainer}>
      <div className={StyleSpiner.spinner}></div>
    </div>
  );
};


