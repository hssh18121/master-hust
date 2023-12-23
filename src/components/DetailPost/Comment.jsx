/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Creator from "./Creator";
import { FiChevronsUp, FiChevronsDown } from "react-icons/fi";
import LikeDislike from "./LikeDislike";
import SubComment from "./SubComment";
import CommentForm from "./CommentForm";
import { getNumberOfDislikeByCommentId, getNumberOfLikesByCommentId } from "../../services/LikeService";
import { useStateValue } from "../../context/StateProvider";

const Comment = ({ comment, postingComment, setPostingComment }) => {
  const [hideReplies, setHideReplies] = useState(true);
  const [newReply, setNewReply] = useState(false);
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [{ likedOrDislikedComments, userId }] = useStateValue()
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)

  function checkLikeStatus() {
    console.log("Inside check like function")
    console.log(likedOrDislikedComments)
    likedOrDislikedComments.forEach(likeOrDislikedComment => {
      console.log("Inside inner check like function")
      if(likeOrDislikedComment.commentId == comment.id && likeOrDislikedComment.userId == userId) {
        if(likeOrDislikedComment.status === true) {
          console.log(`comment with id ${comment.id} has user like it`)
          setIsLiked(true)
        }
        else {
          console.log(`comment with id ${comment.id} has user dislike it`)
          setIsDisliked(true)
        }
      }
    })
  }

  async function getLikeNumberForComment() {
    return await getNumberOfLikesByCommentId(comment.id)
  }

  async function getDislikeNumberForComment() {
    return await getNumberOfDislikeByCommentId(comment.id)
  }

  useEffect(() => {
    getLikeNumberForComment(comment.id).then((likeNumber) => {
      setLike(likeNumber)
    })
    getDislikeNumberForComment(comment.id).then((dislikeNumber) => {
      setDislike(dislikeNumber)
    })
    checkLikeStatus()
   }, []);

  const handleToggleReplies = () => setHideReplies(!hideReplies);
  const handleToggleReplyForm = () => setNewReply(!newReply);
  return (
    <div className="mb-6">
      <div className="w-full bg-white py-4 px-8 shadow-lg mb-2 border-l-4 border-add">
        <div className="mb-4">
          <Creator
            avatarURL={comment.user.avatarUrl}
            name={comment.user.name}
            createdAt={comment.createdAt}
          />
        </div>
        <p className="text-sm text-justify border-b border-gray-200 pb-4 mb-3">
          {comment.content.trim()}
        </p>
        <div className="flex justify-between items-center">
          <LikeDislike like={like} dislike={dislike} isLiked={isLiked} isDisliked={isDisliked} />
          <div className="flex gap-4 text-sm text-blue-500">
            {comment.subComments.length > 0 ? (
              <div
                className="flex gap-1 items-center cursor-pointer"
                onClick={handleToggleReplies}
              >
                {hideReplies ? (
                  <>
                    <span className="text-lg">
                      <FiChevronsDown />
                    </span>
                    <p>Hiện câu trả lời ({comment.subComments.length})</p>{" "}
                  </>
                ) : (
                  <>
                    <span className="text-lg">
                      <FiChevronsUp />
                    </span>
                    <p>Ẩn câu trả lời ({comment.subComments.length})</p>
                  </>
                )}
              </div>
            ) : null}

            <p className="cursor-pointer" onClick={handleToggleReplyForm}>
              Trả lời
            </p>
          </div>
        </div>
      </div>
      {newReply ? (
        <div className="ml-auto mb-2 w-11/12">
          <CommentForm
            commentId={comment.id}
            postId={comment.postRef.id}
            postingComment={postingComment}
            setPostingComment={setPostingComment}
          />
        </div>
      ) : null}
      {hideReplies
        ? null
        : comment.subComments.map((sub) => (
            <SubComment
              sub={sub}
              key={sub.id}
              commentUserName={comment.user.name}
            />
          ))}
    </div>
  );
};

export default Comment;
