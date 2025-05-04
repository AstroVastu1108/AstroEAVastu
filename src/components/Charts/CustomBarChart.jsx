import React, { useMemo } from 'react';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
    Box, Paper, Typography, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow
} from '@mui/material';

const CustomBarChart = ({ data, vertical = false, barSize = 20}) => {
    const areas = data?.map(item => item.area);

    const { highValue, mediumValue, lowValue } = useMemo(() => {
        const maxArea = Math.max(...areas);
        const minArea = Math.min(...areas);
        const avgArea = areas.reduce((sum, val) => sum + val, 0) / areas.length;

        return {
            highValue: Math.ceil(maxArea * 0.85),
            mediumValue: Math.ceil(avgArea),
            lowValue: Math.ceil(minArea * 1.5)
        };
    }, [areas]);

    const ReferenceLineLegend = () => (
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component="span"
                    sx={{
                        display: 'inline-block',
                        width: 40,
                        height: 3,
                        backgroundColor: 'red',
                        mr: 1
                    }}
                />
                <Typography variant="body2">High</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component="span"
                    sx={{
                        display: 'inline-block',
                        width: 40,
                        height: 3,
                        backgroundColor: 'green',
                        mr: 1
                    }}
                />
                <Typography variant="body2">Medium</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box
                    component="span"
                    sx={{
                        display: 'inline-block',
                        width: 40,
                        height: 3,
                        backgroundColor: 'orange',
                        mr: 1
                    }}
                />
                <Typography variant="body2">Low</Typography>
            </Box>
        </Box>
    );

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2 }}>
            <Box sx={{ width: '100%', height: '500px',boxShadow:'none' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: vertical ? 55 : 20, 
                        }}
                        barCategoryGap="20%"
                        barGap={0}
                    >
                        <CartesianGrid horizontal={true} vertical={false} />
                        <XAxis
                            dataKey="label"
                            axisLine={true}
                            tickLine={true}
                            interval={0}
                            padding={{ left: 20, right: 20 }}
                            tick={vertical ? {
                                angle: -90,
                                textAnchor: 'end',
                                dy: -5,    // Adjust vertical position (move up)
                                dx: -10,   // Adjust horizontal position
                                fontSize: 12,  // Optional: adjust font size if needed
                                width: 200,   // Ensure enough width for the text
                                overflow: "hidden",  // Handle text overflow
                                textOverflow: "ellipsis"  // Add ellipsis for long text
                            } : {}}
                            // tick={vertical ? { angle: -90, textAnchor: 'end' } : {}}
                        />
                        <YAxis />
                        <Tooltip formatter={(value) => [`${value}`, 'Area']} />

                        <Bar
                            dataKey="area"
                            name="Area"
                            barSize={barSize}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>

                        <ReferenceLine y={highValue} stroke="red" strokeWidth={2} />
                        <ReferenceLine y={mediumValue} stroke="green" strokeWidth={2} />
                        <ReferenceLine y={lowValue} stroke="orange" strokeWidth={2} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
            {/* Horizontal Data Table */}
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
        </Paper>
    );
};

export default CustomBarChart;