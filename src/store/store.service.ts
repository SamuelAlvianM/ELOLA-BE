/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Create_Store_Dto, Invite_User_Dto, Update_Store_Dto } from './dto/store.dto';


// add SERVICE login staff, with pin
// OWNER must make staff account 1 owner many account staffs
@Injectable()
export class StoreService {
    constructor(private prisma: PrismaService) {}

    async createNewStore(user_id: number, createStoreDto: Create_Store_Dto) {
        const store = await this.prisma.store.create({
          data: {
            ...createStoreDto,
            user_id,
          },
        });

        await this.prisma.storeStaff.create({
          data: {
            store_id: store.store_id,
            user_id,
            role: 'owner',
          },
        });
    
        return store;
      }
    
    async invite_to_store(owner_id: number, store_id: number, invite_dto: Invite_User_Dto) {
        const { invited_email, invited_user_id } = invite_dto;
        const store = await this.prisma.store.findUnique({
            where: { store_id: store_id },
            include: { user: true },
        });

        if(!store || store.user_id !== owner_id) {
            throw new Error(`Store ${store_id} not found or user ${owner_id} not found`);
        }

        const invited_user = await this.prisma.user.findUnique({
            where: { user_id: invited_user_id, email: invited_email },
        });

        if (!invited_user) {
            throw new Error(`User ${invited_user_id} not found`);
        }

        await this.prisma.storeStaff.create({
            data: {
                store_id: store_id,
                user_id: invited_user.user_id,
                role: 'staff',
            },
        });
        return {message: 'Invited user done successfully' };
    }

    async findAllStore() {
        return await this.prisma.store.findMany({
            where: {
                deleted_at: null
            }
        })
    }

    async findAllStoreStaff() {
        return await this.prisma.storeStaff.findMany()
    }

    async findOne(store_staff_id: number) {
        return await this.prisma.storeStaff.findUnique({ 
            where: { 
                store_staff_id: store_staff_id, 
                deleted_at: null,
            },
            include: { user: true },
        }); 
    }

    async update(store_id: number, update_store: Update_Store_Dto) {
        return await this.prisma.store.update({
            where: { store_id: store_id },
            data: update_store,
        });
    }



    async delete(store_id: number) {
        return await this.prisma.store.update({
            where: { 
                store_id: store_id,
            },
            data: {
                deleted_at: new Date()
            }
        });
    }

    async deleteStaff(store_staff_id: number) {
        return await this.prisma.store.delete({
            where: { store_id: store_staff_id },
        });
    }

}
