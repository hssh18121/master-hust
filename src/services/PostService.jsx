import { paginate, create, all, getData, findById } from "./BaseService";
import { firestore } from "../config/firebase";

export async function getPosts(currentPage) {
  let query = all("posts");
  query = await paginate(query, currentPage);
  const data = getData(query);
  return data;
}

export async function getPostById(id) {
  const data = await findById("posts", id);
  return data;
}

export async function getPostsByTopicId(topicId) {
  // Get the topic reference
  const topicRef = firestore.doc(`topics/${topicId}`);

  // Create a query to filter posts by topic reference
  const query = await all("posts").where("topicRef", "==", topicRef);

  const data = getData(query);
  return data;
}

export async function createPost() {
  const postData = {
    title: "Test title",
    content: "Post content goes here",
    image: "a random url",
  };
  create(postData, "posts");
}
