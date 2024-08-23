import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const SummaryAspect = ({ SummaryData, Aspect }) => {
  const { columns, rows } = useMemo(() => {
    const columns = [{
      field: 'key', headerName: Aspect == "P" ? 'Planet' : 'House', flex: 1
    }];
    const rows = [];

    SummaryData.forEach((element, index) => {
      columns.push({
        field: index + 1,
        headerName: Aspect == "P" ? element?.RowTitle : index + 1,
        flex: 1,
        headerAlign: 'center',
        align: 'center',
        // renderCell: (params) => (
        //   <span className='summaryTxt' dangerouslySetInnerHTML={{ __html: params.value }} />
        // ),
        renderCell : (params) => {
          // Ensure params.value is a string before using dangerouslySetInnerHTML
          const value = typeof params.value === 'string' ? params.value : '';
          return <span className='summaryTxt' dangerouslySetInnerHTML={{ __html: value }} />;
        }
      });

      const row = { key: element?.RowTitle };
      element.Aspect.forEach((data, i) => {
        if (data?.IsWithRaKe)
          row[i + 1] = `<span class='rake'><span>${data?.Aspect}</span><span>⦿</span></span>`;
        else if (data?.Aspect == 0 && data?.IsAspect)
          row[i + 1] = `<span class='neutral'>${data?.Aspect}</span>`;
        else if (data?.IsPositive)
          row[i + 1] = `<span class='positive'>${data?.Aspect}</span>`;
        else if (data?.IsAspect)
          row[i + 1] = `<span class='negative'>${data?.Aspect}</span>`;
      });

      rows.push(row);
    });

    return { columns, rows };
  }, [SummaryData]);

  const rowsNew = rows?.map((item, index) => ({
    id: index + 1, // You can use uuidv4() for truly unique IDs if needed
    ...item
  }));

  const handleCellClick = (params) => {
    // Do nothing to disable cell click
    console.log("first")
  };

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
        rows={rowsNew}
        columns={columns}
        disableColumnSorting
        disableColumnMenu
        disableColumnResize
        disableRowSelectionOnClick
        hideFooterPagination={true}
        hideFooter={true}
        rowHeight={32}
        columnHeaderHeight={44}
        onCellClick={handleCellClick}
      />
    </Box>
  );
};

export default SummaryAspect;
