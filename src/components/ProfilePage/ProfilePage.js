import Header from "../Header/Header";
import Profile from "../Profile/Profile";

function ProfilePage(props) {
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <Profile />
    </>
  );
}

export default ProfilePage;
