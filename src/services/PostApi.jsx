import { firestore } from "../config/firebase";

//test api
export async function getAllPosts() {
    const data = await firestore
    .collection("posts")
    .get();
    console.log(data)
    return data.docs.map((item) => ({
        ...item.data(),
    }));
}
