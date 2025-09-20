import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, User, Phone, Shield, Heart } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const guestCheckoutSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  
  emergencyContact: z.object({
    name: z.string().min(1, 'Emergency contact name is required'),
    phone: z.string().min(10, 'Emergency contact phone is required'),
    relationship: z.string().min(1, 'Relationship is required'),
  }),
  
  swimAbility: z.enum(['None', 'Weak', 'Average', 'Strong']),
  surfExperience: z.enum(['Never', 'Tried Once', 'Beginner', 'Intermediate', 'Advanced']),
  
  medicalConcerns: z.boolean(),
  medicalDetails: z.string().optional(),
  
  waiverAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the waiver to continue',
  }),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms to continue',
  }),
  
  createAccount: z.boolean().optional(),
});

type GuestCheckoutData = z.infer<typeof guestCheckoutSchema>;

const GuestCheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const classId = searchParams.get('classId');

  const form = useForm<GuestCheckoutData>({
    resolver: zodResolver(guestCheckoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      emergencyContact: {
        name: '',
        phone: '',
        relationship: '',
      },
      swimAbility: 'Average',
      surfExperience: 'Never',
      medicalConcerns: false,
      medicalDetails: '',
      waiverAccepted: false,
      termsAccepted: false,
      createAccount: false,
    },
  });

  const watchMedicalConcerns = form.watch('medicalConcerns');

  const onSubmit = async (data: GuestCheckoutData) => {
    try {
      // Store guest data in session storage for payment page
      sessionStorage.setItem('guestCheckoutData', JSON.stringify(data));
      navigate(`/guest-checkout/payment?classId=${classId}`);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Guest Checkout</h1>
        <p className="text-muted-foreground">
          Quick booking - no account required. We just need some essential information for your safety.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
              <CardDescription>
                We need this to identify you at check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll send your booking confirmation here
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                    </FormControl>
                    <FormDescription>
                      For SMS reminders and urgent updates
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormDescription>
                      Required for age verification
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency Contact
              </CardTitle>
              <CardDescription>
                Required for your safety on the water
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="emergencyContact.name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyContact.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="+1 234 567 8900" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="emergencyContact.relationship"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Relationship</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="sibling">Sibling</SelectItem>
                        <SelectItem value="friend">Friend</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Experience & Safety */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Experience & Safety
              </CardTitle>
              <CardDescription>
                Helps us provide the right level of instruction
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="swimAbility"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Swimming Ability</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your swimming ability" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="None">Cannot swim</SelectItem>
                        <SelectItem value="Weak">Weak swimmer</SelectItem>
                        <SelectItem value="Average">Average swimmer</SelectItem>
                        <SelectItem value="Strong">Strong swimmer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="surfExperience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surfing Experience</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Never">Never surfed</SelectItem>
                        <SelectItem value="Tried Once">Tried once or twice</SelectItem>
                        <SelectItem value="Beginner">Beginner (can stand up)</SelectItem>
                        <SelectItem value="Intermediate">Intermediate (comfortable in waves)</SelectItem>
                        <SelectItem value="Advanced">Advanced (experienced surfer)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Medical Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Medical Information
              </CardTitle>
              <CardDescription>
                Please inform us of any medical conditions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="medicalConcerns"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I have medical conditions the instructor should know about
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              {watchMedicalConcerns && (
                <FormField
                  control={form.control}
                  name="medicalDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please describe your medical conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please list any medical conditions, medications, or concerns..."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Legal & Account */}
          <Card>
            <CardHeader>
              <CardTitle>Legal Agreement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  By proceeding, you acknowledge that surfing involves inherent risks including 
                  serious injury or death. You agree to follow all safety instructions.
                </AlertDescription>
              </Alert>
              
              <FormField
                control={form.control}
                name="waiverAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the{' '}
                        <a href="#" className="text-primary underline">
                          liability waiver
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="termsAccepted"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I accept the{' '}
                        <a href="#" className="text-primary underline">
                          terms and conditions
                        </a>
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="pt-4 border-t">
                <FormField
                  control={form.control}
                  name="createAccount"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Create an account for faster future bookings
                        </FormLabel>
                        <FormDescription>
                          You'll set a password after completing your booking
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between items-center sticky bottom-0 bg-background py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
            <Button type="submit" size="lg" className="min-w-[200px]">
              Continue to Payment
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GuestCheckoutPage;