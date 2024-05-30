import styles from "@/styles/post.module.css";
import Image from "next/image";
import user_icon from "@/public/icon/user_icon.svg";
import TimeToBefore from "@/utils/timeToBefore";

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

interface CommentProps {
  comment: Comments;
}

export default function Comment({ comment }: CommentProps) {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.commentContenContainer}>
        <span className={styles.commentContent}>{comment.content}</span>
        {/* 더보기 버튼 */}
      </div>
      <div className={styles.commentInfo}>
        {comment.writer.image ? (
            <Image width={32} height={32} alt="profile" src={comment.writer.image} />
        ) : (
            <Image width={32} height={32} alt="profile" src={user_icon} />
        )}
        <div className={styles.commentInfoRight}>
            <span className={styles.commentWriter}>{comment.writer.nickname}</span>
            <span className={styles.commentTimes}>{TimeToBefore(comment.createdAt)}</span>
        </div>
      </div>
    </div>
  );
}
