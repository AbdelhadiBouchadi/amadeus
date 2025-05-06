import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { TimeSpentStats } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TimeSpentChartProps {
  data: TimeSpentStats;
}

const months = [
  'Jan',
  'Fév',
  'Mar',
  'Avr',
  'Mai',
  'Juin',
  'Juil',
  'Août',
  'Sep',
  'Oct',
  'Nov',
  'Déc',
];

const TimeSpentChart: React.FC<TimeSpentChartProps> = ({ data }) => {
  const chartData = months.map((month, index) => ({
    name: month,
    conforme: Math.round(data.conforme[index] / 60), // Convert to minutes
    nonConforme: Math.round(data.nonConforme[index] / 60),
  }));

  return (
    <Card className="bg-transparent border-subMain dark:border-border">
      <CardHeader>
        <CardTitle>Temps moyen de création (minutes)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] rounded-xl border border-subMain dark:border-border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="conforme"
                stroke="#22c55e"
                name="Conforme"
              />
              <Line
                type="monotone"
                dataKey="nonConforme"
                stroke="#ef4444"
                name="Non Conforme"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimeSpentChart;
