import React, { useState } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ActionBar from './ActionBar';
import { useFuse, usePicDataQuery } from './hooks';

const fuseOpts = { keys: ['data.title'] };

function PicList() {
  const [searchText, setSearchText] = useState('');
  const { data, loading } = usePicDataQuery();
  const imageData = data?.data?.children;
  const options = useFuse(searchText, imageData, fuseOpts);

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
    </div>
  );
}

export default PicList;
