import Modal from "react-modal";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { saveNote } from "../../actions/workersLive";
import { SendNoteBot } from "../../actions/workersLive";
import { GetLastNote } from "../../actions/workersLive";
import format from "date-fns/format";
import getHours from "date-fns/getHours";
import getMinutes from "date-fns/getMinutes";
import { FiClock } from "react-icons/fi";

const DailyNotesModal = (props) => {
  const { isOpen, saveNote, onRequestClose, user, GetLastNote, SendNoteBot } =
    props;

  const [ImpData, setImpData] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();

    const deleteSpace = document.getElementById("dailyNote").value.trim();
    if (deleteSpace === "" || !deleteSpace || /^\s*$/.test(deleteSpace)) {
      alert("La nota esta vacia, No se puede enviar campos vacios ");
      return;
    }
    saveNote(user._id.email, document.getElementById("dailyNote").value);
    SendNoteBot(user.workerLive.name, deleteSpace,format(new Date(), "hh:mm aaaa"));
    // SendRequest(user._id.email);
    // SendRequest2();
    console.log("Modal cerrado");
    onRequestClose();
  };

  useEffect(() => {
    const getData = async () => {
      const Data = await GetLastNote(user._id.email);

      setImpData(Data);
      // console.log("vengo de test", ImpData);
    };
    getData();
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      {...props}
      //{...props}
      style={{
        display: "block",
        content: {
          overflow: "visible",
          width: "41%",
          margin: "auto",
          backgroundColor: "white",
          borderRadius: "20px",
          borderColor: "transparent",
          position: "relative",
          top: "60px",
        },
        overlay: { background: "rgb(105 105 105 / 75%)" },
      }}
      ariaHideApp={false}
      contentLabel="Task Detail"
    >
      <form
        onSubmit={onSubmit}
        className="RootContainer"
        style={{
          display: "flex",
          //padding: 'auto',
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "transparent",
        }}
      >
        <div
          id="legend"
          style={{
            backgroundColor: "transparent",
            borderRadius: "30px 30px 0px 0px",
            display: "flex",
            padding: "0rem",
          }}
        >
          <div
            style={{
              color: "white",
              fontSize: "200%",
              backgroundColor: "#033c73",
              borderRadius: "10px",
              margin: "auto",
              padding: "auto",
              alignSelf: "center",
            }}
          >
            {/* <h2
              style={{
                color: "white",
                padding: "0.5rem",
                marginLeft: "23px",
              }}
            >
              Agent Notes
            </h2>
            <h4
              style={{
                color: "white",
                padding: "0.5rem",
              }}
            >
              {" "}
            </h4> */}
          </div>
        </div>

        {/* agend notes for today */}
        {ImpData?.length > 0
          ? ImpData?.map((element) => {
              return (
                <div class="card border-secondary" key={element._id}>
                  <div class="card-header">Today Notes</div>
                  <div class="card-body">
                    <div style={{ fontWeight: "bold" }}> {user._id.email}</div>
                    <div
                      style={{
                        display: "flex",
                        fontWeight: "bold",
                        justifyContent: "space-between",
                        borderBottom: "1px solid rgb(128 128 128 / 48%)",
                      }}
                    >
                      <div>Note</div>
                      <div>Time</div>
                    </div>
                    {element?.lastNote.map((e) => {
                      return (
                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              borderBottom: "1px solid #8080802e",
                            }}
                          >
                            <div>{e.note}</div>
                            <div>
                              {e?.timestamp &&
                                format(new Date(e?.timestamp), "hh:mm aaaa")}
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              );
            })
          : ""}

        {/* notes end */}
        <div
          className="InputContainer"
          style={{
            backgroundColor: "white",
            display: "flex",
            padding: "1rem",
            margin: "0.5rem",
            borderRadius: "10px",
            flexDirection: "column",
          }}
        >
          {/* Daily Note Field */}
          <label
            htmlFor="dailyNote"
            style={{
              textAlign: "center",

              borderBottom: "solid",
              alignSelf: "center",
              fontSize: "1.5rem",
              padding: "0.5rem",
            }}
          >
            Daily Note
          </label>

          <textarea
            type="text"
            id="dailyNote"
            name="dailyNote"
            placeholder="Insert note.."
            style={{
              alignSelf: "center",
              width: "100.5%",
              height: "120px",
              margin: "auto",
              borderColor: "rgb(206 204 204 / 48%)",
              // marginLeft: "-22px",
            }}
            //value={username}
            //onChange={(e) => setUsername(e.target.value)}
          />

          <button
            type="submit"
            className="btn btn-success"
            style={{
              fontSize: "1.2rem",
              alignSelf: "center",
              margin: "2rem auto auto auto",
              padding: "0.3rem",
              width: "100%",
              // marginLeft: "-24px",
              color: "white",
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default connect(null, { saveNote, GetLastNote, SendNoteBot })(
  DailyNotesModal
);
