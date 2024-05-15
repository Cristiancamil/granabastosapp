export interface PageCreate {
    id: number;
    title: string;
    url: string;
    status: boolean;
    createdAt: Date;
    userCreated: string;
}

export interface PageUpdate extends Omit<PageCreate, 
                                        'id' | 
                                        'dateCreated' | 
                                        'userCreated'> {
    updatedAt: Date;
    userUpdated: string;
}