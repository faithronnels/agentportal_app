import { GET_NOTIFICATION, NOTIFICATION_ERROR } from "./types";

const notifications = [
  { id: 1, header: "Dear Esteemed Pricipal Agent,", body: "This is to notify you that performance on your duty as a Principal agent will be considered while sending Monthly commission from June 2021. The criteria that will be used are as follows: <br/><ul><li>New Agents brought in for the month/Shop visitation</li><li>Loan Funding</li><li>Completion of loan</li><li>Any additional task given for the month</li></ul>Regards,<br/>Merrybet Team." },
  {id:2,header:"Happy New Year", body: "Happy New Year to you,our dearest PA. Cheers to a year of great expansion!!!!" },
  { id: 3, header: "Welcome Message", body: "Congratulations on becoming one of our highly esteemed agents.Welcome to  <b>Where Champions Play</b>!!!!" }
  
];
 

export const getNotification = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_NOTIFICATION,
      payload: notifications,
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_ERROR,
      payload: err.message,
    });
  }
};
