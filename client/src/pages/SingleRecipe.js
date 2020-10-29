import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UPDATE_CURRENT_RECIPE } from "../utils/actions";
import { getSingleRecipe } from "../utils/helpers";
import { useStoreContext } from "../utils/State";
import Comment from "../components/Comment";
import CommentForm from "../components/CommentForm";
import { QUERY_COMMENTS } from "../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import Auth from "../utils/auth";
import { Container, Row, Col } from "react-bootstrap";

const SingleRecipe = () => {
  const [state, dispatch] = useStoreContext();
  // const ingredients = state.currentRecipe.extendedIngredients;

  const { id } = useParams();
  const { loading, data } = useQuery(QUERY_COMMENTS, {
    variables: { recipeId: id },
  });
  const comments = data ? data.commentByRecipeId : [];

  useEffect(() => {
    async function fetchRecipe() {
      const recipe = await getSingleRecipe(id).catch((err) =>
        console.log("ERROR", err)
      );
      if (
        !recipe.code &&
        state.currentRecipe.extendedIngredients.length === 0
      ) {
        dispatch({
          type: UPDATE_CURRENT_RECIPE,
          currentRecipe: recipe,
        });
      }
    }
    // setIngredients(recipe?.extendedIngredients || []);
    // const ingredients = state.currentRecipe.extendedIngredients;
    // console.log(ingredients);
    fetchRecipe();
  }, [state.currentRecipe.extendedIngredients, data, dispatch, id]);

  //why does this show an array in console but comes up as undef?

  // const ingredients = state.currentRecipe.extendedIngredients.map(item => {
  //     return item.name
  // })
  // console.log("currentRecipe:", state.currentRecipe);

  return (
    <Container className="single-recipe-container">
      <Row>
        <h1>{state.currentRecipe.title}</h1>
      </Row>
      <Row>
        <Col xs="12" md="4">
          <img src={state.currentRecipe.image} />
        </Col>
        <Col xs="12" md="8">
          <h3>Ingredients:</h3>
          <ul>
            {state.currentRecipe.extendedIngredients.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </Col>
      </Row>
      <Row>
        <h3>Directions:</h3>
        <p>{state.currentRecipe.instructions}</p>
      </Row>
      <Row>
        {Auth.loggedIn() ? (
          <CommentForm></CommentForm>
        ) : (
          "Login to leave a comment"
        )}
      </Row>
      <Row>
        {comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              commentText={comment.commentText}
              username={comment.username}
              createdAt={comment.createdAt}
            ></Comment>
          );
        })}
      </Row>
    </Container>
  );
};

export default SingleRecipe;
