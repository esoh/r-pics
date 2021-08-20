import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import PicList from './scenes/PicList';
import theme from './theme';

function App() {
  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <PicList />
      </ThemeProvider>
    </>
  );
}

export default App;
