import { useRouter } from "next/router";
import styles from "@/styles/post.module.css";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import ViewHr from "@/public/icon/view_hr.svg";
import heartImg from "@/public/icon/ic_heart.svg";
import user_icon from "@/public/icon/user_icon.svg";
import Image from "next/image";
import timeString from "@/utils/timeString";
import Comment from "@/components/comment";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: ArticleWriter;
  isLiked: boolean;
}

interface ArticleWriter {
  id: number;
  nickname: string;
}

interface Comments {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: CommentsWriter;
}

interface CommentsWriter {
  id: number;
  nickname: string;
  image: string | null;
}

export default function PostView() {
  const [article, setArticle] = useState<Article | null>();
  const [comments, setComments] = useState<Comments[]>([]);

  const router = useRouter();
  const id = router.query["id"];

  async function getArticle() {
    try {
      const res = await axios.get(`/articles/${id}`);
      if (res.data && !res.data.message) {
        setArticle(res.data);
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getComments() {
    const res = await axios.get(`/articles/${id}/comments?limit=99`);
    setComments(res.data.list ?? []);
  }

  useEffect(() => {
    if (id) {
      getArticle();
      getComments();
    }
  }, [id]);

  return (
    article && (
      <div className={styles.viewBestContainer}>
        <div className={styles.viewPostTop}>
          <span className={styles.viewPostTitle}>{article.title}</span>
          <div className={styles.viewPostInfo}>
              <Image width={24} height={24} alt="프로필사진" src={user_icon} />
            <span className={styles.Writer}>{article.writer.nickname}</span>
            <span className={styles.times}>
              {timeString(article.createdAt)}
            </span>
            <Image height={24} width={24} alt="이게뭐지;" src={ViewHr} />
            <Image width={16} height={16} alt="하트" src={heartImg} />
            <span className={styles.LikeCount}>{article.likeCount}</span>
          </div>
          <div className={styles.viewPostDes}>
            <span className={styles.viewPostContent}>{article.content}</span>
          </div>
        </div>
        <div className={styles.viewPostMiddle}>
          <span className={styles.viewAddText}>댓글 달기</span>
          <textarea className={styles.viewAddContent}></textarea>
          <div className={styles.viewAddBtnContainer}>
            <button className={styles.viewAddBtn}>등록</button>
          </div>
        </div>
        <div className={styles.viewPostBottom}>
          {comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      </div>
    )
  );
}
