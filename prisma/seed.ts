/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // deklarasi akun superadmin
  const super_admins = [{
    admin_name: 'Samuel',
    admin_email: 'samuelalvian07@gmail.com',
    admin_pin: "776699",
    role: 'super_admin',
    password: await bcrypt.hash('Samuel7699', 10),
  }];

  // data akun superadmin
  for (const super_admin of super_admins) {
    const create_admin_data = await prisma.super_admin.create({
        data: super_admin,
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