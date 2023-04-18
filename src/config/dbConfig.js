import * as dotenv from "dotenv"
import ParsedArgs from "minimist"

dotenv.config()

const objArgs = ParsedArgs(process.argv.slice(2), {
    alias:{
        p:"port",
        m:"mode",
        e:"env"
    },
    default:{
        port:process.env.DEFAULT_PORT,
        mode:process.env.DEFAULT_MODE,
        env:process.env.DEFAULT_ENV
    }
})

const options = {
	server: {
		PORT:objArgs.port,
        MODE:objArgs.mode,
        NODE_ENV:objArgs.env,
        DB_TYPE: process.env.DB_TYPE || "mongo"
	},
	mongo: {
        sessionHash: process.env.SESSION_HASH,
		urlSessionDatabase: process.env.MONGO_SESSION_URL,
		urlMainDatabase: objArgs.env === "TEST" ? process.env.MONGO_TEST_URL : process.env.MONGO_MAIN_URL
	},
    firebase: {
        urlMainDatabase: objArgs.env === "TEST" ? process.env.FIREBASE_TEST_URL : process.env.FIREBASE_MAIN_URL
    }
}

export { options }
