import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import HomeView from './views/Homeview';
import AboutView from './views/AboutView';
import CreateInvoiceView from './views/CreateInvoiceView';
import InvoiceDocView from './views/InvoiceDocView';
import Error404View from './views/Error404View';
import GeneralStatisticsView from './views/GeneralStatisticsView';
import FilterStatisticsView from './views/FilterStatisticsView';
import EnterDataView from './views/EnterDataView';
import PrivateRoute from './components/PrivateRoute';

import Local from './helpers/Local';
import Api from './helpers/Api';

import LoginView from './views/LoginView';
import ProfileView from './views/ProfileView';
import SignUpView from './views/SignUpView';
import EditProfileView from './views/EditProfileView';
import SpecificStatisticsView from './views/SpecificStatisticsView';

function App() {
  //
  // Declare state/reactive variables with initial values
  //
  const navigate = useNavigate();
  const [billCats, setBillCats] = useState([]); // when App is rendered all categories will be fetched from DB and stored here
  const [invoices, setInvoices] = useState([]); // when App is rendered all invoides will be fetched from DB and stored here and when a invoice is added this state will get updated
  const [statistics, setStatistics] = useState([]); // this gets set with all entries in statistic_data table when data is added to be stored until data is submitted by form in
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [registerErrorMsg, setRegisterErrorMsg] = useState('');
  const [updateUserErrorMsg, setUpdateUserErrorMsg] = useState('');
  const [countInvoices, setCountInvoices] = useState(0);
  const [filteredStatistics, setFilteredStatistics] = useState([]);
  const [averagesAll, setsAveragesAll] = useState([]); // holds average hours, rate, amount for all invoice items

  // gets all categories and all invoices that exist at the moment of rendering of the App
  useEffect(() => {
    getBillCats();
    getCountInvoices();
  }, []);

  //
  // Declare funcs used in this component
  //

  // POST method to add recipe to my sql database ("favorites" sql table) after click on Add to Favorites in the RecipeDetailView
  async function addUser(userData) {
    let myresponse = await Api.addUser(userData); // do POST
    if (myresponse.status === 400) {
      setRegisterErrorMsg('User name is already taken!');
    } else if (myresponse.ok) {
      setRegisterErrorMsg('');
      setLoginErrorMsg('');
      navigate('/login');
    } else {
      console.log(
        `Server error: ${myresponse.status} ${myresponse.statusText}`
      );
      setRegisterErrorMsg('Registration failed!');
    }
  }

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg('');
      navigate('/');
    } else {
      setLoginErrorMsg('Login failed');
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
  }

  async function getUnfilteredAverages() {
    try {
      let response = await Api.getContent('/invoices/averages');
      if (response.ok) {
        let averages = response.data;
        setsAveragesAll(averages);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function updateUser(userData) {
    let response = await Api.updateUser(user.userID, userData); // do POST
    try {
      if (response.status === 401) {
        console.log(response);
        setUpdateUserErrorMsg('The old password you have entered is incorrect');
      } else if (response.ok) {
        setUpdateUserErrorMsg('');
        let { firstname, lastname, email, username } = response.data;

        setUser((state) => ({
          ...state, // gets replaced by all key-value pairs from obj
          firstname,
          lastname,
          email,
          username,
        }));

        navigate('/profile'); // navigates to updated profile
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // gets passed as a prop to CreateInvoice View
  async function addInvoice(invoiceData) {
    invoiceData.fk_userID = user.userID; // adds user id of user logged in
    let response = await Api.addInvoice(invoiceData);
    try {
      if (response.ok) {
        await getCountInvoices(); // get updated invoices count
        setUser((state) => ({
          ...state, // gets replaced by all key-value pairs from obj
          invoices: response.data.invoices, // sets updated invoices from this user
        }));

        navigate(`/invoices/${response.data.lastInvoiceID}`); // navigates to invoice with ID of added invoice
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  // gets passed as a prop to Profile View
  async function deleteInvoice(invoiceID) {
    let response = await Api.deleteInvoice(invoiceID, { userID: user.userID });
    try {
      if (response.ok) {
        await getCountInvoices(); // get updated invoices count
        setUser((state) => ({
          ...state, // gets replaced by all key-value pairs from obj
          invoices: response.data, // sets updated invoices from this user
        }));
        console.log(response.data);
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function addStatisticData(data) {
    let response = await Api.addStatisticData(data);

    try {
      if (response.ok) {
        let statistics = response.data;
        setStatistics(statistics); // set statistics state with all invoices including new ones
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getFilteredStatistics(querystring) {
    try {
      // URL should look something like this
      // /invoices/specify/?partner_sexualOrient=heterosexual&partner_sexualOrient=queer
      let response = await Api.getFilteredAverages(querystring);
      if (response.ok) {
        let data = response.data;
        setFilteredStatistics(data);
        navigate('/specific-statistics');
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getBillCats() {
    let response = await Api.getContent('/bill-cats');
    try {
      if (response.ok) {
        let categories = response.data;
        setBillCats(categories); // set billCats state with all categories, so it can be used by other components/views
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  async function getCountInvoices() {
    let response = await Api.getContent('/invoices/count');
    try {
      if (response.ok) {
        setCountInvoices(response.data.count); // set countInvoices state with amount of invoices
      } else {
        console.log(`Server error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      console.log(`Server error: ${err.message}`);
    }
  }

  function continueFromStatistics(data) {
    addStatisticData(data);
    navigate('/create'); // redirect to /create
  }

  return (
    <div className="App">
      <Navbar user={user} logoutCb={doLogout} />
      <Routes>
        <Route path="/" element={<HomeView invoicesFromApp={invoices} />} />
        <Route path="about" element={<AboutView />} />
        <Route
          path="/login"
          element={
            <LoginView
              loginCb={(u, p) => doLogin(u, p)}
              loginError={loginErrorMsg}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUpView addUserCb={addUser} registerError={registerErrorMsg} />
          }
        />
        {/* Route to ProfileView*/}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileView user={user} deleteInvoiceCb={deleteInvoice} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfileView
                user={user}
                updateUserCb={updateUser}
                updateUserErrorMsg={updateUserErrorMsg}
              />
            </PrivateRoute>
          }
        />

        <Route
          path="enter-data"
          element={
            <EnterDataView continueFromStatisticsCb={continueFromStatistics} />
          }
        />
        <Route
          path="create"
          element={
            <CreateInvoiceView
              user={user}
              billCatFromApp={billCats}
              addInvoiceCb={addInvoice}
              nextNo={countInvoices + 1} // invoice numbers started with 1, so last invoice has number invoice.length
            />
          }
        />
        <Route
          path="invoices/:id"
          element={<InvoiceDocView billCatFromApp={billCats} />}
        />
        <Route
          path="general-statistics"
          element={
            <GeneralStatisticsView
              getUnfilteredAveragesCb={getUnfilteredAverages}
              countInvoices={countInvoices}
              billCatsFromApp={billCats}
              averagesAll={averagesAll}
            />
          }
        />

        <Route
          path="filter-statistics"
          element={
            <FilterStatisticsView
              averagesAll={filteredStatistics}
              getFilteredStatisticsCb={getFilteredStatistics}
              invoicesFromApp={invoices}
              billCatsFromApp={billCats}
            />
          }
        />
        <Route
          path="specific-statistics"
          element={<SpecificStatisticsView averagesAll={filteredStatistics} />}
        />
        <Route path="*" element={<Error404View />} />
        <Route path="*" element={<Error404View />} />
      </Routes>
    </div>
  );
}

export default App;
