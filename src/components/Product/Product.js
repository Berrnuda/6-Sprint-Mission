import React, { useEffect, useState } from "react";
import "../../style/product.css";
import HeartIcon from "../../assets/icon/ic_heart.svg";
import { getProductData, getProductCommentData } from "../utils/API";
import { Link, useParams } from "react-router-dom";
import Commas from "../../util/Commas";
import TimeString from "../../util/times";
import inquiry_empty from "../../assets/img/img_inquiry_empty.svg";
import ic_back from "../../assets/icon/ic_back.svg";

export default function Product() {
  const [productData, setProductData] = useState(null);
  const [productCommentData, setProductCommentData] = useState(null);
  const [comment, setComment] = useState("");
  const [isFilled, setIsFilled] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductData(id);
        setProductData(data);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchCommentData = async () => {
      try {
        const commentData = await getProductCommentData(id);
        setProductCommentData(commentData);
        console.log(productCommentData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchData();
    fetchCommentData();
    console.log(productCommentData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCommentChange = (e) => {
    const text = e.target.value;
    setComment(text);
    setIsFilled(text.trim().length > 0);
  };

  return (
    <>
      {productData && (
        <div className="product-container">
          <div className="product-header">
            <div className="product-header-img">
              <img src={productData.images[0]} alt="Product" />
            </div>
            <div className="product-header-text">
              <p className="product-header-name">{productData.name}</p>
              <p className="product-header-price">
                {Commas(productData.price)}원
              </p>
              <hr />
              <p className="product-header-des">
                상품 소개 <br />
                {productData.description}
              </p>
              <p className="product-header-tag">상품 태그</p>
              <div className="product-header-tags">
                {productData.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="like">
                <div className="like2">
                  <img src={HeartIcon} alt="Heart" />
                  <p>{productData.favoriteCount}</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="add-comment-container">
            <p>문의하기</p>
            <textarea
              className="add-comment-des"
              placeholder="개인정보를 고유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              value={comment}
              onChange={handleCommentChange}
            />
            <button className={isFilled ? "filled" : ""}>등록</button>
          </div>
          <div className="comment-container">
            {productCommentData && productCommentData.list.length > 0 ? (
              <div>
                {productCommentData.list.map((comment) => (
                  <div key={comment.id} className="comments">
                    <p className="comments-des">{comment.content}</p>
                    <div className="comment-writer">
                      <img src={comment.writer.image} alt="writer img" />
                      <div className="comment-writer-nickname">
                        <p className="comments-writer">
                          {comment.writer.nickname}
                        </p>
                        <p className="comments-times">
                          {TimeString(comment.updatedAt)}
                        </p>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            ) : (
              <div className="comment-empty-container">
                <img src={inquiry_empty} alt="no comment" />
                <p>아직 문의가 없습니다.</p>
              </div>
            )}
            <div className="back-container">
              <div>
                <Link to="/items" className="back-btn">
                  목록으로 돌아가기
                </Link>
                <img src={ic_back} alt="back to items" className="back-img" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
