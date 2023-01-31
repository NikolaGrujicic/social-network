import { Route, Routes } from "react-router-dom";
import { Login, SocialNetwork } from "./pages";
import DonatePopup from "./components/DonatePopup";
import WritePostPopup from "./components/WritePostPopup";
import { useSocialNetworkStore } from "./store/SocialNetworkStore";

function App() {
  const showDonatePopup = useSocialNetworkStore(
    (state) => state.showDonatePopup
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
      {showDonatePopup ? <DonatePopup /> : ""}
      {showWritePostPopup ? <WritePostPopup /> : ""}
    </div>
  );
}

export default App;
