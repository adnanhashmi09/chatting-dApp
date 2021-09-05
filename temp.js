useEffect(() => {
  db.get('chat')
    .map()
    .once(async (data, id) => {
      if (data) {
        const key = '#kewk';
        const message = {
          who: await db.user(data).get('alias'),
          what: (await SEA.decrypt(data.what, key)) + '',
          when: GUN.state.is(data, 'what'),
        };
        console.log(message.what);
        if (message.what) {
          setmessages(
            [...messages.slice(-100), message].sort((a, b) => a.when - b.when)
          );
        }
      }
    });
}, []);
