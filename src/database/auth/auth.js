import { Client, Account, ID } from "appwrite";
import conf from "./../../conf/conf"

class Auth {
    client = new Client();
    account;

    constructor() {
        this.client.setEndpoint(conf.VITE_PROJECT_URL)
            .setProject(conf.VITE_PROJECT_ID);

        this.account = new Account(this.client);
    }

    signup = async ({ email, password, userName }) => {
        console.log('inside signup function')
        try {

            const signup = await this.account.create(ID.unique(), email, password, userName);
            console.log(JSON.stringify(signup) + " console.log(signup data)")
            if (signup) {
                console.log('singed up successfully');
                const signupData = await this.login({ email, password });
                // console.log(JSON.stringify(signupData) + 'console.log(signup data)');
                return signupData;
            }

        } catch (error) {
            console.log('error while creating user signin account' + error);
        }

    }

    login = async ({ email, password }) => {
        try {
            const login = await this.account.createEmailSession(email, password);
            // console.log(JSON.stringify(login) + 'console.log(login data)')
            return login;

        } catch (error) {
            console.log('error while  login in account' + error);
        }
    }

    currentUser = async () => {
        try {
            const currentUser = await this.account.get();
            // console.log(JSON.stringify(currentUser) + 'console.log(session data)')
            return currentUser;

        } catch (error) {
            console.log('error while creating session account' + error);
        }

        return null;
    }


    logout = async () => {
        try {
            const currentUser = this.account.deleteSession('current');
            console.log('logged out successfully')
            return currentUser;

        } catch (error) {
            console.log('error while creating session account' + error);
        }
    }

}
const auth = new Auth();
export default auth

