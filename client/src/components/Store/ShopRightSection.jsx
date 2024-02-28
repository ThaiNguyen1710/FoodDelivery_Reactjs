import React from "react";
import { Route, Routes } from "react-router-dom";

import StoreHome from "./StoreHome";
import StoreItem from "./StoreItem";
import StoreAddItem from "./StoreAddItem";
import StoreInformation from "./StoreInformation";
import StoreHeader from "./StoreHeader";
import StoreOrder from "./StoreOrder";

const ShopRightSection = () => {
  return (
    <div className=" px-6 py-3 flex flex-col flex-1 h-full">
      <StoreHeader />
      <div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          {/* <Route path="/home" element={<StoreHome />} /> */}
          <Route path="/information" element={<StoreInformation />} />
          <Route path="/order" element={<StoreOrder />} />
          <Route path="/item" element={<StoreItem />} />
          <Route path="/add-item" element={<StoreAddItem />} />
        </Routes>
      </div>
    </div>
  );
};

export default ShopRightSection;
