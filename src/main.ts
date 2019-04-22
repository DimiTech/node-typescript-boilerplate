import 'reflect-metadata'
import * as dotenv from 'dotenv'
dotenv.config()

import { container, TYPES } from '@infrastructure/inversify.config'

import App from '@web/App'

const app = container.get<App>(TYPES.App)
app.run()
