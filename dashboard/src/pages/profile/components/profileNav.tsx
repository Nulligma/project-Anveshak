import styles from "../../../assets/styles/modules/profile/profilepage.module.css";

import avatar from "../../../assets/img/image-avatar.jpg";
import Button from "../../../components/button/Button";

function ProfileNav() {
  return (
    <div className={styles.profileNav} id="profileNav">
      <div className={styles.imgContainer}>
        <img src={avatar} alt="profile picture" />
      </div>

      <div className={styles.info}>
        <div>
          <h1>Profile Name</h1>
          <p>Email@email.com</p>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button variant="editButton">Edit</Button>
        <Button variant="deleteButton">LogOut</Button>
      </div>
    </div>
  );
}

export default ProfileNav;
