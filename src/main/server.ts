import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'

MongoHelper.connect('mongodb://localhost:27017/clean-node-api').then(async () => {
  const app = (await import('./config/app')).default
  app.listen(5050, () => console.log('Server running at http://localhost:5050'))
}).catch(console.error)
