import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('articles')
export class ArticleEntity {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  link: string;

  @Column({ type: 'date', name: 'publish_date' })
  publishDate: string;

  @Column()
  creator: string;
}
