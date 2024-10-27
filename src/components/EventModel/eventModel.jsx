
import React, { useEffect, useRef, useState } from 'react'
import { Autocomplete, Button, Card, CardContent, CardHeader, CircularProgress, debounce, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormHelperText, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";

export default function EventModel({ open, handleAddClose, headerTitle, displayData }) {
    return (
        <>
            <Dialog
                open={open}
                onClose={handleAddClose}
                maxWidth={false}
                fullWidth={false}
                PaperProps={{
                    sx: {
                      width: '700px', // Set your custom width here
                      maxWidth: '100%', // Optional: prevent exceeding container width
                    },
                  }}
            >
                <DialogTitle className="PopupHeader text-white p-3" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                    <div className='w-100' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className='text-primary text-2xl font-semibold !pl-3'>
                            {headerTitle}
                        </span>
                        <IconButton
                            aria-label="close"
                            onClick={handleAddClose}
                            sx={{
                                color: 'white',
                            }}
                        >
                            <i className='tabler-x text-primary'></i>
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <Grid className='mt-2' container spacing={5}>
                        <Grid item xs={12} sm={12}>
                            {displayData}
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    )
}
