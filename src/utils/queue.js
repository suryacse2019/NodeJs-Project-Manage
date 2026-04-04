// queue.js
import { emailQueue } from "../utils/addEmailJob.js";

const emailQueue = new Queue('emailQueue', {
  connection: {
    host: '127.0.0.1',
    port: 6379,
  },
});

module.exports = emailQueue;