import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Weather() {
  return (
    <DashboardLayout
      pageTitle="Weather"
      breadcrumbs={[{ title: "Weather" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Weather Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64 text-muted-foreground">
              <p>Weather implementation coming soon...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
