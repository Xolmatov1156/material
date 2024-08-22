import React from "react";
import { Shop, Add } from "../pages";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

function CustomRoutes() {
    return (
        <div className="flex">
            <div className="w-[20%]">
                <Navbar />
                </div>
                <div className="w-[80%]">
                    <Routes>
                        <Route path="/" element={<Shop />} />
                        <Route path="/add-product" element={<Add />} />
                    </Routes>
            </div>
        </div>
    );
}

export default CustomRoutes;
