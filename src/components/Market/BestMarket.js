import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../style/bestMarket.css";
import Commas from "../../util/Commas";
import HeartIcon from "../../assets/icon/ic_heart.svg";
import { getMarketData } from "../utils/API";
import { useMediaQuery } from "react-responsive";

export default function BestMarket() {
  const [bestData, setBestData] = useState([]);
  const isMobile = useMediaQuery({
    query: "(max-width: 767px)",
  });
  const isTablet = useMediaQuery({
    query: "(min-width: 768px) and (max-width: 1279px)",
  });

  useEffect(() => {
    const fetchBestData = async () => {
      try {
        let size = 4; // 기본적으로 4개의 데이터를 가져옴
        if (isMobile) size = 1; // 모바일일 때는 1개의 데이터만 가져옴
        else if (isTablet) size = 2; // 태블릿일 때는 2개의 데이터를 가져옴

        const data = await getMarketData({ page: 1, size, order: "favorite" });
        setBestData(data.list);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestData();
  }, [isMobile, isTablet]);

  return (
    <div className="best-market">
      <h1 className="best-title">베스트 상품</h1>
      <div className="cards">
        {bestData.map((item) => (
          <Link to={`/items/${item.id}`} key={item.id}>
            <div className="card">
              <img className="best-img" src={item.images[0]} alt={item.name} />
              <p className="best-name">{item.name}</p>
              <p className="best-price">{Commas(item.price)}원</p>
              <div className="like">
                <img src={HeartIcon} alt="Heart" />
                <p>{item.favoriteCount}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
