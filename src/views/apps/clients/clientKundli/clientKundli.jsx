import { useEffect, useState, useCallback } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/navigation";
import { GetKundliDataAPI } from "@/app/Server/API/kundliAPI";
import KundliPopUp from "./kundliPopup/kundliPopup";
import { DeleteClientKundli, GetClientKundli, SaveClientKundli } from "@/app/Server/API/client";
// import { toastDisplayer } from "@/@core/components/toast-displayer/toastdisplayer";
import { useAuth } from "@/@core/contexts/authContext";
import Loader from "@/components/common/Loader/Loader";

export default function ClientKundli({ cid }) {
  const { user } = useAuth();
  const [checked, setChecked] = useState([]);
  const [clientKundliList, setClientKundliList] = useState([]);
  const [kundliData, setKundliData] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItem, setEditItem] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedKundliClient, setSelectedKundliClient] = useState(null);
  const [kundliType, setKundliType] = useState(false);
  const router = useRouter();

  const fetchClientKundliList = useCallback(async () => {
    try {
      const data = await GetClientKundli(user?.transactionID, cid);
      // if (data.hasError) return toastDisplayer("error", data.error);
      setClientKundliList(data.responseData);
    } catch (error) {
      // toastDisplayer("error", error.message);
    }
  }, [cid, user?.transactionID]);

  useEffect(() => {
    if (user?.transactionID) fetchClientKundliList();
  }, [fetchClientKundliList, user?.transactionID]);

  const fetchKundliData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await GetKundliDataAPI(10, 1,"");
      if (res.hasError) throw new Error(res.error);
      setKundliData(res?.responseData?.data?.Result?.KundaliList);
    } catch (error) {
      // toastDisplayer("error", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKundliData();
  }, [fetchKundliData]);

  const handleToggle = useCallback(
    (id) => () => {
      setChecked((prevChecked) =>
        prevChecked.includes(id)
          ? prevChecked.filter((item) => item !== id)
          : [...prevChecked, id]
      );
    },
    []
  );

  const handleAddItem = async () => {
    if (!newItem.trim()) return;
    const newKundli = { id: Date.now(), name: newItem };
    // setClientKundliList((prevList) => [...prevList, newKundli]);
    setNewItem("");
    handleOpenKundliPopup(newKundli, false);
  };

  const handleDelete = async (id) => {
    try {
      const response = await DeleteClientKundli(id);
      if (response.hasError) throw new Error(response.errorMessage);
      setClientKundliList((prevList) => prevList.filter((item) => item.id !== id));
      // toastDisplayer("success", response.responseData.statusMsg);
    } catch (error) {
      // toastDisplayer("error", error.message);
    }
  };

  const handleEdit = (item) => {
    setEditItem(item.clientKundaliId);
    setEditText(item.name);
  };

  const handleSaveEdit = async () => {
    const item = clientKundliList.find((item) => item.clientKundaliId === editItem);
    if (!item) return;
    const payload = {
      id: editItem,
      clientKundaliId : item.clientKundaliId,
      name: editText,
      kundaliId: item.kundaliId,
      clientId: cid,
      companyId: user?.transactionID,
    };
    try {
      const response = await SaveClientKundli(payload);
      if (response.hasError) throw new Error(response.errorMessage);
      if(!kundliType){
        setClientKundliList((prevList) =>
          prevList.map((item) => (item.clientKundaliId === editItem ? { ...item, name: editText } : item))
        );
      }
      setEditItem(null);
      setEditText("");
      setKundliType(false);
      // toastDisplayer("success", response.responseData.statusMsg);
    } catch (error) {
      // toastDisplayer("error", error.message);
    }
  };

  const handleOpenKundliPopup = (data, type) => {
    setOpen(true);
    setSelectedKundliClient(data);
    setKundliType(type);
  };

  const handleSubmit = async (selectedData, client) => {
    // if (!selectedData) return toastDisplayer("error", "Select the kundli to add client.");
    const payload = {
      id: kundliType ? selectedKundliClient?.id : undefined,
      clientKundaliId: kundliType ? selectedKundliClient?.clientKundaliId : undefined,
      name: client.name,
      kundaliId: selectedData.KundaliID,
      clientId: cid,
      companyId: user?.transactionID,
    };
    try {
      const response = await SaveClientKundli(payload);
      if (response.hasError) throw new Error(response.errorMessage);
      setOpen(false);
      // fetchClientKundliList();
      const payloadData = {
        id: response.responseData?.result,
        name: client.name,
        kundaliId: selectedData.KundaliID,
        clientId: cid,
        companyId: user?.transactionID,
      };
      if(!kundliType){
        setClientKundliList((prevList) => [...prevList, payloadData]);
      }
      return setKundliType(false)
      // return toastDisplayer("success", response.responseData.statusMsg);
    } catch (error) {
      // toastDisplayer("error", error.message);
    }
  };

  return (
    <>
    {loading && <Loader />}
      {open && selectedKundliClient?.name && (
        <KundliPopUp
          open={open}
          handleAddClose={() => setOpen(false)}
          kundliData={kundliData}
          client={selectedKundliClient}
          cid={cid}
          user={user}
          handleSubmit={handleSubmit}
          kundliType={kundliType}
        />
      )}

      <div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <TextField
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new kundli"
            fullWidth
            variant="outlined"
            size="small"
            style={{ flexBasis: "78%" }}
          />
          <LoadingButton
            fullWidth
            variant="contained"
            onClick={handleAddItem}
            loading={loading}
            style={{ flexBasis: "18%" }}
            color="primary"
          >
            {loading ? "Loading ..." : "Add Kundli"}
          </LoadingButton>
        </div>

        <List sx={{ bgcolor: "background.paper", marginTop: 2 }}>
          {clientKundliList.map((item) => (
            <ListItem key={item.id} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(item.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(item.id)}
                    disableRipple
                    inputProps={{ "aria-labelledby": `checkbox-list-label-${item.id}` }}
                  />
                </ListItemIcon>
                {editItem === item.clientKundaliId ? (
                  <TextField
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    size="small"
                    fullWidth
                  />
                ) : (
                  <ListItemText
                    primary={item.name}
                    onClick={() => handleOpenKundliPopup(item, true)}
                  />
                )}
                <IconButton
                  edge="end"
                  aria-label="preview"
                  onClick={() => router.push(`kundali/${item.kundaliId}`)}
                >
                  <i className="tabler-arrow-up-right" />
                </IconButton>
                <IconButton edge="end" aria-label="edit" onClick={() => (editItem === item.clientKundaliId ? handleSaveEdit() : handleEdit(item))}>
                  {editItem === item.clientKundaliId ? (
                    <Button variant="contained">Save</Button>
                  ) : (
                    <i className="tabler-edit" />
                  )}
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item.clientKundaliId)}>
                  <i className="tabler-trash" />
                </IconButton>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </>
  );
}
