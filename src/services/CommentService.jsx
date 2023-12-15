import { firestore } from "../config/firebase";
import { all, create, getData } from "./BaseService";

export async function getCommentsByPostId(postId) {
    const postRef = firestore.doc(`posts/${postId}`)

    // Create a query to filter posts by topic reference
    const query = await all("comments").where("postRef", "==", postRef);

    const data = getData(query);
    return data;
}

export async function getNumberOfCommentsByPostId(postId) {
    const postRef = firestore.doc(`posts/${postId}`)
    const numberOfComments = await all("comments").where("postRef", "==", postRef).get().then(snap => {
        console.log(snap.size)
        return snap.size
    });
    return numberOfComments
}

export async function createComment({ title, content, image, postId, userId, commentId }) {
    const postRef = firestore.doc(`posts/${postId}`)
    const userRef = firestore.doc(`users/${userId}`)
    let commentRef
    if(commentId) {
        commentRef = firestore.doc(`comments/${commentId}`)
    }
    else {
        commentRef = false
    }

    const commentData = {
        title: title,
        content: content, 
        image: image ? image : "A random image url",
        postRef: postRef,
        userRef: userRef,
        commentRef: commentRef ? commentRef : false,
        like: Math.floor(Math.random() * 30),
        dislike: Math.floor(Math.random() * 30)
    }
    create("comments", commentData);
}