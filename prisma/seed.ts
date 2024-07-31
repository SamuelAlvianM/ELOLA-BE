import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {

  // deklarasi akun superadmin
  const super_admin_email = 'samuelalvian@gmail.com';
  const super_admin_password = 'superadminsamuel07061999';
  const hashed_password = await bcrypt.hash(super_admin_password, 10);

  // data akun superadmin
  await prisma.superAdmin.create({
    data: {
        admin_name: 'Samuel Alvian',
        admin_email: super_admin_email,
        password: hashed_password,
        admin_pin: '7699', 
    },
  });

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
