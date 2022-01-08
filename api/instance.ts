import axios from 'axios'
import {baseApiPath} from '../config'

export default axios.create({
  baseURL: baseApiPath,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
