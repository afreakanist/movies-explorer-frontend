import Header from "../Header/Header";
import Profile from "../Profile/Profile";

function ProfilePage({ isLoggedIn, ...props }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Profile {...props} />
    </>
  );
}

export default ProfilePage;
