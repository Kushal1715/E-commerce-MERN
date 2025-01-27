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
import { getOrderByUser } from "@/store/shop/orderSlice";

const ShoppingOrders = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(user.id)).then((data) => console.log(data));
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
            <TableRow>
              <TableCell>234234</TableCell>
              <TableCell>1/26/2025</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>$234</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpenDetailsDialog}
                >
                  <Button onClick={() => setOpenDetailsDialog(true)}>
                    View Details
                  </Button>
                  <OrderDetailsModal />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShoppingOrders;
