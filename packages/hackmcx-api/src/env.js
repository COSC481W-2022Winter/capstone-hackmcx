import dotenv from 'dotenv'
// Check environment variables for configuration information.
if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'dev';
}

const CONFIG_PATH = process.env.NODE_CONFIG_PATH || '.';

// Get configuration from environment file.
dotenv.config({path: `${CONFIG_PATH}/${process.env.NODE_ENV}.env`});