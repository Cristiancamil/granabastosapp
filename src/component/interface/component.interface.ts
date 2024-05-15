import { ConfigurationType } from "../dto/create-component.dto";

export interface ComponentCreate {
    name: string;
    type: string;
    order: number;
    configuration: ConfigurationType;
    status: boolean;
}

// export interface ComponentUpdate extends Omit<ComponentCreate, 
//                                             'id' |
//                                             'dateCreated' |
//                                             'userCreated'> {
//     updatedAt: Date;
//     userUpdate: string;
// }