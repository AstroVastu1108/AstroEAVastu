import { toast } from "react-toastify";
import "toastdisplayer.css";
export const toastDisplayer = async (toastType, toastMsg) => {
    if (toastType === "error") {
      return toast.error(`${toastMsg}`, {
        position: "top-right",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: false,
        theme: "light",
        style: { ...commonStyle, backgroundColor: "#f44336", color: "#fff" },
      });
    } else if (toastType === "success" || toastType === "success") {
      return toast.success(
        // `${toastMsg}`,
        <div dangerouslySetInnerHTML={{ __html: toastMsg }} />,
        {
          position: "top-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          style: { ...commonStyle, backgroundColor: "#f44336", color: "#fff" },
        });
    }
    else if (toastType === "info") {
      return toast.info(
        <div dangerouslySetInnerHTML={{ __html: toastMsg.replace(/\n/g, '<br>') }} />,
        {
          position: "top-right",
          autoClose: 20000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
          theme: "light",
          style: { ...commonStyle, backgroundColor: "#f44336", color: "#fff" },
        }
      );
    }
  };
