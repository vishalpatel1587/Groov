import { SnackbarProvider } from 'notistack';
import { ThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import history from './utils/history';
import Success from './pages/Success';
import Teams from './pages/Teams/Teams';
import theme from '../src/styling/theme';
import Layout from './components/Layout';
import Rituals from './pages/Rituals/Rituals';
import AddTeams from './pages/Teams/AddTeams';
import AddRitual from './pages/Rituals/AddRitual';
import { ToasterConfig } from './components/Toaster/ToasterUtils';
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          autoHideDuration={5000}
        >
          <ToasterConfig />
          <Router history={ history}>
            <Route exact path={['/:companyId', '/:companyId/teams']} component={Teams} />
            <Route path='/:companyId/teams/add' component={AddTeams} />
            <Route exact path='/:companyId/:teamId/rituals' component={Rituals} />
            <Route path='/:companyId/:teamId/ritual/add' component={AddRitual} />
            <Route path='/:companyId/ritual/edit/:id' component={AddRitual} />
            <Route path='/success' component={Success} />
          </Router>
        </SnackbarProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
