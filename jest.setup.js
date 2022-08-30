// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- npm install whatwg-fetch
import 'setimmediate';
import { getEnvironments } from './src/helpers/getEnvironments';

// configure to use the environment test variables
require('dotenv').config({
    path: '.env.test'
})

// when getEnvironments its called, returns the environment variables
jest.mock('./src/helpers/getEnvironments', () => ({
    getEnvironments: () => ({...process.env})
}))
