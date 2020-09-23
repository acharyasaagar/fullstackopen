import React from 'react'

const Comments = props => {
  const { comment, comments, addComment, handleCommentChange } = props
  return (
    <div className="v-flex">
      <h3 className="title">Comments:</h3>
      {comments.length > 0 ? (
        comments.map((comment, i) => (
          <p key={`${comment}-${i}`} className="comment">
            {comment}
          </p>
        ))
      ) : (
        <div className="flex">
          <p className="comment"> No Comments Yet </p>
        </div>
      )}
      <form onSubmit={addComment}>
        <input name="comment" value={comment} onChange={handleCommentChange} />
        <button>Add a comment</button>
      </form>
    </div>
  )
}

export default Comments
