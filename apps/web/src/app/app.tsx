// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { AppBar } from '@booking-app/web/app-bar';
import { AddStayPage } from '@booking-app/web/stays';
import { AuthRequired } from '@booking-app/web/auth';

export function App() {
  return (
    <>
      <AppBar />

      <Routes>
        <Route path="stays">
          <Route element={<AuthRequired />}>
            <Route path="add-new" element={<AddStayPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
