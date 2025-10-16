import React, { useMemo } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceLine, LabelList
} from 'recharts';
import { Box, Paper, Typography } from '@mui/material';

const CustomDevtaChart = ({
  dataSets = {}, // { data32, data8, data4 }
  vertical = false,
  barSize = 20,
  showLines = false
}) => {
  const computeBalanceLines = (areas) => {
    const totalArea = areas.reduce((sum, val) => sum + val, 0);
    const maxArea = Math.max(...areas);
    const minArea = Math.min(...areas);
    const mediumValue = Math.ceil(totalArea / 16);
    return {
      highValue: Math.ceil((mediumValue + maxArea) / 2),
      mediumValue,
      lowValue: Math.ceil((mediumValue + minArea) / 2)
    };
  };

  const renderSingleChart = (data, title, height = 250, rotateLabels = false) => {
    if (!data || data.length === 0) return null;

    const areas = data.map(item => item.area);
    const { highValue, mediumValue, lowValue } = useMemo(
      () => computeBalanceLines(areas),
      [data]
    );

    return (
      <Box key={title} sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 1,
            color: 'var(--primary-color, #673ab7)'
          }}
        >
          {title}
        </Typography>

        <Box sx={{ width: '100%', height }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 20, left: 20, bottom: 40 }}
              barCategoryGap="20%"
              barGap={0}
            >
              <CartesianGrid horizontal vertical={false} />
              <XAxis
                dataKey="label"
                interval={0}
                padding={{ left: 10, right: 10 }}
                tick={{
                  angle: rotateLabels ? -45 : 0,
                  textAnchor: rotateLabels ? 'end' : 'middle',
                  fontSize: 11
                }}
              />
              <YAxis
                // label={{
                //   value: 'ZONAL S',
                //   angle: -90,
                //   position: 'insideLeft',
                //   offset: 5
                // }}
                tick={{ fontSize: 11 }}
                tickFormatter={(v) => (v / 1000).toFixed(2)}
              />

              <Bar dataKey="area" barSize={barSize}>
                <LabelList
                  dataKey="area"
                  position="top"
                  fill="#000"
                  fontSize={11}
                  formatter={(v) => (v / 1000).toFixed(2)}
                />
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>

              {showLines && (
                <>
                  <ReferenceLine y={highValue} stroke="red" strokeWidth={1.5} />
                  <ReferenceLine y={mediumValue} stroke="green" strokeWidth={1.5} />
                  <ReferenceLine y={lowValue} stroke="orange" strokeWidth={1.5} />
                </>
              )}
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    );
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
      {/* Top full-width chart */}

      {/* Two smaller charts side by side */}
      <Box sx={{ display: 'flex', gap: 4, mt: 4 }}>
        {renderSingleChart(dataSets.data4, '4 Area Chart', 220, true)}
        {renderSingleChart(dataSets.data8, '8 Area Chart', 220, true)}
      </Box>
      {renderSingleChart(dataSets.data32, '32 Area Chart', 300, true)}
    </Paper>
  );
};

export default CustomDevtaChart;
