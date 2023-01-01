interface Config {
  app: {
    host: string;
    port: string;
  };
  server: {
    host: string;
    port: string;
  };
}

const config: Config = {
  app: {
    host: process.env.HOST_APP || "localhost",
    port: process.env.PORT || "3000",
  },
  server: {
    host: process.env.HOST_SERVER || "localhost",
    port: process.env.PORT_SERVER || "5000",
  },
};

export default config;
