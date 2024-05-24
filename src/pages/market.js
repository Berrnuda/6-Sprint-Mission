import AllMarket from "../components/Market/AllMarket";
import BestMarket from "../components/Market/BestMarket";
import NavBar from "../components/header";
import "../style/market.css";

export default function MarketPage() {
  return (
    <>
      <NavBar />
      <div className="market">
        <BestMarket />
        <AllMarket />
      </div>
    </>
  );
}
