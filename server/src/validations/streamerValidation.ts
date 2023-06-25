import Joi from 'joi';

export const postStreamerValidation = Joi.object({
  name: Joi.string().required().max(40),
  description: Joi.string().required().max(200),
  platform: Joi.string().valid('twitch', 'youtube', 'tiktok', 'kick', 'rumble'),
  image: Joi.string().required().uri(),
});
