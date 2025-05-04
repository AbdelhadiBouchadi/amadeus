import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserStats } from '@/types';

interface UserRoleChartProps {
  data: UserStats;
}

const COLORS = ['#A855F7', '#3B82F6', '#22C55E'];

const UserRoleChart: React.FC<UserRoleChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Administrateurs', value: data.admins },
    { name: 'Moniteurs', value: data.monitors },
    { name: 'Visiteurs', value: data.visitors },
  ];

  return (
    <Card className="bg-transparent border-subMain dark:border-border">
      <CardHeader>
        <CardTitle>Répartition des rôles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserRoleChart;
