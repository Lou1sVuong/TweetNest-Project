import { Router } from 'express'
import { likesTweetController, unlikesTweetController } from '~/controllers/likes.controller'
import { tweetIdValidation } from '~/middlewares/tweets.middlewares'
import { accessTokenValidation, verifiedUserValidation } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likesRouters = Router()

/**
 * Description: likes
 * Path: /
 * Method: POST
 * Body : { tweet_id : string}
 * Header: {Authorization: Bearer token}
 */
likesRouters.post(
  '/',
  accessTokenValidation,
  verifiedUserValidation,
  tweetIdValidation,
  wrapRequestHandler(likesTweetController)
)

/**
 * Description: unlikes
 * Path: /tweets/:tweet_id
 * Method: POST
 * Header: {Authorization: Bearer token}
 */
likesRouters.delete(
  '/tweets/:tweet_id',
  accessTokenValidation,
  verifiedUserValidation,
  tweetIdValidation,
  wrapRequestHandler(unlikesTweetController)
)

export default likesRouters
