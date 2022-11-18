import React, { useEffect, useState } from "react";
import Loginpage from "./loginpage/Loginpage";
import NewWithdraw from "./worker/NewWithdraw";
import ViewWithdrawDetail from "./worker/ViewWithdrawDetail";
import WithdrawRecord_main from "./worker/WithdrawRecord_main";
import InputEdit from "./worker/InputEdit";
import { Routes, Route, Navigate } from "react-router-dom";
import Workerpage from "./main/Workerpage";
import NewUser from "./admin/NewUser";
import AllUser from "./admin/AllUser";
import Adminmain from "./main/Adminmain";
import Update from "./admin/Update";
import Intro from "./into/Intro";

function App() {
  const [wdidfromview, setWDidfromview] = useState(""); // id
  const [wdDatefromview, setWDDatefromview] = useState(""); // id
  const [wdDetailListTable, setWDDetailListTable] = useState(""); //wtihdraw product table
  const [wdDetailList, setWDDetailList] = useState(""); //withdraw
  const [adminidfromview, setAdminidfromview] = useState(""); //admin userlist
  console.log(wdDetailList);
  return (
    <div>
      <h2>Vending Nation</h2>

      <Routes>
        <Route path="/" element={<Navigate to="/into" />} />
        <Route path="/into" element={<Intro />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/adminpage" element={<Adminmain />} />
        <Route path="/newuser" element={<NewUser />} />
        <Route
          path="/alluser"
          element={<AllUser setAdminidfromview={setAdminidfromview} />}
        />
        <Route
          path="/useredit"
          element={<Update adminidfromview={adminidfromview} />}
        />
        <Route path="/withdrawMain" element={<Workerpage />} />
        <Route path="/New_withdraw" element={<NewWithdraw />} />
        <Route
          path="/view_withdraw_main"
          element={
            <WithdrawRecord_main
              setWDidfromview={setWDidfromview}
              setWDDatefromview={setWDDatefromview}
            />
          }
        />
        <Route
          path="/view_withdraw_detail"
          element={
            <ViewWithdrawDetail
              wdidfromview={wdidfromview}
              wdDatefromview={wdDatefromview}
              setWDDetailListTable={setWDDetailListTable}
              setWDDetailList={setWDDetailList}
            />
          }
        />
        <Route
          path="/edit_withdraw_detail"
          element={
            <InputEdit
              wdDetailListTable={wdDetailListTable}
              wdDetailList={wdDetailList}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
