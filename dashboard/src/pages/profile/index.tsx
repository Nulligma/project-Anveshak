import { Link, Outlet, useLocation } from "react-router-dom";
import styles from "../../assets/styles/modules/profile/profilepage.module.css";
import GoBack from "../../components/button/GoBack";
import ProfileNav from "./components/profileNav";
import Button from "../../components/button/Button";

const ProfilePage = () => {
  const location = useLocation();
  return (
    <div className={styles.profilePage}>
      <div className={styles.contianer}>
        <GoBack />

        <ProfileNav />

        <Outlet />

        <Link to="balance">
          {location.pathname === "/profile" && (
            <Button variant="default">Check Account Balance</Button>
          )}
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
