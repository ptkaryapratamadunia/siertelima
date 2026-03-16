import bcrypt from 'bcrypt-ts';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🔐 Mengecek dan meng-hash password yang belum ter-hash...\n');

  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log('❌ Tidak ada user ditemukan di database');
    return;
  }

  let updated = 0;

  for (const user of users) {
    // Cek apakah password sudah di-hash (bcrypt hash dimulai dengan $2)
    if (!user.password.startsWith('$2')) {
      try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await prisma.user.update({
          where: { id: user.id },
          data: { password: hashedPassword },
        });
        console.log(`✅ User "${user.username}" - password sudah di-hash`);
        updated++;
      } catch (error) {
        console.log(
          `❌ Error hashing password untuk user "${user.username}":`,
          error,
        );
      }
    } else {
      console.log(
        `⏭️  User "${user.username}" - password sudah ter-hash sebelumnya`,
      );
    }
  }

  console.log(`\n✨ Selesai! ${updated} user telah di-update.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
