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
import { getChartData, processAnomalyData } from '@/lib/chartUtils';

interface DashboardPieChartProps {
  data: Record<AnomalyCategory, number>;
}

export function getCategoryColor(category: string): string {
  switch (category) {
    case AnomalyCategory.EDI:
      return '#3B82F6'; // Blue
    case AnomalyCategory.EXPEDITION:
      return '#F97316'; // Orange
    case AnomalyCategory.ETIQUETTAGE:
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HOMOGENE:
    case AnomalyCategory.ETIQUETTAGE_PALETTE_HETEROGENE:
      return '#14B8A6'; // Teal
    case AnomalyCategory.PALETISATION:
      return '#EF4444'; // Red
    default:
      return '#9CA3AF'; // Gray
  }
}

const DashboardPieChart: React.FC<DashboardPieChartProps> = ({ data }) => {
  const processedData = processAnomalyData(data);

  // Convert processed data to chart-ready format
  const chartData = getChartData(processedData);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-2 border border-gray-200 dark:border-gray-700 rounded shadow-sm">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm">{`Occurrences: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

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
                    fill={getCategoryColor(entry.category)}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardPieChart;
