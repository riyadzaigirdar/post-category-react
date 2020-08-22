import React, { useState } from "react";
import "./Post.css";
import Button from "@material-ui/core/Button";
import useStateValue from "../../StateProvider";
import EditPostModal from "../EditPostModal/EditPostModal";

function Post({ post, paper, modalStyle }) {
  const dispatch = useStateValue()[1];
  const [openEditModalPost, setOpenEditModalPost] = useState(false);

  const deletePost = () => {
    dispatch({
      type: "delete_post",
      payload: {
        id: post.id,
      },
    });
  };
  return (
    <React.Fragment>
      <div className="post">
        <div className="post__header">
          <h1>{post.title}</h1>
          <div className="post__buttons">
            <Button
              onClick={() => setOpenEditModalPost(!openEditModalPost)}
              variant="contained"
              color="primary"
            >
              Edit
            </Button>
            <Button onClick={deletePost} variant="contained" color="secondary">
              Delete
            </Button>
          </div>
        </div>
        <div className="post__categories">
          {post.categories?.map((cat) => (
            <Button
              key={cat.id}
              className="post__categories__button"
              variant="contained"
            >
              {cat.name}
            </Button>
          ))}
        </div>
        <div className="post__description">{post.description}</div>
      </div>
      <EditPostModal
        categories={post.categories}
        post={post}
        modalStyle={modalStyle}
        paper={paper}
        openEditModalPost={openEditModalPost}
        setOpenEditModalPost={setOpenEditModalPost}
      />
    </React.Fragment>
  );
}

export default Post;
