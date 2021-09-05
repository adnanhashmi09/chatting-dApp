import GUN from 'gun';
import 'gun/sea';
// import 'gun/axe';
import { updateUsername } from '../features/user';
import { store } from '../store/store';
// import 'gun/lib/radix';
// import 'gun/lib/radisk';
// import 'gun/lib/store';
// import 'gun/lib/rindexed';

//Database
export const db = GUN();

//User
export const user = db.user().recall({ sessionStorage: true });

db.get('alias').on((v) => store.dispatch(updateUsername({ username: v })));

db.on('auth', async (event) => {
  const alias = await user.get('alias'); // username string
  store.dispatch(updateUsername({ username: alias }));
  console.log(`signed in as ${alias}`);
});
