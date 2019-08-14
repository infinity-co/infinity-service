// Packages
import bodyParser from 'body-parser'

const json = bodyParser.json()
const encodeURL = bodyParser.urlencoded({ extended: false })

export function setBodyParser() {
  return [json, encodeURL]
}
