"use strict"

import { start } from "./server.js"
import { route } from "./router.js"
import { start as _start, upload, showImage } from "./requestHandlers.js"

let handler = {}
handler["/"] = _start
handler["/start"] = _start
handler["/upload"] = upload
handler["/showImage"] = showImage

start(route, handler)