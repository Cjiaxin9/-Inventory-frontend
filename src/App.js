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
import Intro from "./intro/Intro";
import Supervisorpage from "./main/Supervisorpage";
import Company_main from "./supervisor/company/Company_main";
import Category_main from "./supervisor/category/Category_main";
import Product_main from "./supervisor/product/Product_main";
import Unit_main from "./supervisor/unit/Unit_main";
import Location_main from "./supervisor/location/Location_main";
import Stock_main from "./supervisor/Stock/Stock_main";
import StockBalance_main from "./supervisor/Stock/StockBalance_main";
import StockIn from "./supervisor/Stock/stockin/StockIn";
import Stockinviewmain from "./supervisor/Stock/stockinviewmain/Stockinviewmain";
import StockinDetail from "./supervisor/Stock/stockinviewmain/StockinDetail";
import StockinEdit from "./supervisor/Stock/stockinviewmain/StockinEdit";

function App() {
  const [wdidfromview, setWDidfromview] = useState(""); // id
  const [wdDatefromview, setWDDatefromview] = useState(""); //date
  const [wdDetailListTable, setWDDetailListTable] = useState(""); //wtihdraw product table
  const [wdDetailList, setWDDetailList] = useState(""); //withdraw
  const [adminidfromview, setAdminidfromview] = useState(""); //admin userlist
  const [siidfromview, setSIidfromview] = useState(""); // id
  const [siDatefromview, setSIDatefromview] = useState(""); //date
  const [siDetailListTable, setSIDetailListTable] = useState(""); //wtihdraw product table
  const [siDetailList, setSIDetailList] = useState(""); //withdraw

  return (
    <div>
      <h2>Vending World</h2>

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
        <Route path="/Supervisormainpage" element={<Supervisorpage />} />

        <Route path="/view_company_main" element={<Company_main />} />
        <Route path="/view_category_main" element={<Category_main />} />
        <Route path="/view_product_main" element={<Product_main />} />
        <Route path="/view_unit_main" element={<Unit_main />} />
        <Route path="/view_location_main" element={<Location_main />} />

        <Route path="/view_stock_main" element={<Stock_main />} />
        <Route path="/view_stockbalance" element={<StockBalance_main />} />
        <Route path="/New_Stockin" element={<StockIn />} />
        <Route
          path="/view_stockin_main"
          element={
            <Stockinviewmain
              setSIidfromview={setSIidfromview}
              setSIDatefromview={setSIDatefromview}
            />
          }
        />
        <Route
          path="/view_stockin_detail"
          element={
            <StockinDetail
              siidfromview={siidfromview}
              siDatefromview={siDatefromview}
              setSIDetailListTable={setSIDetailListTable}
              setSIDetailList={setSIDetailList}
            />
          }
        />

        <Route
          path="/edit_stockin_detail"
          element={
            <StockinEdit
              siDetailListTable={siDetailListTable}
              siDetailList={siDetailList}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
