import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Jumbotron from "../components/Jumbotron";
import { Col, Row, Container } from "../components/Grid";

import API from "../utils/API";

import { useStoreContext } from "../utils/GlobalState";

function Detail(props) {
  const [state, dispatch] = useStoreContext();

  useEffect(() => {
    dispatch({ type: "SAVING" });
    API.getPost(props.location.pathname.split("/")[2]).then(results => {
      dispatch({ type: "SET_CURRENT_POST", payload: results.data });
    });
  }, []);

  return (
    <>
      {/* Replace `true` with the state of your application */}
      {state.isLoading ? (
        <Container fluid>
          <Row>
            <Col size="md-12">
              <Jumbotron>
                <h1>
                  {state.currentPost.title} by {state.currentPost.author}
                </h1>
              </Jumbotron>
            </Col>
          </Row>
          <Row>
            <Col size="md-10 md-offset-1">
              <article>
                <h1>Content:</h1>
                <p>{state.currentPost.body}</p>
              </article>
            </Col>
            {/* Replace `false` to check if the current post is in the favorites list */}
            {state.favorites.filter(post => post._id === state.currentPost._id)
              .length ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_FAVORITE",
                    payload: state.currentPost
                  });
                }}
              >
                Remove from Favorites!
              </button>
            ) : (
              <button
                className="btn"
                onClick={() => {
                  dispatch({
                    type: "ADD_FAVORITE",
                    payload: state.currentPost
                  });
                }}
              >
                ❤️ Add to Favorites
              </button>
            )}
          </Row>
          <Row>
            <Col size="md-2">
              <Link to="/">← Back to Posts</Link>
            </Col>
          </Row>
        </Container>
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}

export default Detail;
