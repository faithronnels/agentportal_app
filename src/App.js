import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import {
  checkAuthState,
  // logoutUser
} from "./redux/actions/authAction";
import store from "./redux/store";
import { useAuthState } from "./redux/selectors";
import Commission from "./pages/CommissionPage";
import Home from "./pages/HomePage";
import Register from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import Profile from "./pages/ProfilePage";
import SignIn from "./pages/SignInPage";
import Dashboard from "./pages/DashboardPage";
import ViewRequests from "./components/requests/ViewRequest";
import ResolvedRequest from "./components/requests/ResolvedRequest";
import UnresolvedRequest from "./components/requests/UnresolvedRequest";
import UpdateRequest from "./components/requests/UpdateRequest";
import Users from "./components/users/Users";
import ManageSignUpForms from "./components/manageSignUpForms/ManageSignUpForms";
import AccountArchives from "./components/manageSignUpForms/AccountArchives";
import UnVerifiedPayement from "./components/manageSignUpForms/UnVerifiedPayement";
import VerifiedPayments from "./components/manageSignUpForms/VerifiedPayments";
import AccountDetails from "./components/manageSignUpForms/accountDetails/AccountDetails";
import SearchReport from "./components/searchReport/SearchReport";
import SearchRequest from "./components/requests/SearchRequest.jsx";
import PrivateRoute from "./hocs/PrivateRoute";
import PublicLayout from "./components/layout/PublicLayout";
import ProtectedLayout from "./pages/ProtectedLayout";
import NotAllowedPage from "./pages/NotAllowedPage";

function App() {
  const authState = useAuthState();
  const { isAuthenticated } = authState;
  useEffect(() => {
    store.dispatch(checkAuthState());

    // window.addEventListener("load", () => {
    //   setLoading(false);
    //   setTimeout(() => setLoaded(true), 500);
    // });
  }, [isAuthenticated]);

  return (
    <div className="App relative">
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route exact path="commission" element={<Commission />} />
            <Route exact path="signup" element={<Register />} />
            <Route exact path="signin" element={<SignIn />} />
            <Route exact path="forgot-pass" element={<ForgotPassword />} />
          </Route>
          {/* <Route path="*" element={<NotAllowed />} /> */}
          <Route element={<ProtectedLayout />}>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route path="requests">
              <Route
                path="view"
                index
                element={
                  <PrivateRoute>
                    <ViewRequests />
                  </PrivateRoute>
                }
              />
              <Route
                path="resolved"
                element={
                  <PrivateRoute>
                    <ResolvedRequest />
                  </PrivateRoute>
                }
              />
              <Route
                path="unresolved"
                element={
                  <PrivateRoute>
                    <UnresolvedRequest />
                  </PrivateRoute>
                }
              />
              <Route
                path="update"
                element={
                  <PrivateRoute>
                    <UpdateRequest />
                  </PrivateRoute>
                }
              />
              <Route
                path="search"
                element={
                  <PrivateRoute>
                    <SearchRequest />
                  </PrivateRoute>
                }
              />
            </Route>

            <Route path="reg">
              <Route
                path="new"
                index
                element={
                  <PrivateRoute>
                    <ManageSignUpForms />
                  </PrivateRoute>
                }
              />
              <Route
                path="verified"
                element={
                  <PrivateRoute>
                    <VerifiedPayments />
                  </PrivateRoute>
                }
              />
              <Route
                path="unverified"
                element={
                  <PrivateRoute>
                    <UnVerifiedPayement />
                  </PrivateRoute>
                }
              />
              <Route
                path="archive"
                element={
                  <PrivateRoute>
                    <AccountArchives />
                  </PrivateRoute>
                }
              />
              <Route
                path="agentaccount/:id"
                element={
                  <PrivateRoute>
                    <AccountDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="search"
                element={
                  <PrivateRoute>
                    <SearchReport />
                  </PrivateRoute>
                }
              />
            </Route>

            {/* <Route
              path="reg/new"
              index
              element={
                <PrivateRoute>
                  <ManageSignUpForms />
                </PrivateRoute>
              }
            />
            <Route
              path="reg/verified"
              element={
                <PrivateRoute>
                  <VerifiedPayments />
                </PrivateRoute>
              }
            />
            <Route
              path="reg/unverified"
              element={
                <PrivateRoute>
                  <UnVerifiedPayement />
                </PrivateRoute>
              }
            />
            <Route
              path="reg/archive"
              element={
                <PrivateRoute>
                  <AccountArchives />
                </PrivateRoute>
              }
            />
            <Route
              path="reg/agentaccount/:id"
              element={
                <PrivateRoute>
                  <AccountDetails />
                </PrivateRoute>
              }
            />
            <Route
              path="reg/search"
              element={
                <PrivateRoute>
                  <SearchReport />
                </PrivateRoute>
              }
            />*/}

            <Route
              path="users"
              element={
                <PrivateRoute>
                  <Users />
                </PrivateRoute>
              }
            />
            <Route
              path="*"
              element={
                <PrivateRoute>
                  <NotAllowedPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Provider>
    </div>
  );
}

export default App;
