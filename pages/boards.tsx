import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";

import { ArticlesList, BoardsProps } from "@/types";
import LinkButton from "@/utils/Button";
import axios from "@/utils/axios";

import styles from "@/styles/Board.module.css";
import BestPost from "@/components/boards/bestPost";
import SearchInput from "@/components/boards/search";
import Dropdown from "@/components/boards/dropdown";
import Posts from "@/components/boards/posts";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await axios.get("/articles");
    const PostsData: ArticlesList[] = res.data.list ?? [];

    return {
      props: {
        PostsData,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        PostsData: [],
      },
    };
  }
};

export default function Board({ PostsData }: BoardsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [posts, setPosts] = useState<ArticlesList[]>(PostsData);
  const [order, setOrder] = useState<"recent" | "like">("recent");

  const handleSortOrderChange = (selectedOrder: "recent" | "like"): void => {
    setOrder(selectedOrder);
  };

  const sortData = (data: ArticlesList[], order: "recent" | "like"): ArticlesList[] => {
    if (order === "recent") {
      return data
        .slice()
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } else if (order === "like") {
      return data.slice().sort((a, b) => b.likeCount - a.likeCount);
    } else {
      return data;
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = posts.filter((item) =>
    item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  useEffect(() => {
    const sortedPosts = sortData(PostsData, order);
    setPosts(sortedPosts);
  }, [order, PostsData]);

  return (
    <div className={styles.BoardContainer}>
      <div className={styles.bestContainer}>
        <span className={styles.bestTopText}>베스트 게시글</span>
        <div className={styles.bestPosts}>
          <BestPost />
        </div>
      </div>
      <div className={styles.posts}>
        <div className={styles.postsTop}>
          <span className={styles.bestTopText}>게시글</span>
          <LinkButton href="/">글쓰기</LinkButton>
        </div>
        <div className={styles.postsMiddle}>
          <SearchInput value={searchTerm} onChange={handleSearchChange} />
          <Dropdown onChange={handleSortOrderChange} />
        </div>
        <div className={styles.postsContainer}>
          {filteredData.map((post) => (
            <Posts key={post.id} posts={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
