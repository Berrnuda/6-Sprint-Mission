import BannerBottom from "../components/Home/BannerBottom";
import BannerMiddle from "../components/Home/BannerMiddle";
import BannerTop from "../components/Home/BannerTop";
import Footer from "../components/Home/Footer";
import NavBar from "../components/header";
import "../style/home.css";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main>
        <BannerTop />
        <BannerMiddle />
        <BannerBottom />
      </main>
      <Footer />
    </>
  );
}
