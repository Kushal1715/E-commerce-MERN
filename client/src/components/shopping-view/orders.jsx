import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import OrderDetailsModal from "../common/order-details";
import { useDispatch, useSelector } from "react-redux";
import { getOrderByUser, getOrderDetails } from "@/store/shop/orderSlice";
import { Badge } from "../ui/badge";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);
  const dispatch = useDispatch();

  const handleViewDetails = (currentOrderId) => {
    setOpenDetailsDialog(true);
    dispatch(getOrderDetails(currentOrderId));
  };

  useEffect(() => {
    dispatch(getOrderByUser(user.id));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderList &&
              orderList.length > 0 &&
              orderList.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order?._id}</TableCell>
                  <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        order?.orderStatus === "pending"
                          ? "bg-black"
                          : order?.orderStatus === "rejected"
                          ? "bg-red-500"
                          : "bg-green-500"
                      } py-[5px] px-3`}
                    >
                      {order?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openDetailsDialog}
                      onOpenChange={setOpenDetailsDialog}
                    >
                      <Button onClick={() => handleViewDetails(order?._id)}>
                        View Details
                      </Button>
                      <OrderDetailsModal orderDetails={orderDetails} />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
