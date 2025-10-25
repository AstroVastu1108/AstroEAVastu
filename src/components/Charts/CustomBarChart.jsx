import React, { useMemo } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, ReferenceLine, LabelList, ResponsiveContainer
} from 'recharts';
import {
    Box, Paper, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Divider, useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CustomBarChart = ({ data, vertical = false, barSize = 20, showLines = false, points }) => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down('md'));

    const areas = data?.map(item => item.area);
    const totalArea = areas.reduce((sum, val) => sum + val, 0);
    const maxArea = Math.max(...areas);
    const minArea = Math.min(...areas);

    const { highValue, mediumValue, lowValue } = useMemo(() => {
        const mediumValue = Math.ceil(totalArea / 16);
        return {
            highValue: Math.ceil((mediumValue + maxArea) / 2),
            mediumValue: mediumValue,
            lowValue: Math.ceil((mediumValue + minArea) / 2)
        };
    }, [areas]);

    const PolygonDisplay = ({ points, width = 220, height = 220, scale = 0.2 }) => {
        const scaledPoints = points.map(p => ({ x: p.x * scale, y: p.y * scale }));
        const pointsString = scaledPoints.map(p => `${p.x},${p.y}`).join(' ');
        return (
            <svg width={width} height={height}>
                <polygon
                    points={pointsString}
                    fill="rgba(0, 123, 255, 0.25)"
                    stroke="#007bff"
                    strokeWidth={2}
                />
            </svg>
        );
    };

    const ReferenceLineLegend = () => (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
            {[
                { color: 'red', label: 'Upper Balance' },
                { color: 'green', label: 'Line of Balance (A)' },
                { color: 'orange', label: 'Lower Balance' }
            ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{
                        display: 'inline-block', width: 40, height: 3,
                        backgroundColor: item.color, mr: 1
                    }} />
                    <Typography variant="body2">{item.label}</Typography>
                </Box>
            ))}
        </Box>
    );

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                width: '100%',
                maxWidth: 1200,
                mx: 'auto',
                overflow: 'hidden'
            }}
        >

            {/* Top Section: Polygon + Chart */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isSmall ? 'column' : 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 4,
                    width: '100%',
                    height: isSmall ? 'auto' : 400,
                }}
            >
                {/* Polygon */}
                {points && points.length > 2 && (
                    <Box
                        sx={{
                            flex: isSmall ? '0 0 auto' : '0 0 25%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <PolygonDisplay points={points} />
                    </Box>
                )}

                {/* Bar Chart */}
                <Box
                    sx={{
                        flex: 1,
                        minWidth: 300,
                        height: isSmall ? 300 : '100%',
                    }}
                >
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 20, right: 30, left: 10, bottom: 30 }}
                            barCategoryGap="25%"
                        >
                            <CartesianGrid horizontal vertical={false} strokeDasharray="3 3" />
                            <XAxis
                                dataKey="label"
                                tick={{ fontSize: 12 }}
                                interval={0}
                                tickLine={false}
                                axisLine={true}
                            />
                            <YAxis
                                label={{
                                    value: 'Zonal Strength',
                                    angle: -90,
                                    position: 'insideLeft',
                                    style: { textAnchor: 'middle', fontSize: 12 }
                                }}
                                tickFormatter={(v) => (v / 1000).toFixed(2)}
                                tick={{ fontSize: 12 }}
                            />
                            <Tooltip formatter={(v) => `${(v / 1000).toFixed(2)}`} />
                            <Bar dataKey="area" barSize={barSize}>
                                <LabelList
                                    dataKey="area"
                                    position="top"
                                    fill="#333"
                                    formatter={(v) => (v / 1000).toFixed(2)}
                                    style={{ fontSize: '11px' }}
                                />
                                {data.map((entry, i) => (
                                    <Cell key={i} fill={entry.color} />
                                ))}
                            </Bar>

                            {showLines && (
                                <>
                                    <ReferenceLine y={highValue} stroke="#B03120" strokeWidth={2} />
                                    <ReferenceLine y={mediumValue} stroke="#44753D" strokeWidth={2} />
                                    <ReferenceLine y={lowValue} stroke="#E3BD12" strokeWidth={2} />
                                </>
                            )}
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>

            {/* Divider */}
            {showLines && <Divider sx={{ my: 2 }} />}

            {/* Table Section */}
            {showLines && (
                <>
                    <Box sx={{ mt: 5 }}>
                        <TableContainer
                            variant="outlined"
                            sx={{
                                overflowX: 'visible',
                                border: '1px solid rgba(0, 0, 0, 0.12)', // Add border to the entire table container
                                borderRadius: '4px'  // Optional: rounded corners
                            }}
                        >
                            <Table
                                size="small"
                                sx={{
                                    tableLayout: 'fixed',
                                    width: '100%',
                                    borderCollapse: 'collapse' // Ensure borders collapse properly
                                }}
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={{
                                                width: '15%',
                                                border: '1px solid rgba(0, 0, 0, 0.12)', // Add border to all cells
                                                borderBottom: '2px solid rgba(0, 0, 0, 0.2)' // Slightly darker bottom border for header
                                            }}
                                        >
                                            Data Type
                                        </TableCell>
                                        {data.map((item, index) => (
                                            <TableCell
                                                key={index}
                                                align="center"
                                                sx={{
                                                    width: `${85 / data.length}%`,
                                                    padding: '6px 2px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    border: '1px solid rgba(0, 0, 0, 0.12)', // Add border to all cells
                                                    borderBottom: '2px solid rgba(0, 0, 0, 0.2)' // Slightly darker bottom border for header
                                                }}
                                            >
                                                {item.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {/* Area Values Row */}
                                    <TableRow>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            sx={{
                                                border: '1px solid rgba(0, 0, 0, 0.12)' // Add border to all cells
                                            }}
                                        >
                                            Area Value
                                        </TableCell>
                                        {data.map((item, index) => (
                                            <TableCell
                                                key={index}
                                                align="center"
                                                sx={{
                                                    padding: '6px 2px',
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    border: '1px solid rgba(0, 0, 0, 0.12)' // Add border to all cells
                                                }}
                                            >
                                                {((item.area) / 1000).toFixed(2)}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <ReferenceLineLegend />
                </>
            )}
        </Paper>
    );
};

export default CustomBarChart;
