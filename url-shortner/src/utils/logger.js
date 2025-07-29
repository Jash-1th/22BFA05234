import axios from 'axios';

const logger = {
  clientID: '0385f03d-e3cf-47d8-a8fd-c674a3d3f03a',
  clientSecret: 'gMGcPZsAnJTCJXGs',
  authToken: null,

  async getToken() {
    try {
      const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
        clientID: this.clientID,
        clientSecret: this.clientSecret
      });
      this.authToken = res.data.access_token;
    } catch (err) {
      console.error("Auth failed:", err);
    }
  },

  async log(where, level, message) {
    if (!this.authToken) await this.getToken();
    
    try {
      await axios.post('http://20.244.56.144/evaluation-service/logs', {
        stack: where,
        level: level,
        package: "url-shortener",
        message: message,
        timestamp: new Date().toISOString()
      }, {
        headers: { 'Authorization': `Bearer ${this.authToken}` }
      });
    } catch (err) {
      console.error("Log failed:", err);
    }
  }
};

export default logger;