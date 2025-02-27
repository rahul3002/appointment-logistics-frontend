import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { appointmentsAPI } from '../lib/api';
import { Calendar, Package, MapPin, User, Clock, Plus, Eye, RefreshCw } from 'lucide-react';

interface Appointment {
  _id: string;
  type: string;
  status: string;
  scheduledTime: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  location: {
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
      country: string;
    };
  };
  package: {
    size: string;
    weight: number;
    description: string;
  };
  priority: number;
  createdAt: string;
}

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await appointmentsAPI.getAll();
      setAppointments(response.data);
      setError('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch appointments');
      console.error('Error fetching appointments:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'scheduled':
        return <Badge variant="info">{status}</Badge>;
      case 'in-progress':
        return <Badge variant="warning">{status}</Badge>;
      case 'completed':
        return <Badge variant="success">{status}</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">{status}</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Appointments</h1>
          <p className="text-muted-foreground">Manage your pickup and delivery appointments</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Appointment
        </Button>
      </div>

      <Separator />

      {error && (
        <Card className="border-destructive">
          <CardContent className="p-4 text-destructive">
            <div className="flex items-center gap-2">
              <span className="font-medium">Error:</span> {error}
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 w-1/3 bg-muted rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 w-1/2 bg-muted rounded"></div>
                  <div className="h-4 w-3/4 bg-muted rounded"></div>
                  <div className="h-4 w-1/4 bg-muted rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : appointments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No appointments found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              You don't have any appointments yet. Create your first appointment to get started.
            </p>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create your first appointment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {appointments.map((appointment) => (
            <Card key={appointment._id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    {appointment.type === 'pickup' ? (
                      <Package className="h-5 w-5 text-primary" />
                    ) : (
                      <Calendar className="h-5 w-5 text-primary" />
                    )}
                    <CardTitle className="text-lg">
                      {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)} Appointment
                    </CardTitle>
                  </div>
                  {getStatusBadge(appointment.status)}
                </div>
                <CardDescription>
                  Created on {new Date(appointment.createdAt).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Customer</p>
                        <p className="text-sm">{appointment.customer.name}</p>
                        <p className="text-xs text-muted-foreground">{appointment.customer.email}</p>
                        <p className="text-xs text-muted-foreground">{appointment.customer.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Package className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Package</p>
                        <p className="text-sm">{appointment.package.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Size: {appointment.package.size}, Weight: {appointment.package.weight} kg
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Location</p>
                        <p className="text-sm">{appointment.location.address.street}</p>
                        <p className="text-xs text-muted-foreground">
                          {appointment.location.address.city}, {appointment.location.address.state} {appointment.location.address.zipCode}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium">Schedule</p>
                        <p className="text-sm">{formatDate(appointment.scheduledTime)}</p>
                        <p className="text-xs text-muted-foreground">
                          Priority: {appointment.priority}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2 pt-2 border-t bg-muted/20">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>Details</span>
                </Button>
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>Update Status</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
