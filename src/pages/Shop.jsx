import React, { useEffect, useState } from "react";
import TableCustom from "../components/Table";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("http://localhost:3000/products")
            .then((res) => {
                const updatedProducts = res.data.map((item) => {
                    let productType;
                    switch (item.productType) {
                        case "1":
                            productType = "Fruits";
                            break;
                        case "2":
                            productType = "Vegetables";
                            break;
                        case "3":
                            productType = "Spices";
                            break;
                        default:
                            productType = "Unknown";
                    }
                    return {
                        ...item,
                        productType,
                        key: Math.random(),
                        action: (
                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="w-[30px] h-[30px] hover:text-white hover:bg-red-500 hover:shadow-lg duration-500 hover:shadow-red-500 text-red-500 rounded-lg border border-red-500"
                                >
                                    <DeleteOutlined />
                                </button>
                                <button className="w-[30px] h-[30px] hover:text-white hover:bg-green-500 hover:shadow-lg duration-500 hover:shadow-green-500 rounded-lg text-green-500 border border-green-500">
                                    <EditOutlined />
                                </button>
                            </div>
                        ),
                    };
                });
                setProducts(updatedProducts);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(
                    "There was an error fetching the products!",
                    error
                );
                setIsLoading(false);
            });
    }, [refresh]);

    function handleDelete(id) {
        setIsLoading(true);
        axios
            .delete(`http://localhost:3000/products/${id}`)
            .then(() => {
                toast.success("Product deleted successfully!");
                setRefresh(!refresh);
            })
            .catch((error) => {
                console.error(
                    "There was an error deleting the product!",
                    error
                );
                toast.error("Failed to delete product!");
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    return (
        <div className="p-10">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-[25px] font-bold">Products</h2>
                    <p className="text-[15px] text-slate-500">
                        Product ({products.length})
                    </p>
                </div>
                <Button
                    onClick={() => navigate("add-product")}
                    size="large"
                    type="primary"
                    htmlType="submit"
                    className=" w-[150px]"
                >
                    Add Product
                </Button>
            </div>
            <div className="mt-[10px]">
                <TableCustom loading={loading} products={products} />
            </div>
        </div>
    );
}

export default Shop;
