import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { CoforStats } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CoforAnomaliesChartProps {
  data: CoforStats[];
}

const CoforAnomaliesChart: React.FC<CoforAnomaliesChartProps> = ({ data }) => {
  return (
    <Card className="bg-transparent border-subMain dark:border-border">
      <CardHeader>
        <CardTitle> Top COFOR avec anomalies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[400px] rounded-xl border border-subMain dark:border-border p-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cofor" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ef4444" name="Nombre d'anomalies" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoforAnomaliesChart;
