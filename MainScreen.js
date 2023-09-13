import "./MainScreen.css";
import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CalendarMonthIcon from "@mui/icons-material/EditCalendar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import DatePicker from "react-datepicker";
import DialogContentText from "@mui/material/DialogContentText";
import "react-datepicker/dist/react-datepicker.css";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const MainScreen = () => {
  const [open, setOpen] = useState(false);
  const [dopen, setdopen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [task, setTask] = useState([]);
  const [isEdit, setisEdit] = useState(0);
  const [index, setIndex] = useState(null);
  const [fill, setfill] = useState("All");
  const [editVal, seteditVal] = useState(0);
  const [nnam, setnnam] = useState();
  const [ndesc, setndesc] = useState();
  const [nimp,setnimp]=useState()
  const [nprgs,setnprgs]=useState();
  const [delIndex, setdelIndex] = useState();
  const dateChange = (e) => {
    console.log(e);
    setStartDate(e);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  let todayDate=new Date().getDate();
  let todayMonth=new Date().getMonth();
  todayMonth=monthNames[todayMonth]
  let todayYear=new Date().getFullYear();
  

  const handleSubmit = (e) => {
    if (isEdit == 1) {
      e.preventDefault();
      // if(e.target.name.value=="")
      // {
      //  document.getElementById("error").classList.add("error-clss");
      // }
      let obj = {
        name: e.target.name.value,
        date: e.target.date.value,
        des: e.target.desc.value,
        prior: e.target.imp.checked,
        prgs: e.target.cmp.checked,
      };
      let newData = task;
      newData[index] = obj;
      setTask(newData);
      setndesc("");
      setStartDate(startDate)
      setnimp(false)
      setnprgs(false)
      let temp = 0;
      setisEdit(temp);
    } else {
      e.preventDefault();

      // if(e.target.name.value=="")
      // {
      //   document.getElementById("error").classList.add("error-clss");
      // }
      let obj = {
        name: e.target.name.value,
        date: e.target.date.value,
        des: e.target.desc.value,
        prior: e.target.imp.checked,
        prgs: e.target.cmp.checked,
      };
      console.log(obj);
      let tempTask = task;
      setTask([...tempTask, obj]);
      setndesc("");
      setStartDate(startDate)
      setnnam("")
    }
  };
  const onFilter = (e) => {
    let selVal = e.target.value;
    if (selVal == "true") {
      setfill(true);
    } else if (selVal == "All") {
      setfill("All");
    } else {
      setfill(false);
    }
  };
  let delVal;
  const delFn = (e) => {
    delVal = e.target.innerText;
    handleCloseD();
    if (delVal == "Confirm") {
      console.log("del", delIndex);
      let temp = task;
      temp = temp.filter((e, i) => i != delIndex);
      setTask(temp);
    }
  };
  const deleteData = (index) => {
    setdelIndex(index);
    handleClickOpenD();
  };

  const editData = (e, index) => {
    setnnam(e.name);
    setndesc(e.des);
    setnimp(e.prior);
    setnprgs(e.prior);
    setStartDate(startDate);
    handleClickOpen();
    seteditVal(e);
    let temp = 1;
   
    setisEdit(temp);
    setIndex(index);
  };

  const ipChange = (e) => {
    setnnam(e.target.name.value);
  };
  const ipdescChange =(e)=>{
setndesc(e.target.value)
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenD = () => {
    setdopen(true);
  };
  const handleCloseD = () => {
    setdopen(false);
  };
  return (
    <div>
      <section className="home-page">
        <div className="container">
          <div className="row">
            <div className="left-col">
              <h1 className="title">To-Do List</h1>

              <h3 className="today-task">Today's tasks</h3>
              <h3 className="all-task">All tasks</h3>
            </div>
            <div className="right-col">
              <div className="right-top">
                <div></div>
                <div className="date-top"> {todayYear},   {todayMonth} {todayDate} </div>
                <div className="add-task-btn">
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    className="add-task-btn"
                  >
                    Add task
                  </Button>
                </div>
              </div>
              <div className="filter-div">
                Filter By
                <select onChange={onFilter} className="form-select">
                  <option value="All">All</option>
                  <option value={true}>Completed</option>
                  <option value={false}>Notcompleted</option>
                </select>
              </div>
             {task.length==0 && <div className="no-task">No Task available</div>} 
              <div className="task-div">
                {task.map((e, i) => {
                  if (fill == "All") {
                    return (
                      <div key={i} className="task-box">
                        <h3  className="t-name">{e.name}</h3>
                        <p className="t-des">{e.des}</p>
                        <p className="date-display">
                          <CalendarMonthIcon className="date-icon" /> {e.date}
                        </p>
                        <div className="task-edit-options">
                          <div>
                            {e.prgs && <p className="completed">completed</p>}
                            {!e.prgs && (
                              <p className="not-completed">uncompleted</p>
                            )}
                          </div>
                          <div className="task-edit-div">
                            {e.prior && (
                              <p className="imp-icon">
                                <StarIcon />
                              </p>
                            )}
                            {!e.prior && (
                              <p>
                                <StarBorderIcon />
                              </p>
                            )}
                            <p className="del-icon"  onClick={() => deleteData(i)}>
                              <DeleteIcon />
                            </p>
                            <p className="edit-icon"  onClick={() => editData(e, i)}>
                              <MoreVertIcon />
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    if (fill == e.prgs) {
                      return (
                        <div key={i} className="task-box">
                          <h3>{e.name}</h3>
                          <p>{e.des}</p>
                          <p className="date-display">
                            <CalendarMonthIcon className="date-icon" /> {e.date}
                          </p>
                          <div className="task-edit-options">
                            <div>
                              {e.prgs && <p className="completed">completed</p>}
                              {!e.prgs && (
                                <p className="not-completed">uncompleted</p>
                              )}
                            </div>
                            <div className="task-edit-div">
                              {e.prior && (
                                <p className="imp-icon">
                                  <StarIcon />
                                </p>
                              )}
                              {!e.prior && (
                                <p>
                                  <StarBorderIcon />
                                </p>
                              )}
                              <p className="del-icon" onClick={() => deleteData(i)}>
                                <DeleteIcon />
                              </p>
                              <p className="edit-icon" onClick={() => editData(e, i)}>
                                <MoreVertIcon />
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    }
                  }
                })}
              </div>
            </div>
            <div className="dummy-col"></div>
          </div>
        </div>
      </section>

      <div>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <form onSubmit={handleSubmit} className="main-form">
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Add a Task
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <div className="dialog-content">
                <div className="title-content">
                  <div>
                    <p className="title-cont-heading">Title</p>
                    <input
                      className="task-title"
                      type="text"
                      placeholder="e.g, study for the test"
                      name="name"
                      id="names"
                      value={nnam}
                      onChange={(e)=>ipChange(e)}
                    />
                     
                    
                  </div>

                  <div>
                    <p className="title-cont-heading">Date</p>
                    <DatePicker
                      className="date-pick"
                      selected={startDate}
                      dateFormat="dd/MM/yyyy"
                      onChange={(date) => dateChange(date)}
                      name="date"
                      
                    />
                  </div>

                  <div>
                    <p className="title-cont-heading">Description (optional)</p>
                    <textarea
                      rows="3"
                      value={ndesc}
                      cols="50"
                      placeholder="e.g, study for the test"
                      name="desc"
                      onChange={(e)=>ipdescChange(e)}
                    ></textarea>
                  </div>

                  <div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        className="imp"
                        name="imp" defaultChecked={nimp}
                        onChange={(e)=>ipChange(e)}
                      />{" "}
                      <span className="check-cont">Mark as important</span>
                    </div>
                    <div className="checkbox-div">
                      <input
                        type="checkbox"
                        className="cmp"
                        name="cmp" defaultChecked={nprgs}
                        onChange={ipChange}
                      />{" "}
                      <span className="check-cont">Mark as completed</span>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
            <DialogActions className="add-task-popup-btn">
              <input
                type="submit"
                value="Add a task"
                className="task-popup-btn"
                autoFocus
                onClick={handleClose}
              />
            </DialogActions>
          </form>
        </BootstrapDialog>
      </div>
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpenD}>
        Open alert dialog
      </Button> */}
        <Dialog
          open={dopen}
          onClose={handleCloseD}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure "}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Task will be permanently deleted
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="cancel-del-btn" onClick={delFn}>Cancel</Button>
            <Button className="cnfm-del-btn" autoFocus onClick={delFn}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MainScreen;
