import React, { useState } from "react";
import {
  Modal,
  Input,
  Button,
  TextField,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import useStateValue from "../../StateProvider";
import DeleteIcon from "@material-ui/icons/Delete";
import "./EditPostModal.css";
import CreateCatAddToPost from "../CreateCatAddToPost/CreateCatAddToPost";

function getFilteredCats(postCategories, stateCategories) {
  let ids = postCategories?.map((cat) => cat.id);
  let copy = [...stateCategories];

  copy = copy.filter((cat) => !ids?.includes(cat.id));

  return copy;
}
function EditPostModal({
  post,
  modalStyle,
  paper,
  openEditModalPost,
  setOpenEditModalPost,
  categories,
}) {
  const [title, setTitle] = useState(post.title || "");
  const [description, setDescription] = useState(post.description || "");
  const [catsInField, setCatsInField] = useState(categories || []);
  const [state, dispatch] = useStateValue();
  const [openCreateCatModal, setOpenCreateCatModal] = useState(false);
  const fileteredCats = getFilteredCats(catsInField, state.categories);

  const editPost = (e) => {
    e.preventDefault();
    dispatch({
      type: "edit_post",
      payload: {
        id: post.id,
        title,
        description,
        categories: catsInField,
      },
    });
    setOpenEditModalPost(false);
  };
  const deleteCatFromPost = (cat_id) => {
    setCatsInField((prevState) => prevState.filter((cat) => cat.id !== cat_id));
  };

  const addCatToPost = (value) => {
    if (value === "create__new") {
      setOpenCreateCatModal(true);
    } else {
      setCatsInField((prevState) => [...prevState, value]);
    }
  };

  //   console.log(post.id, fileteredCats);
  return (
    <React.Fragment>
      <Modal
        open={openEditModalPost}
        onClose={() => {
          setOpenEditModalPost(false);
          setTitle(post.title);
          setDescription(post.description);
          setCatsInField(categories);
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={paper}>
          <form className="modal">
            <center>
              <h1>Edit Post</h1>
            </center>
            <Input
              className="inputfield"
              type="text"
              placeholder="Enter Category"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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
              {catsInField?.map((cat) => (
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
              label="Enter New Post Description"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={
                catsInField === categories &&
                title === post.title &&
                description === post.description
              }
              onClick={editPost}
            >
              Update
            </Button>
          </form>
        </div>
      </Modal>
      <CreateCatAddToPost
        setCatsInField={setCatsInField}
        modalStyle={modalStyle}
        paper={paper}
        openCreateCatModal={openCreateCatModal}
        setOpenCreateCatModal={setOpenCreateCatModal}
      />
    </React.Fragment>
  );
}

export default EditPostModal;
