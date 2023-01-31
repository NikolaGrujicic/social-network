import { Route, Routes } from "react-router-dom";
import { Login, SocialNetwork } from "./pages";
import SponsorPostPopup from "./components/SponsorPostPopup";
import WritePostPopup from "./components/WritePostPopup";
import { useSocialNetworkStore } from "./store/SocialNetworkStore";

function App() {
  const showSponsorPostPopup = useSocialNetworkStore(
    (state) => state.showSponsorPostPopup
  );
  const showWritePostPopup = useSocialNetworkStore(
    (state) => state.showWritePostPopup
  );
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/social-network" element={<SocialNetwork />} />
      </Routes>
      <div className="circle-purple" />
      <div className="circle-pink" />
      {showSponsorPostPopup ? <SponsorPostPopup /> : ""}
      {showWritePostPopup ? <WritePostPopup /> : ""}
    </div>
  );
}

export default App;
