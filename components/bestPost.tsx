import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import style from "@/styles/bestPost.module.css";
import bestBadge from "@/public/icon/img_badge.svg";
import heartImg from "@/public/icon/ic_heart.svg";
import Image from "next/image";
import timeString from "@/utils/timeString";

interface List {
  id: number;
  title: string;
  content: string;
  image: null | string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: Writer;
}

interface Writer {
  id: number;
  nickname: string;
}

export default function BestPost() {
  const [bestPosts, setBestPosts] = useState<List[]>([]);

  async function getBest() {
    const res = await axios.get("/articles?page=1&pageSize=3&orderBy=like");
    const posts = res.data.list ?? [];
    setBestPosts(posts);
  }

  useEffect(() => {
    try {
      getBest();
    } catch (error) {
      console.log(error);
    }
    
  }, []);

  return (
    <>
      {bestPosts.map((item) => (
        <div className={style.BestContainer} key={item.id}>
          <div className={style.BestBadge}>
            <Image
              width={102}
              height={30}
              src={bestBadge}
              alt="베스트뱃지"
              className={style.bestBadge}
            />
          </div>
          <div className={style.BestTitle}>
            <span className={style.BestTitleText}>{item.title}</span>
            {/* 이미지가 널이 아니면 */}
            {item.image && (
              <Image width={72} height={72} alt="이미지" src={item.image} />
            )}
          </div>
          <div className={style.BestInfo}>
            <div className={style.BestInfoFirst}>
              <span>{item.writer.nickname}</span>
              <div className={style.BestInfoHeart}>
                <Image width={16} height={16} alt="하트" src={heartImg} />
                <span>{item.likeCount}</span>
              </div>
            </div>
            <div>
              <span>{timeString(item.createdAt)}</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
