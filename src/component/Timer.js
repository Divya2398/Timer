import React, { useEffect, useState } from "react";
import "./Timer.css";
import { FaRegPlayCircle, FaPauseCircle, FaCalendarAlt } from "react-icons/fa";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { setTime } from "../features/TimerReducer";
const Timer = (props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state.timer);
  const date = new Date();
  //time format
  const gettime = moment(date).format("DD-MM-YYYY hh:mm:ss A");
  const [curDate, setCurDate] = useState(
    moment(date).format("DD-MM-YYYY hh:mm:ss A")
  );
  const [toggle, setToggle] = useState(false);
  const [result, setResult] = useState(selector.length <= 0 ? false : true);
  //handle button click
  const handleClick = (type) => {
    toggle ? setToggle(false) : setToggle(true);
    console.log(selector);
    setResult(selector.length < 0 ? false : true);

    let id = !toggle ? selector.length : selector.length - 1;
    dispatch(
      setTime({ id, type, time: moment(date).format("DD-MM-YYYY hh:mm:ss A") })
    );
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div className="row timer-head">
          <p className="text-center">Timer</p>
        </div>
        <div className="timer-body w-100">
          <div className="timer-icon-block">
            <div>
              <div className="d-flex justify-content-center pt-5">
                <FaCalendarAlt className="icon-cal" />
              </div>
              <div className="mt-3 d-flex justify-content-center">
                <div className="show-time d-inline-block p-3 rounded-pill">
                  <p className="text-center m-0">{curDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            {!toggle ? (
              <button
                className="btn btn-primary"
                onClick={() => handleClick("start")}
              >
                <span className="me-1">
                  <FaRegPlayCircle />
                </span>
                Start
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => handleClick("stop")}
              >
                <span className="me-1">
                  <FaPauseCircle />
                </span>
                Stop
              </button>
            )}
          </div>

          <div className="timer-result-block">
            <p className="result-head">RESULTS</p>
            <div>
              {!result ? (
                <p className="no-result">NO RESULTS FOUND</p>
              ) : (
                <div>
                  <table className="table table-warning table-striped">
                    <thead>
                      <tr>
                        <th className="text-center">Start Time</th>
                        <th className="text-center">End Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selector.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{data.startTime}</td>
                            <td>{data.stopTime}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timer;
