import Link from 'next/link';
import Image from 'next/image';

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Bagian kiri: teks dan tombol */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            <span className="text-orange-600">Welcome Back!</span>
            <br />
            <br />
            Di lingkungan RT05 RW16 Simpangan, Cikarang Utara, Kab. Bekasi{' '}
            <br />
            <br />
            <span className="text-blue-600">
              "Jaga kebersihan dan kenyamanan lingkungan kita bersama-sama!"
            </span>
          </h1>
          <br />
          <Link
            href="/login"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition">
            Mulai Jelajahi RT05
          </Link>
        </div>

        {/* Bagian kanan: ilustrasi/gambar */}
        <div className="flex justify-center">
          <Image
            src="/webRT05.svg"
            alt="undraw"
            width={400}
            height={300}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Welcome;

// export default function Home() {
//   return (
//     <div>
//       <h1>Welcome to my Next.js App!</h1>
//       <p>This is the home page.</p>
//     </div>
//   );
// }
