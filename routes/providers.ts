import { Router } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { TebraService } from '../services/TebraService';
import { parseGetProvidersResponse } from '../utils/parseXmlResponse';



const router = Router();

router.get('/', catchAsync(async (req, res) => {
  const xml = await TebraService.getProviders();
  const json = await parseGetProvidersResponse(xml);

  res.type('application/json').send(json);
}));



export default router;
