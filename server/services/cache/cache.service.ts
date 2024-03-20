import redisClient from "~/server/configs/redis/redisClient";

async function deleteItemFromCache(params: { key: string }) {
    const { key } = params;

    return await redisClient.del(key);
}

async function getItemFromCache(params: { key: string }) {
    const { key } = params;

    const item = await redisClient.get(key);

    if (!item) {
        return null;
    }

    return JSON.parse(item);
}

async function setItemToCache(params: { key: string; value: unknown }) {
    const { key, value } = params;

    return await redisClient.set(key, JSON.stringify(value));
}

const cacheService = {
    deleteItemFromCache,
    getItemFromCache,
    setItemToCache,
};

export default cacheService;
