import { findById } from "./BaseService";

export async function getSearchHistoryByUserId(userId) {
    const userData = await findById('users', userId);
    return userData.searchHistory;
}

