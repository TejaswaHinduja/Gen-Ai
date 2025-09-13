import { Schema } from 'mongoose';
declare const User: import("mongoose").Model<{
    name: string;
    password: string;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    name: string;
    password: string;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    name: string;
    password: string;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    name: string;
    password: string;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    name: string;
    password: string;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    name: string;
    password: string;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default User;
//# sourceMappingURL=user.d.ts.map