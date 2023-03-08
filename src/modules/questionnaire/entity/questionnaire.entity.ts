import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Questionnaire {
  constructor(questionnaire?: Partial<Questionnaire>) {
    Object.assign(this, questionnaire);
  }

  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title?: string;

  @Column()
  active?: boolean;
}
