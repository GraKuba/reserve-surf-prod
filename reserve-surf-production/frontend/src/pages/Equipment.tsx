import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Equipment() {
  return (
    <DashboardLayout
      pageTitle="Equipment"
      breadcrumbs={[{ title: "Equipment" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Equipment Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p>Equipment management implementation coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
