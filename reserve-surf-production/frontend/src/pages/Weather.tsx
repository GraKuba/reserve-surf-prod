import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Weather() {
  // Default location coordinates (can be made configurable)
  const lat = 21.3099; // Hawaii example - Honolulu
  const lon = -157.8581;
  const zoom = 10;

  return (
    <DashboardLayout
      pageTitle="Weather"
      breadcrumbs={[{ title: "Weather" }]}
      showQuickActions={false}
    >
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Weather Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="forecast" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="forecast">Forecast</TabsTrigger>
                <TabsTrigger value="wind">Wind</TabsTrigger>
                <TabsTrigger value="waves">Waves</TabsTrigger>
                <TabsTrigger value="radar">Radar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="forecast" className="mt-4">
                <div className="w-full h-[600px] rounded-lg overflow-hidden border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=600&zoom=${zoom}&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                    frameBorder="0"
                    title="Windy Weather Forecast"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="wind" className="mt-4">
                <div className="w-full h-[600px] rounded-lg overflow-hidden border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=600&zoom=${zoom}&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=true&calendar=12&pressure=&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                    frameBorder="0"
                    title="Wind Conditions"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="waves" className="mt-4">
                <div className="w-full h-[600px] rounded-lg overflow-hidden border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=600&zoom=${zoom}&level=surface&overlay=waves&product=ecmwfWaves&menu=&message=&marker=true&calendar=12&pressure=&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                    frameBorder="0"
                    title="Wave Conditions"
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="radar" className="mt-4">
                <div className="w-full h-[600px] rounded-lg overflow-hidden border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=600&zoom=${zoom}&level=surface&overlay=radar&product=radar&menu=&message=&marker=true&calendar=12&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                    frameBorder="0"
                    title="Weather Radar"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Tide Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[450px] rounded-lg overflow-hidden border">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=${zoom}&level=surface&overlay=swell1&product=ecmwfWaves&menu=&message=&marker=true&calendar=&pressure=&type=map&location=coordinates&detail=true&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                  frameBorder="0"
                  title="Tide Information"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Satellite View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[450px] rounded-lg overflow-hidden border">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://embed.windy.com/embed2.html?lat=${lat}&lon=${lon}&detailLat=${lat}&detailLon=${lon}&width=650&height=450&zoom=${zoom}&level=surface&overlay=satellite&product=satellite&menu=&message=&marker=&calendar=&pressure=&type=map&location=coordinates&detail=&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1`}
                  frameBorder="0"
                  title="Satellite View"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
