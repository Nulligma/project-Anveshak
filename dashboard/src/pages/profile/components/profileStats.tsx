import styles from "../../../assets/styles/modules/profile/profilepage.module.css";

const ProfileStats = () => {
  return (
    <div className={styles.stats}>
      <div>Line chart showing categories of invoices</div>
      <div>Grid of icon items showing top 6 country of invoice </div>
      <div>List of items showing top 3 invoice by price </div>
      <div>Pie chart showing number of paid/pending/draft invoices </div>
    </div>
  );
};

export default ProfileStats;
