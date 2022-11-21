import Pusher from 'pusher-js/react-native';
import Echo from 'laravel-echo';

export default {
  data: function () {
    return {
      Echo: {},
    }
  },
  methods: {
    async initEcho() {
      this.Echo = new Echo({
        broadcaster: 'pusher',
        encrypted: true,
        client: new Pusher(env.PUSHER_APP_KEY, {
          cluster: env.PUSHER_APP_CLUSTER,
          forceTLS: true,
          activityTimeout: 3000,
          pongTimeout: 3000,
          encrypted: true,
          authorizer: (channel, options) => {
            return {
              authorize: (socketId, callback) => {
                axios.post(env.BACKEND_URL + '/broadcasting/auth', {
                  socket_id: socketId,
                  channel_name: channel.name
                })
                  .then(response => {
                    callback(false, response.data);
                  })
                  .catch(error => {
                    callback(true, error);
                  });
              }
            }
          }
        })
      });
    }
  }
}