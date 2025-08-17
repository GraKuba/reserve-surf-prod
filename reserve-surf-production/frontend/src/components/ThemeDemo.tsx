import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export function ThemeDemo() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">
          Sunset Horizon Theme
        </h1>
        <p className="text-muted-foreground">
          Beautiful colors inspired by golden hour sunsets
        </p>
      </div>

      <Separator />

      {/* Color Palette Display */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Color Palette</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-primary rounded-lg border"></div>
            <p className="text-sm font-medium">Primary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-secondary rounded-lg border"></div>
            <p className="text-sm font-medium">Secondary</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-accent rounded-lg border"></div>
            <p className="text-sm font-medium">Accent</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-muted rounded-lg border"></div>
            <p className="text-sm font-medium">Muted</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Components Showcase */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Component Examples</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Buttons</CardTitle>
              <CardDescription>
                Different button variants with theme colors
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements */}
          <Card>
            <CardHeader>
              <CardTitle>Form Elements</CardTitle>
              <CardDescription>
                Input fields and labels with theme styling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Badges and Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Typography</CardTitle>
            <CardDescription>
              Text elements and status indicators
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-semibold text-foreground">
                Large heading text
              </p>
              <p className="text-base text-foreground">
                Regular body text with good contrast
              </p>
              <p className="text-sm text-muted-foreground">
                Muted text for secondary information
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart Colors Preview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Chart Colors</h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="space-y-2">
            <div className="w-full h-16 bg-chart-1 rounded-lg border"></div>
            <p className="text-sm font-medium">Chart 1</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chart-2 rounded-lg border"></div>
            <p className="text-sm font-medium">Chart 2</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chart-3 rounded-lg border"></div>
            <p className="text-sm font-medium">Chart 3</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chart-4 rounded-lg border"></div>
            <p className="text-sm font-medium">Chart 4</p>
          </div>
          <div className="space-y-2">
            <div className="w-full h-16 bg-chart-5 rounded-lg border"></div>
            <p className="text-sm font-medium">Chart 5</p>
          </div>
        </div>
      </div>

      <Separator />

      <div className="text-center text-muted-foreground">
        <p>
          Theme successfully implemented with Montserrat font family and
          enhanced shadows
        </p>
      </div>
    </div>
  );
}
