import { GET_COMMISION, COMMISION_ERROR } from "./types";
const commisionTypes = [
  { type: "Single (1 outcome)", percentage: "1.0" },
  { type: "Double (2 outcomes)", percentage: "2.0" },
  { type: "3 games (3 outcomes)", percentage: "4.0" },
  { type: "4 games (4 outcomes)", percentage: "8.0" },
  { type: "5 games (5 outcomes)", percentage: "8.0" },
  { type: "6 games (6 outcomes)", percentage: "10.0" },
  { type: "7 games (7 outcomes)", percentage: "10.0" },
  { type: "8 games (8 outcomes)", percentage: "10.0" },
  { type: "9 games (9 outcomes)", percentage: "14.0" },
  { type: "10 games (10 outcomes)", percentage: "14.0" },
  { type: "11 games (11 outcomes)", percentage: "14.0" },
  { type: "12 games (12 outcomes)", percentage: "14.0" },
  { type: "13 games (13 outcomes)", percentage: "14.0" },
  { type: "14 games (14 outcomes)", percentage: "20.0" },
  { type: "15 games (15 outcomes)", percentage: "20.0" },
  { type: "16 games (16 outcomes)", percentage: "24.0" },
  { type: "17 games (17 outcomes)", percentage: "24.0" },
  { type: "18 games (18 outcomes)", percentage: "24.0" },
  { type: "19 games (19 outcomes)", percentage: "24.0" },
  { type: "20 games (20 outcomes)", percentage: "26.0" },
  { type: "21 games (21 outcomes)", percentage: "26.0" },
  { type: "22 games (22 outcomes)", percentage: "26.0" },
  { type: "23 games (23 outcomes)", percentage: "26.0" },
  { type: "24 games (24 outcomes)", percentage: "26.0" },
  { type: "25 games (25 outcomes)", percentage: "30.0" },
  { type: "26 games (26 outcomes)", percentage: "30.0" },
  { type: "27 games (27 outcomes)", percentage: "30.0" },
  { type: "28 games (28 outcomes)", percentage: "30.0" },
  { type: "29 games (29 outcomes)", percentage: "30.0" },
  { type: "30 games (30 outcomes)", percentage: "30.0" },
  { type: "31 games (31 outcomes)", percentage: "40.0" },
  { type: "32 games (32 outcomes)", percentage: "40.0" },
  { type: "33 games (33 outcomes)", percentage: "40.0" },
  { type: "34 games (34 outcomes)", percentage: "40.0" },
  { type: "35 games (35 outcomes)", percentage: "40.0" },
  { type: "36 games (36 outcomes)", percentage: "40.0" },
  { type: "37 games (37 outcomes)", percentage: "40.0" },
  { type: "38 games (38 outcomes)", percentage: "40.0" },
  { type: "39 games (39 outcomes)", percentage: "40.0" },
  { type: "40 games (40 outcomes)", percentage: "40.0" },
  { type: "41 games (41 outcomes)", percentage: "40.0" },
  { type: "42 games (42 outcomes)", percentage: "40.0" },
  { type: "43 games (43 outcomes)", percentage: "40.0" },
  { type: "44 games (44 outcomes)", percentage: "40.0" },
  { type: "45 games (45 outcomes)", percentage: "40.0" },
];
export const getCommsion = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_COMMISION,
      payload: commisionTypes,
    });
  } catch (err) {
    dispatch({
      type: COMMISION_ERROR,
      payload: err.message,
    });
  }
};
