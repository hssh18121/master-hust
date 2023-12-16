import { firestore } from "../config/firebase";
import { all, getData } from "./BaseService";

export async function getSubjectsByTopicId(topicId) {
    // Get the topic reference
  const topicRef = firestore.doc(`topics/${topicId}`);

  // Create a query to filter posts by topic reference
  const query = await all("subjects").where("topicRef", "==", topicRef);

  const data = getData(query);
  return data;
}