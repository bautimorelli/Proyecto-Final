import { fileURLToPath } from "url"
import { dirname } from "path"

const __dirname = fileURLToPath(dirname(import.meta.url))

function formatedDate() {
	const date = new Date()

	const dd = date.getDate()
	const mm = date.getMonth() + 1
	const yyyy = date.getFullYear()
	const hh = date.getHours()
	const min = date.getMinutes()
	const ss = date.getSeconds()

	const formatedDate =
		dd + "/" + mm + "/" + yyyy + " " + hh + ":" + min + ":" + ss
	return formatedDate
}

export { __dirname, formatedDate }
