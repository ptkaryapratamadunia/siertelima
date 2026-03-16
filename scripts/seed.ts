import bcrypt from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Menambahkan test users...\n');

  // Hash password untuk test
  const adminPassword = await bcrypt.hash('admin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  try {
    // Hapus user lama jika ada (opsional)
    await prisma.user.deleteMany();
    console.log('🗑️  Cleared existing users');

    // Tambah test users
    const admin = await prisma.user.create({
      data: {
        username: 'ketua_rt05',
        password: adminPassword,
        role: 'Top Admin',
      },
    });
    console.log(`✅ Created admin: ${admin.username}`);

    const normalUser = await prisma.user.create({
      data: {
        username: 'warga_rt05',
        password: userPassword,
        role: 'User',
      },
    });
    console.log(`✅ Created user: ${normalUser.username}`);

    console.log('\n📝 Test Credentials:');
    console.log('Admin:');
    console.log('  Username: ketua_rt05');
    console.log('  Password: admin123');
    console.log('\nUser:');
    console.log('  Username: warga_rt05');
    console.log('  Password: user123');
  } catch (error) {
    console.error('❌ Error creating users:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
