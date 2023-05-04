import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { validate } from 'uuid';

@Injectable()
export class UuidValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;
    console.log(id);
    console.log("TOTOTOTO");
    
    
    if (!validate(id)) {
      return res.status(400).json({
        message: 'Invalid UUID',
      });
    }
    next();
  }
}
