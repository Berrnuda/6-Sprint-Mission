import { useRouter } from "next/router";
import styles from "@/styles/post.module.css";
import axios from "@/utils/axios";
import ViewHr from "@/public/icon/view_hr.svg";
import heartImg from "@/public/icon/ic_heart.svg";
import user_icon from "@/public/icon/user_icon.svg";
import Image from "next/image";
import timeString from "@/utils/timeString";
import Comment from "@/components/boards/id/comment";
import getUser from "@/utils/getUser";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { PostViewProps, getUserData, getUserMessage } from "@/types";
import Link from "next/link";
import ic_back from "@/public/icon/ic_back.png";
import reply_empty from "@/public/icon/img_reply_empty.svg";
import nullImg from "@/public/icon/null.png";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;

  try {
    const [articleRes, commentsRes] = await Promise.all([
      axios.get(`/articles/${id}`),
      axios.get(`/articles/${id}/comments?limit=99`),
    ]);

    return {
      props: {
        article: articleRes.data,
        comments: commentsRes.data.list ?? [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true,
    };
  }
};

export default function PostView({ article, comments }: PostViewProps) {
  const [newComment, setNewComment] = useState<string>("");
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const accessToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const router = useRouter();
  const id = router.query["id"];

  async function postComment() {
    if (accessToken === null) {
      return alert("로그인 ㄱ");
    } else if (newComment === "") {
      return alert("댓글작성 ㄱ");
    } else if (newComment.length <= 2) {
      return alert("좀만 더 길게 작성 ㄱ");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 ㄱ");
        router.push("/mypage");
        return;
      }

      if ((userData as getUserData).nickname) {
        const res = await axios.post(
          `/articles/${id}/comments`,
          {
            content: newComment,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        router.push(`/boards/${id}`);

        setNewComment("");
      }
    } catch (error) {
      console.log("댓글을 작성하는 중 오류가 발생했습니다.", error);
      alert("로그인 다시 ㄱ");
    }
  }

  async function handleEditClick(id: number) {
    setIsEdit((prev) => !prev);
  }

  async function handleDeleteClick(id: number) {
    if (accessToken === null) {
      return alert("로그인 ㄱ");
    }

    try {
      const userData = await getUser(accessToken);

      if (!userData || (userData as getUserMessage).message) {
        alert("다시 로그인 ㄱ");
        router.push("/mypage");
        return;
      }

      if ((userData as getUserData).nickname) {
        const res = await axios.delete(`/comments/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (res.status === 200) {
          alert("삭제 완료");
          router.push(`/boards/${id}`);
        }
      }
    } catch (error: any) {
      if (error.response.status === 401 || error.response.status === 403) {
        return alert("권한 ㄴ");
      }
    }
  }

  const imageSrc = article?.image
  ? article.image.startsWith(
      "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com"
    )
    ? article.image
    : nullImg
  : null;

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
            {imageSrc && (
              <Image width={512} height={512} src={imageSrc} alt="zzz" />
            )}
            <br></br>
            <span className={styles.viewPostContent}>{article.content}</span>
          </div>
        </div>
        <div className={styles.viewPostMiddle}>
          <span className={styles.viewAddText}>댓글 달기</span>
          <textarea
            className={styles.viewAddContent}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="댓글을 입력해주세요."
          ></textarea>
          <div className={styles.viewAddBtnContainer}>
            <button
              className={`${styles.viewAddBtn} ${
                newComment === "" ? "" : styles.active
              }`}
              onClick={postComment}
            >
              등록
            </button>
          </div>
        </div>
        <div className={styles.viewPostBottom}>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment
                comment={comment}
                key={comment.id}
                isEdit={isEdit}
                onEdit={handleEditClick}
                onDelete={handleDeleteClick}
              />
            ))
          ) : (
            <div className={styles.commentEmptyContainer}>
              <Image
                width={140}
                height={140}
                src={reply_empty}
                alt="no comment"
              />
              <p>
                아직 댓글이 없어요,
                <br />
                지금 댓글을 달아보세요!
              </p>
            </div>
          )}
        </div>
        <div className={styles.backContainer}>
          <div>
            <Link href="/boards" className={styles.backBtn}>
              목록으로 돌아가기
            </Link>
            <Image
              width={24}
              height={24}
              src={ic_back}
              alt="back to items"
              className={styles.backImg}
            />
          </div>
        </div>
      </div>
    )
  );
}
