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
import { AnomalyCategory } from '@/types';
import { formatCategory } from '@/lib/utils';

interface DashboardPieChartProps {
  data: Record<AnomalyCategory, number>;
}

const COLORS = [
  '#3B82F6', // EDI - Blue
  '#F97316', // EXPEDITION - Orange
  '#14B8A6', // ETIQUETTAGE - Teal
  '#A855F7', // ETIQUETTAGE_PALETTE_HOMOGENE - Purple
  '#EAB308', // ETIQUETTAGE_PALETTE_HETEROGENE - Yellow
  '#EF4444', // PALETISATION - Red
];

const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ data }) => {
  const chartData = Object.entries(data).map(([category, value]) => ({
    name: formatCategory(category as AnomalyCategory),
    value,
  }));

  return (
    <Card className="bg-transparent border-subMain dark:border-border">
      <CardHeader>
        <CardTitle>Distribution des anomalies</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] mt-12">
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

export default DashboardPieChart;
