// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar } from '@booking-app/web/app-bar';
import {
  AddStayPage,
  EditStayPage,
  StaySinglePage,
  StaysListPage,
} from '@booking-app/web/stays';
import { AuthRequired } from '@booking-app/web/auth';
import { GuestReservationsListPage } from '@booking-app/web/reservations';

export function App() {
  return (
    <>
      <AppBar />

      <Routes>
        <Route path="/" element={<StaysListPage />} />

        {/* Stays */}
        <Route path="stays">
          <Route path=":stayId" element={<StaySinglePage />} />
          <Route element={<AuthRequired />}>
            <Route path="own" element={<StaysListPage own />} />
          </Route>
          <Route element={<AuthRequired />}>
            <Route path="add-new" element={<AddStayPage />} />
          </Route>
          <Route element={<AuthRequired />}>
            <Route path="edit/:id" element={<EditStayPage />} />
          </Route>
        </Route>

        {/* Reservations */}
        <Route path="reservations" element={<AuthRequired />}>
          <Route path="guest" element={<GuestReservationsListPage />}></Route>
        </Route>
      </Routes>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
