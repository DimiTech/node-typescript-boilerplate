import 'reflect-metadata'

import { container, TYPES } from '../inversify.config'

import IGreeter from '@app/domain/IGreeter'

const g = container.get<IGreeter>(TYPES.IGreeter)
g.greet('World')
