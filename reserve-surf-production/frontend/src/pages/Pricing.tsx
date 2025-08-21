import React, { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

// Mock transaction data
const mockTransactions = [
  {
    id: "TXN-001",
    date: "2024-01-15",
    time: "14:30",
    customer: "John Smith",
    type: "Booking Payment",
    amount: 150.0,
    status: "completed",
    paymentMethod: "Credit Card",
    bookingId: "BK-2024-001",
    description: "Surf lesson - 2 hours",
  },
  {
    id: "TXN-002",
    date: "2024-01-15",
    time: "12:15",
    customer: "Sarah Johnson",
    type: "Equipment Rental",
    amount: 75.0,
    status: "completed",
    paymentMethod: "PayPal",
    bookingId: "BK-2024-002",
    description: "Surfboard rental - Full day",
  },
  {
    id: "TXN-003",
    date: "2024-01-14",
    time: "16:45",
    customer: "Mike Wilson",
    type: "Booking Payment",
    amount: 200.0,
    status: "pending",
    paymentMethod: "Bank Transfer",
    bookingId: "BK-2024-003",
    description: "Group lesson - 4 people",
  },
  {
    id: "TXN-004",
    date: "2024-01-14",
    time: "10:20",
    customer: "Emma Davis",
    type: "Refund",
    amount: -100.0,
    status: "completed",
    paymentMethod: "Credit Card",
    bookingId: "BK-2024-004",
    description: "Cancelled booking refund",
  },
  {
    id: "TXN-005",
    date: "2024-01-13",
    time: "13:30",
    customer: "Alex Brown",
    type: "Equipment Rental",
    amount: 45.0,
    status: "completed",
    paymentMethod: "Cash",
    bookingId: "BK-2024-005",
    description: "Wetsuit rental - Half day",
  },
  {
    id: "TXN-006",
    date: "2024-01-13",
    time: "11:00",
    customer: "Lisa Garcia",
    type: "Booking Payment",
    amount: 180.0,
    status: "failed",
    paymentMethod: "Credit Card",
    bookingId: "BK-2024-006",
    description: "Private lesson - 2.5 hours",
  },
  {
    id: "TXN-007",
    date: "2024-01-12",
    time: "15:45",
    customer: "Tom Anderson",
    type: "Equipment Rental",
    amount: 90.0,
    status: "completed",
    paymentMethod: "Debit Card",
    bookingId: "BK-2024-007",
    description: "Complete gear rental",
  },
  {
    id: "TXN-008",
    date: "2024-01-12",
    time: "09:15",
    customer: "Rachel White",
    type: "Booking Payment",
    amount: 125.0,
    status: "completed",
    paymentMethod: "Credit Card",
    bookingId: "BK-2024-008",
    description: "Beginner lesson - 1.5 hours",
  },
];

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case "completed":
      return "default";
    case "pending":
      return "secondary";
    case "failed":
      return "destructive";
    default:
      return "outline";
  }
};

const formatAmount = (amount: number) => {
  const formatted = Math.abs(amount).toFixed(2);
  return amount < 0 ? `-$${formatted}` : `$${formatted}`;
};

const getAmountColor = (amount: number) => {
  if (amount < 0) return "text-red-600";
  return "text-green-600";
};

export default function Pricing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  // Calculate summary stats
  const totalRevenue = mockTransactions
    .filter((t) => t.status === "completed" && t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalRefunds = Math.abs(
    mockTransactions
      .filter((t) => t.status === "completed" && t.amount < 0)
      .reduce((sum, t) => sum + t.amount, 0)
  );

  const pendingAmount = mockTransactions
    .filter((t) => t.status === "pending")
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter transactions
  const filteredTransactions = mockTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Pricing & Transactions
            </h2>
            <p className="text-muted-foreground">
              Manage transaction history and financial overview
            </p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${totalRevenue.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Payments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                ${pendingAmount.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                2 transactions pending
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Refunds
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                ${totalRefunds.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">
                -2.1% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Transactions
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockTransactions.length}
              </div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:space-y-0 md:space-x-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Booking Payment">
                    Booking Payment
                  </SelectItem>
                  <SelectItem value="Equipment Rental">
                    Equipment Rental
                  </SelectItem>
                  <SelectItem value="Refund">Refund</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Transactions Table */}
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">
                      {transaction.id}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">{transaction.date}</span>
                        <span className="text-xs text-muted-foreground">
                          {transaction.time}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.type}</Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStatusBadgeVariant(transaction.status)}
                      >
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell
                      className={`text-right font-medium ${getAmountColor(
                        transaction.amount
                      )}`}
                    >
                      {formatAmount(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredTransactions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="text-muted-foreground">
                  No transactions found matching your criteria
                </div>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setStatusFilter("all");
                    setTypeFilter("all");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
