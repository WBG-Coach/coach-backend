import dataSource from "../../../database/config/ormconfig";
import { AnswerService } from "../../answer/service";
import { SchoolService } from "../../school/service";
import { SessionService } from "../../session/service";
import { UserService } from "../../user/service";
import { WatermelonData } from "../controller/types";
import { Sync } from "../entity";

export class SyncService {
  static sync = async ({
    apiLevel,
    deviceId,
    lastPulledAt,
    model,
    changes,
  }: WatermelonData): Promise<void> => {
    const syncRepository = await dataSource.getRepository(Sync);

    console.log({ apiLevel, deviceId, lastPulledAt, model });
    try {
      await syncRepository.save({
        apiLevel,
        deviceId,
        lastPulledAt,
        model,
      });

      // await SchoolService.sync(changes.school);
      // await UserService.sync(changes.user);
      await SessionService.sync(changes.session);
      // await AnswerService.sync(changes.answer);
    } catch (err) {
      console.log({ err });
    }
  };
}
