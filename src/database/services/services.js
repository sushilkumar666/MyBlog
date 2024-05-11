import { Client, ID, Databases, Storage, Query } from "appwrite";
import conf from "../../conf/conf";

class Services {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.VITE_PROJECT_URL)
            .setProject(conf.VITE_PROJECT_ID);

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }


    createPost = async ({ title, content, slug, featuredImage, userId, status }) => {
        try {
            const post = await this.databases.createDocument(conf.VITE_DB_ID,
                conf.VITE_COLLECTION_ID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    userId,
                    status
                })

            return post;
        }
        catch (error) {
            console.log('error while creating post ' + error)
        }

    }

    updatePost = async (slug, { title, content, status, featuredImage }) => {
        try {
            const updatePost = await this.databases.updateDocument(conf.VITE_DB_ID, conf.VITE_COLLECTION_ID, slug, {
                title,
                content,
                featuredImage,
                status
            });
            console.log(updatePost + " updated post");
            return updatePost;
        } catch (error) {
            console.log('error while updating post ' + error);
        }
    }

    deletePost = async (slug) => {
        try {
            return await this.databases.deleteDocument(conf.VITE_DB_ID, conf.VITE_COLLECTION_ID, slug);
            console.log('post deleted successfully')


        } catch (error) {
            console.log('error while deleting post ' + error);
            return false;
        }
    }

    getPost = async (slug) => {
        try {
            const getPost = await this.databases.getDocument(conf.VITE_DB_ID, conf.VITE_COLLECTION_ID, slug)
            console.log(getPost + ' getPost data');
            return getPost;

        } catch (error) {
            console.log('error while getting post data' + error);
        }
    }

    getAllPosts = async () => {
        try {
            const allPosts = await this.databases.listDocuments(
                conf.VITE_DB_ID,
                conf.VITE_COLLECTION_ID,
                [
                    Query.equal('status', 'active')
                ]
            );
            // console.log(JSON.stringify(allPosts) + ' console.log(allpost data) ');
            return allPosts;
        } catch (error) {
            console.log('error while getting postList ' + error);
        }
    }


    getCurrentUserPosts = async (id) => {
        try {
            const allPosts = await this.databases.listDocuments(
                conf.VITE_DB_ID,
                conf.VITE_COLLECTION_ID,
                [
                    Query.equal('userId', id)
                ]
            );
            console.log(JSON.stringify(allPosts) + ' console.log(allpost data) ');
            return allPosts;
        } catch (error) {
            console.log('error while getting postList ' + error);
        }
    }

    uploadImage = async (file) => {
        try {
            const uploadImage = await this.storage.createFile(conf.VITE_STORAGE_ID, ID.unique(), file);
            console.log(uploadImage + 'uploaded image data');
            return uploadImage;

        } catch (error) {
            console.log('error while uploading image ' + error);
        }


    }


    deleteImage = async (slug) => {
        try {
            return await this.storage.deleteFile(conf.VITE_STORAGE_ID, slug);

        } catch (error) {
            console.log('error while deleting image ' + error);
            return false;
        }


    }

    imagePreview = (file) => {
        try {
            const data = this.storage.getFilePreview(conf.VITE_STORAGE_ID, file);
            JSON.stringify(data);
            return data;

        } catch (error) {
            console.log('error while previewing image ' + error);
            return false;
        }


    }



}

const services = new Services()

export default services;





