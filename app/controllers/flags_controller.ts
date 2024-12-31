import type { HttpContext } from '@adonisjs/core/http'
import axios from 'axios'

export default class FlagsController {
  async index({ inertia }: HttpContext) {
    try {
      const response = await axios.get('https://api.first.org/data/v1/countries', {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0',
          'Cache-Control': 'no-cache',
        },
        timeout: 10000,
      })
      return inertia.render('flags', {
        countries: response.data.data,
      })
    } catch (error) {
      return inertia.render('flags')
    }
  }
}
