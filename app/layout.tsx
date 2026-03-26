import "@/assets/styles/globals.scss";

import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Providers } from "./providers";

const montserrat = Montserrat({
    subsets: ["latin", "cyrillic"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-montserrat",
});

export const metadata: Metadata = {
    title: "Sagynysh's birthday invite",
    description: "Sagynysh's birthday invite app",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={montserrat.variable}>
            <Providers>{children}</Providers>
        </body>
        </html>
    );
}
