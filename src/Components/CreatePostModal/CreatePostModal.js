import React, { useState } from "react";
import "./CreatePostModal.css";
import {
  Button,
  Input,
  Modal,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import CreateCatAddToPost from "../CreateCatAddToPost/CreateCatAddToPost";
import DeleteIcon from "@material-ui/icons/Delete";
import useStateValue from "../../StateProvider";
import uuid from "react-uuid";

function getFilteredCats(postCategories, stateCategories) {
  let ids = postCategories?.map((cat) => cat.id);
  let copy = [...stateCategories];

  copy = copy.filter((cat) => !ids?.includes(cat.id));

  return copy;
}

function CreatePostModal({
  modalStyle,
  paper,
  openCreatePost,
  setOpenCreatePost,
}) {
  const [state, dispatch] = useStateValue();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [openCreateCatModal, setOpenCreateCatModal] = useState(false);
  const fileteredCats = getFilteredCats(categories, state.categories);

  function createPost() {
    dispatch({
      type: "add_post",
      payload: {
        id: uuid(),
        title,
        description,
        categories,
      },
    });
    setTitle("");
    setDescription("");
    setCategories([]);
    setOpenCreatePost(false);
  }

  function addCatToPost(value) {
    if (value === "create__new") {
      setOpenCreateCatModal(true);
    } else {
      setCategories([...categories, value]);
    }
  }

  const deleteCatFromPost = (id) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== id)
    );
  };
  return (
    <React.Fragment>
      <Modal
        open={openCreatePost}
        onClose={() => {
          setOpenCreatePost(false);
          setTitle("");
          setDescription("");
          setCategories([]);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={paper}>
          <form className="modal">
            <center>
              <h1>Create Post</h1>
            </center>
            <Input
              className="inputfield"
              type="text"
              placeholder="Enter Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>

            <FormControl>
              <Select
                variant="outlined"
                value="select"
                onChange={(e) => addCatToPost(e.target.value)}
                // onChange={(e) => {
                //   setCountry(e.target.value)
                //   countries.forEach((country) => {
                //     if (country.country === e.target.value) {
                //       setMapZoom(3)
                //       return setMapCenter([country.countryInfo.lat, country.countryInfo.long])
                //     }
                //     if (e.target.value === 'all') {
                //       setMapZoom(3)
                //     }
                //   })
                // }}
              >
                <span className="select_category" value="select">
                  Select Category
                </span>
                <MenuItem value="create__new">
                  <strong>Create New Category</strong>
                </MenuItem>
                {/* {countries.length !== 0 &&
                  countries.map(({ country }, index) => (
                    <MenuItem key={index} value={country}>
                      {country}
                    </MenuItem>
                  ))} */}
                {fileteredCats?.length !== 0 &&
                  fileteredCats?.map((cat) => (
                    <MenuItem key={cat.id} value={cat}>
                      {cat.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="selected_categories">
              {categories?.map((cat) => (
                <p key={cat.id} className="selected_category">
                  {cat.name}{" "}
                  <DeleteIcon
                    className="deleteIcon"
                    onClick={() => deleteCatFromPost(cat.id)}
                  />
                </p>
              ))}
            </div>

            <TextField
              className="inputfield"
              type="text"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="outlined-basic"
              label="Enter Post Description"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="secondary"
              disabled={categories === [] || !title || !description}
              type="submit"
              onClick={createPost}
            >
              Create
            </Button>
          </form>
        </div>
      </Modal>
      <CreateCatAddToPost
        setCatsInField={setCategories}
        modalStyle={modalStyle}
        paper={paper}
        openCreateCatModal={openCreateCatModal}
        setOpenCreateCatModal={setOpenCreateCatModal}
      />
    </React.Fragment>
  );
}

export default CreatePostModal;
