import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UPDATE_CURRENT_RECIPE } from '../utils/actions';
import { getSingleRecipe } from '../utils/helpers';
import { useStoreContext } from '../utils/State';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import { QUERY_COMMENTS } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import Auth from '../utils/auth';
import { Row, Col } from 'react-bootstrap';

const SingleRecipe = () => {
  const [state, dispatch] = useStoreContext();

  const { id } = useParams();
  const { loading, data,refetch } = useQuery(QUERY_COMMENTS, {
    variables: { recipeId: id },
  });
  const comments = data ? data.commentByRecipeId : [];

  useEffect(() => {
    async function fetchRecipe() {
      const recipe = await getSingleRecipe(id).catch((err) =>
        console.log('ERROR', err),
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
   
    fetchRecipe();
  }, [state.currentRecipe.extendedIngredients, data, dispatch, id]);

  const reRender =()=>{
    refetch();
  }

  return (
    <div className="single-recipe-container mx-5 px-5 my-4">
      <Row className="py-3">
        <h3 className=" mx-3">{state.currentRecipe.title}</h3>
      </Row>
      <Row>
        <Col xs="12" md="4" className="py-4">
          <img src={state.currentRecipe.image} />
        </Col>
        <Col xs="12" md="6" className="py-4 mx-3">
          <h5>Ingredients:</h5>
          <ul>
            {state.currentRecipe.extendedIngredients.map((item) => {
              return <li key={item.id}>{item.name}</li>;
            })}
          </ul>
        </Col>
      </Row>
      <Row className=" mx-3">
        <h5>Directions:</h5>
        <p>{state.currentRecipe.instructions}</p>
      </Row>
     
        {Auth.loggedIn() ? (
          <CommentForm reRender={reRender} ></CommentForm>
        ) : (
          <p className="font-italic text-muted">Login to leave a comment</p>
        )}

 
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
    
    </div>
  );
};

export default SingleRecipe;
