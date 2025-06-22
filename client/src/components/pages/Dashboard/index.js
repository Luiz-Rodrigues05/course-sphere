import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import Header from "../../organisms/Header";
import Heading from "../../atoms/Heading";
import CourseList from "../../organisms/CourseList";
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className={styles.dashboardPage}>
      <Header />
      <main className={styles.mainContent}>
        <Heading text={"Bem-vindo(a), " + user.name + "!"} level={1} />
        <CourseList />
      </main>
    </div>
  );
};

export default Dashboard;