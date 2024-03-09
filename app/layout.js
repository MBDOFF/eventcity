import "@/files/css/base/colors.module.scss";
import "@/files/css/base/scrollbar.scss";
import "@/files/css/base/default_tag_values.scss";

import Menu from "@/app/menu";

export const metadata = {
  title: "EventCity",
  description: "Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu/>
        {children}
      </body>
    </html>
  );
}
