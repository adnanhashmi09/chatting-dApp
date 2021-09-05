import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
  name: 'user',
  initialState: { value: { username: '' } },
  reducers: {
    updateUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const updateUsername = userSlice.actions.updateUsername;
export default userSlice.reducer;
