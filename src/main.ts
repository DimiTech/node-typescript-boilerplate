import 'reflect-metadata'

import { container, TYPES } from '@infrastructure/inversify.config'

import App from '@app/App'

const app = container.get<App>(TYPES.App)
app.run()
