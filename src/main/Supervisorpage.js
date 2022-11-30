import React from "react";
import Button from "../common/Button";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Supervisorpage = () => {
  const navigate = useNavigate();

  const handleStockRecord = () => {
    navigate("/view_stock_main");
  };

  const handleCompanyList = () => {
    navigate("/view_company_main");
  };

  const handleCategoryList = () => {
    navigate("/view_category_main");
  };

  const handleProductList = () => {
    navigate("/view_product_main");
  };
  const handleUnitList = () => {
    navigate("/view_unit_main");
  };

  const handleLocationList = () => {
    navigate("/view_location_main");
  };

  const handleExit = () => {
    navigate("/login");
  };
  return (
    <div>
      <h2>Supervisor page</h2>
      <Button
        className="buttonStock"
        type="button"
        onClick={() => handleStockRecord()}
      >
        Stock Record
      </Button>
      <Button
        className="buttonCompanyList"
        type="button"
        onClick={() => handleCompanyList()}
      >
        Company list
      </Button>
      <Button
        className="buttonCategoryList"
        type="button"
        onClick={() => handleCategoryList()}
      >
        Category list
      </Button>
      <Button
        className="buttonProductList"
        type="button"
        onClick={() => handleProductList()}
      >
        Product list
      </Button>
      <Button
        className="buttonLocationList"
        type="button"
        onClick={() => handleLocationList()}
      >
        Location list
      </Button>
      <Button
        className="buttonUnitList"
        type="button"
        onClick={() => handleUnitList()}
      >
        Unit list
      </Button>
      <Button
        className="buttonExit2"
        type="button"
        onClick={() => handleExit()}
      >
        Exit
      </Button>
    </div>
  );
};

export default Supervisorpage;
