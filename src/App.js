import Layout from './components/Layout';
import { BrowserRouter as Router,  Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../src/styling/theme';
import Teams from './pages/Teams/Teams';
import AddTeams from './pages/Teams/AddTeams';
import Rituals from './pages/Rituals/Rituals';
import AddRitual from './pages/Rituals/AddRitual';
import Success from './pages/Success';
import { SnackbarProvider } from 'notistack';
import { ToasterConfig } from './components/Toaster/ToasterUtils';
import history from './utils/history';
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
            <Route exact path={['/company/:companyId', '/company/:companyId/teams']} component={Teams} />
            <Route path='/company/:companyId/teams/add' component={AddTeams} />
            <Route exact path='/company/:companyId/:teamId/rituals' component={Rituals} />
            <Route path='/company/:companyId/:teamId/ritual/add' component={AddRitual} />
            <Route path='/company/:companyId/ritual/edit/:id' component={AddRitual} />
            <Route path='/success' component={Success} />
          </Router>
        </SnackbarProvider>
      </Layout>
    </ThemeProvider>
  );
}

export default App;
