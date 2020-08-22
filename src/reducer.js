export const initialState = {
  categories: [
    {
      id: 1,
      name: "Job Seeking",
    },
    {
      id: 2,
      name: "Informative",
    },
    {
      id: 3,
      name: "Changing Bad Habits",
    },
  ],
  posts: [
    {
      id: 1,
      title: "Post 1 Title",
      description: "Post 1 Description",
      categories: [
        {
          id: 1,
          name: "Job Seeking",
        },
        {
          id: 2,
          name: "Informative",
        },
      ],
    },
    {
      id: 2,
      title: "Post 2 Title",
      description: "Post 2 Description",
      categories: [
        {
          id: 1,
          name: "Job Seeking",
        },
        {
          id: 3,
          name: "Changing Bad Habits",
        },
      ],
    },
    {
      id: 3,
      title: "Post 3 Title",
      description: "Post 3 Description",
      categories: [
        {
          id: 3,
          name: "Changing Bad Habits",
        },
      ],
    },
  ],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "add_category":
      let addCatState = {
        ...state,
        categories: [...state.categories],
      };
      addCatState.categories.push(action.payload);
      return addCatState;
    case "delete_category":
      let delCatState = {
        posts: [...state.posts],
        categories: [...state.categories],
      };
      delCatState.categories = delCatState.categories.filter(
        (cat) => cat.id !== action.payload.id
      );
      console.log("yes");
      delCatState.posts = delCatState.posts.map((post) => {
        post.categories = post.categories.filter(
          (cat) => cat.id !== action.payload.id
        );
        return post;
      });

      return delCatState;
    case "update_category":
      let updCatState = {
        posts: [...state.posts],
        categories: [...state.categories],
      };
      updCatState.categories.forEach((cat, index) => {
        if (cat.id === action.payload.id) {
          updCatState.categories.splice(index, 1, action.payload);
        }
      });
      updCatState.posts.map((post) => {
        post.categories = post.categories?.map((cat) => {
          if (cat.id === action.payload.id) {
            cat.name = action.payload.name;
          }
          return cat;
        });
        return post;
      });
      return updCatState;
    case "add_post":
      let addPostState = {
        ...state,
        posts: [...state.posts],
      };
      addPostState.posts.push(action.payload);
      return addPostState;
    case "edit_post":
      let updPostState = {
        ...state,
        posts: [...state.posts],
      };
      updPostState.posts.forEach((cat, index) => {
        if (cat.id === action.payload.id) {
          updPostState.posts.splice(index, 1, action.payload);
        }
      });
      return updPostState;
    case "delete_post":
      let delPostState = {
        ...state,
        posts: [...state.posts],
      };
      delPostState.posts = delPostState.posts.filter(
        (post) => post.id !== action.payload.id
      );
      return delPostState;
    case "deleteCatFromPost":
      let delCatFPState = {
        ...state,
        posts: [...state.posts],
      };
      delCatFPState.posts.forEach((post) => {
        if (post.id === action.payload.post_id) {
          post.categories.map((cat, index) => {
            if (cat.id === action.payload.cat_id) {
              post.categories.splice(index, 1);
            }
          });
        }
      });
      return delCatFPState;
    case "add_cat_to_post":
      let addCatPostState = {
        ...state,
        posts: [...state.posts],
      };
      addCatPostState.posts.forEach((post) => {
        if (post.id === action.payload.post_id) {
          post.categories.push(action.payload.category);
        }
      });
      return addCatPostState;
    // case "create_cat_add_to_post":
    //   let CrCatAddPostState = {
    //     categories: [...state.categories],
    //     posts: [...state.posts],
    //   };
    //   CrCatAddPostState.categories.push(action.payload.category);
    //   CrCatAddPostState.posts.forEach((post) => {
    //     if (post.id === action.payload.post_id) {
    //       post.categories.push(action.payload.category);
    //     }
    //   });

    //   return CrCatAddPostState;
    default:
      return state;
  }
};
