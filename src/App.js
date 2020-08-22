import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import useStateValue from "./StateProvider";
import Category from "./Components/Category/Category";
import { Button, makeStyles } from "@material-ui/core";
import Post from "./Components/Post/Post";
import CreateCatModal from "./Components/CreateCatModal/CreateCatModal";
import CreatePostModal from "./Components/CreatePostModal/CreatePostModal";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const modalStyle = getModalStyle();
  const state = useStateValue()[0];
  const [openCreateCat, setOpenCreateCat] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);

  return (
    <Router>
      <div className="app">
        <div className="container">
          <Switch>
            <Route exact path="/">
              <div className="posts cont">
                <div className="post_header cont__head">
                  <div className="cont__head__title">
                    <h1>Posts / </h1>
                    <Link to="/categories">Go To Categories</Link>
                  </div>

                  <Button
                    onClick={() => setOpenCreatePost(!openCreatePost)}
                    className="create"
                    variant="contained"
                  >
                    Create New Post
                  </Button>
                </div>
                {state.posts?.map((post) => (
                  <Post
                    paper={classes.paper}
                    modalStyle={modalStyle}
                    key={post.id}
                    post={post}
                  />
                ))}
              </div>
            </Route>
            <Route path="/categories">
              <div className="categories cont">
                <div className="categories_header cont__head">
                  <div className="cont__head__title">
                    <h1>Categories / </h1>
                    <Link exact="true" to="/">
                      Go To Posts
                    </Link>
                  </div>

                  <Button
                    onClick={() => setOpenCreateCat(!openCreateCat)}
                    className="create"
                    variant="contained"
                  >
                    Create New Category
                  </Button>
                </div>
                {state.categories?.map((cat) => (
                  <Category
                    key={cat.id}
                    category={cat}
                    modalStyle={modalStyle}
                    paper={classes.paper}
                  />
                ))}
              </div>
            </Route>
          </Switch>
        </div>
      </div>
      <CreateCatModal
        modalStyle={modalStyle}
        openCreateCat={openCreateCat}
        setOpenCreateCat={setOpenCreateCat}
        paper={classes.paper}
      />
      <CreatePostModal
        modalStyle={modalStyle}
        paper={classes.paper}
        openCreatePost={openCreatePost}
        setOpenCreatePost={setOpenCreatePost}
      />
    </Router>
  );
}

export default App;
