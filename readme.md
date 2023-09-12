```
npm install casbin fastify-casbin
```
### Building checkRole middleware
```
//import { FastifyRequest, FastifyReply } from 'fastify';
//import { findOneUser } from '../services/userService';

const checkRole = (roles: string[]) => async (
    request: FastifyRequest,
    reply: FastifyReply,
    next: () => void
): Promise<void> => {

    const userId = request.user.id;
    const user = await findOneUser({ id: userId });

    if (!user)
        return reply.status(401)
            .send({ success: false, error: 'Unauthorized' });

    const roleExists = roles.some(role => role === user['role']);

    if (!roleExists) 
        return reply.status(401)
            .send({ success: false, error: 'Unauthorized' });
    
    return next();
};
```