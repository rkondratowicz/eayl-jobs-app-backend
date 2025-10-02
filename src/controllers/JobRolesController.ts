import { type Request, type Response, Router } from "express";

export class JobRolesController {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get("/", this.getHelloWorld.bind(this));
  }

  private getHelloWorld(_req: Request, res: Response): void {
    res.json({
      message: "Hello World!",
    });
  }
}
