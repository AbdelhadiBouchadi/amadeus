import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardAreaChartProps {
  checklistsData: number[];
  usersData: number[];
}

const DashboardAreaChart: React.FC<DashboardAreaChartProps> = ({
  checklistsData,
  usersData,
}) => {
  const currentMonth = new Date().getMonth();
  const months = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];

  const rotatedMonths = [
    ...months.slice(currentMonth),
    ...months.slice(0, currentMonth),
  ];

  const data = rotatedMonths.map((month, index) => ({
    name: month,
    checklists: checklistsData[(currentMonth + index) % 12],
    users: usersData[(currentMonth + index) % 12],
  }));

  return (
    <Card className="bg-transparent border-subMain dark:border-border">
      <CardHeader>
        <CardTitle>Évolution sur 12 mois</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[450px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="name"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                fontSize={12}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="checklists"
                name="Checklists"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.2}
              />
              <Area
                type="monotone"
                dataKey="users"
                name="Utilisateurs"
                stroke="#F97316"
                fill="#F97316"
                fillOpacity={0.2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardAreaChart;
