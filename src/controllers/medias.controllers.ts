import { NextFunction, Request, Response } from 'express'
import path from 'path'
import { UPLOAD_IMAGE_DIR, UPLOAD_VIDEO_DIR, UPLOAD_VIDEO_TEMP_DIR } from '~/constants/dir'
import { USERS_MESSAGES } from '~/constants/messages'
import mediasService from '~/services/medias.services'
import { sendFileFromS3 } from '~/utils/s3'

export const uploadImageController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.UploadImage(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_IMAGE_SUCCESSFULLY,
    url
  })
}

export const uploadVideoController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.UploadVideo(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_VIDEO_SUCCESSFULLY,
    url
  })
}

export const uploadVideoHLSController = async (req: Request, res: Response, next: NextFunction) => {
  const url = await mediasService.UploadVideoHLS(req)
  return res.json({
    message: USERS_MESSAGES.UPLOAD_VIDEO_SUCCESSFULLY,
    url
  })
}

export const videoStatusController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await mediasService.GetVideoStatus(id as string)
  return res.json({
    message: USERS_MESSAGES.GET_VIDEO_STATUS_SUCCESSFULLY,
    result
  })
}

export const serveImageController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  return res.sendFile(path.resolve(UPLOAD_IMAGE_DIR, name), (err) => {
    if (err) {
      return res.status((err as any).status).send(USERS_MESSAGES.IMAGE_NOT_FOUND)
    }
  })
}

export const serveVideoController = (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.params
  const folder = name.split('.')[0]
  return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, folder, name), (err) => {
    if (err) {
      return res.status((err as any).status).send(USERS_MESSAGES.VIDEO_NOT_FOUND)
    }
  })
}

export const serveM3u8Controller = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  sendFileFromS3(res, `videos-hls/${id}/master.m3u8`)
  // const readId = id.replace('.m3u8', '')
  // return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, 'master.m3u8'), (err) => {
  //   if (err) {
  //     return res.status((err as any).status).send(USERS_MESSAGES.VIDEO_NOT_FOUND)
  //   }
  // })
}

export const serveSegmentController = (req: Request, res: Response, next: NextFunction) => {
  const { id, v, segment } = req.params
  sendFileFromS3(res, `videos-hls/${id}/${v}/${segment}`)
  // return res.sendFile(path.resolve(UPLOAD_VIDEO_DIR, id, v, segment), (err) => {
  //   if (err) {
  //     return res.status((err as any).status).send(USERS_MESSAGES.VIDEO_NOT_FOUND)
  //   }
  // })
}
