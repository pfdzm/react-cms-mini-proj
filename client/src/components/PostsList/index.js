import React, { useEffect } from "react";
import { ListItem, List } from "../List";
import DeleteBtn from "../DeleteBtn";
import { Link } from "react-router-dom";

import { useStoreContext } from "../../utils/GlobalState";

import API from "../../utils/API";

const PostsList = () => {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: "SAVING" });
    API.getPosts().then(({ data }) =>
      dispatch({ type: "FETCH_POSTS", payload: data })
    );
  }, []);

  return (
    <div>
      <h1>All Blog Posts</h1>
      <h3 className="mb-5 mt-5">Click on a post to view</h3>
      {state.posts.length ? (
        <List>
          {state.posts.map(post => (
            <ListItem key={post._id}>
              <Link
                to={"/posts/" + post._id}
              >
                <strong>
                  {post.title} by {post.author}
                </strong>
              </Link>
              <DeleteBtn
                onClick={() => {
                  dispatch({ type: "SAVING" });
                  API.deletePost(post._id).then(_ => {
                    dispatch({ type: "REMOVE_POST", payload: post });
                  });
                }}
              />
            </ListItem>
          ))}
        </List>
      ) : (
        <h3>You haven't added any posts yet!</h3>
      )}
      <div className="mt-5">
        <Link to="favorites">View favorites</Link>
      </div>
    </div>
  );
};

export default PostsList;
