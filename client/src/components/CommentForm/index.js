import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_COMMENT } from '../../utils/mutations';
import {QUERY_USER } from '../../utils/queries';
import {useParams} from 'react-router-dom';


const CommentForm = () => {
    const {id} = useParams();
    const maxChar = 280;
    const [addComment, { error }] = useMutation(ADD_COMMENT);

    const [commentText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= maxChar) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    }

    const handleFormSubmit = async event => {
        event.preventDefault();
        try {
            await addComment({
                variables: { commentText, recipeId:id }
            });
            setText(' ');
            setCharacterCount(0);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div>
            <p className={`m-0 ${characterCount === maxChar ? 'text-error' : ''}`}>
                Character Count: {characterCount}/{maxChar}
                {error && <span className="ml-2">Something went wrong...</span>}
            </p>
            <form className="flex-row justify-center justify-space-between-md align-stretch" onSubmit={handleFormSubmit}>
                <textarea
                    placeholder="My comment..."
                    value={commentText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Add Comment
        </button>
            </form>
        </div>
    );
};

export default CommentForm;