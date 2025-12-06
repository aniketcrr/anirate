import { Client, Query, TablesDB, Storage, ID } from "appwrite";
import conf from "../conf/conf";

export class Service {
    client = new Client();;
    tablesDB;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.tablesDB = new TablesDB(this.client);
        this.bucket = new Storage(this.client);

    }

    async createPost({ title, content, featuredImage, status, userId }) {
        const rowId = ID.unique()
        try {
            return await this.tablesDB.createRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updatePost(rowId, { title, content, featuredImage, status }) {
        try {
            return await this.tablesDB.updateRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId,
                data: {
                    title,
                    content,
                    featuredImage,
                    status,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async deletePost(rowId) {
        try {
            return await this.tablesDB.deleteRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId,
            });
        } catch (error) {
            throw error;
        }
    }

    async getPost(rowId) {
        try {
            return await this.tablesDB.getRow({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                rowId,
            });
        } catch (error) {
            throw error;
        }
    }

    async getPosts({ queries = [Query.equal("status", "active")] }) {
        try {
            return await this.tablesDB.listRows({
                databaseId: conf.appwriteDatabaseId,
                tableId: conf.appwriteTableId,
                queries,
            });
        } catch (error) {
            throw error;
        }
    }


    async uploadFile(file) {
        try {
            return await this.bucket.createFile({
                bucketId: conf.appwriteBucketId,
                fileId: ID.unique(),
                file
            })
        } catch (error) {
            throw error
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.bucket.deleteFile({
                bucketId: conf.appwriteBucketId,
                fileId
            });
        } catch (error) {
            throw error;
        }
    }

    getFilePreview(fileId) {
        try {
            const result = this.bucket.getFileView({
                bucketId: conf.appwriteBucketId,
                fileId: fileId,
            })
            if (result instanceof Blob) {
                return URL.createObjectURL(result);
            }

            return result;
        } catch (error) {
            throw error;
        }
    }


}

const service = new Service();
export default service;
