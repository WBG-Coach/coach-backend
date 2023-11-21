import { Request, Response } from "express";
import { DashboardService } from "../service";

import { constants } from "http2";
import { SchoolService } from "../../school/service";
import { School } from "../../school/entity/school.entity";

const { HTTP_STATUS_OK, HTTP_STATUS_INTERNAL_SERVER_ERROR } = constants;

export default class DashboardController {
  public static getData = async (
    req: Request<
      unknown,
      unknown,
      unknown,
      { region?: School["region"]; district?: string; schoolId?: string }
    >,
    res: Response
  ): Promise<any> => {
    try {
      const { region, district, schoolId } = req.query;

      if (schoolId) {
        const data = await DashboardService.getDataBySchoolId(schoolId);
        return res.status(HTTP_STATUS_OK).send(data);
      }

      if (district) {
        const data = await DashboardService.getDataByDistrict(district);
        const schools = await SchoolService.findByRegion(region);
        return res.status(HTTP_STATUS_OK).send({ ...data, schools });
      }

      if (region) {
        const data = await DashboardService.getDataRegionRegion(region);
        return res.status(HTTP_STATUS_OK).send(data);
      }

      const data = await DashboardService.getData();
      return res.status(HTTP_STATUS_OK).send(data);
    } catch (error) {
      console.log({ error });
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
