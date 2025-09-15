import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Camera,
  Wrench,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

type EquipmentStatus = "available" | "rented" | "maintenance" | "damaged" | "retired";

type EquipmentCategory = "boards" | "sails" | "kites" | "wetsuits" | "lifejackets" | "accessories";

interface EquipmentItem {
  id: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  size: string;
  status: EquipmentStatus;
  photo?: string;
  purchaseDate: string;
  lastMaintenance?: string;
  nextMaintenance?: string;
  notes?: string;
  condition: string;
  rentalPrice: number;
  serialNumber?: string;
}


const categoryConfig = {
  boards: { label: "Boards", icon: "🏄", color: "bg-blue-100 text-blue-800" },
  sails: { label: "Sails", icon: "⛵", color: "bg-purple-100 text-purple-800" },
  kites: { label: "Kites", icon: "🪁", color: "bg-pink-100 text-pink-800" },
  wetsuits: { label: "Wet Suits", icon: "🤿", color: "bg-gray-100 text-gray-800" },
  lifejackets: { label: "Life Jackets", icon: "🦺", color: "bg-orange-100 text-orange-800" },
  accessories: { label: "Accessories", icon: "🎒", color: "bg-green-100 text-green-800" },
};

const statusConfig = {
  available: { label: "Available", icon: CheckCircle, color: "text-green-600" },
  rented: { label: "Rented", icon: Clock, color: "text-blue-600" },
  maintenance: { label: "Maintenance", icon: Wrench, color: "text-yellow-600" },
  damaged: { label: "Damaged", icon: AlertCircle, color: "text-red-600" },
  retired: { label: "Retired", icon: XCircle, color: "text-gray-600" },
};

const mockEquipment: EquipmentItem[] = [
  {
    id: "1",
    category: "boards",
    brand: "Fanatic",
    model: "Stubby TE",
    size: "8'6\"",
    status: "available",
    purchaseDate: "2024-01-15",
    lastMaintenance: "2024-11-01",
    nextMaintenance: "2025-02-01",
    condition: "Excellent",
    rentalPrice: 45,
    serialNumber: "FAN-2024-001",
  },
  {
    id: "2",
    category: "wetsuits",
    brand: "O'Neill",
    model: "Hyperfreak 4/3mm",
    size: "L",
    status: "rented",
    purchaseDate: "2024-03-20",
    condition: "Good",
    rentalPrice: 25,
    serialNumber: "ON-WS-2024-015",
  },
  {
    id: "3",
    category: "kites",
    brand: "Duotone",
    model: "Evo",
    size: "12m",
    status: "maintenance",
    purchaseDate: "2023-08-10",
    lastMaintenance: "2024-10-15",
    condition: "Fair",
    rentalPrice: 65,
    notes: "Small tear on leading edge - under repair",
  },
];


export default function Equipment() {
  const [equipment, setEquipment] = useState<EquipmentItem[]>(mockEquipment);
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isMaintenanceDialogOpen, setIsMaintenanceDialogOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<EquipmentItem | null>(null);
  const [newEquipment, setNewEquipment] = useState<Partial<EquipmentItem>>({
    category: "boards",
    status: "available",
    condition: "Excellent",
    rentalPrice: 0,
  });

  const filteredEquipment = equipment.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      searchTerm === "" ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status: EquipmentStatus) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <Badge variant="outline" className={`gap-1 ${config.color}`}>
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getCategoryBadge = (category: EquipmentCategory) => {
    const config = categoryConfig[category];
    return (
      <Badge className={config.color}>
        <span className="mr-1">{config.icon}</span>
        {config.label}
      </Badge>
    );
  };

  const handleAddEquipment = () => {
    const newItem: EquipmentItem = {
      id: Date.now().toString(),
      category: newEquipment.category as EquipmentCategory,
      brand: newEquipment.brand || "",
      model: newEquipment.model || "",
      size: newEquipment.size || "",
      status: newEquipment.status as EquipmentStatus,
      purchaseDate: newEquipment.purchaseDate || new Date().toISOString().split("T")[0],
      condition: newEquipment.condition || "Good",
      rentalPrice: newEquipment.rentalPrice || 0,
      serialNumber: newEquipment.serialNumber,
      notes: newEquipment.notes,
    };
    setEquipment([...equipment, newItem]);
    setIsAddDialogOpen(false);
    setNewEquipment({
      category: "boards",
      status: "available",
      condition: "Excellent",
      rentalPrice: 0,
    });
  };

  const handleDeleteEquipment = (id: string) => {
    setEquipment(equipment.filter((item) => item.id !== id));
  };

  const stats = {
    total: equipment.length,
    available: equipment.filter((e) => e.status === "available").length,
    rented: equipment.filter((e) => e.status === "rented").length,
    maintenance: equipment.filter((e) => e.status === "maintenance").length,
    damaged: equipment.filter((e) => e.status === "damaged").length,
  };

  return (
    <DashboardLayout
      pageTitle="Equipment"
      breadcrumbs={[{ title: "Equipment" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-5">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Equipment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.available}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Rented Out
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.rented}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                In Maintenance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.maintenance}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Damaged
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.damaged}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Equipment Inventory</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Equipment
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Add New Equipment</DialogTitle>
                    <DialogDescription>
                      Enter the details of the new equipment item.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={newEquipment.category}
                          onValueChange={(value) =>
                            setNewEquipment({ ...newEquipment, category: value as EquipmentCategory })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(categoryConfig).map(([key, config]) => (
                              <SelectItem key={key} value={key}>
                                <span className="flex items-center gap-2">
                                  <span>{config.icon}</span>
                                  {config.label}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                          value={newEquipment.status}
                          onValueChange={(value) =>
                            setNewEquipment({ ...newEquipment, status: value as EquipmentStatus })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(statusConfig).map(([key, config]) => (
                              <SelectItem key={key} value={key}>
                                {config.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                          id="brand"
                          value={newEquipment.brand || ""}
                          onChange={(e) => setNewEquipment({ ...newEquipment, brand: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Model</Label>
                        <Input
                          id="model"
                          value={newEquipment.model || ""}
                          onChange={(e) => setNewEquipment({ ...newEquipment, model: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="size">Size</Label>
                        <Input
                          id="size"
                          value={newEquipment.size || ""}
                          onChange={(e) => setNewEquipment({ ...newEquipment, size: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="condition">Condition</Label>
                        <Select
                          value={newEquipment.condition}
                          onValueChange={(value) => setNewEquipment({ ...newEquipment, condition: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Excellent">Excellent</SelectItem>
                            <SelectItem value="Good">Good</SelectItem>
                            <SelectItem value="Fair">Fair</SelectItem>
                            <SelectItem value="Poor">Poor</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="rentalPrice">Rental Price</Label>
                        <Input
                          id="rentalPrice"
                          type="number"
                          value={newEquipment.rentalPrice || 0}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, rentalPrice: parseFloat(e.target.value) })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="serialNumber">Serial Number</Label>
                        <Input
                          id="serialNumber"
                          value={newEquipment.serialNumber || ""}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, serialNumber: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="purchaseDate">Purchase Date</Label>
                        <Input
                          id="purchaseDate"
                          type="date"
                          value={newEquipment.purchaseDate || ""}
                          onChange={(e) =>
                            setNewEquipment({ ...newEquipment, purchaseDate: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo">Photo Upload</Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          className="flex-1"
                        />
                        <Button variant="outline" size="icon">
                          <Camera className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={newEquipment.notes || ""}
                        onChange={(e) => setNewEquipment({ ...newEquipment, notes: e.target.value })}
                        placeholder="Any additional information..."
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddEquipment}>Add Equipment</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-1 items-center gap-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select
                  value={selectedCategory}
                  onValueChange={(value) => setSelectedCategory(value as EquipmentCategory | "all")}
                >
                  <SelectTrigger className="w-[180px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.entries(categoryConfig).map(([key, config]) => (
                      <SelectItem key={key} value={key}>
                        <span className="flex items-center gap-2">
                          <span>{config.icon}</span>
                          {config.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Equipment Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Brand & Model</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead>Rental Price</TableHead>
                    <TableHead>Last Maintenance</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEquipment.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground">
                        No equipment found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEquipment.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{getCategoryBadge(item.category)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {item.brand} {item.model}
                            </div>
                            {item.serialNumber && (
                              <div className="text-sm text-muted-foreground">{item.serialNumber}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{item.size}</TableCell>
                        <TableCell>{getStatusBadge(item.status)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.condition}</Badge>
                        </TableCell>
                        <TableCell>${item.rentalPrice}/day</TableCell>
                        <TableCell>
                          {item.lastMaintenance ? (
                            <div className="text-sm">
                              <div>{new Date(item.lastMaintenance).toLocaleDateString()}</div>
                              {item.nextMaintenance && (
                                <div className="text-muted-foreground">
                                  Next: {new Date(item.nextMaintenance).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedEquipment(item);
                                setIsMaintenanceDialogOpen(true);
                              }}
                            >
                              <Wrench className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteEquipment(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Maintenance Dialog */}
        <Dialog open={isMaintenanceDialogOpen} onOpenChange={setIsMaintenanceDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule Maintenance</DialogTitle>
              <DialogDescription>
                Record maintenance for {selectedEquipment?.brand} {selectedEquipment?.model}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="maintenanceType">Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select maintenance type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="routine">Routine Check</SelectItem>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceDate">Date</Label>
                <Input id="maintenanceDate" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maintenanceDescription">Description</Label>
                <Textarea
                  id="maintenanceDescription"
                  placeholder="Describe the maintenance work..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maintenanceCost">Cost</Label>
                  <Input id="maintenanceCost" type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="performedBy">Performed By</Label>
                  <Input id="performedBy" placeholder="Technician name" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsMaintenanceDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsMaintenanceDialogOpen(false)}>Save Maintenance</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
