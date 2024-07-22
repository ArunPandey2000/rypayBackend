import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return this.isActionAllowed(user.role);
    }

    private isActionAllowed(userRole: string) {
        if (userRole === 'ADMIN') {
            return true;
        }
        return false;
    }
}
