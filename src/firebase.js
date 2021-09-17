import * as firebase from "firebase";
import firebaseConfig from "../firebase.json";

const app = !firebase.apps.length
    ? firebase.initializeApp(firebaseConfig)
    : firebase.app();

const Auth = app.auth();
const storage = app.storage();

// ✨ 로그인
const signin = async ({ email, password }) => {
    const { user } = await Auth.signInWithEmailAndPassword(email, password);
    return user;
};

// ✨ 로그아웃
const signout = async () => {
    await Auth.signOut();
};

// ✨ 로그인여부 확인(로그인 시 grade를 보여주기 위해서)
const signConfirm = async () => {
    await Auth.onAuthStateChanged((user) => {
        if (user) {
            return user;
        }
    });
};

//  ✨ 회원가입
const createUser = async ({ name, email, password }) => {
    const { user } = await Auth.createUserWithEmailAndPassword(email, password);
    await user.updateProfile({ displayName: name });
};

export { signin, signout, signConfirm, createUser };
