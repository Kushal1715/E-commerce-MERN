import OrderDetailsModal from "@/components/common/order-details";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllOrders, getOrderDetails } from "@/store/admin/orderSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminOrders = () => {
  const [openOrderDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { orderList, orderDetails } = useSelector((state) => state.adminOrder);
  const dispatch = useDispatch();

  const handleViewDetails = (currentOrderId) => {
    setOpenDetailsDialog(true);
    dispatch(getOrderDetails(currentOrderId));
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Orders</CardTitle>
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
            {orderList && orderList.length > 0
              ? orderList.map((order) => (
                  <TableRow key={order?._id}>
                    <TableCell>{order?._id}</TableCell>
                    <TableCell>{order?.orderDate.split("T")[0]}</TableCell>
                    <TableCell>{order?.orderStatus}</TableCell>
                    <TableCell>{order?.totalAmount}</TableCell>
                    <TableCell>
                      <Dialog
                        open={openOrderDetailsDialog}
                        onOpenChange={setOpenDetailsDialog}
                      >
                        <Button onClick={() => handleViewDetails(order?._id)}>
                          View Details
                        </Button>
                        <OrderDetailsModal
                          orderDetails={orderDetails}
                          setOpenDetailsDialog={setOpenDetailsDialog}
                        />
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
