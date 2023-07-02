import { Request, Response } from 'express';
import createError from 'http-errors';
import Streamer from '../models/streamerModel';
import { postStreamerValidation } from '../validations/streamerValidation';
import { NEW_STREAMER_ADDED } from '../constants/successMessages';
import { INVALID_VOTE, STREAMER_DOES_NOT_EXIST, STREAMER_ALREADY_EXISTS } from '../constants/errorMessages';
import IStreamer from '../types/IStreamer';
import { IStreamersQuery, IStreamersRes } from '../types/dto/StreamersDTO';
import { IStreamerParams, IStreamerReq, IStreamerRes } from '../types/dto/StreamerDTO';
import { IVoteParams, IVoteReq, IVoteRes } from '../types/dto/VoteDTO';

//[INFO] GET - /streamers
export const getStreamers = async (req: Request<{}, {}, {}, IStreamersQuery>, res: Response<IStreamersRes>) => {
  const page: number = req.query.page ? req.query.page : 1;
  const limit: number = req.query.limit ? req.query.limit : 20;

  let query = {};
  if (req.query.searching) query = { name: { $regex: req.query.searching, $options: 'i' } };

  let sort = {};
  if (req.query.sorting && req.query.sorting === 'ztoa') sort = { name: -1 };
  else if (req.query.sorting && req.query.sorting === 'atoz') sort = { name: 1 };
  else if (req.query.sorting && req.query.sorting === 'least_liked') sort = { votes: 1 };
  else if (req.query.sorting && req.query.sorting === 'most_liked') sort = { votes: -1 };
  else if (req.query.sorting && req.query.sorting === 'oldest') sort = { createdAt: 1 };
  else sort = { createdAt: -1 };

  const count = await Streamer.find(query).countDocuments().exec();
  const listedStreamers = await Streamer.find(query)
    .sort(sort)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  return res.status(200).send({ count, streamers: listedStreamers });
};

//[INFO] GET - /streamer/:streamerId
export const getStreamer = async (req: Request<IStreamerParams>, res: Response<{ streamer: IStreamer }>) => {
  const foundStreamer = await Streamer.findById(req.params.streamerId).exec();
  if (!foundStreamer) throw createError(404, STREAMER_DOES_NOT_EXIST);

  return res.status(200).send({ streamer: foundStreamer });
};

//[INFO] POST - /streamers
export const postStreamer = async (req: Request<{}, {}, IStreamerReq>, res: Response<IStreamerRes>) => {
  const validationResult = await postStreamerValidation.validateAsync(req.body);

  const foundStreamer = await Streamer.findOne({ name: validationResult.name }).exec();
  if (foundStreamer && foundStreamer.platform === validationResult.platform) throw createError(409, STREAMER_ALREADY_EXISTS);

  const newStreamer = new Streamer(validationResult);

  await newStreamer.save();

  return res.status(201).send({ message: NEW_STREAMER_ADDED, streamer: newStreamer });
};

//[INFO] PUT - /streamers/:streamerId/vote
export const putStreamerVote = async (req: Request<IVoteParams, {}, IVoteReq>, res: Response<IVoteRes>) => {
  const foundStreamer = await Streamer.findById(req.params.streamerId).exec();
  if (!foundStreamer) throw createError(404, STREAMER_DOES_NOT_EXIST);

  if (req.body.vote === 'vote') foundStreamer.votes += 1;
  else if (req.body.vote === 'unvote') {
    if (foundStreamer.votes > 0) foundStreamer.votes -= 1;
  } else throw createError(400, INVALID_VOTE);

  await foundStreamer.save();

  return res.status(200).send({ vote: req.body.vote, streamer: foundStreamer });
};
