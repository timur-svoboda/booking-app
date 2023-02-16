// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes } from 'react-router-dom';
import { AppBar } from '@booking-app/web/app-bar';
import { AddStayPage } from '@booking-app/web/stays';

export function App() {
  return (
    <>
      <AppBar />

      <Routes>
        <Route path="stays">
          <Route path="add-new" element={<AddStayPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
