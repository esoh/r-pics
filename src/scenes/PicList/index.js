import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogContent from '@material-ui/core/DialogContent';
import ActionBar from './ActionBar';
import DialogTitle from './DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useFuse, usePicDataQuery } from './hooks';

const styles = (theme) => ({
  info: {
    margin: 0,
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
  },
  infoDivider: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
});

const fuseOpts = { keys: ['data.title'] };

function PicList({ classes }) {
  const [searchText, setSearchText] = useState('');
  const [selectedPic, setSelectedPic] = useState(null);
  const { data, loading } = usePicDataQuery();
  const imageData = data?.data?.children;
  const options = useFuse(searchText, imageData, fuseOpts);

  const handleClose = () => setSelectedPic(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <ActionBar
        onChangeSearchText={setSearchText}
        searchText={searchText}
      />
      <div style={{ flex: 1, display: 'flex' }}>
        {loading ? (
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </div>
        ) : (
          <List divider>
            {options.map(opt => (
              <ListItem
                key={opt.data.id}
                divider
                button
                onClick={() => setSelectedPic(opt)}
              >
                <ListItemAvatar>
                  <Avatar variant="square" src={opt.data.thumbnail} />
                </ListItemAvatar>
                <ListItemText>{opt.data.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </div>

      <Dialog
        fullScreen
        open={!!selectedPic}
        onClose={handleClose}
      >
        <DialogTitle onClose={handleClose}>
          {selectedPic?.data?.title}
        </DialogTitle>
        <div className={classes.info}>
          <Typography variant="p">
            {`Author: ${selectedPic?.data?.author}`}
          </Typography>
          <Divider orientation="vertical" className={classes.infoDivider} />
          <Typography variant="p">
            {`${selectedPic?.data?.score} upvotes`}
          </Typography>
          <Divider orientation="vertical" className={classes.infoDivider} />
          <Typography variant="p">
            {`${selectedPic?.data?.total_awards_received} awards`}
          </Typography>
        </div>
        <DialogContent dividers>
          <img
            style={{ maxHeight: '80vh', maxWidth: '80vw' }}
            src={selectedPic?.data?.url}
            alt={selectedPic?.data?.title}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(PicList);
