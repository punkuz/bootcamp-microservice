import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Response } from "express";

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const error = exception.getError();
    const message =
      typeof error === "string"
        ? error
        : typeof error === "object" && "message" in error
          ? (error as { message: string }).message
          : "Unknown error";
    const statusCode =
      typeof error === "object" && (error as any)?.statusCode
        ? (error as any).statusCode
        : HttpStatus.INTERNAL_SERVER_ERROR; // Default status code

    response.status(statusCode).json({
      status: "error",
      message,
    });
  }
}
