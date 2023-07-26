import { Request, Response } from "express";
import { constants } from "http2";
import { CompetenceService } from "../service";
import { QuestionService } from "../../question/service";
import { Question } from "../../question/entity/question.entity";

const {
  HTTP_STATUS_OK,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
} = constants;

export default class CompetenceController {
  public static create = async (req: Request, res: Response): Promise<any> => {
    try {
      const { questions, ...competence } = req.body;
      const newItem = await CompetenceService.create(competence);

      await Promise.all(
        questions.map((question: Question) =>
          QuestionService.create({
            ...question,
            competence_id: newItem.id,
          })
        )
      );

      return res.status(HTTP_STATUS_CREATED).send(newItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static delete = async (req: Request, res: Response): Promise<any> => {
    try {
      const deletedItem = await CompetenceService.delete(req.params.id);
      return res.status(HTTP_STATUS_CREATED).send(deletedItem);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static update = async (req: Request, res: Response): Promise<any> => {
    try {
      const { questions, ...competence } = req.body;

      const updatedItem = await CompetenceService.update(
        req.body.id,
        competence
      );

      await Promise.all(
        questions.map((question: Question) =>
          question.id
            ? QuestionService.update(question.id, question)
            : QuestionService.create({
                ...question,
                competence_id: competence.id,
              })
        )
      );

      return res.status(HTTP_STATUS_CREATED).send(updatedItem);
    } catch (error) {
      console.log(error);
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findAll = async (
    _req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const list = await CompetenceService.findAll();
      return res.status(HTTP_STATUS_OK).send(list);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };

  public static findById = async (
    req: Request,
    res: Response
  ): Promise<any> => {
    try {
      const item = await CompetenceService.findByID(req.params.id);

      if (!item) {
        res.status(HTTP_STATUS_NOT_FOUND).send({
          error: HTTP_STATUS_NOT_FOUND,
          message: "Object not found",
        });
      }

      return res.status(HTTP_STATUS_OK).send(item);
    } catch (error) {
      res.status(HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
        error: HTTP_STATUS_INTERNAL_SERVER_ERROR,
        message: (error as any).message,
      });
    }
  };
}
