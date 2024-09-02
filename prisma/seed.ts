/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // deklarasi akun superadmin
  const super_admins = [{
    admin_name: 'SaleMate Admin',
    admin_email: 'salemate.official@gmail.com',
    admin_pin: "889777",
    password: await bcrypt.hash('Team3SaleMate', 10),
  }];

  // data akun superadmin
  for (const super_admin of super_admins) {
    const create_admin_data = await prisma.superAdmin.create({
        data: super_admin,
      });
      await prisma.user.create({
        data: {
            user_name: create_admin_data.admin_name,
            email: create_admin_data.admin_email,
            password: create_admin_data.password,
            pin: create_admin_data.admin_pin,
            role: 'SUPER_ADMIN',
        },
      });
    }
  console.log('SuperAdmin account created successfully!');
}


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


  // to run = npx ts-node prisma/seed.ts