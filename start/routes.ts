/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const FlagsController = () => import('#controllers/flags_controller')
router.get('/', [FlagsController, 'index'])
