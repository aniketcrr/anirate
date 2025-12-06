import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client()
    account;
    constructor() {
        this.client.setProject(conf.appwriteProjectId).setEndpoint(conf.appwriteUrl)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name }) {
        try {
            const user = await this.account.create({
                userId: ID.unique(),
                email: email,
                password: password,
                name: name,
            });
            if (user) {
                return this.login({email , password})
            } else {
                return user;
            }

        } catch (error) {
            console.error("error in createAccount : error ", error)
        }

    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession({
                email: email ,
                password: password
            });
        } catch (error) {
            console.log("error in login : error " , error)
        }
    }

    async getCurrentUser (){
        try {
        return await this.account.get();
            
        } catch (error) {
            console.log("error in getting user : error  " , error)
        }
    }

    async logout (){
        try {
            return await this.account.deleteSessions();

        } catch (error) {
            console.log("error in logout : error " , error)
        }
    }

}

const authService = new AuthService();

export default authService;