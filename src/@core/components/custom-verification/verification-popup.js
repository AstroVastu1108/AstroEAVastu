import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function VerificationPopup({open,headerMessage,descriptionMessage,successBtnTxt,cancelBtnTxt,cancelBtnFunction,successBtnFunction}) {

  return (
    <>
      <Dialog
        open={open}
        onClose={cancelBtnFunction}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {headerMessage}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {descriptionMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={successBtnFunction}>{successBtnTxt}</Button>
          <Button autoFocus onClick={cancelBtnFunction}>
            {cancelBtnTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}