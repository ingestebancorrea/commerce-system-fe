import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router/AppRouter';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { SnackbarProvider } from 'notistack';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <SnackbarProvider maxSnack={3} autoHideDuration={3000} >
          <AppRouter />
        </SnackbarProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
