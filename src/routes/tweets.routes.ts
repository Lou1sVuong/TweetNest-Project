import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controllers/tweets.controllers'
import { createTweetValidation, tweetIdValidation } from '~/middlewares/tweets.middlewares'
import { accessTokenValidation, verifiedUserValidation } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetsRouter = Router()

/**
 * Description: create a new tweet
 * Path: /
 * Method: POST
 * Body : TweetReqBody
 */

tweetsRouter.post(
  '/',
  accessTokenValidation,
  verifiedUserValidation,
  createTweetValidation,
  wrapRequestHandler(createTweetController)
)

/**
 * Description: Get tweet detail
 * Path: /:tweet_id
 * Method: GET
 * Header: {Authorization?: Bearer token}
 */

tweetsRouter.get('/:tweet_id', tweetIdValidation, wrapRequestHandler(getTweetController))

export default tweetsRouter
