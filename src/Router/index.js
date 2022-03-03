import Home from "../components/Screens/Home/Home";
import Profile from "../components/Screens/Profile/Profile";
import Signin from "../components/Screens/Signin";
import Signup from "../components/Screens/Signup/Signup";
import CreatePost from "../components/Screens/CreatePost";
import UserProfile from "../components/Screens/Profile/UserProfile";
import SubscribedUserPosts from "../components/Screens/SubUserPost";
import Reset from "../components/Screens/Signin/Reset";
import NewPassword from "../components/Screens/NewPassword";
import ListFriend from "../components/Screens/Home/ListFriend";

const routes = [
    {
        path: "/",
        component: Home,
        exactly: true,
        isnavbar: true,
    },
    {
        path: "/signin",
        component: Signin,
        exactly: true,
        isnavbar: false,
    },
    {
        path: "/signup",
        component: Signup,
        exactly: true,
        isnavbar: false,
    },
    {
        path: "/profile",
        component: Profile,
        exactly: true,
        isnavbar: true,
    },
    {
        path: "/create",
        component: CreatePost,
        exactly: true,
        isnavbar: true,
    },
    {
        path: "/profile/:userid",
        component: UserProfile,
        exactly: true,
        isnavbar: true,
    },
    {
        path: "/myfollowingpost",
        component: SubscribedUserPosts,
        exactly: true,
        isnavbar: true,
    },
    {
        path: "/reset",
        component: Reset,
        exactly: true,
        isnavbar: false,
    },
    {
        path: "/reset/:token",
        component: NewPassword,
        exactly: true,
        isnavbar: false,
    },
    {
        path: "/list-friend",
        component: ListFriend,
        exactly: true,
        isnavbar: true,
    },
];

export default routes;
