//needs to be passed a recipeId and get all corresponding comments to return sorted by date

import React, { useEffect } from 'react';




const Comment = (comment) => {

    return (
        <div>
            <h5>By: {comment.username} On: {comment.createdAt}</h5>
            <p>{comment.commentText}</p>
        </div>
    )
};

export default Comment;