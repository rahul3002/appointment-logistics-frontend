import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { appointmentsAPI, hubsAPI, partnersAPI, slotsAPI } from '../lib/api';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    appointments: 0,
    partners: 0,
    hubs: 0,
    slots: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [appointmentsRes, partnersRes, hubsRes, slotsRes] = await Promise.all([
          appointmentsAPI.getAll(),
          partnersAPI.getAll(),
          hubsAPI.getAll(),
          slotsAPI.getAll()
        ]);

        setStats({
          appointments: appointmentsRes.data.length,
          partners: partnersRes.data.length,
          hubs: hubsRes.data.length,
          slots: slotsRes.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Appointments" 
          value={stats.appointments} 
          description="Total appointments" 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Partners" 
          value={stats.partners} 
          description="Active partners" 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Hubs" 
          value={stats.hubs} 
          description="Logistics hubs" 
          isLoading={isLoading} 
        />
        <StatCard 
          title="Slots" 
          value={stats.slots} 
          description="Available time slots" 
          isLoading={isLoading} 
        />
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Welcome, {user?.name}!</CardTitle>
            <CardDescription>
              You are logged in as {user?.role}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              This dashboard provides an overview of your logistics operations. 
              Use the navigation menu to manage appointments, partners, hubs, and slots.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  isLoading: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, isLoading }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-6 w-12 bg-muted rounded animate-pulse"></div>
        ) : (
          <div className="text-2xl font-bold">{value}</div>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardPage;
