import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";
// import { useToasts } from "react-toast-notifications";

import { createComment, toggleLike } from "../api";
import { usePosts } from "../hooks";
import styles from "../styles/home.module.css";
import { Comment } from "./";

const Post = ({ post }) => {
  const [comment, setComment] = useState("");
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();

  // const { addToast } = useToasts();
  // useEffect(() => {
  //   let newDate = new Date();
  //   let showDate =
  //     newDate.getHours().toString() + ":" + newDate.getMinutes().toString();
  //   setDate(showDate);
  // }, [date]);

  const handleAddComment = async (e) => {
    if (e.key === "Enter") {
      setCreatingComment(true);

      const response = await createComment(comment, post._id);

      if (response.success) {
        setComment("");
        posts.addComment(response.data.comment, post._id);
        // addToast("Comment created successfully!", {
        //   appearance: "success",
        // });
        alert("Comment created successfully!");
      } else {
        // addToast(response.message, {
        //   appearance: "error",
        // });
        alert(response.message);
      }

      setCreatingComment(false);
    }
  };

  const handlePostLikeClick = async () => {
    const response = await toggleLike(post._id, "Post");

    if (response.success) {
      if (response.data.deleted) {
        alert("Like Removed Successfully");
      } else {
        alert("Like Added Successfully ");
      }
    } else {
      alert(response.message);
    }
  };

  return (
    <div className={styles.postWrapper} key={post._id}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/9220/9220540.png"
            alt="user-pic"
          />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
                state: {
                  user: post.user,
                },
              }}
              className={styles.postAuthor}
            >
              {post.user.name}
            </Link>
            <span className={styles.postTime}>Minute ago</span>
          </div>
        </div>
        <div className={styles.postContent}>{post.content}</div>

        <div className={styles.postActions}>
          <div className={styles.postLike}>
            <button onClick={handlePostLikeClick}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/1077/1077035.png"
                alt="likes-icon"
              />
            </button>
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/3034/3034023.png"
              alt="comments-icon"
            />
            <span>{post.comments.length}</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={`post-comment-${comment._id}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  posts: PropTypes.object.isRequired,
};

export default Post;
