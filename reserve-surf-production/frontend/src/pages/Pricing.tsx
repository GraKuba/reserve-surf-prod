import { useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Euro,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  Package,
} from "lucide-react";

interface PriceItem {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  duration: string;
  groupSize?: string;
  seasonalPricing: boolean;
  peakPrice?: number;
  offPeakPrice?: number;
  status: "active" | "inactive";
  description: string;
}

export default function Pricing() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [editingItem, setEditingItem] = useState<PriceItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Use editingItem to track the item being edited
  console.log('Editing item:', editingItem);

  // Mock pricing data
  const [priceItems, setPriceItems] = useState<PriceItem[]>([
    {
      id: "1",
      name: "Beginner Surf Lesson",
      category: "lessons",
      basePrice: 60,
      duration: "2 hours",
      groupSize: "1-6 people",
      seasonalPricing: true,
      peakPrice: 75,
      offPeakPrice: 50,
      status: "active",
      description: "Introduction to surfing with certified instructors",
    },
    {
      id: "2",
      name: "Advanced Surf Lesson",
      category: "lessons",
      basePrice: 80,
      duration: "2 hours",
      groupSize: "1-4 people",
      seasonalPricing: true,
      peakPrice: 95,
      offPeakPrice: 70,
      status: "active",
      description: "Advanced techniques and wave selection",
    },
    {
      id: "3",
      name: "Kite Surfing Lesson",
      category: "lessons",
      basePrice: 120,
      duration: "3 hours",
      groupSize: "1-2 people",
      seasonalPricing: true,
      peakPrice: 140,
      offPeakPrice: 100,
      status: "active",
      description: "Complete kite surfing instruction",
    },
    {
      id: "4",
      name: "SUP Lesson",
      category: "lessons",
      basePrice: 45,
      duration: "1.5 hours",
      groupSize: "1-8 people",
      seasonalPricing: false,
      status: "active",
      description: "Stand-up paddleboarding basics",
    },
    {
      id: "5",
      name: "Surfboard Rental",
      category: "equipment",
      basePrice: 30,
      duration: "Full day",
      seasonalPricing: true,
      peakPrice: 40,
      offPeakPrice: 25,
      status: "active",
      description: "High-quality surfboards for all levels",
    },
    {
      id: "6",
      name: "Wetsuit Rental",
      category: "equipment",
      basePrice: 15,
      duration: "Full day",
      seasonalPricing: false,
      status: "active",
      description: "Premium wetsuits in all sizes",
    },
    {
      id: "7",
      name: "Complete Gear Package",
      category: "equipment",
      basePrice: 50,
      duration: "Full day",
      seasonalPricing: true,
      peakPrice: 65,
      offPeakPrice: 45,
      status: "active",
      description: "Board, wetsuit, and accessories",
    },
    {
      id: "8",
      name: "Photography Session",
      category: "extras",
      basePrice: 80,
      duration: "Per session",
      seasonalPricing: false,
      status: "active",
      description: "Professional surf photography",
    },
    {
      id: "9",
      name: "Video Analysis",
      category: "extras",
      basePrice: 40,
      duration: "30 minutes",
      seasonalPricing: false,
      status: "active",
      description: "Detailed technique analysis with video",
    },
  ]);

  const filteredItems = priceItems.filter(
    (item) => selectedCategory === "all" || item.category === selectedCategory
  );

  // Summary statistics
  const stats = {
    totalItems: priceItems.length,
    activeItems: priceItems.filter((item) => item.status === "active").length,
    avgLessonPrice:
      priceItems
        .filter((item) => item.category === "lessons")
        .reduce((sum, item) => sum + item.basePrice, 0) /
      priceItems.filter((item) => item.category === "lessons").length,
    seasonalItems: priceItems.filter((item) => item.seasonalPricing).length,
  };

  const handleDeleteItem = (id: string) => {
    setPriceItems(priceItems.filter((item) => item.id !== id));
  };

  const handleDuplicateItem = (item: PriceItem) => {
    const newItem = {
      ...item,
      id: Date.now().toString(),
      name: `${item.name} (Copy)`,
    };
    setPriceItems([...priceItems, newItem]);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "lessons":
        return <Users className="h-4 w-4" />;
      case "equipment":
        return <Package className="h-4 w-4" />;
      case "extras":
        return <TrendingUp className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      pageTitle="Pricing Management"
      breadcrumbs={[{ title: "Pricing" }]}
    >
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Items</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalItems}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeItems} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Lesson Price
              </CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                €{stats.avgLessonPrice.toFixed(0)}
              </div>
              <p className="text-xs text-muted-foreground">Per session</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Seasonal Pricing
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.seasonalItems}</div>
              <p className="text-xs text-muted-foreground">Items with seasonal rates</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Price Updates</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="all" onClick={() => setSelectedCategory("all")}>
                All Pricing
              </TabsTrigger>
              <TabsTrigger value="lessons" onClick={() => setSelectedCategory("lessons")}>
                Lessons
              </TabsTrigger>
              <TabsTrigger value="equipment" onClick={() => setSelectedCategory("equipment")}>
                Equipment
              </TabsTrigger>
              <TabsTrigger value="extras" onClick={() => setSelectedCategory("extras")}>
                Extras
              </TabsTrigger>
            </TabsList>

            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Pricing Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Add New Pricing Item</DialogTitle>
                  <DialogDescription>
                    Create a new pricing item for lessons, equipment, or extras.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Item Name</Label>
                      <Input id="name" placeholder="e.g., Beginner Surf Lesson" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lessons">Lessons</SelectItem>
                          <SelectItem value="equipment">Equipment</SelectItem>
                          <SelectItem value="extras">Extras</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Base Price (€)</Label>
                      <Input id="price" type="number" placeholder="60" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="2 hours" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="group">Group Size</Label>
                      <Input id="group" placeholder="1-6 people" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Brief description of the service"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch id="seasonal" />
                    <Label htmlFor="seasonal">Enable seasonal pricing</Label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="peak">Peak Season Price (€)</Label>
                      <Input id="peak" type="number" placeholder="75" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offpeak">Off-Peak Price (€)</Label>
                      <Input id="offpeak" type="number" placeholder="50" />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddDialogOpen(false)}>
                    Add Pricing Item
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <TabsContent value={selectedCategory} className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pricing Items</CardTitle>
                <CardDescription>
                  Manage pricing for all your services and equipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Base Price</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Seasonal Pricing</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getCategoryIcon(item.category)}
                            <span className="capitalize">{item.category}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-medium">€{item.basePrice}</div>
                          {item.groupSize && (
                            <div className="text-sm text-muted-foreground">
                              {item.groupSize}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{item.duration}</TableCell>
                        <TableCell>
                          {item.seasonalPricing ? (
                            <div className="space-y-1">
                              <div className="text-sm">
                                Peak: €{item.peakPrice}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Off-peak: €{item.offPeakPrice}
                              </div>
                            </div>
                          ) : (
                            <Badge variant="outline">Fixed</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "active" ? "default" : "secondary"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setEditingItem(item);
                                // TODO: Open edit dialog
                              }}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDuplicateItem(item)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Seasonal Pricing Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Pricing Settings</CardTitle>
                <CardDescription>
                  Configure peak and off-peak seasons for dynamic pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Peak Season</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="june">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="june">June</SelectItem>
                            <SelectItem value="july">July</SelectItem>
                            <SelectItem value="august">August</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="flex items-center px-2">to</span>
                        <Select defaultValue="september">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="august">August</SelectItem>
                            <SelectItem value="september">September</SelectItem>
                            <SelectItem value="october">October</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Off-Peak Season</Label>
                      <div className="flex gap-2">
                        <Select defaultValue="november">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="october">October</SelectItem>
                            <SelectItem value="november">November</SelectItem>
                            <SelectItem value="december">December</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="flex items-center px-2">to</span>
                        <Select defaultValue="march">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="february">February</SelectItem>
                            <SelectItem value="march">March</SelectItem>
                            <SelectItem value="april">April</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-adjust" defaultChecked />
                    <Label htmlFor="auto-adjust">
                      Automatically adjust prices based on demand
                    </Label>
                  </div>
                  <Button>Save Seasonal Settings</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}