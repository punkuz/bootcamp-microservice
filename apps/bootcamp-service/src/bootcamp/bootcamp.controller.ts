import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { BootcampService } from "./bootcamp.service";
import { CreateBootcampDto } from "./dto/create-bootcamp.dto";
import { UpdateBootcampDto } from "./dto/update-bootcamp.dto";

@Controller()
export class BootcampController {
  constructor(private readonly bootcampService: BootcampService) {}

  @MessagePattern("create_bootcamp")
  create(@Payload() createBootcampDto: CreateBootcampDto) {
    return this.bootcampService.create(createBootcampDto);
  }

  @MessagePattern("find_all_bootcamps")
  findAll() {
    return this.bootcampService.findAll();
  }

  @MessagePattern("find_one_bootcamp")
  findOne(@Payload() id: string) {
    return this.bootcampService.findOne(id);
  }

  @MessagePattern("updateBootcamp")
  update(@Payload() updateBootcampDto: UpdateBootcampDto) {
    return this.bootcampService.update(updateBootcampDto.id, updateBootcampDto);
  }

  @MessagePattern("removeBootcamp")
  remove(@Payload() id: number) {
    return this.bootcampService.remove(id);
  }
}
