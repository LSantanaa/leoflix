import { ThemeProvider, createTheme } from "@mui/material";
import styles from "./DefaultPage.module.css";
import Footer from "components/Footer";
import Header from "components/Header";
import { VideoProvider } from "contexts/VideosContext";
import { Outlet } from "react-router-dom";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function DefaultPage() {
  return (
    <div className={styles.flex}>
      <div className={styles.flexContent}>
        <ThemeProvider theme={darkTheme}>
          <VideoProvider>
            <Header />
            <Outlet />
          </VideoProvider>
        </ThemeProvider>
      </div>
      <Footer />
    </div>
  );
}

export default DefaultPage;
