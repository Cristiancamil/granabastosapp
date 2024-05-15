import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Component {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200, nullable: false })
    name: string;

    @Column({ type: "varchar", length: 50, nullable: false })
    type: string;

    @Column({ type: "int", nullable: false })
    order: number;

    @Column({ type: "jsonb", nullable: false })
    configuration: JSON;

    @Column({ type: "boolean", nullable: false, default: false })
    status: boolean;

    @Column({ type: "varchar", nullable: false })
    userCreated: string;

    @Column({ type: "varchar" })
    userUpdated: string;

    @Column({ type: "timestamp", default: () => "CURRENT_timestamp" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_DATE", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
