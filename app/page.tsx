import AcmeLogo from '@/app/ui/acme-logo';
import Link from 'next/link';
import { lusitana } from './ui/fonts';

// Módulo CSS
import styles from './ui/home.module.css'
import Image from 'next/image';

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        <AcmeLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">

          {/* Tailwind CSS */}
          <div
            className="h-0 w-0 border-b-[30px] border-l-[20px] border-r-[20px] border-b-black border-l-transparent border-r-transparent"
          ></div>
          
          <p 
            className={
              lusitana.className + ' ' +
              `text-xl text-gray-800 md:text-3xl md:leading-normal`
            }
          >
            <strong>Welcome to Acme.</strong> This is the example for the{' '}
            <a href="https://nextjs.org/learn/" className="text-blue-500">
              Next.js Learn Course
            </a>
            , brought to you by Vercel.
          </p>

          {/* Módulo CSS */}
          <div className={styles.shape}></div>
          
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* 
            * Preventing layout shift automatically when images are loading.
            * Resizing images to avoid shipping large images to devices with a smaller viewport.
              * It generates multiple sizes of each image for different devices. 
            * Lazy loading images by default (images load as they enter the viewport).
            * Serving images in modern formats, like WebP and AVIF, when the browser supports it.
            
            Tudo isso inteiramente de grátis e sem nenhum custo adicional!
            Sempre defina width e height pois o aspect ratio será usado pelo Next.js.
          */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop and mobile versions"
          /> {/* imagem vindo da /public */}

          <Image
            src="/hero-mobile.png"
            width={560}
            height={620}
            className="md:hidden block"
            alt="Screenshots of the dashboard project showing mobile version"
          />
        </div>
      </div>
    </main>
  );
}
