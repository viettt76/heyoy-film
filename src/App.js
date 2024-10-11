import { Fragment } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '~/layouts/MainLayout';
import { publicRoutes } from './routes';
import ScrollTop from './components/ScrollTop';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <ScrollTop>
          <Routes>
            {publicRoutes.map((route, index) => {
              let Layout = MainLayout;
              if (route.layout) {
                Layout = route.layout;
              } else if (route.layout === null) {
                Layout = Fragment;
              }
              const Page = route.component;
              return (
                <Route
                  key={`route-${index}`}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </ScrollTop>
      </BrowserRouter>
    </div>
  );
}

export default App;
