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
        port:process.env.PORT,
        mode:"FORK",
        env:"TEST"
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
		urlSessionDatabase: process.env.MONGO_SESSION_URL,
		urlMainDatabase: objArgs.env === "TEST" ? process.env.MONGO_TEST_URL : process.env.MONGO_MAIN_URL
	},
}

export { options }
