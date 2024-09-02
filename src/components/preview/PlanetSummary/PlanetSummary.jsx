import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const SummaryAspect = ({ SummaryData, Aspect }) => {
  const formatAspect = (data) => {
    if (data?.IsWithRaKe) {
      return `<span class='rake'><span>${data?.Aspect}</span><span>⦿</span></span>`;
    } else if (data?.Aspect === 0 && data?.IsAspect) {
      return `<span class='neutral'>${data?.Aspect}</span>`;
    } else if (data?.IsPositive) {
      return `<span class='positive'>${data?.Aspect}</span>`;
    } else if (data?.IsAspect) {
      return `<span class='negative'>${data?.Aspect}</span>`;
    }
    return '';
  };

  const { columns, rows } = useMemo(() => {
    const headerNames = Aspect === "P"
      ? ['Planet', 'Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury', 'Urans', 'Neptune', 'Pluto']
      : ['House', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const columns = headerNames.map((headerName, index) => ({
      field: index === 0 ? 'RowTitle' : `Aspect${index}`,
      headerName,
      flex: 1,
      headerClassName: 'rowheader',
      align:'center',
      renderCell: index === 0 ? undefined : (params) => {
        const value = typeof params.value === 'string' ? params.value : String(params.value || '');
        return <span className='summaryTxt' dangerouslySetInnerHTML={{ __html: value }} />;
      }
    }));

    const rows = SummaryData.map((planet, rowIndex) => ({
      id: rowIndex + 1,
      RowTitle: planet.RowTitle,
      ...planet.Aspect.reduce((acc, data, idx) => {
        acc[`Aspect${idx + 1}`] = formatAspect(data);
        return acc;
      }, {})
    }));

    return { columns, rows };
  }, [SummaryData, Aspect]);

  return (
    <Box sx={{
      '& .MuiDataGrid-cell': {
        borderLeft: '0.5px solid #662294',
        borderBottom: '0.5px solid #662294',
      },
      '& .MuiDataGrid-cell:last-child': {
        borderRight: '0.5px solid #662294',
      }
    }}>
      <DataGrid
        getRowId={(row) => row.id}
        rows={rows}
        columns={columns}
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
        hideFooterPagination
        hideFooter
        rowHeight={32}
        columnHeaderHeight={44}
      />
    </Box>
  );
};

export default SummaryAspect;
