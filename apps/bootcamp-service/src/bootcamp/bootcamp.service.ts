import { Injectable } from "@nestjs/common";
import { CreateBootcampDto } from "./dto/create-bootcamp.dto";
import { UpdateBootcampDto } from "./dto/update-bootcamp.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Bootcamp } from "./entities/bootcamp.entity";
import { Repository } from "typeorm";
import { HttpRpcException } from "src/exceptions/http.rpc.exception";

@Injectable()
export class BootcampService {
  constructor(
    @InjectRepository(Bootcamp)
    private readonly bootcampRepository: Repository<Bootcamp>,
  ) {}
  async create(createBootcampDto: CreateBootcampDto) {
    try {
      const bootcamp = this.bootcampRepository.create(createBootcampDto);
      return this.bootcampRepository.save(bootcamp);
    } catch (error) {
      if (error.code === "ER_DUP_ENTRY") {
        throw HttpRpcException.badRequest("Bootcamp already exists.");
      }
      // Handle other database errors or unexpected errors
      throw HttpRpcException.internalServerError("Bootcamp creation failed");
    }
  }

  async findAll() {
    const bootcamps = await this.bootcampRepository.find();
    if (!bootcamps.length) {
      throw HttpRpcException.notFound("No bootcamps found.");
    }
    return bootcamps;
  }

  async findOne(id: string) {
    const bootcamp = await this.bootcampRepository.findOne({
      where: { id },
    });
    if (!bootcamp) {
      throw HttpRpcException.notFound("Bootcamp not found");
    }
    return {
      state: "successful",
      data: {
        bootcamp,
      },
    };
  }

  update(id: number, updateBootcampDto: UpdateBootcampDto) {
    return `This action updates a #${id} bootcamp`;
  }

  remove(id: number) {
    return `This action removes a #${id} bootcamp`;
  }
}
