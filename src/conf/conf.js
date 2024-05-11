const conf = {
    VITE_PROJECT_URL: String(import.meta.env.VITE_PROJECT_URL),
    VITE_PROJECT_ID: String(import.meta.env.VITE_PROJECT_ID),
    VITE_DB_ID: String(import.meta.env.VITE_DB_ID),
    VITE_COLLECTION_ID: String(import.meta.env.VITE_COLLECTION_ID),
    VITE_STORAGE_ID: String(import.meta.env.VITE_STORAGE_ID)
}

export default conf;