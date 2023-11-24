import mongoose from 'mongoose';
import app from './app';
import config from './config';

const main = async () => {
  try {
    const connectInstance = await mongoose.connect(
      config.database_url as string
    );
    console.log(
      `\n mongoDB connected!! DB host:${connectInstance.connection.host}`
    );

    app.listen(config.port, () => {
      console.log(`\n Server is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log('\n /server:mongoDB connection failed:', err);
  }
};

main();
