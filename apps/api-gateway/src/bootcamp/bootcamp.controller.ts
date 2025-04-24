import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { Roles } from "src/decorators/roles.decoraator";
import { AuthGuard } from "src/guards/auth.guard";
import { RolesGuard } from "src/guards/role.guard";
import { Role } from "src/types/role.enum";
import { CreateBootcampDto } from "./dto";
import { AuthRequest } from "src/types/authrequest.type";

@Controller("bootcamp")
export class BootcampController {
  constructor(
    @Inject("BOOTCAMP_CLIENT") private readonly bootCampClient: ClientProxy,
  ) {}

  @Post()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  create(
    @Body() createBootCampDto: CreateBootcampDto,
    @Request() req: AuthRequest,
  ) {
    return this.bootCampClient.send("create_bootcamp", {
      ...createBootCampDto,
      userId: req.user?.id,
    });
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  findAllBootcamps() {
    return this.bootCampClient.send("find_all_bootcamps", {});
  }

  @Get(":bootCampId")
  @Roles(Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(AuthGuard)
  findOne(@Param("bootCampId") bootCampId: string) {
    return this.bootCampClient.send("find_one_bootcamp", bootCampId);
  }
}
