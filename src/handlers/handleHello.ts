import { Request, Response } from "express";

function handleHello(req: Request, res: Response): void {
  res.status(200).json({
    message: "Hello! Developer",
    cheer: "Happy Coding 🎉",
  });
}

export default handleHello;
