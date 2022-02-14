import './env.js'
import {app} from './app.js'

let port = process.env.PORT || 3003;

app.listen(port, () => console.log(`'${process.env.NODE_ENV}' server  is running on port: '${port}'.`))